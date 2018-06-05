<!-- 分润明细列表组件 -->
<template>
	<div class="st-viewbox ">
		<div class="commission-index st-center st_mu-radio">
			<st-header  :title='$route.meta.title' fixed>
				<mu-icon-button   @click="$router.go(-1)" slot="left">
					<i class="st-icon icon-back"></i>
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
								<mu-radio name="group" nativeValue="giving" v-model="statusIn" :label="item.label" :nativeValue="item.name"  class="demo-checkbox" v-for="item in items" :key="item.id"/>
							</div>
						</yd-accordion-item>
					</yd-accordion>
				  <mu-raised-button label="确定" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E"  @click="screen"/>
				</yd-popup>
				<st-item :statusIn="statusIn"/>
			</v-loged>
		</div>
		<copyright></copyright>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import Item from '@/components/account/commissions/ListItem'
	export default{
		components: {
			'v-loged': Loged,
			'copyright': copyright,
			'st-item': Item,
		},
		metaInfo () {
			const title = this.$route.meta.title;
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		data() {
			return Data.createMap( {
				// 分润类型数据
				items:{
					subject: 'Basic',
					entity: 'commissioncategorie',
				},
			},{
				Auth: Auth.proxy,
				show4:false,
				statusIn:'',
			});
		},
		methods: {
			screen() {
				this.show4= false
			},
		}
	}
</script>
<style lang="less">
	.commission-index  button.st-fixed{left: 0;margin:0;}
</style>
