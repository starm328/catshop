<!-- 地址组件，地址新增组件 -->
<template>
<div class="st-viewbox">
	<div class="address-add select-add">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button @click="gotuback" slot="left">
						<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<v-loged :needUser="true">
				<a class="button addressclose"  @click="gotuback"><i class="st-icon icon-close"></i></a>
				<div class="address-center st-cell-item">
					<yd-cell-item>
						<span slot="left">收货人 <em class="fg-red">*</em>：</span>
						<span slot="left" class="inputerror"><p v-html="showError('consignee')"></p></span>
						<yd-input slot="right" required v-model="add.consignee" placeholder="请输入收货人"  :show-success-icon="false" :show-error-icon="false"></yd-input>
					</yd-cell-item>
					<yd-cell-item>
						<span slot="left">联系电话 <em class="fg-red">*</em>：</span>
						<span slot="left" class="inputerror"><p v-html="showError('phone')"></p></span>
						<yd-input slot="right" required v-model="add.phone" placeholder="请输入联系电话"  :show-success-icon="false" :show-error-icon="false" type="tel"></yd-input>
					</yd-cell-item>
					<yd-cell-item >
						<span slot="left">选择地址 <em class="fg-red">*</em>：</span>
						<span slot="left" class="inputerror"><p v-html="showError('area_id')"></p></span>
						<div  slot="right" style="width:100%;height:100%;position:relative"   @click="openBottomSheet">
							<input readonly v-model="add.area_id" :show-success-icon="false" :show-error-icon="false"  type="hidden" style="display:none"/>
							<yd-input  readonly disabled :placeholder="String(addres)"  :show-success-icon="false" :show-error-icon="false" style="position:absolute;top:0;right:0;"></yd-input>
						</div>

					</yd-cell-item>

					<yd-cell-item>
					    <yd-textarea slot="right" placeholder="详细地址"  v-model="add.address"  maxlength="100"></yd-textarea>
					    <span slot="left" class="inputerror"><p v-html="showError('address')"></p></span>
					</yd-cell-item>
					<!-- <mu-checkbox label="设为默认地址" v-model="add.is_current" nativeValue="1" labelLeft/> -->
					<mu-switch label="设为默认地址" labelLeft class="demo-switch" @change="switchIsCurrent" :value="!!add.is_current" fullWidth/>
				</div>
				<mu-raised-button label="保存" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" @click="submit"/>
				<div :open="bottomSheet" :class="{product_bottomsheet:1,show: bottomSheet}">
					<div class="product_bottomsheet_bg" @click="closeBottomSheet"></div>
					<v-areas @close="closeBottomSheet" v-on:listen="getD"/>
				</div>
		</v-loged>
	</div>
</div>
</template>
<script>
import Vue from 'vue';
import AddressAres from '@/components/address/AddressAreas';
import Loged from '@/components/compact/Loged';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import {Input} from 'vue-ydui/dist/lib.px/input';
import {TextArea} from 'vue-ydui/dist/lib.px/textarea';

Vue.component(TextArea.name, TextArea);
Vue.component(Input.name, Input);
	export default{
		name: 'addressadd',
		data() {
			return {
				add: {
					consignee: '',
					phone: '',
					area_id: '',
					address: '',
					is_current: 1,
				},
				show2: false,
				errors: {},
				inputErrorText: '',
				multiLineInputErrorText: '',
				addres:'选择地址',
				bottomSheet: false,

			}
		},
		components: {
			'v-areas' : AddressAres,
			'v-loged': Loged,
		},

		methods: {
			closeBottomSheet () {
				this.bottomSheet = false;
			},
			openBottomSheet ( action ) {
				this.bottomSheet = true;
			},
			gotuback(){
				this.$router.replace({name:'AddressSelect', params:{selname:this.$route.params.selname,id:this.$route.params.product_id,quantity:this.$route.params.quantity,checkId:this.$route.params.checkId}});
			},
			getD:function(data,input){
				this.add.area_id = data;
				this.addres = input;
			},

			showError( field ){
				return (
					field in this.errors
					? this.errors[field][0]
					: undefined
				)
			},
			submit(){
				this.$dialog.loading.open('提交中');
				Auth.then( auth=> {
					Ajaxy.post( `${configs.catShop.apiBaseUrl}addresses`, this.add, { token: auth.token, } )
						.when( 200, response=> {
							this.errors= {};
							this.$dialog.loading.close();
							this.response = response.json;
							// if(this.$route.params.product_id){
								this.$router.replace({name:'AddressSelect', params:{selname:this.$route.params.selname,id:this.$route.params.product_id,quantity:this.$route.params.quantity,checkId:this.$route.params.checkId}});
							// }else{
								// this.$router.go(-1);
							// }
						})
						.when(409, response=> {
							this.errors= {};
							this.response = response.json;
							this.$dialog.loading.close();
							this.$emit('close');

						})
						.when( 422, response=>{this.$dialog.loading.close(); this.errors= response.json.errors })
						.when( 401, response=> {this.$dialog.loading.close();Auth.refreshToken().then( ()=>this.submit() ) })
					;
				} );
			},
			switchIsCurrent(current) {
				this.add.is_current = +current;
			},
			handleInputOverflow (isOverflow) {
			  this.inputErrorText = isOverflow ? '超过啦！！！！' : ''
			},
			handleMultiLineOverflow (isOverflow) {
			  this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
			},
			close() {
				this.$emit('close');
			},
			Areasclose() {
				this.show2 = false;
			}
		}
	}
</script>
<style type="text/css">
	.address-add{width: 100%}
	.address-add .address-center{background:#fff;width: 100%;padding:0 10px;padding-top:45px;    max-width: 375px;padding-bottom: 10px;}
	.address-add .fullHeight{height: 50px;}
	.address-add .mu-text-field-line.disabled{border-bottom:1px solid rgba(0,0,0,.12) !important;}
	.address-add .yd-textarea-counter{margin-bottom: 5px;}
	.address-add .mu-switch{padding-top: 10px;}
	/*弹出规格*/
	.address-add .product_bottomsheet .address-areas{position:fixed;bottom:0;width:100%;transition: transform 200ms, visibility 200ms;background:#fff;z-index: 1000;max-width: 375px;height: 50%;overflow: auto}
	.address-add .product_bottomsheet:not(.show) .address-areas{transform: translateY(100%);visibility:hidden;}

	.address-add .product_bottomsheet  .product_bottomsheet_bg{position:fixed;bottom:0;width:100%;transition: opacity 200ms, visibility 200ms;height: 100%;background:rgba(000,000,000,0.5);max-width: 375px;z-index: 1000}
	.address-add .product_bottomsheet:not(.show) .product_bottomsheet_bg{opacity: 0;visibility:hidden;}
</style>
