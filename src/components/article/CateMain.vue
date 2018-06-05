<!-- 文章子分类组件 -->
<template>
	<div class="article-main" style="margin-top:5px;">
		<div class="about-nav" v-if="subcategory.subcategory[0]">
			<yd-flexbox>
				<yd-flexbox-item v-for="sub in subcategory.subcategory" :key="sub.id"><router-link :to="{name: 'ArticleList',params: {id: sub.id,name: sub.name}}"><img :src="sub.icon"><p>{{sub.name}}</p></router-link></yd-flexbox-item>
			</yd-flexbox>
		</div>

	</div>

</template>
<script>
import Vue from 'vue';
import copyright from '@/components/compact/Copyright';
import Data from '@/libs/Data';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Refercode from '@/Services/ReferCode';
import Sdk from '@/Services/Sdk';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.px/slider';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
import {FlexBox, FlexBoxItem} from 'vue-ydui/dist/lib.px/flexbox';
Vue.component(FlexBox.name, FlexBox);
Vue.component(FlexBoxItem.name, FlexBoxItem);
Vue.component(ListTheme.name, ListTheme);
Vue.component(ListItem.name, ListItem);
Vue.component(ListOther.name, ListOther);
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
export default {
	components: {
		'copyright': copyright,
	},
	props:{
		cate:Number
	},
	data(){
		return {
			subcategory:''
		}
	},
	activated() {
		if(!this.$route.meta.isBack || this.isFirstEnter){
			// 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
			// 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
			this.createMap();
			// this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
		}
		// 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
		this.$route.meta.isBack=false;
		this.isFirstEnter=false;
	},
	created() {
		this.createMap();
		this.isFirstEnter=true;
	  // 只有第一次进入或者刷新页面后才会执行此钩子函数
	  // 使用keep-alive后（2+次）进入不会再执行此钩子函数
	},
	watch:{
		$route(){
			this.routeMap()
		}
	},
	methods: {
		routeMap() {
			if(this.$route.meta.isBack == false){
				this.createMap();
			}
		},
		createMap() {
			return this.subcategory = Data.createMap( {
				subcategory: {
					// 对应 Data 目录下的文件
					subject: 'Article',
					// 对应其中的具体数据
					entity: 'subcategory',
					// 参数
					params: {
						category: this.cate
					},
				},
			},{
				Auth: Auth.proxy,
			});

		},

	},
};
</script>
<style type="text/css">

.article-main .about-list{margin-top: 5px}
.article-main .yd-slider-item{text-align: center;}
.article-main .yd-slider-pagination>.yd-slider-pagination-item{width: 4px;height:4px;border-radius: 50%;background:#fff;box-shadow: 0 0px 2px #ccc;}
.article-main .yd-list-mes{position: relative;}
.article-main .yd-list-other{position: absolute;width: 90%;bottom:0;}
.article-main .about-nav{text-align: center;line-height:22px;padding:10px 0;}
.article-main .about-nav a{color: #666}
.article-main .about-nav img{width:50px;margin-top: 8px;}

.article-main .yd-list-title span{font-weight: normal;color: #999;}
.article-main .yd-flexbox{    flex-wrap: wrap;}
.article-main .yd-flexbox-item{flex: 0 0 25%}


.article-main .mu-tabs{background:#fff;}
.article-main .mu-tab-link{color:#000;}
.article-main .mu-tab-link{color:#000;}
.article-main .mu-tab-active .mu-tab-text{color:#f00 ;}
.article-main .ordr_list_main{margin-top: 55px;}

</style>
