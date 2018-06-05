<template>
	<div id="share">
		<!-- 内容模态框 -->
		<popup-menu  v-model='contentFrame'>
			<div class="share_container">
				<span class="wx_friend shareItem" @click="shareWxClick">
					<i class="iconfont wx_friend">&#xe615;</i>
					<label>微信好友</label>
				</span>
				<span class="wx_pyq shareItem" @click="shareWxClick">
					<i class="iconfont wx_pyq">&#xe60b;</i>
					<label>微信朋友圈</label>
				</span>
				<span class="shareItem" @click="shareItemClick">
					<i class="iconfont qq">&#xe607;</i>
					<label>QQ好友</label>
				</span>
				<span class="shareItem" @click="shareItemClick">
					<i class="iconfont qzone">&#xe62f;</i>
					<label>QQ空间</label>
				</span>

			</div>
		</popup-menu>
		<!-- 分享模态框 -->
		<popup-menu v-model="shareFrame">
			<!-- <textarea cols="20" rows="10" id="contents" style="opacity: 0;height:0;" >{{shareUrl + '?relation='+ refercode}}</textarea> -->
			<div class="share_box">
				<p class="share_tip">点击复制下方链接，去粘贴给好友吧</p>
				<p class="share_url">{{shareUrl + '?relation='+ refercode }}</p>

				<tips :contents.sync="tips"  :timeout="1000"><p><i class="iconfont" >&#xe64a;</i></p></tips>
			</div>
		</popup-menu>

		<!-- 微信分享提示 -->
		<wx-share v-if="wxshare" @close="shareWxHide"/>
	</div>
</template>
<script>
import PopupMenu from '@/components/compact/PopupMenu';
import Tips from '@/components/Tips';
import Auth from '@/Services/Auth';
import Refercode from '@/Services/ReferCode';
import Wxshare from '@/components/share/Wxshare';
export default {
	components:{
		'popup-menu':PopupMenu,
		'tips': Tips,
		'wx-share': Wxshare
	},
	data() {
		return {
			contentFrame: false,             // 内容模态框
			shareFrame: false,               // 分享模态框
			shareUrl: window.location.href,   // 分享链接
			refercode:'',
			tips:'',
			wxshare:false
		}
	},
	mounted(){
		Auth.then( Auth=>{
			Refercode.then(q=> this.refercode = q)
		})
	},
	methods: {
		shareWxClick (){
			this.wxshare = true;
			this.contentFrame = false
		},
		shareWxHide (){
			this.wxshare = false;
		},
		shareItemClick() {
			this.contentFrame = false
			this.shareFrame = true
		},
		// 父组件打开此组件的方法
		toggle() {
			this.contentFrame = !this.contentFrame
		},
		copy() {
			var d = document.getElementById("contents");
			d.select();
			document.execCommand("Copy");
			this.tips = "复制成功"
		},
	}
}
</script>
<style>
#share .share_container {
	width: 100%;
	padding: 20px 10px;
	display: flex;
	overflow: auto;
	text-align: center;
}
#share .shareItem {
	flex: 1;
	min-width: 60px;
	margin: 0 5px;
}
#share i.wx_friend{
	color: #0fc812
}
#share i.wx_pyq{
	color: #0fc812
}
#share i.qq{
	color: #4cafe9
}
#share i.qzone{
	color: #f5be3f
}
#share i{
	font-size: 30px;
}
#share  label{
	display: block;
	font-size: 12px;
	margin-top: 8px;
	text-align: center;
}
#share .share_box {
	padding: 15px 20px;
}
#share .share_tip {
	padding: 0 10px;
	font-size: 16px;
}
#share  .share_url {
	margin-top: 10px;
	padding: 10px;
	font-size: 14px;
	border: 1px dotted rgb(217, 217, 217);
	word-break: break-all;
	text-align: left;
}
</style>
