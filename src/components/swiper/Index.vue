<!-- 产品轮播图组件 -->
<template>
<div class="S_swiper">
	<div class="swiper">
		<yd-slider autoplay="3000">
			<yd-slider-item v-if="product&&product.carousels&&product.carousels.length == 0">
					<yd-lightbox>
						<yd-lightbox-img :src="product.main_picture['400x400']" :original="product.main_picture['400x400']"></yd-lightbox-img>
					</yd-lightbox>
			</yd-slider-item>
			<yd-slider-item v-else v-for="(img,i) in product.carousels" :key="i">
					<yd-lightbox>
						<yd-lightbox-img :src="img['640x640']" :original="img['1280x1280']"></yd-lightbox-img>
					</yd-lightbox>
			</yd-slider-item>
		</yd-slider>
	</div>
</div>
</template>

<script type="text/babel">
import Vue from 'vue';
import {LightBox, LightBoxImg, LightBoxTxt} from 'vue-ydui/dist/lib.px/lightbox';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.px/slider';

Vue.component(LightBox.name, LightBox);
Vue.component(LightBoxImg.name, LightBoxImg);
Vue.component(LightBoxTxt.name, LightBoxTxt);
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
	export default {
		props: {
			product:Object,
		}
	}
</script>
<style type="text/css">
	.S_swiper .swiper img{vertical-align: bottom;width:100%;height: inherit;}
</style>
