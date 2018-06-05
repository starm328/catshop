<!-- 地址组件，地址列表子组件 -->
<template>
	<div class="address-item">
		<div v-show="addresses.length === 0">
			<st-nodata content="暂无地址，请添加">
					<p>
						<router-link :to="{name: 'AddressaddSelct',params: {selname:$route.params.selname,product_id:$route.params.id,quantity:$route.params.quantity,checkId:$route.params.checkId}}"  v-if="$route.params.selname === 'user/address'">
							<span class="button default border-radius-near red mini border-radius-30px">新增地址</span>
						</router-link>
						<router-link :to="{name: 'Addressadd'}"  v-else>
							<span class="button default border-radius-near red mini border-radius-30px">新增地址</span>
						</router-link>
					</p>
			</st-nodata>
		</div>
		<div class="address-center" v-for="(address, i) in addresses" v-if="address" >
				<mu-flexbox class="mt8" >
					<mu-flexbox-item class="flex-demo">
						{{address.consignee}}
					</mu-flexbox-item>
					<mu-flexbox-item class="flex-demo"  style="text-align:right">
						{{address.phone}}
					</mu-flexbox-item>
				</mu-flexbox>
				<mu-flexbox class="mt8" orient="vertical"  v-if="address.area !== null">
					<mu-flexbox-item order="0" class="flex-demo" >
						<span v-if="address.is_current == 1 && !$route.meta.edit " style="color:rgb(255, 78, 78)">[默认地址]</span>{{address.area.long_label.join('')}}{{address.address}}
					</mu-flexbox-item>
				</mu-flexbox>
				<mu-flexbox class="mt8 border-top"  v-if="!$route.meta.edit">
					<mu-flexbox-item class="flex-demo">

						<mu-radio label="选择地址" name="group" class="demo-radio"  @change="setadd(address.id)" :value="''+address.is_current"  nativeValue="1"  />
					</mu-flexbox-item>
				</mu-flexbox>
				<mu-flexbox class="mt8 border-top"  v-if="$route.meta.edit">
					<mu-flexbox-item class="flex-demo">
						<mu-radio label="默认地址" name="group" class="demo-radio"  @change="switchIsCurrent(address.id,i)" :value="''+address.is_current" @input="val=>{address.is_current=+val}"  nativeValue="1" />
					</mu-flexbox-item>
					<mu-flexbox-item class="flex-demo address_gonn" style="text-align:right">
						<span @click="deleteOpen(i,address.id)"><i class="iconfont">&#xe613;</i>删除</span>
						<span><router-link :to="{name: 'Addressedit',params: {address: addresses[i]}}"><i class="iconfont">&#xe616;</i>编辑</router-link></span>
					</mu-flexbox-item>
				</mu-flexbox>

		</div>
		<yd-popup :value="!!editing" @input="val=>{editing=val}" position="bottom" height="100%" class="address-popup">
			<address-put @close="editClose" v-if="editing" :address="editing"></address-put>
		</yd-popup>
		<tips :contents.sync="tips"  :timeout="3000"><p><i class="iconfont">&#xe674;</i></p></tips>
		<div class="st-pop-loading"  v-if="loading"><div class="yd-loading-icon st-loading " ></div></div>

	</div>
</template>
<script>
import Vue from 'vue';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog';
import Data from '@/libs/Data';
import Ajaxy from 'ajaxy';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
import Tips from '@/components/Tips';
import AddressPut from '@/components/address/AddressPut';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import AddressDelete from '@/Services/Address';
import Order from '@/Services/Order';
Vue.component(Popup.name, Popup);
export default{
	props:{
		getdata:String,
		show:Boolean
	},
	data(){
		return Data.createMap( {
			addresses: {
				// 对应 Data 目录下的文件
				subject: 'Address',
				// 对应其中的具体数据
				entity: 'list',
				// 参数
				params: {
					token: Auth.then(x=>x.token),
				},
			},
		},{
			acting: true,
			dialog: false,
			editing: null,
			tips:'',
			loading:false,
		});
	},
	components: {
		'address-put': AddressPut,
		'tips': Tips,
	},
	updated: function() {
		this.$emit('child-info',this.addresses[0].id);
	},
	mounted: function () {
		this.$nextTick(function () {
		  this.$on('SelectAdd', function () {
		  })
		});
		this.$nextTick(function () {
		  this.$on('SelectCarAdd', function () {
		  })
		});
		this.$nextTick(function () {
		  this.$on('Updata', function () {
		  })
		});
	},
	methods: {
		Updata(data){
			alert('11');
			z(Vue.set(this.addresses,data))
		},
		deleteOpen(i,q) {
			Confirm({
				title: '提示',
				mes: '确认把此产品从购物车中移除',
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
							this.deleteAddress(q);
							timeout: 1000
						}
					}
				]
			});
		},
		setadd(id){
			z(id)
				this.$emit('child-info',id);
		},
		SelectAdd(i) {
			this.$dialog.loading.open('提交中');
			Order.add(this.$route.params.id,this.$route.params.quantity,'user/address',i,p=>{
				return p.when(409, response=>{
					this.$dialog.loading.close();
					this.tips = response.json.message
				}).when( 200, response=>{
					this.$dialog.loading.close();
				this.$router.replace({name: 'Pay', params:{json: response.json}});
			})
			})

		},
		SelectCarAdd(i){
			// Order.continuees([{type:'user/address', id:i}]).then( ()=> {

			// } ).catch( () =>{

			// });
			this.$dialog.loading.open('提交中');
			Order.addcart(this.$route.params.id,this.$route.params.checkId,[{type:'user/address',id:i}],p=>{
				return p.when(409, response=>{
					this.tips = response.json.message;
					this.$dialog.loading.close();
				}).when( 200, response=>{
				this.$dialog.loading.close();
				this.$router.replace({name: 'Pay', params:{json: response.json}});
			})
			})
		},
		switchIsCurrent(current,i) {
			var that = this;
			Auth.then( auth=> {
				Ajaxy.patch( `${configs.catShop.apiBaseUrl}addresses/${current}/set-current`, { token: auth.token, } )
					.when( 401, response=> Auth.refreshToken().then( token=> this.submit() ) )
					.when( 200, response=> {
					} )

				;
			} );
		},
		editOpen (i) {
			this.editing = this.addresses[i];

		},
		editClose () {
			this.editing = null;
		},
		deleteAddress(addid){
			Auth.then( auth=> {
				Ajaxy.DELETE( `${configs.catShop.apiBaseUrl}addresses/${addid}`, { token: auth.token, } )
					.when( 401, response=> Auth.refreshToken().then( token=> this.deleteAddress(address) ) )
					.when( 200, response=> {
						this.addresses.forEach((address,i)=>{
							if(address.id == addid){
								this.addresses.splice(i,1);
							}
						});
					} )
				;
			} );
		},
	},

}
</script>
<style type="text/css">
.address-item  .address_gonn span{float: right;margin-right: 5px;color: #999}
.address-item  .address_gonn span a{color: #999}
.address-item  .address_gonn span i{margin-right: 5px;}
.address-item {padding-bottom: 50px;}
.address-item .address-center{background:#fff;margin-bottom:10px;padding:10px; position: relative;}
.address-item .address-center .selectadd{position: absolute;top:0;width: 100%;height: 100%}
.address-item .address-center .mu-radio-icon{margin-right: 2px;}
.address-item .address-center .border-top{border-top:1px solid #eee;padding-top: 10px;margin-top: 10px;}
.address-item .address-center .mu-flat-button{float: right;min-width: 55px;max-width: 55px}
.address-item .address-center .mu-flat-button .mu-icon{font-size:12px;}
.address-item .address-center .mu-flat-button .mu-flat-button-label{padding-right:0;}
.address-item .address-center .mu-flat-button .mu-flat-button-wrapper{color: #9e9e9e}
.address-popup{max-width: 375px;}
.address-popup .m-popup.popup-bottom{max-width: 375px;margin:0 auto;left:0;}
.deleteAddress{display: none;}

.address-item .address-center .mu-flat-button-label{padding-left:0 !important;}
.address-item  .yd-popup{max-width: 375px;margin-left: -187.5px;left:50%;}
</style>
