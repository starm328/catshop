<!-- 第三方账号绑定组件父组件 -->
<template>
<div class="st-viewbox">
	<div class="user-agents">
			<st-header  :title='$route.meta.title' fixed>
				<mu-icon-button  @click="$router.go(-1)" slot="left">
					<i class="st-icon icon-back"></i>
				</mu-icon-button>
			</st-header>
			<div class="header_mar"></div>
			<v-loged :needUser="true">
				<v-agent />
			</v-loged>
	</div>
</div>
</template>

<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Vagent from '@/components/user/Agent';
import Loged from '@/components/compact/Loged';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';

Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
export default {
	components:{
		'v-agent': Vagent,
		'v-loged': Loged,
	},
	data() {
		return{
			Auth: Auth.proxy,
		}

	},
	　
};
</script>

<style type="text/css">
	.user-agents .yd-cell-title{background-color: #f1f1f1}
	.user-agents .yd-cell-item.active{background:#ddd;}
	.user-agents .yd-cell-item.active *{color:#000;}
	.user-agents .active .yd-cell-left em.current{margin-left: 10px;font-size:12px;color:#999;}
</style>
