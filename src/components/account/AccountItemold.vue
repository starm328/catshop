<!-- 预留下拉的组件 么用的，留存在这里 -->
<template>
	<div class="account_item" >
		<yd-infinitescroll :on-infinite="loadList" ref="infinitescrollDemo" v-show="details.length > 0">
			<yd-list theme="1" slot="list">
				<mobile-tear-sheet>
					<mu-list :value="value" @change="handleChange">
						<!-- <mu-sub-header>今天</mu-sub-header> -->
						<div class="detail_list" v-for ="(detail,i) in details">
							<mu-list-item :title="detail.amount.showing" afterText="提现中" nestedListClass="nestclass" afterTextClass="afterclass" toggleNested :open="false" :value="i">
								<mu-avatar src="./images/withdraw.png" slot="leftAvatar" v-if="detail.status === 'charging'"/>
								<mu-avatar src="http://i1.vpinpai.cn/pri/sby/user_head/49c81aa10c304bf839ae155cac4f44ef" slot="leftAvatar" v-else="detail.status === 'coming'"/>
								<mu-avatar src="http://i1.vpinpai.cn/pri/sby/user_head/49c81aa10c304bf839ae155cac4f44ef" slot="leftAvatar" v-else="detail.status === 'spending'"/>
								<mu-avatar src="http://i1.vpinpai.cn/pri/sby/user_head/49c81aa10c304bf839ae155cac4f44ef" slot="leftAvatar" v-else="detail.status === 'withdrawing'"/>

								<span slot="describe" v-if="detail.status === 'charging'">收款</span>
								<span slot="describe" v-if="detail.status === 'coming'">入账</span>
								<span slot="describe" v-if="detail.status === 'spending'">使用</span>
								<span slot="describe" v-if="detail.status === 'withdrawing'">提现</span>
								</mu-icon-menu>
								<mu-list-item title="Myron Liu" slot="nested" :value="i">
									<mu-avatar src="http://i1.vpinpai.cn/pri/sby/user_head/49c81aa10c304bf839ae155cac4f44ef" slot="leftAvatar"/>
									<span slot="describe" >收款</span>
								</mu-list-item>
							</mu-list-item>
							<mu-divider inset/>
						</div>
					</mu-list>
				</mobile-tear-sheet>
			</yd-list>
			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip">——— 亲，看完了———</span>
			<!-- 加载中提示 -->
			<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
		</yd-infinitescroll>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import statuses from '@/Services/Statuses';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(ListTheme.name, ListTheme);
	export default{
		data () {
			return Data.createMap( {
				details:{
					subject: 'Account',
					entity: 'details',
					params: {
						token: Auth.then(x=>x.token),
						take: 15,
						account:this.$route.params.id,
					},
				}
			},{
				statuse:'',
				page: 15,
				pageSize: 15,
				value: 2
			});
		},
		methods: {
			handleChange (val) {
			     this.value = val
		   },
			loadList() {
				Auth.then( auth=> {
					Ajaxy.get( `${configs.catShop.apiBaseUrl}accounts/${this.$route.params.id}/details?`, {take:this.pageSize, skip:this.page,} ,{token: auth.token} )
						.when( 401, response=> Auth.refreshToken().then( token=> this.get(details) ) )
						.when( 200, response=> {
							console.log(response.json);
							const _list = response.json;
							console.log(_list.length);
							this.details = [...this.details, ..._list];
							if (_list.length < this.pageSize) {
								/* 所有数据加载完毕 */
								this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
								return;
							}
							/* 单次请求数据完毕 */
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
							this.page = this.page +15
						} )

					;
				})
			}
		}

	}
</script>
<style>
.account_item .detail_list{background: #fff}
.account_item .mu-list{padding:0;}
.account_item .mu-item-right{font-size:13px;width: auto;}
.mu-item.selected{background: #EEE;color: inherit;}
.mu-item.selected .mu-item-wrapper>div{background: #EEE;}
.nestclass .mu-item-wrapper>div{margin-left:0 !important;padding-left:18px;}
</style>
