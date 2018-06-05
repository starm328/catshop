<!-- 外部账户类型父组件 -->
<template>
<div class="st-viewbox">
	<div class="external-type">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<!-- 账户类型列表子组件 -->
			<st-externaltypeitem/>
		</v-loged>
	</div>
</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import ExternaltypeItem from '@/components/account/external/ExternaltypeItem';
	export default{
		components: {
			'v-loged': Loged,
			'st-externaltypeitem':ExternaltypeItem
		},
		metaInfo () {
			const title = this.$route.meta.title;
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		data () {
			return Data.createMap( {
			},{

			});
		},
	}
</script>
<style>
</style>
