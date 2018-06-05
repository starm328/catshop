<!-- 资金组件，资金兑换组件 -->
<template>
<div class="st-viewbox">
	<div class="exchangeto-index">
		<st-header  :title='$route.params.fromtype.label + $route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<!-- {{$route.params.exchange}}{{$route.params.fromtype}}{{$route.params.totype}} -->
						<div class="exchange-tit st-main-bgcolor">{{$route.params.fromtype.label}} <i class="iconfont">&#xe61e;</i> {{$route.params.totype.label}}</div>
						<div class="exchangeto-form" style="padding-top:14px;">
							<!-- <p>
								<mu-text-field :hintText="$route.params.fromtype" type="number" full-width disabled	/>
								<mu-text-field :hintText="$route.params.fromtype" type="number" full-width v-model="$route.params.formid" style="display:none;"/>
							</p>
							<p>
								<mu-text-field :hintText="$route.params.totype" type="number" full-width disabled	/>
								<mu-text-field :hintText="$route.params.totype" type="number" full-width v-model="$route.params.toid" style="display:none;"/>
							</p> -->

							<p>
								<mu-text-field hintText="兑换数量" type="number" full-width  v-model="amount"/>
							</p>
							<p class="exchange-get">兑换后可获得<span>{{result}}</span>{{$route.params.totype.label}}</p>
							<!-- {{amount}}{{to_rate}} -->
							<mu-raised-button label="提交" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" @click="submit($route.params.exchange.from,$route.params.exchange.to)"/>
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
	export default{
		data () {
			return {
				amount:'',
				exchange:this.$route.params.exchange,
				tips:'',
				Auth: Auth.proxy,
			}
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
		},
		computed:{
			result(){
				return this.$route.params.totype.figure(
					parseInt(
						this.$route.params.fromtype.unfigure(this.amount)
						* this.exchange.to_rate
						/ this.exchange.from_rate
					)
				);
			}
		},

		methods: {
			submit(fromtype,totype) {
				this.$dialog.loading.open('兑换中...');
				if(this.amount == ''){
					this.tips = '请输入您要兑换的数量';
					this.$dialog.loading.close();
				}else if(this.amount < this.$route.params.fromtype.figure(this.$route.params.exchange.from_rate)){
					this.tips = '兑换数量最小'+this.$route.params.fromtype.figure(this.$route.params.exchange.from_rate);
					this.$dialog.loading.close();
				}else if(this.amount > 1000000){
					this.tips = '兑换数量最大只能100000';
					this.$dialog.loading.close();
				}else{
					Auth.then( auth=> {
						Ajaxy.post( `${configs.catShop.apiBaseUrl}accounts/t-${fromtype}/exchange-to/t-${totype}`, {amount:this.amount}, { token: auth.token, } )
							.when( 200, response=> {
								this.tips = '兑换成功';
								this.$dialog.loading.close();
							})
							.when(409, response=> {
								this.tips = '资金不足，无法兑换';
								this.$dialog.loading.close();

							})
							.when( 422, response=> {
								this.tips = '账户类型不存在或汇率不存在';
								this.$dialog.loading.close();
							} )
							.when( 401, response=> {this.$dialog.loading.close();Auth.refreshToken().then( ()=>this.submit() )} )
						;
					} );
				}

			},
			minstep() {
				// if(z(this.amount > '100000')){
				// 	z(this.amount === '100000')
				// }
				// this.amount = z(Math.min(Math.max(this.amount,this.$route.params.fromtype.figure(this.$route.params.exchange.from_rate)),1000000))
			},
		}
	}
</script>
<style type="text/css">
	.exchangeto-index .exchangeto-form{background: #fff;padding-bottom:20px;padding:0 20px;}
	.exchangeto-index  .exchange-tit{text-align: center;line-height: 45px;font-size:16px;color:#fff;padding:20px 0;font-size:22px;}
	.exchangeto-index  .exchange-tit i{margin:0 10px;}
	.exchangeto-index  .exchange-get{line-height: 44px;}
	.exchangeto-index  .exchange-get span{font-size:22px;padding:0 4px;}
	.exchangeto-index  .mu-text-field{margin:0;}
</style>
