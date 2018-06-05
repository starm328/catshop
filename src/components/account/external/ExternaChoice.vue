<!-- 提现选择外部账户列表组件 -->
<template>
<div class="st-viewbox">
	<div class="external-choice">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<st-externachoiceitem />

		</v-loged>
	</div>
</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import ExternaChoiceItem from '@/components/account/external/ExternaChoiceItem';
	export default{
		components: {
			'v-loged': Loged,
			'st-externachoiceitem':ExternaChoiceItem
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
