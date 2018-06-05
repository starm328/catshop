<!-- 产品所有分类组件 -->
<template>
<div class="st-viewbox">
	<div class="category_index">
		<st-header  :title='$route.meta.title' fixed>
		</st-header>
		<div class="header_mar"></div>
		<div v-show="subset.length === 0 && settags.length === 0" style="width:100%">
			<st-nodata content="暂无分类" :icon="style"></st-nodata>
		</div>
		<div class="ct-tabview" v-show="subset.length > 0 || settags.length > 0">
			<yd-scrolltab  :callback="activecal">
				<yd-scrolltab-panel label="为你推荐">
					<div v-if="active == -1">
							<yd-flexbox>
								<yd-flexbox-item v-for="settag in settags" :key="settag.id" v-if="settag">
									<router-link :to="{name: 'ProductCategory', params: {id: settag.id,name:settag.name}}"><img :src="settag.main_picture['200x200']"></router-link>
									<p>{{settag.name}}</p>
								</yd-flexbox-item>
							</yd-flexbox>
					</div>
				</yd-scrolltab-panel>
				<yd-scrolltab-panel :label="sub.label"  v-for="(sub,i) in subset" :key="sub.id" v-if="sub">
					<div v-if="active == 1">
						<img :src="sub.main_picture['300x100']" class="sub-img" v-if="sub.main_picture['300x100']">
						<v-categoryitem :categoryid="sub.id" v-if="sub&&sub.id " :subid="sub.id"  />
					</div>
				</yd-scrolltab-panel>
			</yd-scrolltab>
		</div>
	</div>
</div>

</template>
<script>
import Vue from 'vue';
import {ScrollTab, ScrollTabPanel} from 'vue-ydui/dist/lib.px/scrolltab';

Vue.component(ScrollTab.name, ScrollTab);
Vue.component(ScrollTabPanel.name, ScrollTabPanel);
import Categoryitem from '@/components/category/Categoryitem';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Refercode from '@/Services/ReferCode';
import Sdk from '@/Services/Sdk';
export default{
	components : {
		'v-categoryitem': Categoryitem
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
					setName: 'main'
				},
			},
			subset: {
				// 对应 Data 目录下的文件
				subject: 'Product',
				// 对应其中的具体数据
				entity: 'subsets',
				// 参数
				params: {
					setName: 'main',
				},
			},

		},{
			tags:'',
			style:'icon-favor',
			active:-1
		});
	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},
	methods:{
		activecal(i) {
			this.active  = i-1
		}
	}

}
</script>
<style type="text/css">
	.category_index .ct-tabview .yd-scrolltab .yd-scrolltab-item:nth-child(2){display: none;}
	/*.category_index .ct-tabview .yd-scrolltab .yd-scrolltab-item:nth-child(1).yd-scrolltab-active +.yd-scrolltab-item{    background-color: #fff;}*/
	.category_index .ct-tabview .yd-scrolltab{top:45px;bottom:55px;}
	.category_index .yd-scrolltab-content-item{margin-top: 10px;}
	.category_index .yd-scrolltab-content-title{display: none;}
	.category_index .sub-img{width: 100%;}
	.mkd_ui.wx .category_index  .yd-scrolltab{top:0;}
	.category_index p{text-align: center;line-height: 20px;overflow: hidden;height: 20px;font-size:12px;}
	.category_index .yd-flexbox{flex-wrap: wrap;}
	.category_index .yd-flexbox-item img{width:60px;height:60px;display: block;margin:5px auto;border-radius: 5px;}
	.category_index .yd-flexbox-item {-webkit-box-flex: 0;flex: 0 0 33%;}
</style>
