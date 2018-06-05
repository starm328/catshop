<!-- 提现记录详情，显示提现账户组件 -->
<template>
	<!-- <p>{{id}}</p> -->
<div class="record_account" v-if="type">
	账户：{{type.data.label}}
	<mu-flexbox v-if="type.data">
		<mu-flexbox-item class="flex-demo" v-for="(external,i) in type.data.meta" :key="i" v-if="external" >
			<span>
				{{external.label}}： {{externalshow.detail[external.name]}}
			</span>
		</mu-flexbox-item>
	</mu-flexbox>
</div>
	<!-- <p class="weui-form-preview__value" v-if="type.data">{{type.data.label}}<br /><span v-for="(external,i) in type.data.meta" :key="i">{{external.label}}：{{externalshow.detail[external.name]}}</span></p> -->
</template>
<script>
import Vue from 'vue';
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import ExternalAccountTypes from '@/Services/ExternalAccountTypes';
export default {
	props:{
		id:Number
	},
	data(){
		return Data.createMap( {
			// 外部账户数据
			externalshow: {
				// 对应 Data 目录下的文件
				subject: 'ExternalAccount',
				// 对应其中的具体数据
				entity: 'externalshow',
				// 参数
				params: {
					token: Auth.then(x=>x.token),
					external_account_id:this.id
				},
				preprocessor:externalshow=>{
					return this.preprocessortwo(externalshow);
				},
			},
		},{
			type:''
		});
	},
	methods: {
		// 获取资金类型中，所显示的类型字段
		preprocessortwo(externalaccounts) {
			// externalaccounts.forEach(content=>{
					ExternalAccountTypes.then(ExternalAccountType=>{
						if(externalaccounts&&externalaccounts.type){
							this.type=ExternalAccountType.find(x=>x.data.id === externalaccounts.type.id);
						}
					})
			// });
			return externalaccounts
		},
	}
}
</script>
<style type="text/css">
.record_account{width: 100%;background: #fff;padding:10px;position: relative;color:#999;font-size:0.9em;}
.record_account .mu-flex-row {flex-wrap: wrap;}
.record_account .mu-flexbox .mu-flexbox-item {
	margin-left: 0!important;
	margin-top: 0!important;
}
.record_account .mu-flex-row .mu-flexbox-item{flex: 0 0 50% !important;}
</style>
