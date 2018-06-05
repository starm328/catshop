
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';

class Sdk
{
	apiLists={
		share: ['onMenuShareTimeline','onMenuShareAppMessage'],
		hideMenuItems:['hideMenuItems'],
		showMenuItems:['showMenuItems'],
		getLocation:['getLocation']
	};

	constructor(...actions)
	{
		this.apiList = [];
		this.registerApi(...actions);
		this.promise = Ajaxy.get( `${configs.wechatEnd.apiBaseUrl}jssdk/w-${configs.wechatEnd.wxApp}/sign`, { url:  location.href.split('#')[0] } )
			.when( 200, response=> {
				wx.config({
					// debug:true,
					appId:response.json.appId,
					timestamp:response.json.timestamp,
					nonceStr:response.json.nonceStr,
					signature:response.json.signature,
					jsApiList:this.apiList,
				});
				return wx;
			} )
		;
	}
	//微信分享
	share(params)
	{
		this.registerApi('share');
		this.promise.then(wx =>new Promise((resolve, reject)=>{
			params.success = resolve;
			params.cancel = reject;
			if(!params.link){
				params.link = location.href;
			}

			wx.onMenuShareTimeline(params);
			wx.onMenuShareAppMessage(params);
		}));
		return this;
	}
	//隐藏功能按钮接口
	hideMenuItems(params)
	{
		this.registerApi('hideMenuItems');
		this.promise.then(wx =>new Promise((resolve, reject)=>{

			wx.hideMenuItems({menuList: params});
		}));
		return this;
	}
	//显示功能按钮接口
	showMenuItems(params)
	{
		this.registerApi('showMenuItems');
		this.promise.then(wx =>new Promise((resolve, reject)=>{

			wx.showMenuItems({menuList: params});
		}));
		return this;
	}
	//获取经纬度
	getLocation(params)
	{
		this.registerApi('getLocation');
		this.promise.then(wx =>new Promise((resolve, reject)=>{

			wx.getLocation(params);
		}));
		return this;
	}
	registerApi(...actions){
		actions.forEach(action=>this.apiLists[action].forEach(x=>this.apiList.includes(x)||this.apiList.push(x)));
	}
}

export default Sdk;
