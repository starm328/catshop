<!--单选组件 -->
<template>
	<div >
		<input type="hidden" :name="String(formid)+'[type]'" value="sex" style="display:none;">
		<input type="hidden" :name="String(formid)+'[value]'" :value="radio" style="display:none;">
		<!-- <input type="hidden" :name="String(formid)" :value="radio"> -->
		<yd-radio-group   v-model="radio" color="#5e9fff">
		    <yd-radio val="男" >男</yd-radio>
		    <yd-radio val="女" >女</yd-radio>
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
		data() {
			return {
				radio:''
			}
		}
	}
</script>
<style type="text/css">
</style>
