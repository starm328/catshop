<template>
	<div class="reward-showitem st_detail_list">
		<div class="initialization on" v-if="rewards[0]&&rewards[0].loding === 'loding'">
			<div class="loader"></div>
		</div>
		<div  v-else-if="rewards.length>0">
			<div class="dearest dearest_bgcolor" style="padding-bottom:10px;">
				<span class="title">
						累计
				</span>
				<em v-if="accounttype">
					<yd-countup
					:endnum="accounttype.figure(sum)"
					duration="1"
					:decimals="Math.max(0,-accounttype.data.figure)"
					separator=","
					useEasing
					start
					></yd-countup>
				</em>
			</div>
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
				<yd-list theme="2" slot="list">
					<yd-preview :buttons="btns" v-for="(item,i) in rewards" :key="item.id" class="st-mt" :class="[item? item.status: '']">
						<yd-preview-header>
							<div slot="left">奖励金额</div>
							<div slot="right">{{item.amount}}</div>
						</yd-preview-header>

						<yd-preview-item>
							<div slot="left">奖励状态</div>
							<div slot="right" class="status">{{statusetypefuc(i)}}</div>
						</yd-preview-item>

						<yd-preview-item v-if="item.code">
							<div slot="left">单号</div>
							<div slot="right" class="status">{{item.code}}</div>
						</yd-preview-item>

						<yd-preview-item v-if="item.thirdCode">
							<div slot="left">第三方单号</div>
							<div slot="right" class="status">{{item.thirdCode}}</div>
						</yd-preview-item>

						<yd-preview-item v-if="item.comment">
							<div slot="left">备注</div>
							<div slot="right" class="status">{{item.comment}}</div>
						</yd-preview-item>

						<yd-preview-item>
							<div slot="left">奖励时间</div>
							<div slot="right"><Sttime :time="item.created_at" /></div>
						</yd-preview-item>
					</yd-preview>
				</yd-list>
				<!-- 数据全部加载完毕显示 -->
				<span slot="doneTip">——— 亲，看完了———</span>
				<!-- 加载中提示 -->
				<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
			</yd-infinitescroll>
		</div>

		<!-- 			没有数据 组件		 -->
		<div v-else-if="rewards.length == 0" style="width:100%">
			<st-nodata content="暂无相关数据"></st-nodata>
		</div>
		<!-- 			没有数据 组件end		 -->
	</div>

</template>
<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import Statuses from '@/Services/Statuses';
import Reasons from '@/Services/Reasons';
import accountTypes from '@/Services/AccountTypes';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(ListTheme.name, ListTheme);
	export default {
		data(){
			// 调用数据
			// 告诉数据中心要哪些数据
			return Data.createMap( {
				accounts: {
					// 对应 Data 目录下的文件
					subject: 'Account',
					// 对应其中的具体数据
					entity: 'accounts',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
					},
					preprocessor:accounts=>{
						return this.accountType(accounts);
					},

				},
				rewards: {
					// 对应 Data 目录下的文件
					subject: 'Rewards',
					// 对应其中的具体数据
					entity: 'rewards',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
						account:this.$route.params.account,
						providerId:this.$route.params.providerId,
						providerType:this.$route.params.providerType,
						take:15,
						skip:0
					},

				},
				sum:{
					subject: 'Rewards',
					entity: 'sum',
					params: {
						token: Auth.then(x=>x.token),
						account:this.$route.params.account,
						providerId:this.$route.params.providerId,
						providerType:this.$route.params.providerType,
					},
				}
			},{
				btns: [],
				Statuses,
				page: 15,
				pageSize: 15,
				accounttype:''
			});
		},
		methods: {
			loadList() {
				Auth.then( auth=> {
					Ajaxy.get( `${configs.catShop.apiBaseUrl}accounts/${this.$route.params.account}/rewards/provider-${this.$route.params.providerId}-${this.$route.params.providerType}?`, {take:this.pageSize, skip:this.page},{token: auth.token} )
						.when( 401, response=> Auth.refreshToken().then( token=> this.get(details) ) )
						.when( 200, response=> {
							const _list = response.json;
							this.rewards = [...this.rewards, ..._list];
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
			/**
				分润状态type
			*/
			statusetypefuc(i){
				if ( this.Statuses) {
					return this.Statuses.find(x=>x.data.id=== this.rewards[i].status).data.comment
				}
			},

			/**
				获取资金id
			*/
			accountType(accounts) {
				var that = this;
				if(accounts.length >0){
					var data= accounts.filter(x=>{return x.id == that.$route.params.account})
					accountTypes.then(accountTypes=>{
						this.accounttype = accountTypes.find(x=>x.id === data[0].type)
					})
				}
				return accounts
			}
		}
	};
</script>
<style>
.reward-showitem  .canceled{opacity: 0.7;border-top:2px solid #ccc}
.reward-showitem  .yd-preview.comed{border-top:2px solid #a0ff84}
</style>
