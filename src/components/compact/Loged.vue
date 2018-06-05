<!-- 公用组件，登陆注册合集 -->
<template>
	<div class="initialization on" v-if="!Auth.loaded">
		<div class="loader"></div>
	</div>
	<div v-else-if="Auth.logined">
		<div v-if="!needUser || Auth.user">
			<slot></slot>
		</div>
		<div v-else>
			<user-sign></user-sign>
		</div>
	</div>
	<div v-else>
		<v-login />
		<tips :contents.sync="tips"  :timeout="3000"></tips>
	</div>
</template>
<script>
import Vlogin from '@/components/loginform/Index';
import UserSign from '@/components/loginform/Index';
import Auth from '@/Services/Auth';
import Tips from '@/components/Tips';
	export default{
		components: {
			'v-login': Vlogin,
			'user-sign': UserSign,
			'tips': Tips,
		},
		props:{
			needUser:Boolean,
		},
		data(){
			return {
				Auth: Auth.proxy,
				tips:''
			};
		},

	}
</script>
<style type="text/css">

</style>
