<!--选择支付方式组件 -->
<template>
	<div class="pay-item">
		<div v-for="attribute in pay.thirdPay" v-if="attribute">
			<div v-if=" attribute.third_merchants.length == 1 ">
				<div class="pay-type" v-if="third_merchant.type === 'WXP' "  v-for="third_merchant in attribute.third_merchants">
					<div class="pay-wxp"><i class="iconfont">&#xe619;</i></div>
					<mu-radio label="微信支付" class="demo-radio" :nativeValue="String(third_merchant.id)" v-model="third_merchant.id" labelLeft/><br/>
				</div>
				<div class="pay-type pay-money">
					<mu-flexbox class="mt8">
						<mu-flexbox-item class="flex-demo">
						</mu-flexbox-item>
						<mu-flexbox-item class="flex-demo money">
							<span v-html="totalPrice"></span>
						</mu-flexbox-item>
					</mu-flexbox>
				</div>
				<!-- 			根据选择的支付方式付款 value= 1 微信支付		 -->
				<mu-raised-button label="确认付款" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" @click="submit(attribute.third_paying,attribute.third_merchants[0].id)"/>
			</div>
			<div v-else>
				<div class="pay-type" v-if="third_merchant.type === 'WXP' "  v-for="third_merchant in attribute.third_merchants">
					<div class="pay-wxp"><i class="iconfont">&#xe619;</i></div>
					<mu-radio label="微信支付" class="demo-radio" :nativeValue="String(third_merchant.id)" v-model="value" labelLeft/><br/>
				</div>
				<div class="pay-type pay-money">
					<mu-flexbox class="mt8">
						<mu-flexbox-item class="flex-demo">
						</mu-flexbox-item>
						<mu-flexbox-item class="flex-demo money">
							<span v-html="totalPrice"></span>
						</mu-flexbox-item>
					</mu-flexbox>
				</div>
				<!-- 			根据选择的支付方式付款 value= 1 微信支付		 -->
				<mu-raised-button label="确认付款" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" v-if="value" @click="submit(attribute.third_paying,value)"/>
			</div>
		</div>
	</div>
</template>
<script>
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import WxLogin from '@/libs/WxLogin';
export default{
	props: {
		pay: Object,
		totalPrice: String,
		ordercode:Object,
	},
	data(){
		return {
			value:'',
			tips: '',
		};
	},

	methods: {

		submit(thirdPayingCode,thirdMerchantId){
			this.$emit('showclose');
			const that = this;
			Auth.then( auth=> {
				Ajaxy.patch( `${configs.catShop.apiBaseUrl}third-pay/${thirdPayingCode}/m-${thirdMerchantId}`,{ token: auth.token,} )
					.when( 200, response=> {
						function onBridgeReady(){
						   WeixinJSBridge.invoke(
							   'getBrandWCPayRequest', {
								   "appId":response.json.appId,     //公众号名称，由商户传入
									"timeStamp":response.json.timeStamp,         //时间戳，自1970年以来的秒数
									"nonceStr":response.json.nonceStr, //随机串
									"package":response.json.package,
									"signType":response.json.signType,         //微信签名方式：
									"paySign":response.json.paySign, //微信签名
									debug:true,
								},
								function(res){
									if(res.err_msg == "get_brand_wcpay_request:ok" ) {
										that.payrouterok();
									}else{
										that.payrouterfail();
									}// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
								}
							);
						}
						if (typeof WeixinJSBridge == "undefined"){
							if( document.addEventListener ){
								document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
							}else if (document.attachEvent){
								document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
								document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
							}
						}else{
							onBridgeReady();
						}
					})
					.when( 403, response=> {
						this.$dialog.notify({
							mes: '您还未注册账户',
							timeout: 5000,
							callback: () => {
							}
						});
					} )
					.when( 418, response=> {
						this.$dialog.notify({
							mes: '您未绑定微信账号，5秒后跳转绑定再支付',
							timeout: 5000,
							callback: () => {
								WxLogin('http://' +location.hostname+  location.pathname+'?#/order/l-tab2-new-paying')
							}
						});

					} )
					.else(response=> {
						this.paystate('支付失败');
					} )
				;
			} );
		},
		paystate(data) {
			 this.$emit('child-say',data);
		},
		payrouterok() {
			// alert(this.show === false);
			this.$emit('showclose');
			this.$router.replace({name:'Payment', params:{payod: true, money: this.totalPrice, order: this.ordercode}});
		},
		payrouterfail() {
			// alert(this.show === false);
			this.$emit('showclose');
			this.$router.replace({name:'Payment', params:{payod: false}});
		},
	}
}

</script>
<style>
	.pay-item .st-fixed{position: fixed;bottom:0;}
	.pay-item .fullHeight{height: 50px;}
	.pay-type{width: 90%;margin:0 auto;display: flex;border-bottom: 1px solid #eee;padding:15px 0;}
	.pay-type label{flex: 1}
	.pay-type>div{margin-right: 10px;}
	.pay-type .pay-wxp{color: #2ca43a}
	.pay-type .pay-ali{color:#07a0f8;}
	.pay-money .money{text-align: right;font-size:22px;}
</style>
