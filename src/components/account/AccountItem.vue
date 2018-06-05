<!-- 资金组件，资金列表组件子组件 -->
<template>
	<div class="account_item st_detail_list" >

		<span style="display:none">{{statusIn}}{{reasonIn}}</span>
		<div class="initialization on" v-if="details[0]&&details[0].loding === 'loding'">
			<div class="loader"></div>
		</div>
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" v-else-if="details.length > 0">
			<yd-list theme="1" slot="list">
					<mu-list :value="value" @change="handleChange">
						<!-- <mu-sub-header>今天</mu-sub-header> -->
						<div class="detail_list" v-for ="(detail,i) in details" v-if="detail.amount">
							<!-- :to="{name: 'Accountpage', params: {account: $route.params.id, detail: detail.id }}" -->
							<mu-list-item :title="String(detail.amount.showing)" :afterText="statusetypefuc(i)" afterTextClass="afterclass" :to="{name: 'Commissions', params: {cate:'layer',id:$route.params.id}}" v-if="reasontypefuc(i) === '分润'">
								<span slot="left"  v-if="detail.reason_type === 'commission'"><i class="iconfont fg-cyan">&#xe610;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'rebate'"><i class="iconfont fg-lightblue">&#xe610;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'recharge'"><i class="iconfont fg-blue">&#xe603;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'refund'"><i class="iconfont fg-teal">&#xe77c;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'spending'"><i class="iconfont fg-red">&#xe64c;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'transfer-in'"><i class="iconfont fg-purple">&#xe692;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'transfer-out'"><i class="iconfont fg-pink">&#xe691;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'reward'"><i class="iconfont fg-pink">&#xe608;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'withdrawal'"><i class="iconfont fg-deeppurple">&#xe68c;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'exchange-out'"><i class="iconfont fg-deeppurple">&#xe60a;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'exchange-in'"><i class="iconfont fg-deeppurple">&#xe60a;</i></span>

								<span slot="describe">{{reasontypefuc(i)}}</span>

								<p slot="describe">时间：<Sttime :time="detail.created_at"/></p>

							</mu-list-item>
							<mu-list-item :title="String(detail.amount.showing)" :afterText="statusetypefuc(i)" afterTextClass="afterclass" v-else>
								<span slot="left"  v-if="detail.reason_type === 'commission'"><i class="iconfont fg-cyan">&#xe610;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'rebate'"><i class="iconfont fg-lightblue">&#xe610;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'recharge'"><i class="iconfont fg-blue">&#xe603;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'refund'"><i class="iconfont fg-teal">&#xe77c;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'spending'"><i class="iconfont fg-red">&#xe64c;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'transfer-in'"><i class="iconfont fg-purple">&#xe692;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'transfer-out'"><i class="iconfont fg-pink">&#xe691;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'reward'"><i class="iconfont fg-pink">&#xe608;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'withdrawal'"><i class="iconfont fg-deeppurple">&#xe68c;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'exchange-out'"><i class="iconfont fg-deeppurple">&#xe60a;</i></span>
								<span slot="left"  v-if="detail.reason_type === 'exchange-in'"><i class="iconfont fg-deeppurple">&#xe60a;</i></span>

								<span slot="describe">{{reasontypefuc(i)}}</span>

								<p slot="describe">时间：<Sttime :time="detail.created_at"/></p>

							</mu-list-item>
							<mu-divider inset/>
						</div>
					</mu-list>
			</yd-list>
			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip">——— 亲，看完了———</span>
			<!-- 加载中提示 -->
			<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
		</yd-infinitescroll>
		<!-- 			没有数据 组件		 -->
		<div v-else-if="details.length == 0" style="width:100%">
			<st-nodata content="暂无相关数据"></st-nodata>
		</div>
		<!-- 			没有数据 组件end		 -->
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Statuses from '@/Services/Statuses';
import Reasons from '@/Services/Reasons';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(ListTheme.name, ListTheme);
	export default{
		props:{
			reasonIn:Array,
			statusIn:Array,
		},
		data() {
			return this.createMap();
		},
		watch: {
			reasonIn(){
				this.createMap(this._data);
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit'); //筛选之后初始化列表数据
			},
			statusIn(){
				this.createMap(this._data);
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit'); //筛选之后初始化列表数据
			}
		},
		methods: {
			createMap(data =  {}){
				return Data.createMap( {
					details:{
						subject: 'Account',
						entity: 'details',
						params: {
							token: Auth.then(x=>x.token),
							take: 15,
							account:this.$route.params.id,
							filters:{
								reasonIn:this.reasonIn,
								statusIn:this.statusIn
							}
						},
					}
				},{
					statuse:'',
					page: 15,
					pageSize: 15,
					value: 2,
					Reasons,
					Statuses,
					reasontype:[],
					statusetype:[]
				},data);
			},
			reasontypefuc(i){
				if ( this.Reasons) {
					return this.Reasons.find(x=>x.data.id === this.details[i].reason_type).data.label
				}
			},
			statusetypefuc(i){
				if ( this.Statuses) {
					return this.Statuses.find(x=>x.data.id=== this.details[i].status).data.comment
				}
			},
			handleChange (val) {
			     this.value = val
		   },
			loadList() {
				Auth.then( auth=> {
					Ajaxy.get( `${configs.catShop.apiBaseUrl}accounts/${this.$route.params.id}/details?`, {take:this.pageSize, skip:this.page,'filters[reasonIn]':this.reasonIn,'filters[statusIn]':this.statusIn,},{token: auth.token} )
						.when( 401, response=> Auth.refreshToken().then( token=> this.get(details) ) )
						.when( 200, response=> {
							const _list = response.json;
							this.details = [...this.details, ..._list];
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

		}

	}
</script>
<style>
</style>
