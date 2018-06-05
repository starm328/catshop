<!-- 产品所有分类组件 -->
<template>
<div class="category_item">

	<yd-flexbox>
		<yd-flexbox-item v-for="settag in settags" :key="settag.id" v-if="settag">
			<router-link :to="{name: 'ProductCategory', params: {id: settag.id,name:settag.name}}"><img :src="settag.main_picture['200x200']"></router-link>
			<p>{{settag.name}}</p>
		</yd-flexbox-item>
	</yd-flexbox>
	<div class="recommend" v-for="subset in subsets" :key="subset.id" v-if="subset">
		<div class="comment_title"><div class="Line"><div class="title">{{subset.label}}</div></div></div>
		<v-subitem :subid="subset.id" v-if="subset&&subset.id "   />
	</div>
</div>

</template>
<script>
import Vue from 'vue';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Subitem from '@/components/category/Subitem';
import {FlexBox, FlexBoxItem} from 'vue-ydui/dist/lib.px/flexbox';

Vue.component(FlexBox.name, FlexBox);
Vue.component(FlexBoxItem.name, FlexBoxItem);
export default{
	components : {
		'v-subitem': Subitem
	},
	props:{
		categoryid:Number,
		subid:Number
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
					setName: this.categoryid,
				},
			},
			subsets: {
				// 对应 Data 目录下的文件
				subject: 'Product',
				// 对应其中的具体数据
				entity: 'subsets',
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

	.category_item .yd-flexbox {-ms-flex-wrap: wrap;flex-wrap: wrap;}
	.category_item .noData-tip{padding-top: 0}
	.category_item  .recommend{
		width: 100%;
		position: relative;
		padding-top:10px;
		background: #fff;
		padding-bottom: 10px;
	}
	.category_item  .comment_title .Line {
		position: relative;
		width:90px;
		margin: 0 auto;
		text-align: center;
	}
	.category_item    .comment_title .Line:before {
		content: "";
		border-top: 2px solid #aaa;
		display: block;
		position: absolute;
		width: 10px;
		top: 50%;
		left: 0;
	}
	.category_item    .comment_title .Line:after {
		content: "";
		border-top: 2px solid #aaa;
		display: block;
		position: absolute;
		width: 10px;
		top: 50%;
		right: 0;
	}
	.category_item  .comment_title {
		position: relative;
	}
</style>
