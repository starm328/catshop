<template>
	<div class="ticket-list st_mu-checkbox">
		<st-header  :title='$route.meta.title' fixed>
			 <a class="back-white" slot='left' @click='$router.go(-1)'></a>
			 <mu-icon-button type="danger" @click.native="show4 = true" slot="right">
				<i class="iconfont" >&#xe65c;</i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div><!--头部是绝对定位，给他加上一个相应的一个高度的盒子 -->
		<div class="screen">
			<mu-icon-button type="danger" @click.native="show4 = true">
				<i class="iconfont" >&#xe65c;</i>
			</mu-icon-button>
		</div>
		<yd-popup v-model="show4" position="right" width="50%">
			<yd-accordion accordion>
				<yd-accordion-item title="状态" open>
					<div style="padding:10px;">
						<mu-checkbox name="group" v-model="statusId" label="未使用" nativeValue="new"  class="demo-checkbox"  />
						<mu-checkbox name="group" v-model="statusId" label="已使用" nativeValue="used"  class="demo-checkbox"  />
						<mu-checkbox name="group" v-model="statusId" label="绑定的" nativeValue="binded"  class="demo-checkbox"  />
					</div>
				</yd-accordion-item>
			</yd-accordion>
			<mu-raised-button label="确定" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E"  @click="screen"/>
		</yd-popup>
		<ticket-item :statusId="statusId"></ticket-item>
	</div>
</template>

<script>
import Vue from 'vue';
import Ticket from '@/components/ticket/Item';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
Vue.component(Popup.name, Popup);
export default {
	name: 'ticket-list',
	components: {
		'ticket-item':Ticket
	},
	data () {
		return {
			show4:false,
			statusId:[]
		}
	},
	methods : {
		screen() {
			this.show4= false

		},
	},
}
</script>

<style lang="less" scoped>
.ticket-list  button.st-fixed{left: 0;margin:0;}
</style>
