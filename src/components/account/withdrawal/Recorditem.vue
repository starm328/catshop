<!-- 提现记录列表Item组件 -->
<template>
	<div class="withdrawal-record-item">
		<div class="initialization on" v-if="withdrawlists[0]&&withdrawlists[0].loding === 'loding'">
			<div class="loader"></div>
		</div>
		<div class="st-record st-mb" v-for="(show,i) in withdrawlists" v-else-if="withdrawlists.length > 0&&accounttype">
			<div class="vux-form-preview weui-form-preview" >
				<div class="weui-form-preview__hd"><label class="weui-form-preview__label">提现金额</label> <span class="weui-form-preview__value" v-if="accounttype">{{accounttype.figure(-show.raw_amount)}}</span></div>

				<div class="weui-form-preview__bd">

						<div class="weui-form-preview__item" v-if="show.fee !== 0"><label class="weui-form-preview__label">实际到账</label> <em class="weui-form-preview__value" v-if="accounttype">{{accounttype.figure(-show.raw_amount - (-show.fee))}}</em></div>
						<div class="weui-form-preview__item" v-else><label class="weui-form-preview__label">实际到账</label> <em class="weui-form-preview__value" v-if="accounttype">{{accounttype.figure(-show.raw_amount)}}</em></div>

						<div class="weui-form-preview__item"><label class="weui-form-preview__label">交易状态</label> <span class="weui-form-preview__value fg-red">{{status(i)}}</span></div>
						<div class="weui-form-preview__item" v-if="show.fee"><label class="weui-form-preview__label">手续费</label> <span class="weui-form-preview__value">{{accounttype.figure(-show.fee)}}</span></div>
						<div class="weui-form-preview__item"><label class="weui-form-preview__label">交易单号</label> <span class="weui-form-preview__value">{{show.code}}</span></div>
						<div class="weui-form-preview__item"><label class="weui-form-preview__label">时间</label> <span class="weui-form-preview__value"><Sttime  :time="show.created_at"/></span></div>
						<div class="weui-form-preview__item"><label class="weui-form-preview__label">备注</label> <span class="weui-form-preview__value" v-if="show.comments">{{show.comments}}</span><span class="weui-form-preview__value" v-else>无</span></div>
				</div>
				<div class="weui-form-preview__ft"><router-link :to="{name: 'WithdrawalShow',params: {code:show.code}}" class="weui-form-preview__btn weui-form-preview__btn_primary">查看详情</router-link></div>
			</div>
		</div>
		<st-nodata content="无提现记录" v-if="withdrawlists.length === 0"></st-nodata>
	</div>
</template>

<script>
import Vue from 'vue';
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import RecorditemAccount from '@/components/account/withdrawal/RecorditemAccount';
import WithdrawStatus from '@/Services/WithdrawStatus';
import accountTypes from '@/Services/AccountTypes';
export default {
	components: {
		'st-recorditemaccount': RecorditemAccount,
	},
	data(){
		return Data.createMap( {
			// 外部账户数据
			withdrawlists: {
				// 对应 Data 目录下的文件
				subject: 'Withdrawable',
				// 对应其中的具体数据
				entity: 'withdrawlist',
				// 参数
				params: {
					token: Auth.then(x=>x.token),
				},
				preprocessor:withdrawlists=>{
					return this.preprocessorshow(withdrawlists);
				},
			},
		},{
			WithdrawStatus,
			accounttype:''
		});
	},
	methods: {
	// 获取资金类型中，所显示的类型字段
		preprocessorshow(withdrawlists) {
			// z(withdrawlists)
			withdrawlists.forEach(statu=>{
				// WithdrawStatus.then(WithdrawStatu=>{
				// 	this.type.push(WithdrawStatu.find(x=>x.data.id === statu.status));
				// });
				accountTypes.then(accountTypes=>{
					if(statu){
						this.accounttype = accountTypes.find(x=>x.id === statu.account_type_id)
					}
				})
			});

			return withdrawlists
		},
		status(i){
			if ( this.WithdrawStatus) {
				return this.WithdrawStatus.find(x=>x.data.id === this.withdrawlists[i].status).data.label

			}
			// if(this.WithdrawStatus[i]){
			// 	// return this.WithdrawStatus[0]

			// }
		}
	}
}
</script>
<style type="text/css">


</style>
