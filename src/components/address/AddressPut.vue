<!-- 地址组件，编辑地址组件 -->
<template>
	<div class="address-put select-add">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="close" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<a class="button addressclose"   @click="close" ><i class="st-icon icon-close"></i></a>
		<div class="address-center st-cell-item">
			<yd-cell-item>
				<span slot="left">收货人 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('consignee')" disabled></p></span>
				<yd-input slot="right" required v-model="add.consignee" placeholder="请输入收货人"  :show-success-icon="false" :show-error-icon="false" type="text"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">联系电话 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('phone')" disabled></p></span>
				<yd-input slot="right" required v-model="add.phone" placeholder="请输入联系电话"  :show-success-icon="false" :show-error-icon="false" type="tel"></yd-input>
			</yd-cell-item>
			<yd-cell-item >
				<span slot="left">选择地址 <em class="fg-red">*</em>：</span>
				<span slot="left" class="inputerror"><p v-html="showError('area_id')"></p></span>
				<div  slot="right" style="width:100%;height:100%;position:relative"   @click="openBottomSheet">
					<input readonly v-model="add.area_id" :show-success-icon="false" :show-error-icon="false"  type="hidden" style="display:none"/>
					<yd-input  readonly disabled :placeholder="add.area.long_label"  :show-success-icon="false" :show-error-icon="false" style="position:absolute;top:0;right:0;" v-if="add.area !==null"></yd-input>
					<yd-input  readonly disabled :placeholder="String(addres)" :show-success-icon="false" :show-error-icon="false" style="position:absolute;top:0;right:0;" v-else></yd-input>
				</div>


			</yd-cell-item>

			<yd-cell-item>
			    <yd-textarea slot="right" placeholder="详细地址"  v-model="add.address"  maxlength="100"></yd-textarea>
			    <span slot="left" class="inputerror"><p v-html="showError('address')" disabled></p></span>
			</yd-cell-item>

			<!-- <mu-checkbox label="设为默认地址" v-model="add.is_current" nativeValue="1" labelLeft/> -->
		</div>
		<mu-raised-button label="保存" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" @click="submit"/>
		<div :open="bottomSheet" :class="{product_bottomsheet:1,show: bottomSheet}">
			<div class="product_bottomsheet_bg" @click="closeBottomSheet"></div>
			<v-areas @close="closeBottomSheet" v-on:listen="getD"/>
		</div>
	</div>
</template>
<script>
import AddressAres from '@/components/address/AddressAreas';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
	export default{
		name: 'addressadd',
		data() {
			return {
				add:Object.assign({},this.address),
				errors: {},
				inputErrorText: '',
				multiLineInputErrorText: '',
				show2: false,
				addres:'选择地址',
				bottomSheet: false,

			}
		},
		metaInfo () {
		    const title = this.$route.meta.title;
		    return {
		        title: title,
		        meta: [{content: title }]
		    }
		},
		components: {
			'v-areas' : AddressAres
		},
		props: {
			address : Object,

		},
		methods: {
			closeBottomSheet () {
				this.bottomSheet = false;
			},
			openBottomSheet ( action ) {
				this.bottomSheet = true;
			},
			getD:function(data,input){
				this.add.area_id = data;
				this.addres = input;
				this.add.area.long_label = input
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
					Ajaxy.put( `${configs.catShop.apiBaseUrl}addresses/${this.add.id}`, this.add, { token: auth.token, } )
						.when( 200, response=> {
							this.errors= {};
							this.$dialog.loading.close();
							this.response = response.json;
							Object.assign(this.address,this.add);
							this.$emit('close');

						})
						.when(409, response=> {
							this.$dialog.loading.close();
							this.errors= {};
							this.response = response.json;
							this.$emit('close');

						})
						.when( 422, response=> {this.$dialog.loading.close();this.errors= response.json.errors})
						.when( 401, response=> {this.$dialog.loading.close();Auth.refreshToken().then( ()=>this.submit() ) })
					;
				} );
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
	.address-put .address-center{background:#fff;width: 100%;margin:0 auto;max-width: 375px;}
	/*弹出规格*/
	.address-put .product_bottomsheet .address-areas{position:fixed;bottom:0;width:100%;transition: transform 200ms, visibility 200ms;background:#fff;z-index: 1000;max-width: 375px;height: 50%;overflow: auto}
	.address-put .product_bottomsheet:not(.show) .address-areas{transform: translateY(100%);visibility:hidden;}

	.address-put .product_bottomsheet  .product_bottomsheet_bg{position:fixed;bottom:0;width:100%;transition: opacity 200ms, visibility 200ms;height: 100%;background:rgba(000,000,000,0.5);max-width: 375px;z-index: 1000}
	.address-put .product_bottomsheet:not(.show) .product_bottomsheet_bg{opacity: 0;visibility:hidden;}
</style>
