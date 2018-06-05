<!-- 多资金可兑换列表 -->
<template>
<div class="exchangerateto-list">
	<!-- 数据加载中 -->
	<div  v-if="loading" class="initialization">
		<div class="loader"></div>
	</div>
	<div v-if="error">

	</div>
	<div v-if="post">
		<st-nodata content="暂无资金兑换"  v-if="lists.length === 0"></st-nodata>
		<div class="exchangerate-list" v-for="(list,i) in lists"  v-else>
			<mu-flat-button label="" class="demo-flat-button"   :to="{name:'Exchangeto',params: {id:list.rate_id}}">
				<div class="exchange-tit">
					<st-tree>
						<p v-for="(value,key) in list.from" v-if="fromtype[0]" slot="left"><span>{{formfunction(key).label}}</span></p>
						<i class="iconfont" slot="content">&#xe61e;</i>
						<p v-for="(value,key) in list.to" v-if="totype[0]" slot="right"><span>{{tofunction(key).label}}</span></p>
					</st-tree>
				</div>
				<div class="exchangerate-content fg-gray">
					<span v-for="(value,key) in list.from" v-if="fromtype[0]">{{formfunction(key).figure(value)}}{{formfunction(key).label}}</span>
					<i class="iconfont">&#xe61e;</i>
					<span v-for="(value,key) in list.to" v-if="totype[0]">{{tofunction(key).figure(value)}}{{tofunction(key).label}}</span>
				</div>
				<div class="exchangerate-btn st-auxi-bgcolor">点击兑换</div>
			</mu-flat-button>
		</div>
	</div>
</div>
</template>

<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import accountTypes from '@/Services/AccountTypes';
import Tree from '@/components/compact/Tree';
export default {
	components: {
		'st-tree': Tree
	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},
	data(){
		return Data.createMap( {
			lists:{
				subject: 'Exchangerate',
				entity: 'list',
				preprocessor:lists=>{
					return this.preprocessor(lists);
				},
			}
		},{
			fromtype:[],
			totype:[],
			loading: false,
			post: null,
			error: null
		});
	},
	methods: {
		preprocessor(lists) {
			this.error = this.post = null
			this.loading = true
			lists.forEach(item=>{
				accountTypes.then(accountTypes=>{
					for(var key in item.from){
						this.fromtype.push(accountTypes.find(x=>String(x.id) === String(key))) //查筛选出资金类型和这里兑换的资金匹配的资金类型
					}
					for(var key in item.to){
						this.totype.push(accountTypes.find(x=>String(x.id) === String(key))) //查筛选出资金类型和这里兑换的资金匹配的资金类型
					}
				})
			})
			this.loading = false;
			this.post = '1';
			return lists;
		},
		// 获取兑换的名字
		formfunction(key) {
			return this.fromtype.find(x=>String(x.data.id) === String(key))
		},
		// 获取兑换的名字
		tofunction(key) {
			return this.totype.find(x=>String(x.data.id) === String(key))
		}
	}

};
</script>
<style>
.exchangerateto-list .st-tree div p::after{
	background: #999
}
.exchangerateto-list .st-tree div p::before{
	background: #999
}

.exchangerateto-list{margin-bottom: 10px;}
.exchangerateto-list .exchangerate-list{background: #fff;width:100%;margin:5px auto 0 auto;}
.exchangerateto-list .exchangerate-tit{text-align: center;line-height:20px;font-size:16px;display: flex;justify-content: center;align-items: center;padding-top: 10px;}
.exchangerateto-list .exchangerate-tit p span{display: block;}
.exchangerateto-list .exchangerate-tit i{margin:0 10px;}
.exchangerateto-list .exchangerate-content i{margin:0 10px;}
.exchangerateto-list .exchangerate-content{text-align: center;font-size:14px;line-height: 30px;}
.exchangerateto-list .mu-flat-button{height: auto;width: 100%;line-height: normal;}
.exchangerateto-list .mu-flat-button-wrapper{display: block;}
.exchangerateto-list .yd-tab-panel{background: none}
.exchangerateto-list .mu-tabs{background:#fff;position: fixed;top:44px;max-width: 375px;}
.exchangerateto-list .mu-tab-link{color:#000;}
.exchangerateto-list .mu-tab-link{color:#000;}
.exchangerateto-list .mu-tab-active .mu-tab-text{color:#f00 ;}
.exchangerateto-list .exchangerate-main{margin-top: 55px;}
.exchangerateto-list .exchangerate-btn{text-align: center; color:#fff;line-height: 30px;}
</style>
