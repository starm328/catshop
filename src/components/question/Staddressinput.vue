<!--选择地址组件 -->
<template>
	<div class="st-input-address">
		<div style="width:100%;height:100%;position:relative"   @click="openBottomSheet">
			<input type="hidden" :name="String(formid)+'[type]'" value="address" style="display:none;">
			<input readonly :show-success-icon="false" v-model="addres" :name="String(formid)+'[value]'"  :show-error-icon="false"  type="hidden" style="display:none" value="address"/>
			<yd-input  readonly disabled   :placeholder="addres?String(addres): ''" :show-success-icon="false" :show-error-icon="false" style="position:absolute;top:0;right:0;"></yd-input>
		</div>
		<div :open="bottomSheet" :class="{product_bottomsheet:1,show: bottomSheet}">
			<div class="product_bottomsheet_bg" @click="closeBottomSheet"></div>
			<v-areas @close="closeBottomSheet" v-on:listen="getD"/>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import AddressAres from '@/components/address/AddressAreas';

import {Radio, RadioGroup} from 'vue-ydui/dist/lib.px/radio';

Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
import Data from '@/libs/Data';
	export default{
		components: {
			'v-areas' : AddressAres,
		},
		props:{
			id:Number,
			formid:Number,
		},
		data() {
			return {
				add:{},
				errors: {},
				addres:'选择地址',
				bottomSheet: false,
			}
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
			},
		}

	}
</script>
<style type="text/css">
.st-input-address{width: 100%;height: 100%}
/*弹出规格*/
.st-input-address .product_bottomsheet .address-areas{position:fixed;bottom:0;width:100%;transition: transform 200ms, visibility 200ms;background:#fff;z-index: 1000;max-width: 375px;height: 50%;overflow: auto;left:0;text-align: left}
.st-input-address .product_bottomsheet:not(.show) .address-areas{transform: translateY(100%);visibility:hidden;}

.st-input-address .product_bottomsheet  .product_bottomsheet_bg{position:fixed;bottom:0;width:100%;transition: opacity 200ms, visibility 200ms;height: 100%;background:rgba(000,000,000,0.5);max-width: 375px;z-index: 1000;left:0;}
.st-input-address .product_bottomsheet:not(.show) .product_bottomsheet_bg{opacity: 0;visibility:hidden;}
</style>
