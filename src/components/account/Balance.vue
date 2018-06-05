<!-- 资金组件，资金统计子组件 -->
<template>
	<div class="dearest" style="min-height:180px;" v-if="accounttype.data">
		<span class="title">
				现有{{accounttype.label}}({{accounttype.unit_label}})
		</span>
		<em v-if="statistic.having">
			<yd-countup
			:endnum="accounttype.figure(statistic.having.raw)"
			duration="1"
			:decimals="Math.max(0,-accounttype.data.figure)"
			separator=","
			useEasing
			start
			></yd-countup>
		</em>
		<ul>
			<li>
				<a class="button">
					<small>可用</small>
					<b v-if="statistic.available">
						<yd-countup
						:endnum="accounttype.figure(statistic.available.raw)"
						duration="1"
						:decimals="Math.max(0,-accounttype.data.figure)"
						separator=","
						useEasing
						start
						></yd-countup>
					</b>
				</a>
			</li>
			<li>
				<a class="button">
					<small>累计</small>
					<b v-if="statistic.accumu">
						<yd-countup
						:endnum="accounttype.figure(statistic.accumu.raw)"
						duration="1"
						:decimals="Math.max(0,-accounttype.data.figure)"
						separator=","
						useEasing
						start
						></yd-countup>
					</b>
				</a>
			</li>
			<li>
				<router-link :to="{name: 'Accountlist', params: {tit: accounttype.label, id: account.id }}">
					<a class="button">
						<small>查看明细</small>
						<b>&gt;&gt;</b>
					</a>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import Vue from 'vue';
	import Data from '@/libs/Data';
	import {CountUp} from 'vue-ydui/dist/lib.px/countup';
	import Auth from '@/Services/Auth';
	import Ajaxy from 'ajaxy';
	import configs from '@/configs/app';
	import accountTypes from '@/Services/AccountTypes';
	Vue.component(CountUp.name, CountUp);
	export default{
		props: {
			account:{},
		},
		data () {
			return Data.createMap( {
				statistic: {
					// 对应 Data 目录下的文件
					subject: 'Account',
					// 对应其中的具体数据
					entity: 'statistics',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
						account: this.account.id,
						counters: 'accumu-available-having'
					},
					preprocessor:statistic=>{
						return this.preprocessor(statistic);

					},
				},
			},{
				accounttype:'',
			});
		},
		methods: {
			preprocessor(statistic) {
					accountTypes.then(accountTypes=>{
						this.accounttype = accountTypes.find(x=>x.id === this.account.type)
					})

				// 	.show(this.account.id).then(accounttype=>{
				// 		this.accounttype = '余额'
				// 		console.log(accounttype);
				// })
				return statistic;
			},
		}

	}
</script>
