<!-- 第三方账号绑定组件子组件 -->
<template>
<div>
	<yd-cell-group>
		<yd-cell-item v-for="(agent,i) in agents" v-if="agent" :key="i" type="link" :href="agent.is_current?'':{name:'UserAgentShow',params:{type:agent.type,label:agent.label,id:agent.id}}" :class="{active:agent.is_current||agent.is_logind}">
			<span slot="left" v-if="agent.type === 'WX'">微信<em v-if="agent.is_current" class="current">当前登录</em></span>
			<span slot="left" v-if="agent.type === 'MB'">手机<em v-if="agent.is_current" class="current">当前登录</em></span>
			<span slot="right">{{agent.label}}</span>
		</yd-cell-item>
		<yd-cell-item v-if="agents.length == 0">
			<span slot="left">未绑定任何第三方账号</span>
		</yd-cell-item>
	</yd-cell-group>
</div>
</template>

<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Vlogin from '@/components/login/Index';
import Vagent from '@/components/user/Agent';
import UserSign from '@/components/sign/Index';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';

Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
export default {
	components:{
		'v-login': Vlogin,
		'user-sign': UserSign,
		'v-agent': Vagent,
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
			agents:{
				subject: 'User',
				entity: 'agents',
				params: {
					token: Auth.then(x=>z(x.token)),
					tokens: Auth.then(x=>x.tokens),
				},

			}
		},{
			Auth: Auth.proxy,
		});

	},
	methods : {
		//接收登陆之后的user实现返回是登陆状态
		updata(data){
			this.Auth.user = data
		},

	},
	　
};
</script>

<style type="text/css">
	.user-agents .yd-cell-title{background-color: #f1f1f1}
	.user-agents .yd-cell-item.active{background:#ddd;}
	.user-agents .yd-cell-item.active *{color:#000;}
	.user-agents .active .yd-cell-left em.current{margin-left: 10px;font-size:12px;color:#999;}
</style>
