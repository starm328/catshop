<!-- 人脉管理直属下级父组件 -->
<template>
<div class="st-viewbox">
	<div class="referrer-center st_mu-checkbox">

		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
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
			<div class="exploiters-box">
				<v-referreeitem :roleIn="roleInvalue"></v-referreeitem>
			</div>
			<yd-popup v-model="show4" position="right" width="50%">
				<yd-accordion accordion>
					<yd-accordion-item title="身份" open>
						<div style="padding:10px">
				 		    <div  v-for="role in roleIn">
				 		    	<mu-checkbox name="group" :nativeValue="String(role.data.id)" v-model="roleInvalue" :label="role.data.label" class="demo-checkbox"/>
				 		    </div>
				 		</div>
					</yd-accordion-item>
				</yd-accordion>
			  <mu-raised-button label="确定" class="demo-raised-button st-fixed fullHeigh st-btn st-button-bgt" primary fullWidth   @click="screen"/>
			</yd-popup>
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
import Loged from '@/components/compact/Loged';
import CommissionRoles from '@/Services/CommissionRoles';
import Referreeitem from '@/components/relation/Referreeitem';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
import {Accordion, AccordionItem} from 'vue-ydui/dist/lib.px/accordion';

Vue.component(Accordion.name, Accordion);
Vue.component(AccordionItem.name, AccordionItem);
Vue.component(Popup.name, Popup);
	export default{
		metaInfo () {
		    const title = this.$route.meta.title;
		    return {
		        title: title,
		        meta: [{content: title }]
		    }
		},
		beforeRouteEnter(to, from, next) {
		// 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
		// 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
		// 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
		// 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
		if(from.name=='Explreferr'){
			to.meta.isBack=true;
			//判断是从哪个路由过来的，
			//如果是详情过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
		}
			next();
		},
		data () {
			return {
				roleIn:[],
				roleInvalue:[],
				Auth: Auth.proxy,
				show4:false,
			};
		},
		mounted(){
			CommissionRoles.then(CommissionRoles=>{
					this.roleIn = CommissionRoles
			});
		},
		components: {
			'v-referreeitem': Referreeitem,
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
<style>
.referrer-center .detail_list{background: #fff}
.referrer-center .referrer-box h6,.referrer-center .exploiters-box h6{ text-indent: 10px;line-height: 35px;font-weight: normal; }
.referrer-center .mu-item-left i{font-size: 18px;color: #ccc}

.referrer-center .yd-accordion-content>div>div>div{float: left;margin-right: 5px;}
.referrer-center .yd-accordion-content>div>div::after{clear: both;display: block;content: ''}
.referrer-center button.st-fixed{left: 0;margin:0;}
.referrer-center .icon-my{position:absolute;top:20px;width: 40px;height: 40px;font-size:18px;border:1px solid #ccc;border-radius:50%; display: inline-block;text-align: center;line-height: 40px;color:#ccc;}
</style>
