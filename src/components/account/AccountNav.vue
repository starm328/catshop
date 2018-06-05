<!-- 资金组件，资金统计父组件 -->
<template>
	<ul>
		<!-- <li>
			<div class="button" push="follow">
				<i class="st-icon icon-profilefill fg-lightgreen">
				</i>
				<small>
					推广二维码
				</small>
			</div>
		</li>
		<li>
			<div class="button" push="team_list">
				<i class="st-icon icon-friendfill fg-teal">
				</i>
				<small>
					我的团队
				</small>
			</div>
		</li> -->
		<li v-if="exchangetype">
			<router-link :to="{name: 'AccountExchange' , params:{ id:'tab'+type}}">
			<div class="button">
				<i class="iconfont fg-indigo">&#xe604;</i>
				<small>
					资金兑换
				</small>
			</div>
			</router-link>
		</li>
		<li v-if="withdrawRules.length > 0">
			<router-link :to="{name: 'WithdrawalLists'}">
			<div class="button">
				<i class="st-icon icon-vipcard fg-red">
				</i>
				<small>
					我要提现
				</small>
			</div>
			</router-link>
		</li>
		<!-- <li>
			<router-link :to="{name: 'WithdrawalRecord'}">
			<div class="button">
				<i class="iconfont icon-jilu fg-lightindigo">
				</i>
				<small>
					提现记录
				</small>
			</div>
			</router-link>
		</li> -->
		<li  v-if="exchangeratetype">
			<router-link :to="{name: 'Exchangerate'}">
			<div class="button">
				<i class="iconfont icon-jilu fg-lightindigo">
				</i>
				<small>
					多资金兑换
				</small>
			</div>
			</router-link>
		</li>
		<li v-if="exchangeratetype">
			<router-link :to="{name: 'ExchangetoRecord'}">
			<div class="button">
				<i class="iconfont icon-jilu fg-lightindigo">
				</i>
				<small>
					多资金兑换明细
				</small>
			</div>
			</router-link>
		</li>
		<!--  <li>
			<div class="button" push="information">
				<i class="st-icon icon-commentfill fg-cyan">
				</i>
				<small>
					消息中心
				</small>
			</div>
		</li>

		<li>
			<div class="button" push="follow">
				<i class="st-icon icon-picfill fg-lightyellow">
				</i>
				<small>
					图文中心
				</small>
			</div>
		</li>  -->
		<li>
			<div class="button">
				<i class="st-icon  icon-favor fg-gray">
				</i>
				<small>
					敬请期待
				</small>
			</div>
		</li>
	</ul>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import accountTypes from '@/Services/AccountTypes';
import Ajaxy from 'ajaxy';
	export default{
		components:{
		},
		props: {
			type:Number
		},
		watch: {
			type() {
				this.createMap(this._data);
			}
		},
		data () {
			return this.createMap()
		},
		methods: {
			createMap(data = {}) {
				return Data.createMap( {
					withdrawRules: {
						// 对应 Data 目录下的文件
						subject: 'Withdrawable',
						// 对应其中的具体数据
						entity: 'withdrawRules',
						// 参数
						params: {
							accountType: this.type
						},
					},
					exchanges: {
						// 对应 Data 目录下的文件
						subject: 'AccountExchange',
						// 对应其中的具体数据
						entity: 'exchanges',
						// 参数
						preprocessor:exchanges=>{
							return this.preprocessor(exchanges);
						},
					},
					lists:{
						subject: 'Exchangerate',
						entity: 'list',
						preprocessor:lists=>{
							return this.listpreprocessor(lists);
						},
					}
				},{
					exchangetype:false, //单个资金兑换判断
					exchangeratetype:false, //多个资金兑换判断
				},data);
			},
			preprocessor(exchanges) {
				exchanges.forEach(exchanges=>{
					if(exchanges.from === this.type){
						this.exchangetype = true
					}
				})
				return exchanges;
			},
			listpreprocessor(lists) {
				lists.forEach(list=>{
					accountTypes.then(accountTypes=>{
						for(var key in list.from){
							if(accountTypes.find(x=>String(x.id) === String(key)).id ===  this.type){
								this.exchangeratetype = true
							}
						}

					})
				})
				return lists;
			}
		}
	}
</script>
<style>
.sales-center .top{
	padding:10px 0;
}
/*swiper*/

</style>
