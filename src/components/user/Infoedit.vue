<!-- 修改个人资料组件 -->
<template>
<div class="st-viewbox">
	<div class="user-infoedit">
		<st-header  :title=' "编辑" + $route.meta.title' fixed>
			<mu-icon-button  @click="close"  slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>

		<div class="header_mar"></div>
		<a class="button addressclose" @click="close"><i class="st-icon icon-close"></i></a>
		<div class="st-lay st-cell-item">
			<form ref="formdata">
				<yd-cell-group>
					<yd-cell-item  v-for="(value,i) in infos" :key="value.id">
						<span slot="left"> {{value.label}}:<em v-if="!!value.required" class="fg-red">*</em></span>
						<span slot="right">
							<input slot="right" type="text" v-model="infokey[value.id]"  :name="value.id" :placeholder="'请输入'+value.label" :required="!!value.required" :disabled="!value.editable">
						</span>
					</yd-cell-item >
				</yd-cell-group>
			</form>
		</div>
		<tips :contents.sync="tips"  :timeout="1000"></tips>
		<mu-raised-button label="保存" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" @click="edit"/>
	</div>
</div>
</template>

<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Infoedit from '@/components/user/Infoedit';
import Tips from '@/components/Tips';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog';
import {Popup} from 'vue-ydui/dist/lib.px/popup';

Vue.component(Popup.name, Popup);
export default {
	components: {
		'info-edit':Infoedit,
		'tips': Tips,
	},
	props:{
		infoedit:Array,
		infokey:Object,
	},
	data() {
		return{
			infos:Object.assign({},this.infoedit),
			editing: false,
			Auth: Auth.proxy,
			tips: '',
		}
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

	methods:{
		close() {
			this.$emit('close');
		},
		edit(){
			this.$dialog.loading.open('提交中');
			if(this.$refs.formdata.checkValidity() == true ){
				Auth.then( auth=> {
					Ajaxy.patch( `${configs.catShop.apiBaseUrl}user-info/infos`,this.infokey, {token:auth.token,})
							.when( 200, response=> {
								this.$dialog.loading.close();
								this.close();
								Object.assign(this.infoedit,this.infos);
							} )
					;
				})
			}else{
				this.tips = '请完善个人信息'
			}
		},
	}

};
</script>

<style type="text/css">
.user-infoedit input{text-align: right !important;}
.user-infoedit .yd-popup{z-index: 99999}
.user-infoedit .st-cell-item .yd-cell-item{padding: 0 20px;}
</style>
