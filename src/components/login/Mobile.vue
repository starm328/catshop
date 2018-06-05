

<!-- 手机登陆组件 -->
<template>
	<div class="phone-login st-cell-item">
	<form    @keydown="keydown($event)">
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">手机号 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('mobile')"></p></span>
				<yd-input slot="right" required v-model="sendcode.mobile" placeholder="请输入手机号"  :show-success-icon="false" :show-error-icon="false" type="tel" regex="mobile"></yd-input>
				<div  slot="right" style="position:absolute;right:0;top:10px">
					<!-- <mu-raised-button label="" class="demo-raised-button sendcode-button yd-btn-primary" primary type="button">
						<yd-sendcode	v-model="start1"
							@click.native="sendCode1"
							init-str="获取"
							run-str="{%s}秒后获取"
							reset-str="获取"
							action-type="button"
						></yd-sendcode>
					</mu-raised-button> -->
					<timer-btn ref="timerbtn" class="btn btn-default " @run="sendCode1" ></timer-btn>
				</div>
			</yd-cell-item>

			<yd-cell-item>
				<span slot="left">验证码 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('code')"></p></span>
				<yd-input slot="right" required v-model="code" placeholder="请输入验证码"  :show-success-icon="false" :show-error-icon="false" type="tel"></yd-input>
			</yd-cell-item>
		</yd-cell-group>
		<mu-raised-button label="登陆" class="demo-raised-button  st-subbutton st-main-bgcolor st-main-textcolor" primary fullWidth @click.native="submit"/>
		<div class="st-pop-loading"  v-if="loading"><div class="yd-loading-icon st-loading " ></div></div>
		<tips :contents.sync="tips"  :timeout="1000"></tips>
	</form>
	</div>
</template>
<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import MobileAuth from '@/Services/MobileAuth';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import {Button, ButtonGroup} from 'vue-ydui/dist/lib.px/button';
import {SendCode} from 'vue-ydui/dist/lib.px/sendcode';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
import {Input} from 'vue-ydui/dist/lib.px/input';
import timer from '@/components/timerbtn/timerbtn';
import Tips from '@/components/Tips';
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
Vue.component(SendCode.name, SendCode);

export default {
	components:{
		'timer-btn':timer,
		'tips': Tips,
	},
	data(){
		return {
			showLoginForm: false,
			start1: false,
			sendcode:{
				mobile:'',
				title:configs.catShop.shopTitle,
			},
			code:'',
			errors: {},
			loading:false,
			tips:'',
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
		sendCode1() {
				this.loading =true
				var that = this
					Ajaxy.post( `${configs.MobileEnd.apiBaseUrl}send-code`,this.sendcode)
						.when( 200, response=> {
							this.loading =false;
							this.$refs.timerbtn.setDisabled(true); //设置按钮不可用
							this.$refs.timerbtn.start(); //启动倒计时
							this.$dialog.toast({
							    mes: '发送成功',
							    timeout: 1500,
							    icon: 'success',
							});
							this.start1 = true
						} )
						.when( 422, response=> {this.loading =false;this.errors= response.json.errors})
						.else(x=>{
							this.$dialog.toast({
							    mes: '数据异常，刷新页面重试',
							    timeout: 1500,
							    icon: 'error',
							});
						})
					;
		},
		keydown(ev) {
			if(ev.keyCode == 13){
				this.submit()
			}
		},
		submit() {
			// z('1')
			// Ajaxy.post( `${configs.MobileEnd.apiBaseUrl}a-${configs.MobileEnd.app}/login`,{mobile:this.sendcode.mobile,code:this.code})
			// .when(200,response=>{z(response.json)})
			// this.loading =true
			this.$dialog.loading.open('提交中');
			MobileAuth.mobile(this.sendcode.mobile,this.code,p=>{
				return p.when(422,response=>{
					this.errors = response.json.errors;
					this.loading =false
					this.$dialog.loading.close();
					return Promise.reject();
				}).when(401,response=>{
					this.tips ="登录失败";
					this.errors = response.json;
					this.$dialog.loading.close();
					return Promise.reject();
				}).then(tokenPack=>{
					// sessionStorage.setItem('locurl', location.href)
					// location.replace('http://' + location.hostname + ':8080/?referer=' + encodeURIComponent(location.href) + '#/loginsuccess')
					this.$dialog.loading.close();
					sessionStorage.setItem('locurl', location.href);
					this.$router.replace({name:'LoginSuccess'});
					return tokenPack
					// return Ajaxy.GET( `${configs.catShop.apiBaseUrl}user`,{token:tokenPack.token})
					// 	.when( 200, response=> {
					// 		Auth.refreshUser(tokenPack.token);
					// 		this.$dialog.loading.close();
					// 		return tokenPack;
					// 	} )
					// 	.when( 204, response=> {
					// 		this.$dialog.loading.close();
					// 		this.tips="该手机未注册";
					// 		Auth.logout();
					// 		return Promise.reject();
					// 	} )
					// 	.when( 401, response=> {
					// 		this.tips="登陆失败";
					// 		this.$dialog.loading.close();
					// 		Auth.logout();
					// 		return Promise.reject();
					// 	} )
					// ;
				});
			})
		},

	}
};

</script>
<style lang="less">
	.phone-login{
		.mu-raised-button-primary.login-button{background: #F23030;}
		.demo-raised-button.sendcode-button .yd-btn-primary{background-color: #5e9fff;}
		.mu-raised-button-primary.sendcode-button{background: none;box-shadow: none;}
		.sendcode-button{line-height: 30px}
		.yd-cell-right .yd-input{left:0;}
		.yd-cell-right .yd-input input{text-align: left}
	}

</style>
