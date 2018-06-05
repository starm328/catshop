<!-- 多选组件 -->
<template>
	<div class="st-select st_mu-checkbox ">
		<div @click="show4 = true" style="width:100%;height:100%;right:28px;line-height:50px;position:absolute;top:0">{{String(statusIn) ?String(statusIn) :  '请选择' + question}}</div>
		<input type="hidden" :name="String(formid)+'[type]'" value="select" style="display:none;">
		<yd-input required :show-success-icon="false" :show-error-icon="false" type="text" :name="String(formid)+'[value]'" readonly :placeholder="'请选择' + question " :value="String(statusIn)" style="display:none;"></yd-input >
		<yd-popup v-model="show4" position="right" width="50%">
			<div class="select-btn"><mu-checkbox v-model="statusIn" :label="String(selector.select_content)" :nativeValue="String(selector.select_content)"  class="demo-checkbox"  v-for="(selector,i) in selectors" :key="i"/></div>
			<mu-raised-button label="确定" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E"  @click="show4= false"/>
		</yd-popup>
	</div>
</template>
<script>
import Vue from 'vue';
import {Input} from 'vue-ydui/dist/lib.px/input';
Vue.component(Input.name, Input);
import {Popup} from 'vue-ydui/dist/lib.px/popup';

Vue.component(Popup.name, Popup);
import Data from '@/libs/Data';
	export default{
		props:{
			id:Number,
			formid:Number,
			question:String
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
				show4:false,
				statusIn:[]
			});
		},

	}
</script>
<style type="text/css">
.st-select .mu-checkbox-icon{margin:0;}
.st-select  button.st-fixed{left:0;margin:0;}
.st-select .select-btn {text-align: left;padding:10px;}
</style>
