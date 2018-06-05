<template>
	<main id="app" :class="'env-'+(env||'product')">

		<!-- <img src="./assets/logo.png"> -->

		<!-- st-default  默认主题 -->
		<div class="mkd_main st-default">
			<!-- <v-header /> -->
			<v-nav />
			<div class="mkd_ui" :class="{wx : wxshow}">
				<keep-alive>
				    <router-view v-if="$route.meta.keepAlive">
				        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
				    </router-view>
				</keep-alive>
			<!-- </transition> -->
			<!-- <transition :name="transitionName" mode="out-in"> -->
				<router-view v-if="!$route.meta.keepAlive">
				    <!-- 这里是不被缓存的视图组件，比如 page3 -->
				</router-view>
			</div>
		</div>
	</main>
</template>

<script>
import Vue from 'vue';
import '@/assets/css/fonts.css';
import '@/assets/font/iconfont.css';
import '@/configs/skin.less';
import '@/assets/css/starm.css';
import '@/assets/favicon.ico';

// import configs from '@/configs/app';
// import Ajaxy from 'ajaxy';
// import Auth from '@/Services/Auth';
// import Vheader from '@/components/compact/Header';
import Vnav from '@/components/compact/Nav';
import Sdk from '@/Services/Sdk';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import FirstPageCache from '@/Services/FirstPageCache';
export default {
	name: 'app',
	data(){
		return {
			transitionName:'fade',
			wxshow: false,
			env:configs.env,
		};
	},

	mounted() {
		// 判断微信浏览器
		var _ua = navigator.userAgent.toLowerCase();
		if(_ua.match(/MicroMessenger/i) == 'micromessenger') {
		  this.wxshow = true
		}else{
		  this.wxshow = false
		}
		// 推荐码记录localStorage
		function GetQueryString(name)
		{
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  unescape(r[2]); return null;
		}
		if(null!==GetQueryString('relation')){
			localStorage.setItem( 'relation',GetQueryString("relation"));
			if('null' === localStorage.getItem('relation')){
				localStorage.setItem( 'relation',GetQueryString("relation"));
			}else if('null' !== localStorage.getItem('relation')){
			}
		}else{}

		FirstPageCache.store();
	},

	updated()
	{
		FirstPageCache.store();
	},

	components: {
		// 'v-header': Vheader,
		'v-nav': Vnav,
	},
	watch : {

		'$route' (to, from) {
		    const toDepth = to.path.split('/').length
		    const fromDepth = from.path.split('/').length
		    this.transitionName = toDepth < fromDepth ? 'fade-back' : 'fade'
		}

		// $route(to, from){
		// 	let isBack = this.$router.isBack;
		// 	if (isBack) {
		// 	   this.transitionName = 'fade-back';

		// 	} else {
		// 	   this.transitionName = 'fade'
		// 	}
		// 	// 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
		// 	this.$router.isBack = false
		// },

	},
};
</script>
<style type="text/css">
	.fade-enter-active, .fade-leave-active,.fade-back-enter-active, .fade-back-leave-active{
	transition: transform  0.2s linear;
  	transform: translate(0, 0);
  	position: fixed;

	}
	.fade-leave-to,.fade-back-enter{transform: translate(-100%, 0);transform: translate(-100vw, 0);}
	.fade-enter,.fade-back-leave-to  {
  		transform: translate(100%, 0);
  		transform: translate(100vw, 0);
  		width: 100%
	}
	.fade-enter-active.fadb, .fade-leave-active.fadb,.fade-back-enter-to.fadb{
		position: fixed;
		width: 100%;
		max-width: 375px;
		height: 100%;
		top:0;
		background: #f1f1f1;
		overflow:hidden;
	}
	.fade-enter.fadb, .fade-leave-to.fadb{
		position: fixed;
		top:0;
		width: 100%;
		height: 100%;
		background:#f1f1f1;
		overflow:hidden;
	}




	.initialization {
	    position: fixed; left: 50%; top: 40%; width: 50px;height: 50px;
	    background-color: rgba(0,0,0,0.5); margin-left: -25px; margin-top: -50px;
	    z-index: 999; border-radius: 4px; text-align: center;
	}
	.initialization.on {
	    opacity: 0;
	    -webkit-animation: fadein 1s linear forwards;
	    animation: fadein 1s linear forwards;
	}
	.initialization.off {
	    opacity: 1; -webkit-animation: fadeout 1s linear forwards; animation: fadeout 1s linear forwards;
	}
	.initialization .loader {
	    border-top: 1px solid rgba(255, 255, 255, 0.2);
	    border-right: 1px solid rgba(255, 255, 255, 0.2);
	    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	    border-left: 1px solid #ffffff;
	    -webkit-animation: loader .5s infinite linear;
	    animation: loader .5s infinite linear;
	    vertical-align: middle;
	    border-width: .2rem;
	}
	.initialization .loader, .initialization .loader:after {
	    border-radius: 50%;
	    width: 30px;
	    height: 30px;
	    top: 10px;
	    position: relative;
	    margin:0 auto;
	}
	@-webkit-keyframes loader {
	  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg);}
	  100% {-webkit-transform: rotate(360deg); transform: rotate(360deg);}
	}
	@keyframes loader {
	  0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}
	  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
	}
	@-webkit-keyframes fadein {to { opacity: 1; }}
	@keyframes fadein { to {opacity: 1; }}
	@-webkit-keyframes fadeout { to { opacity: 0; }}
	@keyframes fadeout { to { opacity: 0; } }
	.margin-top-far {    margin-top: 10px;}
	.mu-bottom-nav-shift .mu-bottom-item-text{opacity: 1;}
	.button.large {padding: 0 15px;height: 50px;line-height: 50px;font-size: 15px;}
	.button.mini{display: inline-block;}
	.border-radius-30px {
		border-radius: 30px;
	}
	.button.default {
		border: 1px solid transparent;
		padding: 0px 30px;
		height: 100%;
		line-height: 50px;
		text-align: center;
		font-size: 15px;
	}

	.yd-lightbox-head>a{color:#fff !important;}
	.mkd_main{max-width:375px;margin:0 auto;height: 100%}
	.mkd_main .mkd_ui{background:#f1f1f1;}



	.m-backtop{bottom: 10% !important}


	/*layout列表样式*/
	.order-business{background: #fff;height: 40px;line-height: 40px;overflow:hidden;border-bottom: 1px solid #eee}
	.order-business::after{clear: both;display: block;content: ''}
	.order-business p{text-indent: 10px;float:left;height: 40px;line-height: 40px;}
	.order-business p i{padding-right: 4px;}
	.order-business span{text-indent: 10px;float: right;margin-right: 15px;}
	.summary{text-align: right;border-top:1px solid #eee;height: 40px;line-height: 40px;padding-right: 10px;background:#fff;}
	.summary b{margin-left: 10px;font-weight: normal;}
	.summary b i{float: left;text-indent: 10px;}
	.summary b em{color: #FF4E4E;font-size:12px;}
	.layout > ul{position: relative;margin-bottom: 10px;}
	.layout > ul:before {
		position: absolute;
		left: 0;
		right: 0;
		top: -1px;
		border-top: 1px solid #f1f1f1;
		content: "";
	}
	.layout > ul > li {
		background-color:  #fff;
		position: relative;
	}

	.layout > ul > li:last-child:after{display: none;}
	.padding-left-far {
		padding-left: 10px;
	}
	.flexbox {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}
	.layout > ul > li .item.topalign {
		-webkit-box-align: flex-start;
		-webkit-align-items: flex-start;
		align-items: flex-start;
	}
	.layout > ul > li .margin-right-zero{
		margin-left:10px;
	}
	.layout > ul > li .item {
		min-height: 44px;
		padding: 10px 15px;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		position: relative;
	}
	.flexbox .primary {
		word-wrap: break-word;
		word-break: break-all;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	.layout > ul > li .item .media.medium {
		width: 80px;
		height: 80px;
		line-height: 40px;
	}
	.layout > ul > li .item .media {
		width: 25px;
		height: 25px;
		line-height: 25px;
		margin-right: .8rem;
		position: relative;
		z-index: 2;
		text-align: center;
	}
	.layout > ul > li .item .media img {
		width: 100%;
		max-height: 100%;
		border-radius: inherit;
	}
	.layout > ul > li .item .content {
	word-wrap: break-word;
		word-break: break-all;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	.layout > ul > li >
	.layout .props:last-child {
		padding-bottom: 0;
	}
	.layout .props {
		position: relative;
		padding-bottom: .25rem;
	}
	.fz-medium {
		font-size: 14px;
	}
	.layout .prop {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		margin-bottom: .25rem;
	}
	.layout .prop .l {
		word-wrap: break-word;
		word-break: break-all;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		text-overflow: ellipsis;
		line-height: 20px;
		max-height: 60px;
		height: auto;

	}
#app.env-test::after{
	position: fixed;
	content: '测试环境';
	top:40%;
	left:0;
	width: 20px;
	background: rgba(000,000,000,0.2);
	text-align: center;
	line-height: 20px;
	color: #F23030;
	z-index: 99999;
	font-weight: bold;
}
</style>
