<!-- 多资金兑换记录item -->
<template>
<div class="exchangerate-record-item">
	<!-- 数据加载中 -->
	<div  v-if="loading" class="initialization">
		<div class="loader"></div>
	</div>
	<div v-if="error">

	</div>
	<div v-if="post">
		<st-nodata content="暂无记录"  v-if="records.length === 0"></st-nodata>
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
			<yd-list theme="2" slot="list">
				<div v-for="(record,i) in records" :key="i" class="record-item" >
					<st-tree>
						<p slot="left" v-for="(value,key) in record.from" v-if="fromtype[0]">{{formfunction(key).label}}{{formfunction(key).figure(value)}}</p>
						<i class="iconfont" slot="content">&#xe61e;</i>
						<p slot="right" v-for="(value,key) in record.to" v-if="totype[0]">{{tofunction(key).label}} {{tofunction(key).figure(value)}}</p>
					</st-tree>
					<div class="created-time">兑换时间：<Sttime  :time="record.created_at"/></div>
				</div>
			</yd-list>
			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip">——— 亲，看完了———</span>
			<!-- 加载中提示 -->
			<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
		</yd-infinitescroll>
	</div>
</div>
</template>

<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Tree from '@/components/compact/Tree';
import accountTypes from '@/Services/AccountTypes';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(ListTheme.name, ListTheme);
export default {
	data() {
		return Data.createMap( {
			records:{
				subject: 'ExchangerateRecord',
				entity: 'record',
				params: {
					token: Auth.then(x=>x.token),
					take:15,
					skip:0
				},
				preprocessor:lists=>{
					return this.preprocessor(lists);
				},
			}
		},{
			fromtype:[],
			totype:[],
			loading: false,
			post: null,
			error: null,
			page: 15,
			pageSize: 15,
		});
	},
	components: {
		'st-tree': Tree,
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
		/**
			滚动加载更多
		*/
		loadList() {
			Auth.then( auth=> {
				Ajaxy.get( `${configs.catShop.apiBaseUrl}exchange-list`, {take:this.pageSize, skip:this.page},{token: auth.token} )
					.when( 401, response=> Auth.refreshToken().then( token=> this.get(details) ) )
					.when( 200, response=> {
						const _list = response.json;
						this.records = [...this.records, ..._list];
						if (_list.length < this.pageSize) {
							/* 所有数据加载完毕 */
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						/* 单次请求数据完毕 */
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
						this.page = this.page + 15;
					} )

				;
			})
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
<style lang="less">
	.exchangerate-record-item{
		.record-item{
			background:#fff;
			padding-top:4px;
			margin-bottom:5px;
		}
		.st-tree div p::before{
			background:#999
		}
		.st-tree div p::after{
			background:#999
		}
		.created-time{
			text-align:center;
			line-height:35px;
			color:#999;
		}
	}
</style>
