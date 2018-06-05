<template>
<div class="st-viewbox">
	<div class="user-index">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-addresslist />
	</div>
</div>
</template>
<script>
import Auth from '@/Services/Auth';
import AddressList from '@/components/address/AddressList';
export default {
	components: {
		'v-addresslist': AddressList,
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

	},
};
</script>

