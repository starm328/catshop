<template>
	<div class="loginform-sign st-cell-item">
		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">手机 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('mobile')"></p></span>
				<yd-input slot="right" required v-model="sendcode.mobile" placeholder="请输入手机号"  :show-success-icon="false" :show-error-icon="false" type="tel"></yd-input>
				<div  slot="right" style="position:absolute;right:0;top:10px" class="timerbtn ">
						<yd-sendcode
							v-model="start1"
							@click.native="sendCode1"
							init-str="获取验证码"
							run-str="{%s}秒后获取"
							reset-str="获取验证码"
							action-type="button"
						></yd-sendcode>
					</mu-raised-button>
					<!-- <timer-btn ref="timerbtn" class="btn btn-default " @run="sendCode1" ></timer-btn> -->
				</div>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">验证码 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('code')"></p></span>
				<yd-input slot="right" required v-model="code" placeholder="请输入验证码"  :show-success-icon="false" :show-error-icon="false" type="tel"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">用户名 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('username')"></p></span>
				<yd-input slot="right" required v-model="fields.username" placeholder="请输入用户名"  :show-success-icon="false" :show-error-icon="false" type="text"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">密码 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('password')"></p></span>
				<yd-input slot="right" required v-model="fields.password" placeholder="请输入字母+数字的密码"  :show-success-icon="false" :show-error-icon="false" type="password" pattern="[^\w+$]"></yd-input>
			</yd-cell-item>
			<yd-cell-item  style="display:none">
				<span slot="left">邀请码：</span>
				<span slot="left" class="inputerror"><p v-html="showError('referrer')"></p></span>
				<yd-input slot="right" required v-model="fields.referrer" placeholder="请输入邀请码"  :show-success-icon="false" :show-error-icon="false" ></yd-input>
			</yd-cell-item>
			<yd-cell-item  v-for="(infosfield,i) in infosfields" :key="infosfield.id" v-if="infosfield.need_at_sign">
				<span slot="left">{{infosfield.label}}<em v-if="infosfield.required" class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('infos'+'.'+infosfield.id)"></p></span>
				<yd-input slot="right" :required="infosfield.required" v-model="fields.infos[infosfield.id]" :placeholder="'请输入'+infosfield.label"  :show-success-icon="false" :show-error-icon="false" ></yd-input>
			</yd-cell-item>

		</yd-cell-group>
		<mu-raised-button label="注册" class="demo-raised-button  st-subbutton st-main-bgcolor st-main-textcolor" primary fullWidth @click.native="submit" :disabled="disabled"/>
		<div class="other" @click="other">用户名登陆 </div>
		<tips :contents.sync="tips"  :timeout="3000"></tips>
	</div>
</template>

<script>
import Vue from 'vue';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import Tips from '@/components/Tips';
import MobileSign from '@/Services/MobileSign';
export default {
	name: 'Sign',
	components:{
		'tips': Tips,
	},
	data () {
		return Data.createMap( {
			infosfields: {
				// 对应 Data 目录下的文件
				subject: 'User',
				// 对应其中的具体数据
				entity: 'infosfields',
			},

		},{
			fields: {
				password: '',
				referrer: '',
				username: '',
				infos:[],
			},
			sendcode:{
				mobile:'',
				title:configs.catShop.shopTitle,
			},
			errors: {},
			code:'',
			start1: false,
			tips: '',
			loading:false,
		});

	},
	watch: {
		fields: {
		　　handler(newValue, oldValue) {
				if (newValue.password.length<6) {
					this.errors = {password : [ '密码不能小于6位']}
				}
				else if (! newValue.password.match(/[0-9]/)){
					 this.errors = {password : [ '请添加数字混合']}
				}

				else if (! newValue.password.match(/[a-zA-Z]/)){
					 this.errors = {password : [ '请添加字母混合']}
				}else {
					this.errors = {}
				}

		　　},
		　　deep: true
		}
	},
	mounted() {
		var loc = localStorage.getItem('relation');
		if(loc){
			this.fields.referrer = loc
		}
		function GetQueryString(name)
		{
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  unescape(r[2]); return null;
		}
		if(null!==GetQueryString('relation')){
			this.fields.referrer = GetQueryString("relation")
			if('null' === localStorage.getItem('relation')){
				this.fields.referrer = GetQueryString("relation")
			}else if('null' !== localStorage.getItem('relation')){
			}
		}else{}
	},
	computed: {
		disabled() {
			if(!this.sendcode.mobile == '' && !this.code == '' && !this.fields.password == '' && !this.fields.username == '') {
				return false
			}else{
				return true
			}
		}
	},
	methods: {

		other() {
			this.$emit('phone');
			if(sessionStorage.getItem("tokenPack")){
				sessionStorage.removeItem('tokenPack')
			}
		},
		showError( field ){
			return (
				field in this.errors
				? this.errors[field][0]
				: undefined
			)
		},
		sendCode1() {
				// this.$refs.timerbtn.setDisabled(true); //设置按钮不可用
				var that = this
				Ajaxy.post( `${configs.MobileEnd.apiBaseUrl}send-code`,this.sendcode)
					.when( 200, response=> {
						// this.$refs.timerbtn.setDisabled(true);
						this.$dialog.toast({
						    mes: '发送成功',
						    timeout: 1500,
						    icon: 'success',
						});
						this.start1 = true,
						this.errors = {},
						sessionStorage.setItem("tokenPack",JSON.stringify({mobile:this.sendcode.mobile}));

					} )
					.when( 422, response=> {
						// this.$refs.timerbtn.setDisabled(false);
						this.errors = response.json.errors;
					} )
					.else(x=>{
						this.$dialog.loading.close();
						this.$dialog.toast({
						    mes: '哎呀，异常了，刷新页面重试',
						    timeout: 1500,
						    icon: 'error',
						});
					})
				;
		},
		submit() {
			this.$dialog.loading.open('注册中');
			if(this.sendcode.mobile === '' || this.code=== ''){
				sessionStorage.removeItem('tokenPack')
			}
			var tokenPack =  JSON.parse(sessionStorage.getItem("tokenPack"));
			if(tokenPack && new Date(tokenPack.expired_at) > new Date()){ //判断是否存在tokenPack  执行下来的
				var token =  JSON.parse(sessionStorage.getItem("tokenPack")).token

					Ajaxy.post( `${configs.catShop.apiBaseUrl}user`, this.fields, { token:token  } )
						.when( 200, response=> {
							this.$dialog.loading.close();
							this.tips = '注册完成';
							sessionStorage.removeItem('tokenPack');
							this.$emit('close');
							sessionStorage.setItem('locurl', location.href);
							this.$router.replace({name:'LoginSuccess'});
							return Auth.login( Promise.resolve(tokenPack) );
							// this.$router.replace({name:'MobileIndex'});
							// this.$emit('close',response.json);//传递登陆后获取的用户数据
							// Auth.refreshUser(tokenPack.token);
						} )
						.when( 409, response=> {
							this.$dialog.loading.close();
							this.tips= "用户已注册或绑定平台用户，无需重复操作";
							sessionStorage.removeItem('tokenPack');
							// this.$emit('close',response.json.error[0]);
							// Auth.refreshUser(tokenPack.token);
							return Promise.reject();
						} )
						.when( 422, response=> {
							this.$dialog.loading.close();
							this.errors= response.json.errors;
							return Promise.reject();
						})
						.when( 401, response=> {
							this.tips = '注册失败';
							this.$dialog.loading.close();
							sessionStorage.removeItem('tokenPack')
							Auth.refreshToken().then( ()=>this.submit() )
						} )
						.else(x=>{alert(JSON.stringify(x))})
						.then(()=>token)
					;

			}else{

					MobileSign.mobile(this.sendcode.mobile,this.code,p=>{
							return p.when(401,response=>{
								this.$dialog.loading.close();
								this.errors = response.json;
								return Promise.reject();
							}).when(422,response=>{
								this.$dialog.loading.close();
								this.errors = response.json.errors;
								return Promise.reject();
							}).then(tokenPack=>{

								return Ajaxy.post( `${configs.catShop.apiBaseUrl}user`, this.fields, { token: tokenPack.token, } )
									.when( 200, response=> {
										this.$dialog.loading.close();
										this.tips = '注册完成';
										sessionStorage.removeItem('tokenPack');
										this.$emit('close');
										sessionStorage.setItem('locurl', location.href);
										this.$router.replace({name:'LoginSuccess'});
										return response.json
										// this.$router.replace({name:'MobileIndex'});
										// this.$emit('close',response.json);//传递登陆后获取的用户数据
										// Auth.refreshUser(tokenPack.token);
									} )
									.when( 409, response=> {
										this.$dialog.loading.close();
										sessionStorage.removeItem('tokenPack')
										this.tips= "用户已注册或绑定平台用户，无需重复操作";
										// this.$emit('close',response.json.error[0]);
										// Auth.refreshUser(tokenPack.token);
										return Promise.reject();
									} )
									.when( 422, response=> {
										this.$dialog.loading.close();
										// sessionStorage.removeItem('tokenPack')
										this.errors= response.json.errors;
										return Promise.reject();
									})
									.when( 401, response=> {
										this.tips = '注册失败';
										sessionStorage.removeItem('tokenPack');
										this.$dialog.loading.close();
										Auth.refreshToken().then( ()=>this.submit() )
									})
									.else(x=>{alert(JSON.stringify(x))})
									.then(()=>tokenPack)
								;

							})


					})
			}
		}
	}
}
</script>

<style lang="less">
	.loginform-sign{
		.yd-cell-right .yd-input{left:0;}
		.yd-cell-right .yd-input input{text-align: left}
	}

</style>
