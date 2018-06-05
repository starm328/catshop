<!-- 提现记录详情组件 -->
<template>
<div class="st-viewbox">
	<div class="withdrawal-record-show">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<div class="st-center">
			<v-loged :needUser="true">
				<div class="st-record st-mb" >
					<div class="st-record-tit" v-if="withdrawshow&&type&&accounttype">
						<h6>{{accounttype.figure(-withdrawshow.raw_amount)}}</h6>
						<p>{{type.data.label}}</p>
					</div>
					<div class="vux-form-preview weui-form-preview" v-if="accounttype">
						<div class="weui-form-preview__bd">
							<div class="weui-form-preview__item" v-if="withdrawshow.fee !== 0"><label class="weui-form-preview__label">实际到账</label> <em class="weui-form-preview__value">{{accounttype.figure(-withdrawshow.raw_amount - (-withdrawshow.fee))}}</em></div>
							<div class="weui-form-preview__item" v-else><label class="weui-form-preview__label">实际到账</label> <em class="weui-form-preview__value">{{accounttype.figure(-withdrawshow.raw_amount)}}</em></div>

							<div class="weui-form-preview__item" v-if="withdrawshow.fee"><label class="weui-form-preview__label">手续费</label> <span class="weui-form-preview__value">{{accounttype.figure(-withdrawshow.fee)}}</span></div>
							<div class="weui-form-preview__item"><label class="weui-form-preview__label">交易单号</label> <span class="weui-form-preview__value">{{withdrawshow.code}}</span></div>
							<div class="weui-form-preview__item"><label class="weui-form-preview__label">时间</label> <span class="weui-form-preview__value"><Sttime  :time="withdrawshow.created_at"/></span></div>

							<div class="weui-form-preview__item"><label class="weui-form-preview__label">处理进度</label>
								<div class="weui-form-preview__value">
									<yd-timeline>
											<yd-timeline-item v-if="withdrawshow.status&&type" >
												<span slot="icon"><i class="iconfont">&#xe625;</i></span>
												<p>{{type.data.label}}</p>
												<!-- <p style="margin-top: 10px;">2017-08-18 08:24:18</p> -->
											</yd-timeline-item>
											<yd-timeline-item >
												<span slot="icon"><i class="iconfont">&#xe625;</i></span>
												<p>处理中</p>
												<!-- <p style="margin-top: 10px;">2017-08-18 07:25:08</p> -->
											</yd-timeline-item>
											<yd-timeline-item>
												<span slot="icon"><i class="iconfont">&#xe625;</i></span>
												<p>提交</p>
												<!-- <p style="margin-top: 10px;">2017-08-17 21:44:08</p> -->
											</yd-timeline-item>
										</yd-timeline>
								</div>
							</div>

							<div class="weui-form-preview__item"><label class="weui-form-preview__label">备注</label> <span class="weui-form-preview__value" v-if="withdrawshow.comments">{{withdrawshow.comments}}</span><span class="weui-form-preview__value" v-else>无</span></div>
							<div class="weui-form-preview__item"  v-if="withdrawshow.replies"><label class="weui-form-preview__label" >商家留言</label> <span class="weui-form-preview__value">{{withdrawshow.replies}}</span> </div>
						</div>
					</div>
				</div>
				<!-- 所提现的账户子组件 -->
				<st-recorditemaccount :id="withdrawshow.external_account_id" v-if="withdrawshow.external_account_id"/>
			</v-loged>
		</div>
	</div>
	<copyright></copyright>
</div>
</template>
<script>
import Vue from 'vue';
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import Data from '@/libs/Data';
import RecorditemAccount from '@/components/account/withdrawal/RecorditemAccount';
import WithdrawStatus from '@/Services/WithdrawStatus';
import accountTypes from '@/Services/AccountTypes';
import {TimeLine, TimeLineItem} from 'vue-ydui/dist/lib.px/timeline';

Vue.component(TimeLine.name, TimeLine);
Vue.component(TimeLineItem.name, TimeLineItem);
export default {
	components: {
		'v-loged': Loged,
		'copyright': copyright,
		'st-recorditemaccount': RecorditemAccount,
	},
	metaInfo () {
		const title = this.$route.meta.title;
		return {
			title: title,
			meta: [{content: title }]
		}
	},
	data(){
		return Data.createMap( {
			// 提现记录数据
			withdrawshow: {
				// 对应 Data 目录下的文件
				subject: 'Withdrawable',
				// 对应其中的具体数据
				entity: 'withdrawshow',
				// 参数
				params: {
					token: Auth.then(x=>x.token),
					unique_code:this.$route.params.code
				},
				preprocessor:withdrawshow=>{
					return this.preprocessorshow(withdrawshow);
				},
			},

		},{
			type:'',
			accounttype:''
		});
	},
	methods: {
	// 获取资金类型中，所显示的类型字段
		preprocessorshow(withdrawshow) {
			WithdrawStatus.then(WithdrawStatu=>{
				this.type =WithdrawStatu.find(x=>x.data.id === withdrawshow.status);
			});
			accountTypes.then(accountTypes=>{
				if(withdrawshow){
					this.accounttype = accountTypes.find(x=>x.id === withdrawshow.account_type_id)
				}
			});
		return withdrawshow
		},
	}
}
</script>
<style>
.withdrawal-record-show .st-record-tit{text-align: center;background: #fff;padding:20px;}
.withdrawal-record-show .st-record-tit h6{font-size:25px;font-weight: normal;line-height: 40px;}
.withdrawal-record-show .yd-timeline-custom-item:first-child i{color: #5E9FFF}
/*.withdrawal-record-show .yd-timeline-custom-item:first-child>.yd-timeline-icon{top:-9px;}*/
.withdrawal-record-show .yd-timeline-item,.withdrawal-record-show .yd-timeline-custom-item{text-align: left}
.withdrawal-record-show .yd-timeline:after{display: none;}
.withdrawal-record-show .yd-timeline{line-height: 14px;font-size:12px;}
/*.withdrawal-record-show .yd-timeline-custom-item:first-child,.withdrawal-record-show .yd-timeline-item:first-child{padding-top:0;}*/
.withdrawal-record-show .st-record-tit p{font-size:14px;color: #999;}

</style>
