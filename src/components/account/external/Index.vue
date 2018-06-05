<!-- 外部账户列表组件 -->
<template>
<div class="st-viewbox">
	<div class="external-index">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<st-externalitem />

		</v-loged>
	</div>
</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import Externalitem from '@/components/account/external/Externalitem';
	export default{
		components: {
			'v-loged': Loged,
			'st-externalitem':Externalitem
		},
		metaInfo () {
			const title = this.$route.meta.title;
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		data() {
			return {
			}
		},

	}
</script>
<style>
</style>
