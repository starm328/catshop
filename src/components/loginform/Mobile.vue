

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
			<yd-cell-item>
				<span slot="left">新密码 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('newpassword')"></p></span>
				<yd-input slot="right" required v-model="newpassword" placeholder="数字+字母自由组合"  :show-success-icon="false" :show-error-icon="false" type="password" ref="newpassword"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">重复密码 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('agenpassword')"></p></span>
				<yd-input slot="right" required v-model="agenpassword" placeholder="数字+字母自由组合"  :show-success-icon="false" :show-error-icon="false" type="password" ref="agenpassword"></yd-input>
			</yd-cell-item>
		</yd-cell-group>
		<mu-raised-button label="登陆" class="demo-raised-button  st-subbutton st-main-bgcolor st-main-textcolor" primary fullWidth @click.native="submit" :disabled="disabled"/>
		<div class="other" @click="other">用户名登陆 </div>
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
import timer from '@/components/timerbtn/timerbtn';
import Tips from '@/components/Tips';


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
			newpassword:'',
			agenpassword:'',
			code:'',
			errors: {},
			loading:false,
			tips:'',
		};
	},
	computed: {
		disabled() {
			if(!this.sendcode.mobile == '' && !this.code == '' && !this.newpassword == '' && !this.agenpassword == '') {
				return false
			}else{
				return true
			}
		}
	},
	methods: {
		other() {
			this.$emit('phone');
		},
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
			this.$dialog.loading.open('登录中');
			if(this.sendcode.mobile === '' || this.code=== ''){
				sessionStorage.removeItem('tokenPack')
			}
			var tokenPack =  JSON.parse(sessionStorage.getItem("tokenPack"));
			var password = this.$refs.newpassword.value;
			var agenpassword = this.$refs.agenpassword.value;

			if(tokenPack && new Date(tokenPack.expired_at) > new Date()){
				var token =  JSON.parse(sessionStorage.getItem("tokenPack")).token;
				if(this.newpassword == ''){
					this.errors = {newpassword: ["请输入密码"]};
					this.$dialog.loading.close();
				}else if(this.agenpassword == ''){
					this.errors = {agenpassword: ["请重复输入密码"]};
					this.$dialog.loading.close();
				}else if(password !== agenpassword){
					this.errors = {agenpassword: ["两次输入的密码不一样"]};
					this.$dialog.loading.close();
				}else{
					// Auth.refreshUser(tokenPack.token);
					Ajaxy.post( `${configs.catShop.apiBaseUrl}user/reset-password`,{password:this.newpassword}, {token:token})
						.when( 200, response=> {
							return Ajaxy.GET( `${configs.catShop.apiBaseUrl}user`,{token:token})
								.when( 200, response=> {
									this.$dialog.loading.close();
									this.tips = '登陆完成';
									sessionStorage.removeItem('tokenPack');
									sessionStorage.setItem('locurl', location.href);
									this.$router.replace({name:'LoginSuccess'});
									return Auth.login( Promise.resolve(tokenPack) );
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
						} )
						.when( 422, response=> {
							this.errors= response.json.errors;
							this.$dialog.loading.close();
						} )
						.when( 403, response=> {
							this.tips="未注册";
							this.$dialog.loading.close();
						} )
					;
				}

			}else{
				MobileAuth.mobile(this.sendcode.mobile,this.code,p=>{
					return p.when(422,response=>{
						this.errors = response.json.errors;
						this.$dialog.loading.close();
						return Promise.reject();
					}).when(401,response=>{
						z(response)
						this.errors = response.json;
						this.$dialog.loading.close();
						return Promise.reject();
					}).when( 200, response=>{
						sessionStorage.setItem("tokenPack",JSON.stringify(response.json));
						this.$emit('close');
						return response.json
					}).then(tokenPack=>{
						if(this.newpassword == ''){
							this.errors = {newpassword: ["请输入密码"]};
							this.$dialog.loading.close();
						}else if(this.agenpassword == ''){
							this.errors = {agenpassword: ["请重复输入密码"]};
							this.$dialog.loading.close();
						}else if(password !== agenpassword){
							this.errors = {agenpassword: ["两次输入的密码不一样"]};
							this.$dialog.loading.close();
						}else{
							// z(tokenPack)
							// Auth.refreshUser(tokenPack.token);
							return Ajaxy.post( `${configs.catShop.apiBaseUrl}user/reset-password`,{password:this.newpassword}, {token:tokenPack.token})
								.when( 200, response=> {
									return Ajaxy.GET( `${configs.catShop.apiBaseUrl}user`,{token:tokenPack.token})
										.when( 200, response=> {
											this.$dialog.loading.close();
											this.tips = '登陆完成';
											sessionStorage.removeItem('tokenPack');
											sessionStorage.setItem('locurl', location.href);
											this.$router.replace({name:'LoginSuccess'});
											return tokenPack
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
								} )
								.when( 403, response=> {
									this.tips="未注册";
									this.$dialog.loading.close();
								} )
								.when( 422, response=> {
									this.errors= response.json.errors;
									this.$dialog.loading.close();
								} )
								.when( 401, response=> {
									this.tips="登陆失败";
									this.$dialog.loading.close();
								} )
							;
						}
					});
				})
			}
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
