<!-- 登陆放肆选择组件 -->
<template>
	<div class="user-loginform">
		<div style="position:relative;width:100%;padding:0 10%;margin:0 auto;background:#fff">
			<v-username v-if="username"/>
			<v-phone v-if="phone" />
		</div>
		<section>
			<div class="otherlogin">
				<em >其他方式登陆</em>
				<div class="flexbox">
					<div @click="phonelogin" :class="{primary:1,item:1,action: phone}">
						 <mu-icon-button icon="android">
							<i class="iconfont fg-lightblue  button weixin">&#xe686;</i>
						</mu-icon-button>
						<p>手机</p>
					</div>
					<div @click="usernamelogin" :class="{primary:1,item:1,action: username}">
						 <mu-icon-button icon="android">
							<i class="iconfont button weixin">&#xe70f;</i>
						</mu-icon-button>
						<p>用户名</p>
					</div>
					<div class="primary item" >
					<a @click="WxLogin">
						 <mu-icon-button icon="android">
							<i class="st-icon icon-weixinfill button weixin"></i>
						</mu-icon-button>
						<p>微信</p>
					</a>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Loginphone from '@/components/login/Mobile';
import Loginusername from '@/components/login/Username';
import UserSign from '@/components/sign/Index';
import WxLogin from '@/libs/WxLogin';
export default {
	components: {
		'v-phone': Loginphone,
		'v-username': Loginusername
	},
	data(){
		return {
			phone: false,
			username: true,
			wechatauth: null,
		};
	},
	mounted(){
		Ajaxy.get( `${configs.wechatEnd.apiBaseUrl}oauth/w-${configs.wechatEnd.wxApp}/wrap`, { url:location.href,} ).when( 200, response=>{
			this.wechatauth = response.json;
		} );
		// QRCode.toCanvas( this.$refs.qrcode, response.json, x=> x )
	},
	methods: {
		phonelogin() {
			// alert('1')
			this.phone = true;
			this.username = false;

		},
		WxLogin() {
			WxLogin('http://' + location.hostname + '/?referer=' + encodeURIComponent(location.href) + '#/loginsuccess');
		},
		usernamelogin() {
			this.username = true;
			this.phone = false;
		}
	}
};

</script>

<style lang='less'>
.user-loginform{
	position: absolute;height: 100%;background: #fff;width: 100%;
	.username-login,.phone-login{margin-top:20px;}
	.otherlogin {
		padding: 0 10px;
		text-align: center;
		position: relative;
		margin-top: 100px;
		em {
			font-size: 14px;
			color: #999;
			display: block;
			margin-top: -5px;
			padding-bottom: 10px;
			border-bottom: 1px solid #f1f1f1;
			position: relative;
			-webkit-transform: scale(0.85);
			transform: scale(0.85);
			&:after {
				position: absolute;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-bottom: 8px solid #f1f1f1;
				content: '';
				bottom: 0;
				left: 50%;
				margin-left: -10px;
				z-index: 1;
			}
			&:before {
				z-index: 2;
				position: absolute;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-bottom: 8px solid #fff;
				content: '';
				bottom: -2px;
				left: 50%;
				margin-left: -10px;
			}
		}
		.item {
			font-size: 13px;
			margin-top: 5px;
			color: #999;
			.button {
				display: inline-block;
				font-size: 13px;
				border-radius: 100%;
				width: 30px;
				height: 30px;
				text-align: center;
				line-height: 30px;
			}
			.button.weixin {
				border: 1px solid #999;
				color: #999;
			}
			p {
				font-size: 12px;
				color:#999;
			}
			a{color:#999;}
		}
		.item.action{
			.button.weixin {
				border: 1px solid #000;
				color: #000;
			}
			p {
				font-size: 12px;
				color:#000;
			}
		}
		.yd-cell-item {
			padding: 0 0 10px 12px;
		}
	}
	.mu-icon-button{width: 58px;height: 58px;}
	.mu-raised-button-primary.st-subbutton{margin-top: 30px;}

}
</style>

