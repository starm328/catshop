<!-- 订单操作组件 -->
<template>
	<div class="status-index">
		<!-- new 订单待支付 -->
		<div class="order_other_btn" v-if="statu.status.id == 'new'">
			<a @click="pay_order(statu.code,num,statu)" class="st-btn st-auxi-bgcolor">支付订单</a>
			<a @click="closeorder(num,statu.code,statu)">取消订单</a>
		</div>
		<!-- <div class="order_other_btn" v-if="statu.status.id == 'payed'">
		</div> -->

		<!-- new 订单待支付 -->
		<div class="order_other_btn" v-if="statu.status.id == 'payed'">
			<a @click="follow = true" class="st-btn st-button-bg">留言</a>
		</div>
		<!-- <div class="order_other_btn" v-if="statu.status.id == 'payed'">
		</div> -->

		<!-- closed 订单已关闭 -->
		<div class="order_other_btn" v-if="statu.status.id == 'closed'">
			<a @click="deletorder(num,statu.code)">删除订单</a>
		</div>
		<!-- <div class="order_other_btn" v-if="statu.status.id == 'payed'">
		</div> -->

		<!-- sending 订单发货中 -->
		<div class="order_other_btn" v-if="statu.status.id == 'sending'">
			<a v-if="statu.payloader.type" @click="arriveopen(i,statu.code)" class="st-btn st-auxi-bgcolor">确认收货</a>
			<a :href="'http://wap.guoguo-app.com/wuliuDetail.htm?mailNo='+statu.payloader.express_number">查看物流</a>
		</div>
		<tips :contents.sync="tips"  :timeout="1000"/>

		<!-- 支付组件 -->
		<yd-popup v-model="statu.show2" position="bottom" height="60%" class="paypopup">
			<pay-item :pay="thirdPay" :totalPrice="totalPrice" :ordercode="statu" :show="statu.show2" @showclose="closeshow(num)"  @child-say="state"></pay-item>
		</yd-popup>

		<div v-if="follow" class="no-follow">
			<div class="no-follow-bg"></div>
			<div class="no-follow-box">
				<yd-cell-group>
					<yd-cell-item>
						<yd-textarea slot="right" placeholder="请输入你的留言" maxlength="100" v-model="commenttext"></yd-textarea>
					</yd-cell-item>
				</yd-cell-group>
				<p v-html="showError('comment')" class="errors"></p>
				<mu-raised-button label="留言" class="demo-raised-button  st-subbutton st-auxi-bgcolor" primary fullWidth @click="comment(statu.code)"/>
				<i class="st-icon icon-close  sing-close"  @click="follow = false"></i>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import { Confirm,Toast, } from 'vue-ydui/dist/lib.px/dialog';
import Tips from '@/components/Tips';
import PayItem from '@/components/pay/Pay';
Vue.prototype.$dialog = {
    confirm: Confirm,
    toast: Toast,
};
	export default{
		props: {
			statu: Object,
			num:Number,
			totalPrice:String,
			length:Number
		},
		components: {
			'pay-item': PayItem,
			'tips': Tips,
		},
		data(){
			return{
				tips: '',
				thirdPay:{},
				show2:false,
				follow:false,
				commenttext: '',
				errors: {},
			}
		},
		methods:{
			showError( field ){
				return (
					field in this.errors
					? this.errors[field][0]
					: undefined
				)
			},
			state(data) {
				this.tips = data
			},
			closeshow(i){
				this.$set(this.statu,'show2',false);
			},
			// 确认取消订单确认弹出框
			closeorder(i,q,order) {
				Confirm({
					title: '提示',
					mes: '确认取消此订单',
					opts:  [
						{
							txt: '考虑一下',
							color: false,
							callback: () => {
								timeout: 1000
							}
						},
						{
							txt: '确定',
							color: true,
							callback: () => {
								this.close_order(q,order);
								timeout: 1000
							}
						}
					]
				 });
			},
			// 确认删除订单
			deletorder(i,code) {
				Confirm({
					title: '提示',
					mes: '确认删除此订单',
					opts:  [
						{
							txt: '考虑一下',
							color: false,
							callback: () => {
								timeout: 1000
							}
						},
						{
							txt: '确定',
							color: true,
							callback: () => {
								this.delet_order(i,code);
								timeout: 1000
							}
						}
					]
				 });
			},
			// 确认收货确认弹出框
			arriveopen(i,q) {
				Confirm({
					title: '提示',
					mes: '确认收货',
					opts:  [
						{
							txt: '取消',
							color: false,
							callback: () => {
								timeout: 1000
							}
						},
						{
							txt: '确定',
							color: true,
							callback: () => {
								this.arrive(q);
								timeout: 1000
							}
						}
					]
				 });
			},
			pay_order(ordercode,i,order){

				console.log(this.$route.params);
				Auth.then( auth=> {
					Ajaxy.patch( `${configs.catShop.apiBaseUrl}orders/${ordercode}/pay`, { token: auth.token, } )
						.when( 401, response=> Auth.refreshToken().then( token=> this.patch(address) ) )
						.when( 402, response=>{
							this.tips= '资金不足，支付失败';
							setTimeout(()=>this.payrouterfail(),1000);
							this.$set(this.statu,'show2',false);
						})
						.when( 404, response =>{
							this.tips= '订单不存在';
						})
						.when( 409, response =>{
							this.tips= '订单已支付，无需重复支付';
						})
						.when( 507, response =>{
							this.tips= '支付失败';
							setTimeout(()=>this.payrouterfail(),1000);
							this.$set(this.statu,'show2',false);
						})
						.when( 200, response=> {
							this.tips= '支付成功';
							setTimeout(()=>this.closeBottomSheet(order),1000);

						})
						.when( 202, response=> {
								this.$set(this.statu,'show2',true);
								console.log(this.statu);
								// this.tips= '需要抵扣确认或第三方支付';
								this.thirdPay= response.json;

						} )

					;
				} );
			},
			close_order(orderCode,order){
				Auth.then( auth=> {
					Ajaxy.patch( `${configs.catShop.apiBaseUrl}orders/${orderCode}/close`, { token: auth.token, } )
						.when( 401, response=> Auth.refreshToken().then( token=> this.patch(address) ) )
						.when( 200, response=>{
							this.tips= '订单取消成功';
							this.statu.status.id= 'closed';
							this.statu.status.label= '已关闭';
						})
					;
				} );
			},
			// 删除订单
			delet_order(i,code){
				Auth.then( auth=> {
					Ajaxy.DELETE( `${configs.catShop.apiBaseUrl}orders/${code}`, { token: auth.token, } )
						.when( 401, response=> Auth.refreshToken().then( token=> this.patch(address) ) )
						.when( 200, response=>{
							this.tips= '删除成功';
							this.$emit('deletorder',i)
						})
					;
				} );
			},
			arrive(orderCode){
				Auth.then( auth=> {
					Ajaxy.patch( `${configs.catShop.apiBaseUrl}orders/${orderCode}/arrive`, { token: auth.token, } )
						.when( 401, response=> Auth.refreshToken().then( token=> this.patch(arrive) ) )
						.when( 409, response=>{
							this.tips = response.json.message
						})
						.when( 507, response=>{
							this.tips = response.json.message
						})
						.when( 200, response=>{
							this.tips= '确认收货成功';
							this.statu.status.id= 'done';
							this.statu.status.label= '已成交';
						})
					;
				} );
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
			closeBottomSheet (order) {
				this.$router.replace({name:'Payment', params:{payod: true, money: this.totalPrice, order: order}});
			},
			payrouterfail() {
				// alert(this.show === false);
				// this.show === false;
				this.$router.replace({name:'Payment', params:{payod: false}});
			},

		},
	}
</script>
<style type="text/css">
	.status-index .no-follow .no-follow-bg{
		position: fixed;
		width: 100%;
		height: 100%;
		top:0;
		background:rgba(000,000,000,0.5);
		z-index: 99;
	}
	.status-index .no-follow .no-follow-box .yd-cell-box{margin:0;}
	.status-index .no-follow .no-follow-box .errors{
		color: #f23030;
		line-height: 35px;
		text-align: left;
		text-indent: 10px;
	}
	.status-index .no-follow .no-follow-box{
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
	.status-index .no-follow .no-follow-box i{
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
	.status-index .no-follow img{
		width: 60%;display:block;margin:0 auto;
		box-shadow: 0px 0px 3px #ccc;
		margin-top: 20px
	}
	.status-index .no-follow h5{
		line-height: 60px;
		text-align: center;font-size:18px;
		color:#ff002a;
	}
	.status-index .no-follow p{
		text-align: center;
	}
</style>
