<!-- 提现约束组件 -->
<template>
	<div class="withdrawal-limit" v-if="limits > 0">
		提现约束：
		<div v-for="limit in limits">
			<div v-if="!limit.is_floor">
				<p v-if="limit.time_range/3600 > '25' " class="fg-gray">{{(limit.time_range/3600/24)}}天之内 提现限额{{limit.limit}}</p>
				<p v-else-if="limit.time_range/3600 == '0' " class="fg-gray">单笔限额{{limit.limit}}</p>
				<p v-else-if="limit.time_range/3600 <= '24'" class="fg-gray">{{limit.time_range/3600}}小时之内 限额{{limit.limit}}</p>
				<p v-else class="fg-gray">{{(limit.time_range/3600/24)}}天之内 提现限额{{limit.limit}}</p>
			</div>
			<div v-else>
				<p v-if="limit.time_range/3600 > '25' " class="fg-gray">{{(limit.time_range/3600/24)}}天之内 最低额度{{limit.limit}}</p>
				<p v-else-if="limit.time_range/3600 == '0' " class="fg-gray">单笔最低限额{{limit.limit}}</p>
				<p v-else-if="limit.time_range/3600 <= '24'" class="fg-gray">{{limit.time_range/3600}}小时之内 最低限额{{limit.limit}}</p>
				<p v-else class="fg-gray">{{(limit.time_range/3600/24)}}天之内 最低额度{{limit.limit}}</p>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';

export default {
	props: {
		id: Number
	},
	data(){
		return Data.createMap( {
			// 外部账户数据
			limits: {
				// 对应 Data 目录下的文件
				subject: 'Withdrawable',
				// 对应其中的具体数据
				entity: 'limits',
				// 参数
				params: {
					withdraw_rule: this.id
				},
			},
		},{

		});
	},
};
</script>
<style>
	.withdrawal-limit{margin-top:10px;}
	.withdrawal-limit p{line-height: 20px;}
</style>
