<!-- 资金组件，资金统计父组件 -->
<template>
	<div class="agent-center st-center">

		<div class="top dearest_bgcolor" >
			<swiper :options="swiperOption"  ref="mySwiper">
				<!-- 这部分放你要渲染的那些内容 -->
				<swiper-slide v-for="account in nodes"  :key="account.id" v-if="account">
						<v-item :account= "account"></v-item>
				</swiper-slide>
				<div class="dearest" style="min-height:180px;">

				</div>
				<!-- 这是轮播的小圆点 -->
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<st-agentnav :id="acc && acc.id ? acc.id : nodes[0].id " v-if="acc || nodes && nodes[0]"></st-agentnav>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Item from '@/components/agent/Item';
import AgentNav from '@/components/agent/AgentNav';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		components:{
			'v-item': Item,
			swiper,
            swiperSlide,
            'st-agentnav':AgentNav
		},
		props: {
			nodes:Array
		},
		data () {
			return Data.createMap( {
			},{
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
				acc:''
			});
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
			account() {
				return this.nodes[0]
			}
		},

		methods:{
			onSlideChangeStart(swiper) {
				this.acc = this.nodes[swiper.activeIndex]
			},
		}

	}
</script>
<style lang="less">
.agent-center {

	.top{
		padding:10px 0;
	}
}
/*swiper*/

</style>
