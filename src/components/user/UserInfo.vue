<!-- 个人资料组件 -->
<template>
<div class="st-viewbox">
	<div class="user-info">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<div class="st-lay">
				<ul >
					<li>
						<router-link to="/user/imginfo">
							<div class="item-file arrow">
								<div class="file">
								</div>
								<div class="large">
									<p v-if="!(headpicture.head_picture)"><i class="st-icon icon-my" ></i></p>
									<img :src="headpicture.head_picture['200x200']" v-else>
								</div>
								<div class="content"></div>
								<div class="other"><span class="fz-20px ">头像</span></div>
							</div>
						</router-link>
					</li>
				</ul>
				 <mu-list>
				<!-- 	<router-link :to="{name:'UserInfos'}">
						<mu-list-item title="个人信息">
							<mu-icon value=" " slot="right" class="st-icon icon-right"/>
						</mu-list-item>
					</router-link> -->
					<router-link :to="{name: 'Address'}">
						<mu-list-item title="地址管理">
							<mu-icon value=" " slot="right" class="st-icon icon-right"/>
						</mu-list-item>
					</router-link>
					<router-link :to="{name: 'UserAgents'}">
						<mu-list-item title="第三方账号">
							<mu-icon value=" " slot="right" class="st-icon icon-right"/>
						</mu-list-item>
					</router-link>
					<router-link :to="{name: 'RestPassword'}">
						<mu-list-item title="修改密码">
							<mu-icon value=" " slot="right" class="st-icon icon-right"/>
						</mu-list-item>
					</router-link>
					<router-link :to="{name: 'ExeternalAccount'}">
						<mu-list-item title="提现账户">
							<mu-icon value=" " slot="right" class="st-icon icon-right"/>
						</mu-list-item>
					</router-link>


				</mu-list>
				<div class="st-button-pd"><mu-raised-button label="退出登陆" @click="logout" class="submit st-subbutton st-auxi-bgcolor" ripple-color="white" fullWidth primary/></div>
			</div>

			<!-- <div class="st-layout margin-top-far">
				<mu-text-field hintText="姓名" type="text" fullWidth style="margin-top:14px;"/>
				<mu-text-field hintText="手机" type="text" fullWidth style="margin-top:14px;"/>
			</div> -->

			<copyright></copyright>
		</v-loged>


	</div>
</div>
</template>

<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Sdk from '@/Services/Sdk';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import copyright from '@/components/compact/Copyright'
import Vlogin from '@/components/login/Index';
import UserSign from '@/components/sign/Index';
import User from '@/components/user/User';
import Loged from '@/components/compact/Loged';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';

Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
export default {
	components: {
		'v-loged': Loged,
		'copyright': copyright,

	},
	data() {
		return Data.createMap( {
			headpicture:{
				subject: 'User',
				entity: 'headpicture',
				params: {
					token: Auth.then(x=>x.token),
				},
			},
		},{

		});

	},
	mounted() {
		document.title = this.$route.meta.title
	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},
	methods:{
		logout(){
			sessionStorage.removeItem('missiontoken');
			Auth.logout();

		}
	}

};
</script>

<style type="text/css">
.user-info{width: 100%}
.user-info .st-lay{min-height:400px}
.user-info .st-layout{background:#fff;}
.user-info  .st-fixed{position: fixed;bottom:0;max-width: 375px;left:50%;margin-left: -187.5px;}
.user-info  .fullHeight{height: 50px;}
.user-info  .st-lay ul{background:#fff;}
.user-info  .st-lay ul li .item-file{display: flex;align-items: center;position: relative;padding: 10px 15px;}
.user-info  .st-lay ul li .item-file .file{width:100%;height:100%;position: absolute;left: 0;top:0;}
.user-info  .st-lay ul li .item-file .large{width: 70px;height: 70px;border-radius:50%;overflow: hidden;margin-right: 10px;}
.user-info  .st-lay ul li .item-file p{width: 70px;height: 70px;border-radius:50%;overflow: hidden;margin-right: 10px;font-size:34px;background: #eee;text-align: center;line-height: 70px;color:#ccc;}
.user-info  .st-lay ul li .item-file .large img{width: 100%}
.user-info  .st-lay ul li .item-file .content{flex: 1;}
.user-info  .st-lay ul li .item-file .other{color: #525252}
.user-info  .st-lay ul li .item-file.arrow:after {
    content: "";
    display: inline-block;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    position: relative;
    margin-left: 10px;
}
.user-info  .st-lay input[type=file] {
    position: absolute;
    clip: rect(1px,1px,1px,1px);
}
.user-info .user-agents{margin-top: 10px}

.user-info .mu-item-wrapper {
    background: #fff;
    position: relative;
}
.user-info .mu-list a {
    color: inherit;
}
.user-info  .mu-item-wrapper::after {
    clear: both;
    display: block;
    content: '';
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: #eee;
}
</style>
