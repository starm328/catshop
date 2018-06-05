<!-- 推广组件 -->
<template>
	<div class="st-viewbox">
		<div class="extend-index extend-bgcolor">
			<st-header  :title='$route.meta.title' fixed>
				<mu-icon-button  @click="$router.go(-1)" slot="left">
					<i class="st-icon icon-back"></i>
				</mu-icon-button>
			</st-header>

			<div class="header_mar"></div>
			<v-loged :needUser="true">
				<div class="extend-main">
					<div class="extend-tishi">长按图收藏或保存或发送给朋友</div>
					<!-- <div class="extend-tit">
						<yd-flexbox>
							<yd-flexbox-item ><div @click="tab('text')"><mu-icon-button ><i class="iconfont" :class="{'action': $route.params.name === 'text'}">&#xe62e;</i></mu-icon-button><p>推荐码</p></div></yd-flexbox-item>
							<yd-flexbox-item ><div @click="tab('qrcode')"><mu-icon-button ><i class="iconfont" :class="{'action': $route.params.name === 'qrcode'}">&#xe612;</i></mu-icon-button><p>二维码</p></div></yd-flexbox-item>
						</yd-flexbox>
					</div> -->
					<div class="extend-content">
						<div >
								<v-extendqrcode :headpicture="headpicture" v-if="headpicture && headpicture.head_picture"/>
								<v-extendqrcode2 :headpicture="headpicture" v-else></v-extendqrcode2>
						</div>

					</div>
					<tips :contents.sync="tips"  :timeout="1000"><p><i class="iconfont" >&#xe64a;</i></p></tips>
				</div>
			</v-loged>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import QRCode from 'qrcode';
import Data from '@/libs/Data';
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Tips from '@/components/Tips';
import Loged from '@/components/compact/Loged';
import Refercode from '@/Services/ReferCode';
import Sdk from '@/Services/Sdk';
import {FlexBox, FlexBoxItem} from 'vue-ydui/dist/lib.px/flexbox';
import Extendqrcode from '@/components/agent/Extension/qrcode';
import Extendqrcode2 from '@/components/agent/Extension/qrcode2';
Vue.component(FlexBox.name, FlexBox);
Vue.component(FlexBoxItem.name, FlexBoxItem);
export default {
	components:{
		'tips': Tips,
		'v-loged': Loged,
		'v-extendqrcode': Extendqrcode,
		'v-extendqrcode2': Extendqrcode2,
	},
	data(){
		return Data.createMap( {
			headpicture:{
				subject: 'User',
				entity: 'headpicture',
				params: {
					token: Auth.then(x=>x.token),
				},
			},
			refercode: {
				// 对应 Data 目录下的文件
				subject: 'Refer',
				// 对应其中的具体数据
				entity: 'refercode',
				// 参数
				params: {
					token: Auth.then(x=>x.token),
				},
				// preprocessor:refercode=>{
				// 	return this.preprocessor(refercode);

				// },
			},
			infos: {
				// 对应 Data 目录下的文件
				subject: 'User',
				// 对应其中的具体数据
				entity: 'infos',
				params: {
					token: Auth.then(x=>x.token),
				},
			},
		},{
			Auth: Auth.proxy,
			tips:'',
			qurcodeimg:'',
			configs,
		});

	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},
	mounted(){
		Auth.then( Auth=> Auth.user? Refercode : Promise.resolve()).then(Refercode=>{
			new Sdk().share({
				title:configs.catShop.shopTitle, // 分享标题
				link: location.protocol + '//'+ location.host + (Refercode ? '?relation='+Refercode : ''), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: '', // 分享图标
				desc:'',
			})
		}).catch(e=>{});
	},
	methods:{
		// copy() {
		// 	var d = document.getElementById("contents");
		// 	d.select();
		// 	document.execCommand("Copy");
		// 	this.tips = "复制成功"
		// },
		tab(value) {
			if(value === 'text'){
				this.$router.replace({name: 'Extension',params: {name: 'text'}})
			}else{
				this.$router.replace({name: 'Extension',params: {name: 'qrcode'}})
			}
		}


	}
};
</script>
<style type="text/css">
	.extend-index .st-header .wrap{background: rgba(103,58,183, 1)}
	.extend-index {position: absolute;min-height: 100%;width: 100%;max-width: 375px;	}
	.extend-index .extend-main  .mu-icon-button{width: 63px;height: 63px;}
	.extend-index .extend-main .extend-content .qrcodetext{text-align: center;}
	.extend-index .extend-main .extend-content{background: #fff;width: 90%;margin:10px auto;border-radius: 5px;max-width: 375px;overflow:hidden;box-shadow: 1px 3px 4px rgba(45, 11, 104, 0.59);}
	.extend-index .extend-main .extend-tishi{   width: fit-content;margin:0 auto;border-radius: 20px;color: #fff;padding: 3px 10px;margin-top:10px;}
	.extend-index .extend-main #bgqrcodeimg img{width: 40%;display: block;margin:0 auto;}
	.extend-index .extend-main .extend-content .extend-code{text-align: center;font-size:30px;padding:20% 0;}
	.extend-index .extend-main .extend-content .extend-code p{font-size:16px;color: #000}
	.extend-index .extend-main .extend-tit{text-align: center;color: #fff;margin:30px 0;}
	.extend-index .extend-main .extend-tit i{width:40px;height:40px;line-height:40px;border-radius: 50%;display: inline-block;font-size:20px;}
</style>
