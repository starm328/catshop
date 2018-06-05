<!--单选组件 -->
<template>
	<div  v-if="selectors.length > 2" style="width:100%">
		<input type="hidden" :name="String(formid)+'[type]'" value="option" style="display:none;">
		<select :name="String(formid)+'[value]'" style="width:100%">
			<option :value="selector.select_content" v-for="(selector,i) in selectors" :key="i">{{selector.select_content}}</option>
		</select>
	</div>

	<!-- <select :name="String(formid)"  v-else>
		<option :value="selector.select_content" v-for="(selector,i) in selectors" :key="i">{{selector.select_content}}</option>
	</select> -->
	<div v-else >
		<input type="hidden" :name="String(formid)+'[type]'" value="option" style="display:none;">
		<input type="hidden" :name="String(formid)+'[value]'" :value="radio" style="display:none;">
		<yd-radio-group   v-model="radio" color="#5e9fff">
		    <yd-radio :val="selector.select_content" v-for="(selector,i) in selectors" :key="i">{{selector.select_content}}</yd-radio>
		</yd-radio-group>
	</div>
</template>
<script>
import Vue from 'vue';
import {Radio, RadioGroup} from 'vue-ydui/dist/lib.px/radio';

Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
import Data from '@/libs/Data';
	export default{
		props:{
			id:Number,
			formid:Number,
		},
		data () {
			return Data.createMap( {
				// 资金类型下，所对顶的表单字段数据
				selectors: {
					// 对应 Data 目录下的文件
					subject: 'Question',
					// 对应其中的具体数据
					entity: 'selector',
					// 参数
					params: {
						question: this.id
					},

				},
			},{
				errors: {},
				radio:''
			});
		},

	}
</script>
<style type="text/css">
</style>
