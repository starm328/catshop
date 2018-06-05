<!-- 产品所有分类组件 -->
<template>
<div class="subcagetroy_item">
	<yd-flexbox>
		<yd-flexbox-item v-for="settag in settags" :key="settag.id" v-if="settag">
			<router-link :to="{name: 'ProductCategory', params: {id: settag.id,name:settag.name}}"><img :src="settag.main_picture['200x200']"></router-link>
			<p>{{settag.name}}</p>
		</yd-flexbox-item>
	</yd-flexbox>
</div>

</template>
<script>
import Vue from 'vue';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import {FlexBox, FlexBoxItem} from 'vue-ydui/dist/lib.px/flexbox';

Vue.component(FlexBox.name, FlexBox);
Vue.component(FlexBoxItem.name, FlexBoxItem);
export default{
	props:{
		subid:Number,
	},
	data(){
		return Data.createMap( {
			settags: {
				// 对应 Data 目录下的文件
				subject: 'Product',
				// 对应其中的具体数据
				entity: 'settags',
				// 参数
				params: {
					setName: this.subid,
				},
			},
		},{
			style:'icon-favor',
		});
	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},

}
</script>
<style type="text/css">

</style>
