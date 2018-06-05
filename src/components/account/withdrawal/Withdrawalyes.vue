<!-- 提现可提现资金显示组件 -->
<template>
	<div>
		<span class="title">
				可提现
		</span>
		<em v-if="statistic.available&&statistic.available.showing&&accounttypes">
			<yd-countup
			:endnum="statistic.available.showing"
			duration="0"
			:decimals="Math.max(0,-accounttypes.data.figure)"
			separator=","
			useEasing
			start
			></yd-countup>
		</em>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
	import accountTypes from '@/Services/AccountTypes';
	export default{
		props:{
			accounttype:Object
		},
		data () {
			return Data.createMap( {
				// 可提现资金数据
				statistic: {
					// 对应 Data 目录下的文件
					subject: 'Account',
					// 对应其中的具体数据
					entity: 'statistics',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
						account: this.accounttype.id,
						counters: 'available'
					},
					preprocessor:statistic=>{
						return this.preprocessor(statistic);

					},
				},
			},{
					accounttypes:'',
			});
		},
		methods: {
			preprocessor(statistic) {
					accountTypes.then(accountTypes=>{
						this.accounttypes = accountTypes.find(x=>x.id === this.accounttype.type)
					})

				return statistic;
			},
		}
	}
</script>
<style>

</style>
