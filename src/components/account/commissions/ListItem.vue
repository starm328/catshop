<!-- 分润明细item子组件 -->
<template>
	<div class="commission-item">
		<div class="initialization on" v-if="items[0]&&items[0].status === 'loding'">
			<div class="loader"></div>
		</div>
		<div  v-else-if="items.length > 0">
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
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" >
				<yd-list theme="2" slot="list">
					<yd-preview :buttons="btns" v-for="(item,i) in items" :key="item.id" class="st-mt" :class="[item? item.status: '']">
						<yd-preview-header>
							<div slot="left">分润金额</div>
							<div slot="right">{{item.amount}}</div>
						</yd-preview-header>

						<yd-preview-item>
							<div slot="left">分润状态</div>
							<div slot="right" class="status">{{statusetypefuc(i)}}</div>
						</yd-preview-item>
						<yd-preview-item v-if="item.source.type==='order_item'">
							<div slot="left">来源</div>
							<div slot="right">{{item.source.username}} 购买产品</div>
						</yd-preview-item>
						<yd-preview-item v-if="item.source.type==='order_item'">
							<div slot="left">产品</div>
							<div slot="right"><img :src="item.source.main_picture" width="30"><p>{{item.source.product.title}}</p><p>数量:{{item.source.quantity}}</p><span v-for=" (value,key) in item.source.product.property_values">{{key}}:<span>{{value}}</span></span></div>
						</yd-preview-item>

						<yd-preview-item v-if="item.source.type==='commission_role_changing'">
							<div slot="left">用户</div>
							<div slot="right">
								<img :src="item.source.node.head_picture" width="30">
								<p v-for="info in item.source.node.info">
									用户名：{{info[1]}}  ID：{{item.source.node.owner_id}}
								</p>
							 手机：{{item.source.node.label}}
							</div>
						</yd-preview-item>
						<yd-preview-item v-if="item.source.type==='commission_role_changing'">
							<div slot="left">身份升级</div>
							<div slot="right" v-if="fromrole&&torole">{{fromrole.data.label}} <i class="iconfont" >&#xe61e;</i> {{torole.data.label}}</div>
						</yd-preview-item>

						<yd-preview-item>
							<div slot="left">分润时间</div>
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
		<div v-show="items.length == 0" style="width:100%" v-else>
			<st-nodata content="暂无分润"  :icon="style"></st-nodata>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import Data from '@/libs/Data';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Statuses from '@/Services/Statuses';
import accountTypes from '@/Services/AccountTypes';
import CommissionRoles from '@/Services/CommissionRoles';
import {Preview, PreviewHeader, PreviewItem} from 'vue-ydui/dist/lib.px/preview';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
Vue.component(Preview.name, Preview);
Vue.component(PreviewHeader.name, PreviewHeader);
Vue.component(PreviewItem.name, PreviewItem);
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(ListTheme.name, ListTheme);
	export default{
		components: {
			'v-loged': Loged,
			'copyright': copyright,
		},
		props:{
			statusIn:String
		},
		data() {
			return this.createMap();
		},
		watch: {
			statusIn(){
				this.createMap(this._data);
			}
		},
		methods: {
			createMap(data =  {}){
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
					items:{
						subject: 'Commission',
						entity: 'item',
						params: {
							token: Auth.then(x=>x.token),
							category:this.statusIn?this.statusIn:this.$route.params.cate,
							account:this.$route.params.id,
							take:15,
						},
						preprocessor:items=>{
							return this.preprocessor(items);
						},
					},
					sum:{
						subject: 'Commission',
						entity: 'sum',
						params: {
							token: Auth.then(x=>x.token),
							category:this.statusIn?this.statusIn:this.$route.params.cate,
							account:this.$route.params.id,
						},
					}
				},{
					btns: [],
					Statuses,
					style:'icon-favor',
					page: 15,
					pageSize: 15,
					fromrole:'',
					torole:'',
					accounttype:''
				},data);
			},
			// 身份type
			preprocessor(items) {
				items.forEach(item=>{
					if(item.source && item.source.type === 'commission_role_changing'){
						CommissionRoles.then(CommissionRoles=>{
							this.fromrole=CommissionRoles.find(x=>x.data.id === item.source.from)
							this.torole=CommissionRoles.find(x=>x.data.id === item.source.to)
						});
					}
				})
				return items;
			},


			/**
				分润状态type
			*/
			statusetypefuc(i){
				if ( this.Statuses) {
					return this.Statuses.find(x=>x.data.id=== this.items[i].status).data.comment
				}
			},

			/**
				获取资金id
			*/
			accountType(accounts) {
				var that = this;
				if(accounts.length >0){
					var data= accounts.filter(x=>{return x.id == that.$route.params.id})
					accountTypes.then(accountTypes=>{
						this.accounttype = accountTypes.find(x=>x.id === data[0].type)
					})
				}
				return accounts
			},

			/**
				滚动加载更多
			*/
			loadList() {
				Auth.then( auth=> {
					Ajaxy.get( `${configs.catShop.apiBaseUrl}accounts/${this.$route.params.id}/commissions/cate-layer?`, {take:this.pageSize, skip:this.page},{token: auth.token} )
						.when( 401, response=> Auth.refreshToken().then( token=> this.get(details) ) )
						.when( 200, response=> {
							const _list = response.json;
							this.items = [...this.items, ..._list];
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
		},
	}
</script>
<style lang="less">
.commission-item  .canceled{opacity: 0.7;border-top:2px solid #ccc}
.commission-item  .yd-preview.comed{border-top:2px solid #a0ff84}
</style>
