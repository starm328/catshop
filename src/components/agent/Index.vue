<template>
<div class="st-viewbox">
	<div class="agent-index">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<v-list :nodes="nodes" v-if="nodes"/>
		</v-loged>
	</div>
	<copyright></copyright>
</div>
</template>

<script>
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import List from '@/components/agent/List';
import Data from '@/libs/Data';

export default {
	components: {
		'v-loged': Loged,
		'v-list': List,
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
		return Data.createMap( {
			nodes: {
				// 对应 Data 目录下的文件
				subject: 'Refer',
				// 对应其中的具体数据
				entity: 'refernodes',
				// 参数
				params: {
					token: Auth.then(x=>x.token),
				},
			},
		},{
			Auth: Auth.proxy,
		});
	},
	methods : {

	},
};
</script>
<style>

</style>
