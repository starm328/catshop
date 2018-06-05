<!-- 注册新用户组件 -->
<template>
	<div class="user-sign">
		<st-header  title='设置新用户' fixed>
			<mu-icon-button  @click="close"  slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<!-- <form  @submit.prevent="submit"> -->
			<a class="button addressclose"  @click="close"><i class="st-icon icon-close"></i></a>
				<div class="user-sign-content">
					<div class="user-sign_main st-cell-item">
					<yd-cell-group>
						<yd-cell-item>
							<span slot="left">用户名 <em class="fg-red">*</em>：</span>
							<span slot="left" class="inputerror"><p v-html="showError('username')"></p></span>
							<yd-input slot="right" required v-model="fields.username" placeholder="请输入用户名"  :show-success-icon="false" :show-error-icon="false"></yd-input>
						</yd-cell-item>
						<yd-cell-item>
							<span slot="left">密码 <em class="fg-red">*</em>：</span>
							<span slot="left" class="inputerror"><p v-html="showError('password')" disabled></p></span>
							<yd-input slot="right" required   v-model="fields.password" placeholder="数字+字母自由组合"  :show-success-icon="false" :show-error-icon="false" type="password"  ref="password"></yd-input>
						</yd-cell-item>
						<yd-cell-item>
							<span slot="left">重复密码 <em class="fg-red">*</em>：</span>
							<span slot="left" class="inputerror"><p v-html="showError('agenpassword')" disabled></p></span>
							<yd-input slot="right" required   v-model="agenpassword" placeholder="数字+字母自由组合"  :show-success-icon="false" :show-error-icon="false" type="password" ref="agenpassword"></yd-input>
						</yd-cell-item>
						<yd-cell-item style="display:none">
							<span slot="left">推荐码 ：</span>
							<span slot="left" class="inputerror"><p v-html="showError('referrer')" disabled></p></span>
							<yd-input slot="right" v-model="fields.referrer" placeholder="请输入推荐码"  :show-success-icon="false" :show-error-icon="false"></yd-input>
						</yd-cell-item>
						<yd-cell-item v-for="(infosfield,i) in infosfields" :key="infosfield.id" v-if="infosfield.need_at_sign">
							<span slot="left">{{infosfield.label}}<em v-if="infosfield.required" class="fg-red">*</em>：</span>
							<span slot="left" class="inputerror"><p v-html="showError('infos'+'.'+infosfield.id)" disabled></p></span>
							<yd-input slot="right" :required="infosfield.required" v-model="fields.infos[infosfield.id]" :placeholder="'请输入'+infosfield.label"  :show-success-icon="false" :show-error-icon="false" ></yd-input>
						</yd-cell-item>
					</yd-cell-group>
					</div>
					<p >
						<mu-raised-button label="提交" @click="submit" class="submit st-subbutton st-main-bgcolor" ripple-color="white"  fullWidth primary/>
					</p>
				</div>
			<!-- </form> -->
	</div>
</template>

<script>
import Vue from 'vue';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import {Input} from 'vue-ydui/dist/lib.px/input';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
Vue.component(Input.name, Input);
export default {
	name: 'user-sign',
	data(){
		return Data.createMap( {
			infosfields: {
				// 对应 Data 目录下的文件
				subject: 'User',
				// 对应其中的具体数据
				entity: 'infosfields',
			},

		},{
			fields: {
				username: '',
				password: '',
				referrer: '',
				infos:[]
			},
			agenpassword:'',
			errors: {},
			loading:false,
			configs

		});

	},
	mounted() {
		var loc = localStorage.getItem('relation');
		if(loc === 'null'){
			this.fields.referrer = ''
		}else if(!loc){
			this.fields.referrer = ''
		}
		else{
			this.fields.referrer = loc

		}
	},
	methods: {
		close() {
			this.$emit('close');
		},
		showError( field ){
			return (
				field in this.errors
				? this.errors[field][0]
				: undefined
			)
		},
		submit(){
			this.$dialog.loading.open('注册中');
			var password = this.$refs.password.value;
			var agenpassword = this.$refs.agenpassword.value;
			if(password!==agenpassword){
				this.$dialog.loading.close();
				this.errors ={agenpassword: ['两次输入的验证码不一样']};
				this.loading =false;
			}else{
				Auth.thenOnce( auth=> {
					Ajaxy.post( `${configs.catShop.apiBaseUrl}user`, this.fields, { token: auth.token, } )
						.when( 200, response=> {
							this.$dialog.loading.close();
							// this.$emit('close',response.json);//传递登陆后获取的用户数据
							Auth.refreshUser(auth.token);
							localStorage.setItem('locurl', location.href);
							this.$router.replace({name:'LoginSuccess'});
							return response.json;
						} )
						.when( 409, response=> {
							this.$dialog.loading.close();
							this.errors= response;
							// this.$emit('close',response.json.error[0]);
							Auth.refreshUser(auth.token);
						} )
						.when( 422, response=> {this.$dialog.loading.close();this.errors= response.json.errors})
						.when( 401, response=> {this.$dialog.loading.close();Auth.refreshToken().then( ()=>this.submit() ) })
						.else(x=>{
							this.$dialog.toast({
							    mes: '数据异常，刷新页面重试',
							    timeout: 1500,
							    icon: 'error',
							});
						})
					;
				} );
			}
		},
	},
};

</script>

<style>

</style>
