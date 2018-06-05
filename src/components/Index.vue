<template>
	<div class="st-viewbox">
		<div class="index st-center">
			<st-header  title='首页' fixed>
				 <a class="back-white" slot='left' @click='$router.go(-1)'></a>
				 <a class="button" slot='right' @click="searchbtn"><i class="iconfont">&#xe64e;</i></a>
			</st-header>
			<div class="header_mar"></div><!--头部是绝对定位，给他加上一个相应的一个高度的盒子 -->
			<div class="header_search"><yd-search  fullpage  v-model="value1" :on-submit="submitHandler"></yd-search></div>
			<div class="swiper">

				<yd-slider autoplay="3000">
					<yd-slider-item v-for="picture in indexdata.bannerpicture.pictures" :key="picture.is_multiple" v-if="picture">
						<a href="">
							<img :src="picture['640x400']">
						</a>
					</yd-slider-item>

				</yd-slider>
			</div>
			<product-list v-for="tag in indexdata.tagged" :key="tag.id" :tag="tag" v-if="tag"/>
		</div>
		<v-search v-if="search" @close="searchclose"/>
		<yd-backtop></yd-backtop>
		<copyright></copyright>
		<p style="display:none;">{{share}}</p>
	</div>
</template>

<script>
import Vue from 'vue';
import configs from '@/configs/app';
import {BackTop} from 'vue-ydui/dist/lib.px/backtop';
import ProductList from '@/components/product/ProductList';
import Swiper from '@/components/swiper/Index';
import copyright from '@/components/compact/Copyright';
import Search from '@/components/product/Search';
import Data from '@/libs/Data';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.px/slider';
import Refercode from '@/Services/ReferCode';
import Auth from '@/Services/Auth';
import Sdk from '@/Services/Sdk';
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
Vue.component(BackTop.name, BackTop);
export default {
	name: 'index',
	metaInfo () {
		const title = this.$route.meta.title;
		return {
			title: title,
			meta: [{content: title }]
		}
	},
	components: {
		'product-list': ProductList,
		'swiper-banner': Swiper,
		'copyright': copyright,
		'v-search': Search,
	},
	beforeRouteEnter(to, from, next) {
	// 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
	// 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
	// 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
	// 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
		if(from.name=='ProductPage' || from.name == 'ProductCategory'){
			to.meta.isBack=true;
			//判断是从哪个路由过来的，
			//如果是详情过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
		}
		next();
	},
	activated() {
		if(!this.$route.meta.isBack || this.isFirstEnter){
			// 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
			// 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
			this.createMap();
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
	computed:{
		share(){
			if(!( this.indexdata.logo )) return null;
				Auth.then( Auth=> Auth.user? Refercode : Promise.reject()).then(Refercode=>{
					new Sdk().share({
						title: this.$route.meta.title, // 分享标题
						link: 'http://' + location.hostname + location.pathname + '?' + (Refercode ? 'relation='+ Refercode : '') +  location.hash, //  分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl:  this.indexdata.logo.picture && this.indexdata.logo.picture['200x200'] ? this.indexdata.logo.picture['200x200'] : '', // 分享图标
						desc: '',
					})
				}).catch(e=>{});
	　　　　return this.indexdata.logo
	　　}

	},
	data(){
		return {
			bottomNav: 'index',
			bottomNavColor: 'index',
			refercode:'',
			scroll: localStorage.getItem(this.$route.name),
			search:false,
			value1:'',
			indexdata:'',
			isFirstEnter:false
		}
	},
	methods:{
		createMap(){
			return this.indexdata = Data.createMap( {
				tagged: {
					subject: 'Product',
					entity: 'setTags',
					params: {
						setName:'index' ,
					},
				},
				bannerpicture: {
					subject: 'CompanyPicture',
					entity: 'pciture',
					params: {
						pictureRole:'carousel' ,
					},
				},
				logo: {
					subject: 'CompanyPicture',
					entity: 'pciture',
					params: {
						pictureRole:'logo' ,
					},
				},
			},{

			});
		},
		searchbtn(){
			this.search = true
		},
		searchclose(){
			this.search = false
		},
		submitHandler(value) {
			this.$router.push({name:'Searchlist' ,params: {keyWords: value}})
		},

	}
};
</script>
<style type="text/css">
.index .swiper img{vertical-align: bottom}
</style>
