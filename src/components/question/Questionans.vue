<!--问券表单提交 -->
<template>
<div class="st-viewbox">
	<div class="answer-main">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button @click="$router.go(-1)" v-if="url !== '/'" slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
			<mu-icon-button @click="$router.replace('/')" v-else slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<!-- <v-loged :needUser="true"> -->
			<div class="answer-list">
				<div class="answer-warp">
					<div class="answer-title ">统计分数：<span>{{answer.score}}</span></div>
					<div class="answer-content"><span>结果：</span>{{answer.content}}</div>
				</div>
			</div>
		<!-- </v-loged> -->
	</div>
</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
import configs from '@/configs/app';
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
	export default{
		components: {
			'v-loged': Loged,
		},
		beforeRouteEnter(to, from, next){
			next(vm => {
			   vm.url = from.path;
			   console.log(from.path)
			   console.log( vm.url)
			})
		},
		metaInfo () {
			const title = this.$route.meta.title;
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		data () {
			return Data.createMap( {
				// 资金类型下，所对顶的表单字段数据
				answer: {
					// 对应 Data 目录下的文件
					subject: 'QustionAnswers',
					// 对应其中的具体数据
					entity: 'answer',
					// 参数
					params: {
						apply:configs.Question.extensionApp,
						attach:this.$route.params.id,

					},

				},
			},{
				url:null
			});
		},

	}
</script>
<style>
	.answer-main .answer-list .answer-warp{background-color: #fff;margin:0 20px;border-radius: 10px;width: calc(100% - 40px)}
	.answer-main .answer-list{    display: flex;display: -webkit-flex;align-items: center;height: 100vh;}
	.answer-main .answer-list .answer-title{text-align: center;line-height: 45px;border-bottom: 1px solid #f1f1f1;}
	.answer-main .answer-list .answer-title span{font-size:20px;color:red;}
	.answer-main .answer-list .answer-content{padding:20px;line-height: 25px;}
	.answer-main .answer-list .answer-content span{color: #999}
</style>
