<!-- 券列表组件 -->
<template>
	<div class="ticket-index">

		<!-- 内容组件 ( 完成在已经登陆并且注册 )  -->
		<v-loged :needUser="true">
			<ticket-list></ticket-list>
		</v-loged>
		<!-- 内容组件 结束  -->
	</div>
</template>

<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Loged from '@/components/compact/Loged';
import Ticket from '@/components/ticket/List';
import User from '@/components/user/User';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
export default {
	name: 'ticket-index',
	metaInfo () {
		const title = this.$route.meta.title;
		return {
			title: title,
			meta: [{content: title }]
		}
	},
	components: {
		'v-user': User,
		'v-loged': Loged,
		'ticket-list':Ticket
	},
	data () {
	  return {
	  	show4:false,
	  }

	}
}
</script>

<style lang="less" scoped>

</style>
