<template>
	<div class="user-loginsuccess">
	<!-- 	<v-loged :needUser="true">
			<span style="display:none;">{{current}}</span>
		</v-loged> -->
		<!-- <no-data content="..." :icon="style" :iconclass="iconclass">
			<p><yd-countdown :time="5" format="{%s}秒" timetype="second"  :callback="callback" done-text='0秒'></yd-countdown>后自动跳转</p>
		</no-data> -->
	</div>
</template>

<script>
// import Ajaxy from 'ajaxy';
// import QRCode from 'qrcode';
// import configs from '@/configs/app';
import Vue from 'vue';
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import {CountDown} from 'vue-ydui/dist/lib.px/countdown';
import Loged from '@/components/compact/Loged';
Vue.component(CountDown.name, CountDown);
export default {
	components:{
			'v-loged': Loged,
		},
	data() {
		return Data.createMap( {
		},{
			locurl:sessionStorage.getItem('locurl'),
		});
	},
	mounted() {
		this.$dialog.loading.open('登录中');
		Auth.then( auth=> {
			function GetQueryString(name)
			{
				var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r!=null)return  unescape(r[2]); return null;
			}
			var url=sessionStorage.getItem('locurl')
			if(auth.user){
				this.$dialog.loading.open('登录成功');
				setTimeout(() => {
					this.$dialog.loading.close();
					if(location.hash !== "#/select/user%2Faddress"){
						location.replace(GetQueryString('referer')||url||'/?#/')
					}
				}, 1000);
			}
			else
			if( Auth.backTries <= 0 )
			{
				// this.$dialog.loading.close();
				// this.$dialog.toast({
				// 	mes: '登录失败，如未登录，不能微信登陆哟！',
				// 	timeout: 2000,
				// 	icon: 'error',
				// 	callback: () => {
				// 		this.$dialog.loading.close();


				// 	}
				// });
				this.$dialog.loading.close();
				if(location.hash !== "#/select/user%2Faddress"){
					location.replace(GetQueryString('referer')||url||'/?#/')
				}
			}
		})
	},
};

</script>

<style lang="less">
	.user-loginsuccess header{text-align: center;line-height: 50px;font-size:18px;}
</style>
