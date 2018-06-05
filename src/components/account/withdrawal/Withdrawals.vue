<!-- 提现父组件 -->
<template>
	<div class="withdrawal-index">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<div class="initialization on" v-if="externalaccounts[0]&&externalaccounts[0].loding === 'loding'">
				<div class="loader"></div>
			</div>

			<div v-else-if="externalaccounts.length > 0">
				<div class="dearest">
					<st-withdrawalyes :accounttype="accounttype" v-if="accounttype&&accounttype.type"/>
					<div class="dearest_height"></div>
					<div class="dearest_botit">
						<p>设置您的提现账户</p>
						<span><router-link :to="{name: 'ExeternalAccount'}">添加账户</router-link></span>
						<span><router-link :to="{name: 'WithdrawalRecord'}">提现记录</router-link></span>
					</div>
				</div>
				<st-withdrawalaccount v-if="$route.params.choiceid&&type.data" />
				 <!-- v-else-if="!$route.params.choiceid&&type.data" -->
				<div class="externalaccount" v-else-if="!$route.params.choiceid&&type.data" >
					<router-link :to="{name:'ExternaChoice',params: {id: $route.params.id, ruleid: $route.params.ruleid}}">
						<input type="hidden" name="" v-model="externalaccounts[0].id" ref="input">
						<h6>账户：{{type.data.label}}</h6>
						<mu-flexbox>
							<mu-flexbox-item class="flex-demo" v-for="(external,i) in type.data.meta" :key="i">
								<span>
									{{external.label}}： {{externalaccounts[0].detail[external.name]}}
								</span>
							</mu-flexbox-item>
						</mu-flexbox>
					</router-link>
				</div>
				<div class="withdrawal-input">
					<yd-cell-group>
						<st-cellitem>
							<span slot="tit" class="fg-gray">提现金额</span>
							<span slot="icon"></span>
							<span slot="left" class="money">￥</span>
							<yd-input slot="right" required  :show-success-icon="false" :show-error-icon="false" type="tel" class="fz-1-5rem" v-model="money"></yd-input>
							<p v-html="showError('amount')" slot="error" class="inputerror"></p>
						</st-cellitem>
					</yd-cell-group>
				</div>
				<yd-cell-group  >
					<yd-cell-item>
						<yd-textarea slot="right" placeholder="请输入提现备注" maxlength="100" v-model="comments"></yd-textarea>
					</yd-cell-item>
				</yd-cell-group>
				<mu-raised-button label="确认提现" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" @click="submit"/>
			</div>
			<st-nodata content="暂无账户，无法提现"  v-else-if="externalaccounts.length === 0">
				<p><router-link :to="{name: 'Externaltype'}"><a class="button default border-radius-near red mini border-radius-30px">添加账户</a></router-link></p>
			</st-nodata>
		</v-loged>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Loged from '@/components/compact/Loged';
import Withdrawalyes from '@/components/account/withdrawal/Withdrawalyes';
import WithdrawalAccount from '@/components/account/withdrawal/WithdrawalAccount';
import {TextArea} from 'vue-ydui/dist/lib.px/textarea';
import ExternalAccountTypes from '@/Services/ExternalAccountTypes';
import accountTypes from '@/Services/AccountTypes';
Vue.component(TextArea.name, TextArea);
	export default{
		components: {
			'v-loged': Loged,
			'st-withdrawalyes': Withdrawalyes,
			'st-withdrawalaccount': WithdrawalAccount
		},
		metaInfo () {
			const title = this.$route.meta.title;
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		data () {
			return Data.createMap( {
				// 提现资金数据
				accounts: {
					// 对应 Data 目录下的文件
					subject: 'Account',
					// 对应其中的具体数据
					entity: 'accounts',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
					},
					preprocessor:accounts=>{
						return this.preprocessor(accounts);

					},

				},
				// 外部账户数据
				externalaccounts: {
					// 对应 Data 目录下的文件
					subject: 'ExternalAccount',
					// 对应其中的具体数据
					entity: 'externalaccount',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
					},
					preprocessor:externalaccounts=>{
						return this.preprocessortwo(externalaccounts);
					},

				},
			},{
				money:'', //提现金额
				comments:'', //提现备注、
				external_account_id: '', //提现账户id
				errors: {},
				accounttype:'',
				type:''
			});
		},
		watch:{
			money() {
				this.errors.amount = []
			}
		},
		methods: {
			preprocessor(accounts) {
				this.accounttype =accounts.find(x=>String(x.type) === String(this.$route.params.id))
				return accounts;
			},
			// 获取资金类型中，所显示的类型字段
			preprocessortwo(externalaccounts) {
				// externalaccounts.forEach(content=>{
					ExternalAccountTypes.then(ExternalAccountType=>{
						if(externalaccounts&&externalaccounts[0].type){
							this.type=ExternalAccountType.find(x=>x.data.id === externalaccounts[0].type.id);
						}
					})
				// });
				return externalaccounts
			},
			showError( field ){
				return (
					field in this.errors
					? this.errors[field][0]
					: undefined
				)
			},
			submit() {
				this.$dialog.loading.open('提交中');
				if(this.$route.params.choiceid){
					var external_account_id = this.$route.params.choiceid
				}else{
					var external_account_id = this.$refs.input.value
				}
				Auth.then( auth=> {
					// ruleid 提现规则id
					Ajaxy.post( `${configs.catShop.apiBaseUrl}manual-withdraws`,{rule_id:this.$route.params.ruleid,external_account_id:external_account_id,amount:this.money,comments:this.comments}, { token: auth.token, } )
						.when(200, response =>{
							this.$dialog.loading.close();
							this.$dialog.toast({
								mes: '提现申请成功',
								timeout: 1500,
								icon: 'success',
								callback: () => {
									this.$router.push({name:'WithdrawalRecord'})
								}
							});
						})
						.when(406, response =>{
							this.$dialog.loading.close();
							this.$dialog.toast({
								mes: response.json.message,
								timeout: 3000
							});
						})
						.when(409, response=>{
							this.$dialog.loading.close();
							this.$dialog.toast({
								mes: response.json.message,
								timeout: 3000
							});
						})
						.when(422, response=>{
							this.$dialog.loading.close();
							this.errors= response.json.errors;
						})
					;
				} );
			}
		}
	}
</script>
<style>
	.mkd_ui.wx .withdrawal-index .st-header .wrap,.withdrawal-index .st-header .wrap {
		background-color: #673ab7;
		color: #fff;
	}
	.withdrawal-input .fz-1-5rem input{font-size:1.5rem !important;}
	.withdrawal-input .money{font-size:26px;}
	.withdrawal-input{width: 100%;background: #fff;padding-top:12px;margin-top:10px;position: relative;}
	.withdrawal-input:after {
		content: "";
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		width: 100%;
		border-bottom: 1px solid #b2b2b2;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
	}
	.withdrawal-index .dearest .dearest_botit{background:rgba(103,58,183, 1)}
	.withdrawal-index .dearest .dearest_botit a{color: #fff}
	.withdrawal-index .dearest {
		background: linear-gradient(rgba(103,58,183, 1), rgba(103,58,183, .75));
		color: #fff;
		padding: 10px 0;
	}
	.withdrawal-index .externalaccount:after {
		margin-left: .05rem;
		margin-right: -.08rem;
		display: block;
		font-family: YDUI-INLAY;
		font-size: 1.24rem;
		color: #c9c9c9;
		content: "\E608";
		position: absolute;
		right: 10px;
		top:30%;
	}
	.withdrawal-index .externalaccount{width: 100%;background: #fff;padding:10px;position: relative;}
	.withdrawal-index .externalaccount a{color: #999}
	.withdrawal-index .mu-flex-row {flex-wrap: wrap;}
	.withdrawal-index .mu-flexbox .mu-flexbox-item {
		margin-left: 0!important;
		margin-top: 0!important;
	}
	.withdrawal-index .mu-flex-row .mu-flexbox-item{flex: 0 0 50% !important;}

	.withdrawal-index .externalaccount h6{font-size:16px;font-weight: normal;margin-bottom: 5px;}
</style>
