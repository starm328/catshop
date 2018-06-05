<!-- 资金组件，资金列表组件父组件 -->
<template>
<div class="st-viewbox">
	<div class="account_list st_mu-checkbox">
		<st-header  :title='$route.params.tit + $route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
			<mu-icon-button type="danger" @click.native="show4 = true" slot="right">
				<i class="iconfont" >&#xe65c;</i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<div class="screen">
				<mu-icon-button type="danger" @click.native="show4 = true">
					<i class="iconfont" >&#xe65c;</i>
				</mu-icon-button>
			</div>
			<yd-popup v-model="show4" position="right" width="50%">
				<yd-accordion accordion>
					<yd-accordion-item title="状态" open>
						<div style="padding:10px;">
							<mu-checkbox name="group" nativeValue="giving" v-model="statusIn" :label="statuse.comment" :nativeValue="statuse.id"  class="demo-checkbox"  v-for="(statuse,i) in statuses" :key="i"/>
						</div>
					</yd-accordion-item>
					<yd-accordion-item title="类型" open>
						<div  style="padding:10px;">
								<mu-checkbox name="group" v-model="reasonIn" :label="reason.label" :nativeValue="reason.id" class="demo-checkbox" v-for="(reason,i) in reasons" :key="i"/>
						</div>
					</yd-accordion-item>
				</yd-accordion>
			  <mu-raised-button label="确定" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E"  @click="screen"/>
			</yd-popup>
			<v-acitem :details="details" :statusIn="statusIn" :reasonIn="reasonIn"></v-acitem>
		</v-loged>

	</div>
</div>

</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Acitem from '@/components/account/AccountItem';
import Loged from '@/components/compact/Loged';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
import {Accordion, AccordionItem} from 'vue-ydui/dist/lib.px/accordion';

Vue.component(Accordion.name, Accordion);
Vue.component(AccordionItem.name, AccordionItem);
Vue.component(Popup.name, Popup);
	export default{
		metaInfo () {
			const title = this.$route.params.tit + '明细';
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		data () {
			return Data.createMap( {
				reasons:{
					subject: 'AccountType',
					entity: 'reasons',
					params: {
					},
				},
				statuses:{
					subject: 'AccountType',
					entity: 'statuses',
					params: {
					},
				}
			},{
				Auth: Auth.proxy,
				show4:false,
				statusIn:[],
				reasonIn:[],
				details:[],
				page: 0,
				pageSize: 15,
			});
		},
		components: {
			'v-acitem': Acitem,
			'v-loged': Loged,
		},

		methods : {
			screen() {
				this.show4= false
			},
			//接收登陆之后的user实现返回是登陆状态
			updata(data){
				this.Auth.user = data
			},


		},
	}
</script>
<style type="text/css">
.account_list  button.st-fixed{left: 0;margin:0;}
</style>
