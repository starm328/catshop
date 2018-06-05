<!--问券表单提交 -->
<template>
<div class="st-viewbox">
	<div class="question-form">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button @click="$router.go(-1)" v-if="url !== '/'" slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
			<mu-icon-button @click="$router.replace('/')" v-else slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<!-- <v-loged :needUser="true"> -->
			<div style="display:none">{{share}}</div>
			<div class="content-desc" v-html="content.desc"></div>


			<div class="initialization on" v-if="question[0]&&question[0].loding === 'loding'">
				<div class="loader"></div>
			</div>
			<!-- 录入表单组件 -->
			<!-- <st-form :form="accountform.meta"/> -->

			<form ref="form" class="st-form" v-else-if="question.length > 0">
				<div class="recommend">
					<div class="comment_title"><div class="Line"><div class="title">填写表单</div></div></div>
				</div>
					<st-input  :errors="errors" v-for="(form,i) in question" :key="i" v-if="question" :form="form"/>
					<div class="st-button-pd" style="margin-top:10px;">
						<mu-raised-button label="提交" class="demo-raised-button fullHeight st-auxi-bgcolor" primary fullWidth  @click="submit"/>
					</div>
			</form>
		<div v-else-if="question.length == 0" style="width:100%">
			<st-nodata content="暂无问题" :icon="style"></st-nodata>
		</div>
			<div class="bottom_mar"></div>
		<!-- </v-loged> -->
	</div>
</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import StInput from '@/components/question/Stinput';
import Loged from '@/components/compact/Loged';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
import {Input} from 'vue-ydui/dist/lib.px/input';
import Refercode from '@/Services/ReferCode';
import Sdk from '@/Services/Sdk';
Vue.component(CellGroup.name, CellGroup);
Vue.component(Input.name, Input);
	export default{
		components: {
			'v-loged': Loged,
			'st-input':StInput,
		},
		beforeRouteEnter(to, from, next){
			next(vm => {
			   vm.url = from.path;
			   console.log(from.path)
			   console.log( vm.url)
			})
		},
		computed:{
			share(){
				if(!( this.logo )) return null;
				new Sdk().share({
					title: this.$route.meta.title, // 分享标题
					link: 'http://' + location.hostname + location.pathname + '?' +  location.hash, //  分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl:  this.logo.picture && this.logo.picture['200x200'] ? this.logo.picture['200x200'] : '', // 分享图标
					desc: '',
				})
		　　　　return this.logo
		　　}

		},
		metaInfo () {
			const title = this.content.name;
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		data () {
			return Data.createMap( {
				// 资金类型下，所对顶的表单字段数据
				question: {
					// 对应 Data 目录下的文件
					subject: 'Question',
					// 对应其中的具体数据
					entity: 'question',
					// 参数
					params: {
						attach: this.$route.params.id,
					},

				},
				content: {
					// 对应 Data 目录下的文件
					subject: 'Question',
					// 对应其中的具体数据
					entity: 'content',
					// 参数
					params: {
						attach: this.$route.params.id,
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
				errors: {},
				style:'icon-favor',
				url:null
			});
		},
		methods: {
			submit() {



				var o = {};
				var elem =this.$refs.form;
				z()
				var fd = new FormData(elem);
				z(fd)
				// Array.from(elem).filter(x=>{
				// 	var txt = document.getElementsByName(x.name);
				// 	if(txt[0]){
				// 		o[txt[0].name] = {value : txt[1].value? txt[1].value: ' ',type : txt[0].value}
				// 	}

				// })
				// Array.from(elem).filter(x=>x.name).map(x=>{
				// 	x.value? o[x.name] = {value : x.value,type : x.type} : ''
				// })
				// Array.from(elem).filter(x=>z(x.name)).map(x=>o[x.name]=x.type)
				// Array.from(this.question).filter(x=>z(x.id))
				// z(elem.filter(x=>x.name))
				z(o)
				this.$dialog.loading.open('提交中');
					Ajaxy.POST( configs.Question.apiBaseUrl+`api/answer`,fd)
						.when( 200, response=> {
							this.$dialog.loading.close();
							this.$dialog.toast({
								mes: '提交成功',
								timeout: 1500,
								icon: 'success'
							});
							// this.$router.replace({name:'Questionans', params:{id:this.$route.params.id}});
							return response.json

						})
						.when( 405, response=> {
							this.$dialog.loading.close();
							this.$dialog.toast({
								mes: '呀！出错了！',
								timeout: 1500,
								icon: 'error'
							});
						})
						.when( 404, response=> {
							this.$dialog.loading.close();
							this.$dialog.toast({
								mes: '呀！出错了！',
								timeout: 1500,
								icon: 'error'
							});
						})
						.when( 422,response =>{
							this.errors = response.json
							this.$dialog.loading.close();
						})
					;
			}
		}
	}
</script>
<style>
	.question-form .yd-cell{position: static;}
	.question-form .yd-cell:after{display: none}
	.question-form .content-desc{padding:10px;margin-bottom: 20px;}
	.question-form .content-desc img{width: 100%}
	.question-form .recommend{
		width: 100%;
		position: relative;
		padding-top:10px;
		padding-bottom: 10px;
	}
	.question-form .comment_title .Line {
		position: relative;
		width:90px;
		margin: 0 auto;
		text-align: center;
	}
	.question-form   .comment_title .Line:before {
		content: "";
		border-top: 2px solid #aaa;
		display: block;
		position: absolute;
		width: 10px;
		top: 50%;
		left: 0;
	}
	.question-form   .comment_title .Line:after {
		content: "";
		border-top: 2px solid #aaa;
		display: block;
		position: absolute;
		width: 10px;
		top: 50%;
		right: 0;
	}
	.question-form .comment_title {
		position: relative;
	}
</style>
