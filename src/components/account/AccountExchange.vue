<!-- 资金组件，资金兑换汇率展示组件 -->
<template>
<div class="st-viewbox">
	<div class="exchange-index">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>

		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<mu-tabs :value="activeTab"  @change="handleTabChange">
				<mu-tab :value="'tab' + accounttype.data.id" :title="accounttype.data.label" v-for="accounttype in accounttypes" :key="accounttype.data.id"/>
			</mu-tabs>
			<div v-if="activeTab === 'tab' + accounttype.data.id" class="exchange-main"  v-for="accounttype in accounttypes" :key="accounttype.data.id">

				<div class="exchange-list" v-for="(exchange,i) in exchanges" :key="i" v-if="exchange && exchange.from == accounttype.data.id">
						<mu-flat-button label="" class="demo-flat-button"  :to="{name: 'AccountExto', params: { exchange:exchange,fromtype:fromtype[i],totype:totype[i],fromid:exchange.from,toid:exchange.to}}">
							<div class="exchange-tit">{{fromtype[i].label}} <i class="iconfont">&#xe61e;</i> {{totype[i].label}}</div>
							<div class="exchange-content fg-gray">兑换比例 = <span v-html="showAmount(exchange.from_rate,fromtype[i])">{{}}</span> : <span v-html="showAmount(exchange.to_rate,totype[i])"></span></div>
							<div class="exchange-btn st-auxi-bgcolor">点击兑换</div>
						</mu-flat-button>
				</div>
			</div>
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
	import accountTypes from '@/Services/AccountTypes';
	import PriceCalculator from '@/Services/PriceCalculator';
	import Loged from '@/components/compact/Loged';
	import {Tab, TabPanel} from 'vue-ydui/dist/lib.px/tab';

	Vue.component(Tab.name, Tab);
	Vue.component(TabPanel.name, TabPanel);
	export default{
		data () {
			return Data.createMap( {
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
			},{
				accounttypes:'',
				fromtype:[],
				totype:[],
				showAmount:PriceCalculator.showAmount,
				activeTab: 'tab1',
				Auth: Auth.proxy,
			});
		},
		components: {
			'v-loged': Loged,
		},
		metaInfo () {
			const title = this.$route.meta.title;
			return {
			    title: title,
			    meta: [{content: title }]
			}
		},
		mounted(){
			accountTypes.then(accountTypes=>{
				this.accounttypes = accountTypes
			});
			this.activeTab = this.$route.params.id

		},
		methods: {
			preprocessor(exchanges) {
				exchanges.forEach(exchanges=>{
					accountTypes.then(accountTypes=>{
						this.fromtype.push(accountTypes.find(x=>x.id === exchanges.from))
						this.totype.push(accountTypes.find(x=>x.id === exchanges.to))
					})
				})
				return exchanges;
			},
			handleTabChange (val) {
				this.activeTab = val;
				if( this.activeTab === val){
					this.$router.replace({params: {id: val}})
				}
			},
		}
	}
</script>
<style type="text/css">
	.exchange-index .exchange-list{background: #fff;width:100%;margin:5px auto 0 auto;height: 0;padding-bottom: 107px;}
	.exchange-index .exchange-tit{text-align: center;line-height: 45px;font-size:16px;}
	.exchange-index .exchange-tit i{margin:0 10px;}
	.exchange-index .exchange-content{text-align: center;font-size:14px;line-height: 30px;}
	.exchange-index .mu-flat-button{height: auto;width: 100%;line-height: normal;}
	.exchange-index .mu-flat-button-wrapper{display: block;}
	.exchange-index .yd-tab-panel{background: none}
	.exchange-index .mu-tabs{background:#fff;position: fixed;top:44px;max-width: 375px;}
	.exchange-index .mu-tab-link{color:#000;}
	.exchange-index .mu-tab-link{color:#000;}
	.exchange-index .mu-tab-active .mu-tab-text{color:#f00 ;}
	.exchange-index .exchange-main{margin-top: 55px;}
	.exchange-index .exchange-btn{text-align: center;color:#fff;line-height: 30px;}
</style>
