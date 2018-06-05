<template>
<div class="st-viewbox">
	<div class="sales-index">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<v-account />
		</v-loged>
	</div>
	<copyright></copyright>
</div>
</template>

<script>
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import Account from '@/components/account/Account';

export default {
	components: {
		'v-loged': Loged,
		'v-account': Account,
		'copyright': copyright,
	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},
	data(){
		return {
			Auth: Auth.proxy,
		};
	},
	methods : {
		//接收登陆之后的user实现返回是登陆状态
		updata(data){
			this.Auth.user = data
		},

	},
};
</script>
<style>
	.mkd_ui.wx .sales-index .st-header .wrap,.sales-index .st-header .wrap {
		background-color: #673ab7;
		color: #fff;
	}
</style>
