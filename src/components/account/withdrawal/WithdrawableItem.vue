<!-- 提现规则组件 -->
<template>
	<div class="withdrawal-item">
			<div class="withdrawal-item-box" v-for="withdrawRule in withdrawRules"  :class="{'content_html-close' : content_more}" ref="contenthtml">
				<div   class="contenthtml" v-if="withdrawRule.channel !==null || withdrawRule.fee !== null">
					<h6>提现规则（{{withdrawRule.id}}）</h6>
					<p v-if="withdrawRule.fee !==null">
						{{withdrawRule.fee.title}}：<span class="fg-gray">{{withdrawRule.fee.rate}}:{{withdrawRule.fee.denominator}}</span>
					</p>
					<st-withdrawablelimits :id="withdrawRule.id"/>
				</div>
				<div class='content_moreBtn' v-if="content_more" @click.stop="content_more = false">展开全部...</div>
				<mu-raised-button label="提现" class="demo-raised-button st-mt" primary fullWidth backgroundColor="#FF4E4E" :to="{name: 'Withdrawals',params: {id: item, ruleid: withdrawRule.id}}"/>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Withdrawablelimits from '@/components/account/withdrawal/Withdrawablelimits';
export default {
	props: {
		item: Number
	},
	components: {
		'st-withdrawablelimits': Withdrawablelimits
	},
	data(){
		return Data.createMap( {
			// 外部账户数据
			withdrawRules: {
				// 对应 Data 目录下的文件
				subject: 'Withdrawable',
				// 对应其中的具体数据
				entity: 'withdrawRules',
				// 参数
				params: {
					accountType: this.item
				},
			},
		},{
			content_more: false,
		});
	},
	mounted () {
	    // this.init();

	  },
	// methods: {
	// 	init() {
	// 		this.withdrawRules;
	// 		z(this.$refs.contenthtml)
	// 		if (this.$refs.contenthtml.offsetHeight > 60) {
	// 			this.content_more = true;
	// 			this.$refs.contenthtml.style.height = 'auto'

	// 		} else {
	// 			this.content_more = false;
	// 			this.$refs.contenthtml.style.height = 'auto'
	// 		}

	// 	}
	// },
};
</script>
<style>
	.withdrawal-item{padding-bottom: 20px;}
	.withdrawal-item .withdrawal-item-box{width: 100%;margin:0 auto;position: relative;}
	/*.withdrawal-item .content_html-close{height:65px;overflow: hidden;}*/
	.withdrawal-item .contenthtml{padding:20px;}
	.withdrawal-item .content_moreBtn{text-align: center;    box-shadow: -1px -5px 2px rgba(204, 204, 204, 0.1);line-height: 36px;}
	.withdrawal-item  a.mu-raised-button{width:90%;margin:0 auto;display:block;}
	.withdrawal-item h6{margin-bottom: 5px;font-weight: normal;}
	.withdrawal-item .demo-raised-button{height: 45px;}

</style>
