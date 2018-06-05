<!-- 提现显示选择的提现账户组件 -->
<template>
	<div class="externalaccount" v-if="type.data">
		<router-link :to="{name:'ExternaChoice',params: {id: $route.params.id, ruleid: $route.params.ruleid}}">
			<input type="hidden" name="" v-model="externalshow.id" ref="input">
			账户：{{type.data.label}}
			<mu-flexbox>
				<mu-flexbox-item class="flex-demo" v-for="(external,i) in type.data.meta" :key="i">
					<span>
						{{external.label}}： {{externalshow.detail[external.name]}}
					</span>
				</mu-flexbox-item>
			</mu-flexbox>
		</router-link>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import ExternalAccountTypes from '@/Services/ExternalAccountTypes';
	export default{
		data () {
			return Data.createMap( {
				// 外部账户详情
				externalshow: {
					// 对应 Data 目录下的文件
					subject: 'ExternalAccount',
					// 对应其中的具体数据
					entity: 'externalshow',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
						external_account_id:this.$route.params.choiceid
					},
					preprocessor:externalshow=>{
						return this.preprocessorshow(externalshow);
					},

				},
			},{
				accounttype:'',
				type:''
			});
		},

		methods: {
		// 获取资金类型中，所显示的类型字段
			preprocessorshow(externalaccounts) {
				// externalaccounts.forEach(content=>{
					if(externalaccounts&&externalaccounts.type){
						ExternalAccountTypes.then(ExternalAccountType=>{
							this.type=ExternalAccountType.find(x=>x.data.id === externalaccounts.type.id);
						})
					}
				// });
				return externalaccounts
			},
		}
	}
</script>
<style>
</style>
