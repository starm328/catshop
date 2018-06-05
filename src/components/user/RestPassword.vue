<!-- 修改密碼组件 -->
<template>
	<div class="st-viewbox">
		<div class="rest-password st-cell-item">
			<v-loged :needUser="true">
				<yd-cell-group>
					<st-cellitem>
						<span slot="icon"></span>
						<span slot="left">新密码:</span>
						<yd-input slot="right" required placeholder="请输入密码"  :show-success-icon="false" :show-error-icon="false" type="password" v-model="password"></yd-input>
						<span slot="error" v-if="showError('password')"><p v-html="showError('password')" class="inputerror"></p></span>
					</st-cellitem>
				</yd-cell-group>
				<mu-raised-button label="保存" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" @click="submit"/>
				<tips :contents.sync="tips"  :timeout="1000"></tips>
			</v-loged>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Loged from '@/components/compact/Loged';
import UserSign from '@/components/sign/Index';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
import Tips from '@/components/Tips';
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
export default {
	components:{
		'v-loged': Loged,
		'tips': Tips,
	},
	mounted() {
		document.title = this.$route.meta.title
	},
	metaInfo () {
		const title = this.$route.meta.title;
		return {
			title: title,
			meta: [{content: title }]
		}
	},
	data() {
		return {
			password: '',
			tips: '',
			errors: {},
		}
	},

	methods : {
		showError( field ){
			return (
				field in this.errors
				? this.errors[field][0]
				: undefined
			)
		},
		submit(){
			Auth.then( auth=> {
				Ajaxy.post( `${configs.catShop.apiBaseUrl}user/reset-password`,{password:this.password}, {token:auth.token,})
						.when( 200, response=> {
							this.tips = '修改成功';
							this.errors= {};
							window.history.go(-1)
						} )
						.when( 422, response=> {
							this.errors= response.json.errors
						} )
				;
			})
		},

	},
	　
};
</script>

<style type="text/css">
	.rest-password input{text-align: right !important;}
</style>
