<!-- 绑定现有用户组件 -->
<template>
	<div class="user-sign">
		<st-header  title='绑定已有账户' fixed>
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
						<span slot="left" class="inputerror"><p v-html="showError('username')" disabled></p></span>
						<yd-input slot="right" required v-model="fields.username" placeholder="请输入用户名"  :show-success-icon="false" :show-error-icon="false"></yd-input>
					</yd-cell-item>
					<yd-cell-item>
						<span slot="left">密码 <em class="fg-red">*</em>：</span>
						<span slot="left" class="inputerror"><p v-html="showError('password')" disabled></p></span>
						<yd-input slot="right" required v-model="fields.password" placeholder="请输入密码"  :show-success-icon="false" :show-error-icon="false" type="password"></yd-input>
					</yd-cell-item>
				</yd-cell-group>
				</div>
				<p >
					<mu-raised-button label="提交" @click="submit" class="submit st-subbutton st-main-bgcolor" ripple-color="white" fullWidth primary/>
				</p>
				<tips :contents.sync="tips"  :timeout="1000"></tips>
			</div>
		<!-- </form> -->
		<div class="st-pop-loading"  v-if="loading"><div class="yd-loading-icon st-loading " ></div></div>
	</div>
</template>

<script>
import Vue from 'vue';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import Tips from '@/components/Tips';
import {Input} from 'vue-ydui/dist/lib.px/input';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
Vue.component(Input.name, Input);
export default {
	name: 'user-sign',
	components: {
		'tips': Tips,
	},
	data(){
		return {
			fields: {
				username: '',
				password: '',
			},
			errors: {},
			relation:'',
			tips: '',
			loading:false
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
			this.$dialog.loading.open('提交中');
			Auth.thenOnce( auth=> {
				Ajaxy.patch( `${configs.catShop.apiBaseUrl}user/bind`, this.fields, { token: auth.token, } )
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
					.when( 422, response=>{this.$dialog.loading.close(); this.errors= response.json.errors})
					.when( 403, response=>{
						this.$dialog.loading.close();
						this.tips = '用户名或则密码错误'
					})
					.when( 401, response=> {this.$dialog.loading.close();Auth.refreshToken().then( ()=>this.submit() ) })
				;
			} );
		},
	},
};

</script>

<style>
.user-sign .st-header{z-index: 1000}
</style>
