<!-- 地址组件，下单时选择收货地址组件 -->
<template>
<div class="st-viewbox">
	<div class="address-select">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
			<router-link :to="{name: 'AddressaddSelct',params: {selname:$route.params.selname,product_id:$route.params.id,quantity:$route.params.quantity,checkId:$route.params.checkId}}">
				<mu-icon-button slot="right">
					<i class="iconfont">&#xe616;</i>
				</mu-icon-button>
			</router-link>
		</st-header>
		<div class="header_mar"></div>
		<div class="screen">
				<router-link :to="{name: 'AddressaddSelct',params: {selname:$route.params.selname,product_id:$route.params.id,quantity:$route.params.quantity,checkId:$route.params.checkId}}">
					<mu-icon-button type="danger">
							<i class="iconfont" >&#xe616;</i>
					</mu-icon-button>
				</router-link>
		</div>
		<v-loged :needUser="true">
			<address-item ref="choseadd"  @child-info="get"></address-item>
			<mu-raised-button label="下一步" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E"  @click="choseadd" v-if="myaddid > 0 && chosecar ==1"/>
			<mu-raised-button label="下一步" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E"  @click="chosecaradd" v-if="myaddid > 0 && chosecar ==2 || $route.params.checkId"/>
		</v-loged>

	</div>
</div>
</template>
<script>
import Vue from 'vue';
import {Popup} from 'vue-ydui/dist/lib.px/popup';

Vue.component(Popup.name, Popup);
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import AddressItem from '@/components/address/AddressItem';
export default{
	data() {
		return {
			show2: false,
			myaddid:'',
			chosecar:1,
			Auth: Auth.proxy,
		}
	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},

	mounted() {

		if(undefined !== this.$route.params.id){
		}else{
			this.$router.go(-1);
		}
	},
	components: {
		'address-item': AddressItem,
		'v-loged': Loged,
	},
	beforeRouteEnter(to, from, next){
		if(from.path == '/cart'){
			next(vm => {
			   vm.chosecar = 2;
			})
		}else if(from.path == '/address/selectadd'){
			next(vm => {
				z(vm.$router.go(-1))
			})
		}
		next(vm => {
		})
	},
	methods: {
		AddClose() {
			this.show2 = false;
		},
		get(id){
          this.myaddid = id;
          console.log(id);
        },
		choseadd() {
			this.$refs.choseadd.SelectAdd(this.myaddid);
		},
		chosecaradd() {
			this.$refs.choseadd.SelectCarAdd(this.myaddid);
		},
		//接收登陆之后的user实现返回是登陆状态
		updata(data){
			this.Auth.user = data;
		},
	},
}
</script>
<style type="text/css">
	.mkd_ui.wx  .address-select .screen{bottom:60px;}
	.address-select .add-popup .m-popup.popup-bottom{max-width: 375px;margin:0 auto;left:0;}
</style>
