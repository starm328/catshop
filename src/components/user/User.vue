<!-- 个人中心功能组件 -->
<template>
	<div class="user-center st-center">
		<!-- header开始 -->
		<st-header  :title='$route.meta.title' fixed></st-header>
		<div class="header_mar"></div>
		<!-- header 结束 -->
		<div class="top" >
				<h6>
					<!-- {{headpicture['200x200']}} -->
					<yd-lightbox v-if="headpicture&&headpicture.head_picture">
						<yd-lightbox-img :src="headpicture.head_picture['400x400']" ></yd-lightbox-img>
					</yd-lightbox>

					<div v-else>
						<i class="st-icon icon-my" ></i>
					</div>
					<router-link :to="{name: 'UserInfo'}"><i class="st-icon icon-settings st-main-icon-textcolor settings"></i></router-link>
				</h6>
				<p><span><!-- 昵称： --></span><b>{{Auth.user.username}} ID: {{Auth.user.id}}</b></p>
				<p class="identity"><span>我的身份：</span><b v-if="authlabel">{{authlabel}}</b><b v-else>加载中..</b></p>
		</div>
		<div class="st-olist margin-top-far">
			<ul>
				<li class="tools-more">
					<router-link :to="{ name: 'Order', params: { id: 'tab1',status: 'all'}}">
					<div class="item button link-arrow">
						<div class="media"><i class="st-icon icon-formfill fg-yellow"></i></div>
						<div class="content">全部订单</div>
						<div class="other fg-gray fz-medium">查看全部订单</div>
					</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="tools splitline">
			<ul>
				<li>
					<router-link :to="{ name: 'Order', params: { id: 'tab2',status: 'new-paying'}}">
					<a class="button">
						<i class="iconfont">
							&#xe661;
							<v-count :counts="new_paying"/>
						</i>
						<small>待付款</small>
					</a>
					</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'Order', params: { id: 'tab3', status: 'payed'}}">
					<a class="button">
						<i class="iconfont">
							&#xe617;
							<v-count  :counts="payed"/>
						</i>
						<small>待发货</small>
					</a>
					</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'Order', params: { id: 'tab4',status: 'sending'}}">
					<a class="button">
						<i class="iconfont">
							&#xe659;
							<v-count :counts="sending"/>
						</i>
						<small>待收货</small>
					</a>
					</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'Order', params: { id: 'tab5',status: 'done'}}">
					<a class="button">
						<i class="payiconfont">
							&#xe6a6;
							<!-- <v-count :counts="done"/> -->
						</i>
						<small>已完成</small>
					</a>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="st-button-pd"><mu-raised-button label="绑定微信"  class="submit st-subbutton st-bgcolortwo" ripple-color="white" fullWidth primary v-if="!agentsType" style="margin-top:10px;" @click="Wxlogin"/></div>
		<mu-list class="user-list">
			<router-link :to="{name:'Account'}">
				<mu-list-item title="资金管理" >
					<mu-icon value=" " slot="leftAvatar" class="st-icon icon-upstagefill"/>
					<mu-icon value=" " slot="right" class="st-icon icon-right"/>
				</mu-list-item>
			</router-link>
			<router-link :to="{name:'Relation'}">
				<mu-list-item title="人脉管理" >
					<mu-icon value=" " slot="leftAvatar" class="st-icon icon-friendfill"/>
					<mu-icon value=" " slot="right" class="st-icon icon-right"/>
				</mu-list-item>
			</router-link>
			<router-link :to="{name:'ArticleCate'}">
				<mu-list-item title="图文中心" >
					<mu-icon value=" " slot="leftAvatar" class="iconfont icon-tuwenxiangqing"/>
					<mu-icon value=" " slot="right" class="st-icon icon-right"/>
				</mu-list-item>
			</router-link>
			<router-link :to="{name:'Question'}">
				<mu-list-item title="问卷列表" >
					<mu-icon value=" " slot="leftAvatar" class="iconfont icon-plus-questionnaire"/>
					<mu-icon value=" " slot="right" class="st-icon icon-right"/>
				</mu-list-item>
			</router-link>
			<mu-list-item title="视频" @click="router">
				<mu-icon value=" " slot="leftAvatar" class="iconfont icon-plus-questionnaire"/>
				<mu-icon value=" " slot="right" class="st-icon icon-right"/>
			</mu-list-item>
			<mu-list-item title="券列表" :to="{name:'Ticket'}">
				<mu-icon value=" " slot="leftAvatar" class="iconfont icon-plus-questionnaire"/>
				<mu-icon value=" " slot="right" class="st-icon icon-right"/>
			</mu-list-item>
		</mu-list>
	</div>
</template>

<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Count from '@/components/orderlist/Count';
import CommissionRoles from '@/Services/CommissionRoles';
import {LightBox, LightBoxImg, LightBoxTxt} from 'vue-ydui/dist/lib.px/lightbox';
import Sdk from '@/Services/Sdk';
import WxLogin from '@/libs/WxLogin';
import {wxLogin as wxLoginPromise} from '@/Services/WechatAuth';
Vue.component(LightBox.name, LightBox);
Vue.component(LightBoxImg.name, LightBoxImg);
Vue.component(LightBoxTxt.name, LightBoxTxt);

export default {
	components:{
		'v-count': Count
	},
	data(){
		return Data.createMap( {
			agents:{
				subject: 'User',
				entity: 'agents',
				params: {
					token: wxLoginPromise.then(()=> Auth.then(x=>x.token)),
					tokens: Auth.then(x=>x.tokens),
				},
			},
			refernodes:{
				subject: 'Refer',
				entity: 'refernodes',
				params: {
					token: Auth.then(x=>x.token),
				},
				preprocessor:refernodes=>{
					return this.preprocessor(refernodes);
				},
			},
			headpicture:{
				subject: 'User',
				entity: 'headpicture',
				params: {
					token: Auth.then(x=>x.token),
				},
			},
		},{
			new_paying: 'new-paying',
			payed: 'payed',
			sending: 'sending',
			done: 'done',
			authlabel:'',
			Auth: Auth.proxy,
		});

	},
	computed:{
		// 验证是否绑定微信
		agentsType() {
			var agents = this.agents.filter(a=>{return a.type === 'WX'});
			return agents.length>0;
		},
	},
	methods:{
		router() {
			WxLogin('http://community.test.mallkd.cn');
		},
		// 绑定微信
		Wxlogin() {
			WxLogin()
		},
		preprocessor(refernodes) {
			refernodes.forEach(exploitee=>{
				CommissionRoles.then(CommissionRoles=>{
					this.authlabel=CommissionRoles.find(x=>x.data.id === exploitee.role).data.label //根据用户接口ID　获取身份
				})
			})
			return refernodes;
		},
	}

};
</script>

<style lang="less">
	.user-center{
		.top{
			color: #fff;    padding: 20px 0;width: 95%;margin: 10px auto;border-radius: 10px;
			ul li .item.link-arrow:after{border-color: #fff;}
			h6{width: 60px;height: 60px; line-height: 49px;text-align: center; font-size: 32px;border-radius: 100%;border: 3px solid #fff;margin: 0 auto;display: block;position: relative;
				div{width: 54px;height: 54px;  border-radius: 50%;overflow:hidden;}
				img{width:100%;}
				.settings{    position: absolute;right: -10px;top: -10px;font-size: 16px;background: #fff;width: 30px;height: 30px;border-radius: 50%;text-align: center;line-height: 30px;}
			}
			p{text-align: center;width: 100%;margin-top: 5px;
				&.identity{border:1px solid #fff;width: fit-content;display: block;margin: 4px auto;border-radius:10px;font-size:12px;padding:2px 10px;}
			}
			/*span{width:100%;display: block;text-align: right;}
			b{width: 100%;text-align: left;}*/


		}
		.user-list .mu-icon{font-size:24px;}
		.st-olist{
			ul{
				&:before {position: absolute;left: 0;right: 0;top: -1px;border-top: 1px solid #f1f1f1;content: "";	}
				li {background-color: #fff;position: relative;
					&.tools-more .item {min-height: 45px;padding-top: 2.5px;padding-bottom: 2.5px;}
					.item {min-height: 44px;padding: 10px 15px;display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;-webkit-box-align: center;-webkit-align-items: center;align-items: center;box-sizing: border-box;-webkit-box-sizing: border-box;-webkit-justify-content: space-between;justify-content: space-between;position: relative;
						.media {width: 25px;height: 25px;line-height: 25px;margin-right: .8rem;position: relative;z-index: 2;text-align: center;-webkit-box-align: center;-webkit-align-items: center;align-items: center;position: relative;overflow: hidden;display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;box-sizing: border-box;-webkit-box-sizing: border-box;-webkit-justify-content: space-between;justify-content: space-between;
							i {display: block;font-size: 25px;width: 100%;height: 100%;vertical-align: middle;color: #757575}
						}
						&.link-arrow:after {content: "";display: inline-block;-webkit-transform: rotate(45deg);transform: rotate(45deg);height: 6px;width: 6px;border-width: 2px 2px 0 0;border-color: #c8c8cd;border-style: solid;position: relative;margin-left: .3em;}
						.content {word-wrap: break-word;word-break: break-all;-webkit-box-flex: 1;-webkit-flex: 1;-ms-flex: 1;flex: 1;color:#000;}
					}
				}

			}
		}
		.tools {
			background-color: #fff;border-top: 1px solid #eee;
			&.splitline{
				ul li{
					&:after {position: absolute;right: 0;top: 15px;bottom: 15px;border-right: 1px solid #f1f1f1;content: "";}
					&:last-child:after {display: none;}
				}
			}
			.badge {position: absolute;right: -8px;top: 0;z-index: 2;padding: 1.2px 6px;border-radius: 30px;font-size: 10px;color: #fff;font-weight: 400;}
			ul {display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;-webkit-box-align: center;-webkit-align-items: center;align-items: center;box-sizing:border-box;-webkit-box-sizing:border-box; /* Safari */-webkit-justify-content: space-between;justify-content: space-between;min-height: 44px;position: relative;padding: 10px 10px;
				&:last-child:after {display: none;}
				&:after {position: absolute;left: 0;bottom: 0;right: 0;border-bottom: 1px solid #f1f1f1;content: "";}
				li {word-wrap: break-word;word-break: break-all;-webkit-box-flex: 1;-webkit-flex: 1;-ms-flex: 1;flex: 1;text-align: center;position: relative;
					.button {padding: 0;margin: 0;height: 50px;-webkit-transition: .3s;transition: .3s;
						&.active i {-webkit-transform: scale(1.15);transform: scale(1.15);}
					}
				}
			}
			i{-webkit-transition: .15s;transition: .15s;display: inline-block;width: 30px;height: 30px;margin-top: 4px;font-family: "iconfont";position: relative;font-size:25px;color: #333;font-style: normal;}
			small {display: block;font-size: 12px;margin-top: 2.5px;color:#000;}
			&.small {height: 50px;
				i {height: 20px;margin-top: 4.5px;font-size: 20px;}
			}
		}
		.mu-item-wrapper{background:#fff;position: relative;
			&::after{clear: both;display: block;content:'';height: 1px;width: 100%;position: absolute;bottom:0;background:#eee}
		}
		.mu-item.show-left{padding-left: 51px;}
		.mu-list a{color: inherit;}
	}
</style>
