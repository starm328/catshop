<!-- 外部账户添加组件 -->
<template>
<div class="st-viewbox">
	<div class="external-type">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<!-- 录入表单组件 -->
			<!-- <st-form :form="accountform.meta"/> -->
			<form ref="form" class="st-form">
					<yd-cell-group>
						<st-input  :errors="errors" v-for="(form,i) in accountform.meta" :key="i" v-if="accountform.meta" :form="form"/>
					</yd-cell-group>
					<mu-raised-button label="提交" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" @click="submit"/>
			</form>
		</v-loged>
	</div>
</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import StInput from '@/components/compact/Input';
import Loged from '@/components/compact/Loged';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
import {Input} from 'vue-ydui/dist/lib.px/input';
Vue.component(CellGroup.name, CellGroup);
Vue.component(Input.name, Input);
	export default{
		components: {
			'v-loged': Loged,
			'st-input':StInput
		},
		metaInfo () {
			const title = this.$route.meta.title;
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		data () {
			return Data.createMap( {
				// 资金类型下，所对顶的表单字段数据
				accountform: {
					// 对应 Data 目录下的文件
					subject: 'ExternalAccountType',
					// 对应其中的具体数据
					entity: 'accountform',
					// 参数
					params: {
						external_account_type: this.$route.params.id,
					},

				},
			},{
				errors: {},
			});
		},
		methods: {
			showError( field ){
				return (
					field in this.errors
					? this.errors[field][0]
					: undefined
				)
			},
			submit() {
				var o = {};
				var elem = this.$refs.form.elements;
				Array.from(elem).filter(x=>x.name).map(x=>o[x.name]=x.value)
				// z(elem.filter(x=>x.name))
				this.$dialog.loading.open('提交中');
				Auth.then( auth=> {
					Ajaxy.post( `${configs.catShop.apiBaseUrl}external-accounts`, {type_id:this.$route.params.id,detail:o}, { token: auth.token, } )
						.when( 200, response=> {
							this.$dialog.loading.close();
							window.history.go(-2)
							return response.json

						})
						.when( 406, response=> {
							this.$dialog.loading.close();
							this.$dialog.toast({
								mes: '商家不支持此提现账户类型',
								timeout: 2000,
								icon: 'error',
								callback: () => {
									window.history.go(-2)
									return response.json
								}
							});


						})
						.when( 422,response =>{

						})
					;
				} );
			}
		}
	}
</script>
<style>
</style>
