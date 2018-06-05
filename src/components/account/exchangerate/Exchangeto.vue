<!-- 资金组件，多资金兑换表单组件 -->
<template>
<div class="st-viewbox">
	<div class="exchangerateto-index">
		<st-header :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<div class="exchangerateto-tit st-main-bgcolor">
				<!-- 树桩组件 -->
				<st-tree>
					<p v-for="(value,key) in items.from" v-if="items.from&&accountTypes" slot="left">
						{{formfunction(key).label}}{{formfunction(key).figure(value)}}({{tofunction(key).data.unit_label}})
					</p>
					<i class="iconfont" slot="content">&#xe61e;</i>
					<p v-for="(value,key) in items.to" v-if="items.to&&accountTypes" slot="right">
						{{tofunction(key).label}}{{formfunction(key).figure(value)}}({{tofunction(key).data.unit_label}})
					</p>
				</st-tree>
			</div>
			<div class="exchangerateto-form" style="padding-top:14px;">
				<p>
					<mu-text-field hintText="兑换数量" type="number" full-width  v-model="amount"/>
				</p>
				<p v-html="showError('amount')" slot="error" class="inputerror"></p>
				<!-- <p class="exchangerateto-get">兑换后可获得<span>{{amount}}</span></p> -->
				<!-- {{amount}}{{to_rate}} -->
				<mu-raised-button label="提交" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" @click="submit"/>
			</div>
			<tips :contents.sync="tips"  :timeout="1000"></tips>
		</v-loged>
	</div>
</div>
</template>
<script>
	import Vue from 'vue';
	import Data from '@/libs/Data';
	import Auth from '@/Services/Auth';
	import Ajaxy from 'ajaxy';
	import configs from '@/configs/app';
	import Tips from '@/components/Tips';
	import Loged from '@/components/compact/Loged';
	import Tree from '@/components/compact/Tree';
	import accountTypes from '@/Services/AccountTypes';
	export default{
		data () {
			return Data.createMap( {
				items:{
					subject: 'Exchangerate',
					entity: 'item',
					params:{
						multi_exchange_rate:this.$route.params.id
					},
				}
			},{
				amount:'',
				Auth: Auth.proxy,tips:'',
				errors: {},
				accountTypes,

			});
		},
		metaInfo () {
			const title = this.$route.meta.title;
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		components: {
			'tips': Tips,
			'v-loged': Loged,
			'st-tree': Tree
		},
		methods: {
			// 获取兑换资金类型的名字
			formfunction(key) {
				if(this.accountTypes){
					return this.accountTypes.find(x=>String(x.data.id) === String(key))
				}
			},// 获取兑换资金类型的名字
			tofunction(key) {
				if(this.accountTypes){
					return this.accountTypes.find(x=>String(x.data.id) === String(key))
				}
			},
			// 错误提示事件
			showError( field ){
				return (
					field in this.errors
					? this.errors[field][0]
					: undefined
				)
			},
			submit() {
				this.$dialog.loading.open('兑换中...');
				if(this.amount <= 0){
					this.tips = '数量不能小于0';
					this.$dialog.loading.close();
				}else{
					Auth.then( auth=> {
						Ajaxy.post( `${configs.catShop.apiBaseUrl}accounts/multi-exchange`, {multi_rate_id:this.$route.params.id,amount:this.amount}, { token: auth.token, } )
							.when( 200, response=> {
								this.$dialog.loading.close();
								this.$dialog.toast({
									mes: '兑换成功',
									timeout: 1500,
									icon: 'success',
									callback: () => {
										this.$router.push({name:'ExchangetoRecord'});
									}
								});
							})
							.when(409, response=> {
								this.$dialog.loading.close();
								this.$dialog.toast({
									mes: '资金不足，无法兑换',
									timeout: 1500,
									icon: 'error',
									callback: () => {
										this.$dialog.toast.close();
									}
								});


							})
							.when( 422, response=> {
								this.errors = response.json.errors;
								this.$dialog.loading.close();
							} )
							.when( 401, response=>{this.$dialog.loading.close(); Auth.refreshToken().then( ()=>this.submit() )} )
						;
					} );
				}

			},
		}

	}
</script>
<style type="text/css">
	.exchangerateto-index .exchangerateto-form{background: #fff;padding-bottom:20px;padding:0 20px;}
	.exchangerateto-index  .exchangerateto-tit{line-height: 45px;font-size:16px; color:#fff;padding:20px 0;font-size:22px;}

	.exchangerateto-index  .exchangerateto-get{line-height: 44px;}
	.exchangerateto-index  .exchangerateto-get span{font-size:22px;padding:0 4px;}
	.exchangerateto-index  .mu-text-field{margin:0;}
	.exchangerateto-index .dearest {
		background: linear-gradient(rgba(103,58,183, 1), rgba(103,58,183, .75));
		color: #fff;
		padding: 10px 0;
	}
	.exchangerateto-index p.inputerror{font-size:10px;color: red; text-align: left;    white-space: pre-line;padding-bottom: 5px;}
	.exchangerateto-index  ul.exchangeto-item{margin-top:0;}
</style>
