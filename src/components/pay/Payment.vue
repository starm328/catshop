<!-- 支付结果组件 -->
<template>
<div class="st-viewbox">
	<div class="payment_index">
		<v-loged :needUser="true">
			<st-header  :title='$route.meta.title' fixed>

			</st-header>

			<div class="header_mar"></div>
			<div class="payment">
				<!-- 			根据支付（pay）页面路由传递过来的参数 显示支付状态		 -->
				<div v-if="$route.params.payod === false">
					<div class="payment_icon"><img src="./images/payment_fail.png" width="200"></div>
				</div>
				<!-- 			根据支付（pay）页面路由传递过来的参数 显示支付状态		 -->
				<div v-if="$route.params.payod === true">
					<div class="payment_icon"><img src="./images/payment_success.png" width="200px"></div>
				</div>
				<div class="payment_tit">
					<div v-if="$route.params.payod === false">
						<h5 class="st-auxi-pricecolor">支付失败!</h5>
					</div>
					<div v-if="$route.params.payod === true">
						<h5 class="st-auxi-pricecolor">支付成功!</h5>
						<p>本次消费共消费<span v-html="$route.params.money" class="st-auxi-pricecolor"></span></p>
					</div>
				</div>

					<!-- 			根据支付（pay）页面路由传递过来的参数 显示购买的产品		 -->
				<div class="payment_list"  v-if="$route.params.payod === true">
					<div v-for="item in $route.params.order.orders">
						<dl  v-for="pro in item.items">
							<dt><img :src="pro.picture['200x200']"></dt><dd><p>产品名称:<em>{{pro.product_title}}</em> </p></dd>
						</dl>
					</div>
					<dl v-for="item in $route.params.order.items">
						<dt><img :src="item.picture['200x200']"></dt><dd><p>产品名称:<em>{{item.product_title}}</em><!-- 产品金额: --> </p></dd>
					</dl>
				</div>
				<div class="payment_btn">
				<mu-flexbox>
					<!-- 			根据支付（pay）页面路由传递过来的参数 显示已经支付完成		 -->
					<mu-flexbox-item class="flex-demo"  v-if="$route.params.payod === true">
						<router-link :to="{ name: 'Order', params: { id: 'tab3', status: 'payed'}}" replace>
							<mu-raised-button label="查看订单" class="demo-raised-button st-auxi-borderbgcolor" fullWidth />
						</router-link>
					</mu-flexbox-item>
								<!-- 根据支付（pay）页面路由传递过来的参数 显示支付没有完成 -->
					<mu-flexbox-item class="flex-demo"  v-if="$route.params.payod === false">
						<router-link :to="{ name: 'Order', params: { id: 'tab2', status: 'new-paying'}}" replace>
							<mu-raised-button label="查看订单" class="demo-raised-button st-auxi-borderbgcolor" fullWidth />
						</router-link>
					</mu-flexbox-item>
					<mu-flexbox-item class="flex-demo" v-if="$route.params.payod === true&&$route.params.order.orders&&$route.params.order.orders.length  == 1 || $route.params.payod === true&&$route.params.order.items&&$route.params.order.items.length == 1">
							<mu-raised-button label="留言" class="demo-raised-button st-auxi-borderbgcolor" fullWidth  @click="follow = true"/>
					</mu-flexbox-item>
					<mu-flexbox-item class="flex-demo">
						<router-link :to="'/'" replace>
							<mu-raised-button label="返回首页" class="demo-raised-button st-auxi-bgcolor" primary fullWidth   color="#fff"/>
						</router-link>
					</mu-flexbox-item>
				  </mu-flexbox>
				</div>
				<div class="wenxin">
					温馨提示：我们不会以订单异常、系统升级等为由，要求您点击任何链接进行退款操作。
				</div>

				<!-- 留言弹出框 -->
				<div v-if="follow" class="no-follow">
					<div class="no-follow-bg"></div>
					<div class="no-follow-box">
						<yd-cell-group>
							<yd-cell-item>
								<yd-textarea slot="right" placeholder="请输入你的留言" maxlength="100" v-model="commenttext"></yd-textarea>
							</yd-cell-item>
						</yd-cell-group>
						<p v-html="showError('comment')" class="errors"></p>
						<mu-raised-button label="留言" class="demo-raised-button  st-subbutton" primary fullWidth @click="comment($route.params.order.code)"/>
						<i class="st-icon icon-close  sing-close"  @click="follow = false"></i>
					</div>
				</div>
			</div>
		</v-loged>

	</div>
</div>


</template>
<script>
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
	export default{
		components: {
			'v-loged': Loged,
		},

		metaInfo () {
		    const title = '支付状态';
		    return {
		        title: title,
		        meta: [{content: title }]
		    }
		},
		data(){
			return {
				Auth: Auth.proxy,
				follow:false,
				commenttext: '',
				errors: {},
			};
		},
		methods: {
			showError( field ){
				return (
					field in this.errors
					? this.errors[field][0]
					: undefined
				)
			},
			comment(orderCode){
				Auth.then( auth=> {
					Ajaxy.put( `${configs.catShop.apiBaseUrl}orders/${orderCode}/comment`,{comment:this.commenttext}, { token: auth.token, } )
						.when( 401, response=> Auth.refreshToken().then( token=> this.patch(arrive) ) )
						.when( 404, response=>{
							this.tips = '订单不存在'
						})
						.when( 200, response=>{
							this.tips = '留言成功',
							this.follow = false
						})
						.when( 422, response=>{
							this.errors= response.json.errors;
						})

					;
				} );
			},
		}


	}
</script>
<style type="text/css">
	.payment_index .payment {background:#FFF;position: absolute;min-height: 100%;width: 100%;top:0;max-width: 375px;}
	.payment_index .payment .payment_icon{text-align: center;width: 100%;margin:50px auto 0 auto;}
	.payment_index .payment .payment_icon img{display: block;margin:0 auto;}
	.payment_index .payment .payment_tit{text-align: center;}
	.payment_index .payment .payment_tit h5{font-size:20px;font-weight: normal;line-height: 42px;}
	.payment_index .payment .payment_tit p{color:#2d2d2d;font-size:14px;}

	.payment_index .payment .wenxin{color:#929292;padding:0 40px;margin-top: 20px;text-align: center;line-height: 25px;}
	.payment_index .payment .payment_btn{padding:0 40px;margin:25px auto;}
	.payment_index .payment .mu-raised-button{box-shadow: none;border-radius: 20px;}
	.payment_index .payment .payment_list{width: 90%;border:1px dashed #f2f2f2;margin:0 auto;padding:10px;margin-top: 28px;}
	.payment_index .payment .payment_list dl{display: flex;}
	.payment_index .payment .payment_list dl dt{width: 30px;height: 30px;}
	.payment_index .payment .payment_list dl img{width: 30px;height: 30px;border-radius: 50%;}
	.payment_index .payment .payment_list dl dd{font-size:0;line-height: 30px;margin-left:10px;flex:1;}
	.payment_index .payment .payment_list dl dd p{font-size:13px;display: flex;color:#8e8e93;}
	.payment_index .payment .payment_list dl dd em{max-width:100px;line-height:30px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 1; -webkit-box-orient: vertical;word-break: break-all;text-overflow: ellipsis;color:#000;padding:0 5px;}
	.payment_index .payment .payment_list dl dd p span{color:#000;padding:0 5px;}

	.payment_index .no-follow .no-follow-bg{
		position: fixed;
		width: 100%;
		height: 100%;
		top:0;
		background:rgba(000,000,000,0.5);
		z-index: 99;
	}
	.payment_index .no-follow .no-follow-box .yd-cell-box{margin:0;}
	.payment_index .no-follow .no-follow-box .errors{
		color: #f23030;
		line-height: 35px;
		text-align: left;
		text-indent: 10px;
	}
	.payment_index .no-follow .no-follow-box{
		background: #fff;
		width: 80%;
		border-radius: 10px;
		margin-top:30%;
		position: fixed;
		z-index: 100;
		bottom:20%;
		left:50%;
		margin-left:-40%;
	}
	.payment_index .no-follow .no-follow-box i{
		position: absolute;
		right: -10px;
		top:-10px;
		display: block;
		background: #fff;
		padding:10px;
		box-shadow: 0px 0px 2px rgba(65, 65, 65, 0.28);
		border-radius:50%;
		z-index: 222
	}
	.payment_index .no-follow .mu-raised-button{border-radius: 0}
	.payment_index .no-follow img{
		width: 60%;display:block;margin:0 auto;
		box-shadow: 0px 0px 3px #ccc;
		margin-top: 20px
	}
	.payment_index .no-follow h5{
		line-height: 60px;
		text-align: center;font-size:18px;
		color:#ff002a;
	}
	.payment_index .no-follow p{
		text-align: center;
	}
</style>
