<!-- 用户名登陆组件 -->
<template>
	<div class="username-login st-cell-item">
		<form  @keydown="keydown($event)">
			<yd-cell-item>
				<span slot="left">用户名 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('username')"></p></span>
				<yd-input slot="right" required v-model="username" placeholder="请输入用户名"  :show-success-icon="false" :show-error-icon="false"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">密码 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('password')"></p></span>
				<yd-input slot="right" required v-model="password" placeholder="请输入用户名"  :show-success-icon="false" :show-error-icon="false" type="password"></yd-input>
			</yd-cell-item>
			<mu-raised-button label="登陆" class="demo-raised-button st-subbutton st-main-bgcolor st-main-textcolor" primary fullWidth @click.native="submit"/>
		</form>
		<div class="st-pop-loading"  v-if="loading"><div class="yd-loading-icon st-loading " ></div></div>
		<tips :contents.sync="tips"  :timeout="1000"></tips>
	</div>
</template>
<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import {Input} from 'vue-ydui/dist/lib.px/input';
import Tips from '@/components/Tips';
import MobileAuth from '@/Services/MobileAuth';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';

Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
Vue.component(Input.name, Input);
export default {
	components: {
		'tips': Tips,
	},
	data(){
		return {
			username:'',
			password: '',
			errors: {},
			tips: '',
			loading:false
		};
	},
	methods: {
		showError( field ){
			return (
				field in this.errors
				? this.errors[field][0]
				: undefined
			)
		},
		keydown(ev) {
			if(ev.keyCode == 13){
				this.submit()
			}
		},
		submit() {
			this.$dialog.loading.open('提交中');
			MobileAuth.username(this.username,this.password,p=>{
				return p.when(422,response=>{
					this.errors = response.json.errors;
					this.$dialog.loading.close();
					return Promise.reject();
				}).when(401,response=>{
					this.tips ="登录失败"
					this.$dialog.loading.close();
					return Promise.reject();
				}).then(tokenPack=>{
					return Ajaxy.GET( `${configs.catShop.apiBaseUrl}user`,{token:tokenPack.token})
						.when( 200, response=> {
							Auth.refreshUser(tokenPack.token);
							this.$dialog.loading.close();
							sessionStorage.setItem('locurl', location.href);
							this.$router.replace({name:'LoginSuccess'});
							return tokenPack;
						} )
						.when( 204, response=> {
							this.$dialog.loading.close();
							this.tips="该手机未注册";
							Auth.logout();
							return Promise.reject();
						} )
						.when( 401, response=> {
							this.tips="登陆失败";
							this.$dialog.loading.close();
							Auth.logout();
							return Promise.reject();
						} )
					;
				});
			})
		},

	}
};

</script>
<style type="text/css">

</style>
