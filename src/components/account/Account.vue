<!-- 资金组件，资金统计父组件 -->
<template>
	<div class="sales-center st-center">

		<div class="top dearest_bgcolor" >
			<swiper :options="swiperOption"  ref="mySwiper">
				<!-- 这部分放你要渲染的那些内容 -->
				<swiper-slide v-for="account in accounts"  :key="account.id" v-if="account">
						<v-balance :account= "account"></v-balance>
				</swiper-slide>
				<div class="dearest" style="min-height:180px;">

				</div>
				<!-- 这是轮播的小圆点 -->
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<div class="modular counter-3">
			<st-accountnav :type="account.type" v-if="account.type"></st-accountnav>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Balance from '@/components/account/Balance';
import AccountNav from '@/components/account/AccountNav';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		components:{
			'v-balance': Balance,
			swiper,
            swiperSlide,
            'st-accountnav':AccountNav
		},
		data () {
			return Data.createMap( {
			},{
				data:'',
				swiperOption: {
					//是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
					notNextTick: true,
					autoplay: 3000,
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					centeredSlides: true,
					paginationClickable: true,
					autoplay:false,
					spaceBetween: 30,

					onSlideChangeEnd: swiper => {
					    //这个位置放swiper的回调方法
					    this.page = swiper.realIndex+1;
					    this.index = swiper.realIndex;
					},
					onSlideChangeStart: swiper => {
						this.onSlideChangeStart(swiper)
						// console.log(this.accounts[swiper.activeIndex]);
					}
				},
				account:''
			});
		},
		computed: {
			swiper() {

				return this.$refs.mySwiper.swiper;
			},
			accounts() {
				return this.data
			}
		},
		mounted() {
			Auth.then( auth=> {
				Ajaxy.GET( `${configs.catShop.apiBaseUrl}accounts`, { token: auth.token, })
					.when( 200, response=> {
						this.data = response.json;
						this.onSild()
					} )
				;
			})

			//这边就可以使用swiper这个对象去使用swiper官网中的那些方法
		},
		methods:{
			onSlideChangeStart(swiper) {
				 this.account = this.accounts[swiper.activeIndex]
			},
			onSild() {
				this.account = this.accounts[0]
			}
		}

	}
</script>
<style>
.sales-center .top{
	padding:10px 0;
}
/*swiper*/

</style>
