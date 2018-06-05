<!-- 提现规则，约束列表组件 -->
<template>
	<div class="withdrawal-list" >
		<st-nodata content="抱歉！暂不能提现"  v-if="withdrawables.length == 0"></st-nodata>
		</no-data>
		<yd-accordion v-else>
			<yd-accordion-item :title="withdrawable.label + '(' +withdrawable.unit_label + ')'"  v-for="withdrawable in withdrawables" open :key="withdrawable.id">
					<v-withdrawableitem :item="withdrawable.id"/>
			</yd-accordion-item>
		</yd-accordion>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import WithdrawableItem from '@/components/account/withdrawal/WithdrawableItem';
import {Accordion, AccordionItem} from 'vue-ydui/dist/lib.px/accordion';

Vue.component(Accordion.name, Accordion);
Vue.component(AccordionItem.name, AccordionItem);
export default {
	components: {
		'v-withdrawableitem': WithdrawableItem,
	},
	data(){
		return Data.createMap( {
			// 外部账户数据
			withdrawables: {
				// 对应 Data 目录下的文件
				subject: 'Withdrawable',
				// 对应其中的具体数据
				entity: 'withdrawable',
				// 参数

			},
		},{

		});
	},
};
</script>
<style>
	.mkd_ui.wx .sales-index .st-header .wrap,.sales-index .st-header .wrap {
		background-color: #673ab7;
		color: #fff;
	}
</style>
