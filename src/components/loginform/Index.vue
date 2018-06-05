<template>
<div class="st-viewbox">
	<div class="login-index">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="close" v-if="'add-to-cart'=== action" slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
			<mu-icon-button  @click="close" v-else-if="'buy'=== action" slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
			<mu-icon-button  @click="$router.go(-1)" v-else slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<a class="button addressclose"  @click="close" v-if="'add-to-cart'=== action"><i class="st-icon icon-close"></i></a>
		<a class="button addressclose"  @click="close" v-else-if="'buy'=== action"><i class="st-icon icon-close"></i></a>
		<a class="button addressclose"  @click="$router.go(-1)" v-else><i class="st-icon icon-close"></i></a>
		<v-loginform />
		</div>
</div>
</template>
<script>
import LoginForm from '@/components/loginform/LoginForm';
export default {
	components: {
		'v-loginform' : LoginForm,
	},
	props: {
		action: String,
	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},
	methods:{
		close() {
			this.$emit('close');
			if(sessionStorage.getItem("tokenPack")){
				sessionStorage.removeItem('tokenPack')
			}
		},
	}

};
</script>
<style lang='less'>
.login-index{padding-bottom: 30%;position: fixed;z-index: 999;top: 0;background: #f1f1f1;height: 100%;width: 100%;max-width: 375px;overflow: auto;
	.user_kit .user-qrcode { -webkit-animation: scale-in 0.3s forwards;position: absolute;width: 80%;left: 10%;top: 30%;-webkit-transition: .3s; transition: .3s; z-index:300;
			/* animation: scale-in 0.3s forwards; */background:#fff;border-radius: 5px;overflow: hidden;box-shadow: 0px 0px 30px rgba(255,255,255,0.5);}
	.user_kit .user-qrcode header{line-height: 52px;text-align: center;}
	.user_kit .user-qrcode img{display: block;margin:0 auto;width: 80%}
	.user_kit:not(.show) .user-qrcode {position: absolute;width: 80%;left: 10%;top: 30%;-webkit-transition: .3s; transition: .3s; z-index: 300;-webkit-animation: scale-out 0.3s forwards;
	animation: scale-out 0.3s forwards;background:#fff;display: none}
	.user_kit:not(.show) .open_bottomsheet_bg{opacity: 0;visibility:hidden;}
	.user_kit  .open_bottomsheet_bg{position:fixed;bottom:0;width:100%;transition: opacity 200ms, visibility 200ms;height: 100%;background:rgba(000,000,000,0.5);z-index: 99;left: 50%;margin-left:-187.5px;max-width: 375px;}
	@-webkit-keyframes scale-out {
		0% {
			opacity: 1;
			transform: scale(1);
			-webkit-transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(0.3);
			-webkit-transform: scale(0.3);
		}
	}

	@keyframes scale-out {
		0% {
			opacity: 1;
			transform: scale(1);
			-webkit-transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(0.3);
			-webkit-transform: scale(0.3);
		}
	}


	@-webkit-keyframes scale-in {
		0% {
			transform: scale(0.7);
			-webkit-transform: scale(0.7); }
		60% {
			transform: scale(1.03);
			-webkit-transform: scale(1.03); }
		100% {
			transform: scale(1);
			-webkit-transform: scale(1); }
	}

	@keyframes scale-in {
		0% {
			transform: scale(0.7);
			-webkit-transform: scale(0.7); }
		60% {
			transform: scale(1.03);
			-webkit-transform: scale(1.03); }
		100% {
			transform: scale(1);
			-webkit-transform: scale(1); }
	}


}


</style>
