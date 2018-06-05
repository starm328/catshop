<!-- 订单组件 -->
<template>
<div class="st-viewbox">
	<v-loged :needUser="true">
		<div class="order_list">
			<st-header  :title='$route.meta.title' fixed>
				<mu-icon-button @click="$router.go(-1)" v-if="url !== '/'" slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
				<mu-icon-button @click="$router.replace('/user')" v-else slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
			</st-header>

			<div class="header_mar"></div>

			<mu-tabs :value="activeTab" @change="handleTabChange">

				<mu-tab value="tab1" title="全部"/>
				<mu-tab value="tab2" title="待付款"/>
				<mu-tab value="tab3" title="待发货"/>
				<mu-tab value="tab4" title="待收货"/>
				<mu-tab value="tab5" title="完成"/>
			</mu-tabs>
			<div v-if="activeTab === 'tab1' || $route.params.id === 'tab1'" class="ordr_list_main">
				<order-item />
			</div>
			<div v-if="activeTab === 'tab2' || $route.params.id === 'tab2'" class="ordr_list_main">
				<order-itemstatus />
			</div>
			<div v-if="activeTab === 'tab3' || $route.params.id === 'tab3'" class="ordr_list_main">
				<order-itemstatus />
			</div>
			<div v-if="activeTab === 'tab4' || $route.params.id === 'tab4'" class="ordr_list_main">
				<order-itemstatus />
			</div>
			<div v-if="activeTab === 'tab5' || $route.params.id === 'tab5'" class="ordr_list_main">
				<order-itemstatus />
			</div>

		</div>
	</v-loged>

</div>

</template>
<script>
import OrderItem from '@/components/orderlist/Item';
import OrderItemstatus from '@/components/orderlist/Itemstatus';
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
	export default {
		data () {
			return {
				Auth: Auth.proxy,
				activeTab: 'tab1',
				url:null
			}
		},
		metaInfo () {
		    const title = this.$route.params.title;
		    return {
		        title: title,
		        meta: [{content: title }]
		    }
		},
		beforeRouteEnter(to, from, next){
			next(vm => {
			   vm.url = from.path;
			})
		},
		components: {
			'order-item': OrderItem,
			'order-itemstatus': OrderItemstatus,
			'v-loged': Loged,

		},
		mounted() {
			if(this.$route.params.id === 'tab1'){
				this.activeTab='tab1'
			}
			if(this.$route.params.id === 'tab2'){
				this.activeTab='tab2'
			}
			if(this.$route.params.id === 'tab3'){
				this.activeTab='tab3'
			}
			if(this.$route.params.id === 'tab4'){
				this.activeTab='tab4'
			}
			if(this.$route.params.id === 'tab5'){
				this.activeTab='tab5'
			}
		},
		methods: {
			handleTabChange (val) {
				this.activeTab = val;
				if( this.activeTab === 'tab1'){
					this.$router.replace({params: {id: "tab1",status: "all" }})
				}
				if( this.activeTab ==='tab2'){
					this.$router.replace({params: {id: "tab2",	status: "new-paying" }})
				}
				if( this.activeTab ==='tab3'){
					this.$router.replace({params: {id: "tab3",	status: "payed" }})
				}
				if( this.activeTab ==='tab4'){
					this.$router.replace({params: {id: "tab4",	status: "sending" }})
				}
				 if( this.activeTab ==='tab5'){
					this.$router.replace({params: {id: "tab5",	status: "done" }})
				}
			},
			//接收登陆之后的user实现返回是登陆状态
			updata(data){
				this.Auth.user = data;
			},
		}
	}
</script>
<style type="text/css">
	.order_list .mu-tabs{background:#fff;position: fixed;top:44px;max-width: 375px;}
	.order_list .mu-tab-link{color:#000;}
	.order_list .mu-tab-link{color:#000;}
	.order_list .mu-tab-active .mu-tab-text{color:#f00 ;}
	.order_list .ordr_list_main{margin-top: 55px;}
</style>
