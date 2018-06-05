<!-- 资金组件，资金详情组件 -->
<template>
	<div class="detail_page">
		<st-header  :title='$route.params.tit + $route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		{{detailpage}}
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
	export default{
		metaInfo () {
		    const title = this.$route.meta.title;
		    return {
		        title: title,
		        meta: [{content: title }]
		    }
		},
		data () {
			return Data.createMap( {
				detailpage:{
					subject: 'Account',
					entity: 'detailpage',
					params: {
						token: Auth.then(x=>x.token),
						account:this.$route.params.account,
						accountDetail: this.$route.params.detail,
					},
				}
			},{
			});
		},

	}
</script>
