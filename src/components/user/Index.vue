<!-- 个人中心父组件 -->
<template>
<div class="st-viewbox">
	<div class="user-index">
		<!-- 内容组件 ( 完成在已经登陆并且注册 )  -->
		<v-loged :needUser="true">
			<v-user />
			<copyright/>
		</v-loged>
		<!-- 内容组件 结束  -->
	</div>
</div>
</template>
<script>
import configs from '@/configs/app';
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import User from '@/components/user/User';
import Refercode from '@/Services/ReferCode';
import Sdk from '@/Services/Sdk';
import Data from '@/libs/Data';
export default {
	components: {
		'v-user': User,
		'copyright': copyright,
		'v-loged': Loged,
	},
	mounted() {
		Auth.then( Auth=> Auth.user? Refercode : Promise.reject()).then(Refercode=>{
			new Sdk().share({
				title:configs.catShop.shopTitle, // 分享标题
				link: 'http://' + location.hostname + location.pathname + '?' + (Refercode ? 'relation='+ Refercode : '') +  location.hash, //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl:this.logo.picture ? this.logo.picture['400x400'] : '', // 分享图标
				desc:configs.catShop.shopTitle,
			})
		}).catch(e=>{});
		document.title = this.$route.meta.title;
	},
	// 定义 title
	metaInfo () {
		const title = this.$route.meta.title;
		return {
			title: title,
			meta: [{content: title }]
		}
	},
	data(){
		return Data.createMap( {
			logo: {
				subject: 'CompanyPicture',
				entity: 'pciture',
				params: {
					pictureRole:'logo' ,
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
<style type="text/css">
	.user-index{width: 100%}
</style>
