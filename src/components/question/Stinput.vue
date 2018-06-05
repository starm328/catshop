<!-- 公用组件，表单Input组件 -->
<template>
	<div class="st-input">
		<yd-cell-group>
			<!-- 单选 -->
			<yd-cell-item v-if="form.type === 'option' || form.type === 'score_o'" >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<st-option :id="form.id" :formid="form.id" slot="right"></st-option>
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>


			<!-- 单选性別 -->
			<yd-cell-item v-else-if="form.type === 'sex'" >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<st-sexinput :id="form.id" :formid="form.id" slot="right"></st-sexinput>
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>

			<!-- 多选 -->
			<yd-cell-item arrow v-else-if="form.type === 'select' || form.type === 'score_s'" >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<st-select :id="form.id" :formid="form.id" slot="right" :question="form.question"></st-select>
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>

			<!-- 生日 -->
			<yd-cell-item arrow v-else-if="form.type === 'birth'" >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<input type="hidden" :name="String(form.id)+'[type]'" value="birth" slot="left">
				<span slot="left"><input type="hidden" :name="String(form.id)+'[value]'" v-model="data" readonly></span>
			 	<yd-datetime  type="date" v-model="data" slot="right" style="height:32px;line-height:32px;" placeholder="请选择日期" start-date='1900'></yd-datetime>
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>

			<!-- 日期 -->
			<yd-cell-item arrow v-else-if="form.type === 'date'" >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<input type="hidden" :name="String(form.id)+'[type]'" value="date" slot="left">
				<span slot="left"><input type="hidden" :name="String(form.id)+'[value]'" v-model="data" readonly></span>
			 	<yd-datetime  type="date" v-model="data" slot="right" style="height:32px;line-height:32px;" placeholder="请选择日期" start-date='1900'></yd-datetime>
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>

			<!-- 时间 -->
			<yd-cell-item arrow v-else-if="form.type === 'time'" >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<input type="hidden" :name="String(form.id)+'[type]'" value="time" slot="left">
				<span slot="left"><input type="hidden" :name="String(form.id)+'[value]'" v-model="data" readonly></span>
			 	<yd-datetime  type="time" v-model="data" slot="right" style="height:32px;line-height:32px;" placeholder="请选择日期" start-date='00:00'></yd-datetime>
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>


			<!-- 手机 -->
			<yd-cell-item v-else-if="form.type === 'phone'" >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<input type="hidden" :name="String(form.id)+'[type]'" value="phone" slot="right">
				<yd-input slot="right" required :placeholder="'请输入' +  form.question"  :name="String(form.id)+'[value]'"  :show-success-icon="false" :show-error-icon="false" type="tel" max='11' min="11"></yd-input >
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>

			<!-- 长文本 -->
			<div class="area" v-else-if="form.type === 'area'" >
				<h6>{{form.question}}<span v-if="form.is_need">*</span></h6>
				<yd-cell-item>
					<input type="hidden" :name="String(form.id)+'[type]'" value="area" slot="right">
					 <mu-text-field slot="right" hintText="不允许超过100个字符" :label="showError(form.id+'.value')" :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" multiLine :rows="3" :rowsMax="6" :maxLength="100" :name="String(form.id)+'[value]'"/><br/>
				</yd-cell-item>
			</div>

			<!-- 地址 -->
			<yd-cell-item arrow v-else-if="form.type === 'address'" >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<st-addressinput :id="form.id" :formid="form.id" slot="right" :question="form.question"></st-addressinput>
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>

			<!-- 图片上传 -->
			<yd-cell-item arrow v-else-if="form.type === 'image'" >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<st-imginput :id="form.id" :formid="form.id" slot="right" :question="form.question"></st-imginput>
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>

			<!-- id -->
			<yd-cell-item v-else-if="form.type === 'id'"  >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<input type="hidden" :name="String(form.id)+'[type]'" value="id" slot="right">
				<yd-input slot="right" required :placeholder="'请输入' +  form.question" :name="String(form.id)+'[value]'" :show-success-icon="false" :show-error-icon="false" type="tel" ></yd-input >
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>

			<!-- range -->
			<yd-cell-item v-else-if="form.type === 'range'"  >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<st-silder :displayValue="false" trakbg="#e54d41" fillbg="#f4c25a" v-model="value1" :name="String(form.id)"  slot="right"/>
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>

			<!-- 正常文本 -->
			<yd-cell-item v-else >
				<span slot="icon"></span>
				<span slot="left">{{form.question}}<em class="fg-red" v-if="form.is_need">*</em>：</span>
				<input type="hidden" :name="String(form.id)+'[type]'" value="text" slot="right">
				<yd-input slot="right" required :placeholder="'请输入' +  form.question" :name="String(form.id)+'[value]'" :show-success-icon="false" :show-error-icon="false" type="text" ></yd-input >
				<span slot="left" v-if="showError(form.id+'.value')" class="inputerror"><p v-html="showError(form.id+'.value')" ></p></span>
			</yd-cell-item>


		</yd-cell-group>


	</div>

</template>
<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
import {Input} from 'vue-ydui/dist/lib.px/input';
import Stselect from '@/components/question/Stselect';
import Stoption from '@/components/question/Stoption';
import StsexInput from '@/components/question/StsexInput';
import StimgInput from '@/components/question/StimgInput';
import StaddressInput from '@/components/question/StaddressInput';
import Silder from '@/components/question/silder/Index';
import {DateTime} from 'vue-ydui/dist/lib.px/datetime';
import {TextArea} from 'vue-ydui/dist/lib.px/textarea';

Vue.component(TextArea.name, TextArea);
Vue.component(DateTime.name, DateTime);
Vue.component(CellGroup.name, CellGroup);
Vue.component(Input.name, Input);
	export default{
		components:{
			'st-select': Stselect,
			'st-option': Stoption,
			'st-sexinput': StsexInput,
			'st-imginput': StimgInput,
			'st-addressinput': StaddressInput,
			'st-silder': Silder,
		},
		props:{
			form:Object,
			errors:Object
		},
		data() {
			return {
				data:'',
				input: '',
				inputErrorText: '',
				multiLineInput: '',
				multiLineInputErrorText: ''
			}
		},
		methods: {
			showError( field ){
				return (
					field in this.errors
					? this.errors[field][0]
					: undefined
				)
			},
			handleInputOverflow (isOverflow) {
			  this.inputErrorText = isOverflow ? '超过啦！！！！' : ''
			},
			handleMultiLineOverflow (isOverflow) {
			  this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
			}
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
.st-input .yd-cell-item:after {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.st-input .yd-cell-left{max-width: 50%;white-space: normal;}
.st-input select{direction: rtl}
.st-input .yd-cell-item{padding-bottom: 10px;}
.st-input .yd-cell-right .yd-datetime-input{display: block;text-align: right;}
.st-input .mu-text-field{width: 100%}
.st-input .mu-text-field-content hr{display: none}
.st-input .mu-text-field.multi-line .mu-text-field-hint{text-align: left;}
.st-input .yd-cell-box{margin-bottom: 0}
.st-input .mu-text-field-help{bottom:4px;}
.st-input .yd-cell-title{padding:10px;}
.st-input .yd-cell{z-index: 1}
.st-input .yd-cell-arrow .yd-input{right: 28px}
.st-input .inputerror p{margin-left:12px;}
.st-input .mu-text-field-label{color:red;}
.st-input .area h6{background-color: #f1f1f1;line-height: 40px;text-indent: 12px;font-weight: normal;}
.st-input .area h6 span{color: red}
</style>
