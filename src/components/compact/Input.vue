<!-- 公用组件，表单Input组件 -->
<template>
	<st-cellitem >
		<span slot="icon"></span>
		<span slot="left">{{form.label}}<em class="fg-red" v-if="form.required">*</em>：</span>
		<yd-input slot="right" required :placeholder="'请输入'+form.label" :show-success-icon="false" :show-error-icon="false" type="text" v-model="form.value" :name="form.name" v-if="form.type === 'string'"></yd-input>
		<yd-input slot="right" required :placeholder="'请输入'+form.label" :show-success-icon="false" :show-error-icon="false" type="text" v-model="form.value" regex="bankcard" :name="form.name" v-if="form.type === 'bankcard'"></yd-input>
		<yd-input slot="right" required :placeholder="'请输入'+form.label" :show-success-icon="false" :show-error-icon="false" type="tel" v-model="form.value" :name="form.name" v-if="form.type === 'tel'"></yd-input >
		<span slot="error" v-if="showError(form.name)"><p v-html="showError(form.name)" class="inputerror"></p></span>
	</st-cellitem>
	<!-- <st-cellitem v-else>
		<span slot="icon"></span>
		<span slot="left">{{form.label}}<em class="fg-red" v-if="form.required">*</em>：</span>
		<yd-input slot="right" required :placeholder="externalshow.detail[form.name]" :show-success-icon="false" :show-error-icon="false" type="text" v-model="form.value" :name="form.name" v-if="form.type === 'string'"></yd-input>
		<yd-input slot="right" required :placeholder="externalshow.detail[form.name]" :show-success-icon="false" :show-error-icon="false" type="text" v-model="form.value" regex="bankcard" :name="form.name" v-if="form.type === 'bankcard'"></yd-input>
		<yd-input slot="right" required :placeholder="externalshow.detail[form.name]" :show-success-icon="false" :show-error-icon="false" type="tel" v-model="form.value" :name="form.name" v-if="form.type === 'tel'"></yd-input >
		<span slot="error" v-if="showError(form.name)"><p v-html="showError(form.name)" class="inputerror"></p></span>
	</st-cellitem> -->
</template>
<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
import {Input} from 'vue-ydui/dist/lib.px/input';
Vue.component(CellGroup.name, CellGroup);
Vue.component(Input.name, Input);
	export default{
		props:{
			form:Object,
			errors:Object
		},
		methods: {
			showError( field ){
				return (
					field in this.errors
					? this.errors[field][0]
					: undefined
				)
			},
		},
		// data() {
		// 	return Data.createMap( {
		// 		externalshow: {
		// 			// 对应 Data 目录下的文件
		// 			subject: 'ExternalAccount',
		// 			// 对应其中的具体数据
		// 			entity: 'externalshow',
		// 			// 参数
		// 			params: {
		// 				token: Auth.then(x=>x.token),
		// 				external_account_id:this.$route.params.id
		// 			},
		// 		},
		// 	},{
		// 	});
		// }
	}
</script>
<style type="text/css">
.st-form{background: #fff;}
</style>
