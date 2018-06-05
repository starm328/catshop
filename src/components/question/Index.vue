<!-- 问券列表组件 -->
<template>
	<div class="question-list st-warp">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button @click="$router.go(-1)" v-if="url !== '/'" slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
			<mu-icon-button @click="$router.replace('/')" v-else slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<div class="initialization on" v-if="attachs[0]&&attachs[0].loding === 'loding'">
			<div class="loader"></div>
		</div>
		<yd-list theme="4" slot="list" v-else-if="attachs.length > 0">
			<yd-list-item v-for="article in attachs" :key="article.id"  type="link" :href="{name: 'QuestionForm',params: {id: article.id}}">
					<img slot="img" :src="article.thumb">
					<p slot="title">{{article.name}}</p>
					<span slot="title">{{article.summary}}</span>
				</yd-list-item>
		</yd-list>
		<div v-else-if="attachs.length == 0" style="width:100%">
			<st-nodata content="暂无问卷" :icon="style"></st-nodata>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import copyright from '@/components/compact/Copyright';
import Data from '@/libs/Data';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
Vue.component(ListTheme.name, ListTheme);
Vue.component(ListItem.name, ListItem);
Vue.component(ListOther.name, ListOther);
export default {
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},
	data(){
		return this.createMap()
	},
	beforeRouteEnter(to, from, next){
		next(vm => {
		   vm.url = from.path;
		   console.log(from.path)
		   console.log( vm.url)
		})
	},
	watch:{
		$route(){
			this.createMap(this._data);
			 // z(this.$set(this._data, 'orders', this.createMap()))
		}
	},
	methods: {
		createMap(data = {}) {
			return Data.createMap( {
				attachs: {
					// 对应 Data 目录下的文件
					subject: 'Question',
					// 对应其中的具体数据
					entity: 'attach',
					// 参数
					params: {
						article:configs.Category.app
					},
					// preprocessor:refercode=>{
					// 	return this.preprocessor(refercode);

					// },
				},
			},{
				Auth: Auth.proxy,
				style:'icon-favor',
				url:null
			},data);

		},
	}
};
</script>
<style type="text/css">
	.question-list .yd-list-theme4 .yd-list-item .yd-list-title{    max-height: 68px;-webkit-line-clamp:2;}
	.question-list .yd-list-theme4 .yd-list-item .yd-list-title p{line-height: 30px}
	.question-list .yd-list-theme4 .yd-list-item .yd-list-title span{    font-weight: 400;color: #999;}
	.question-list  .yd-list-theme4 .yd-list-item .yd-list-img{width: 70px;padding: 34px 0}
</style>
