<template>
	<div class="st-viewbox">
	</div>
</template>

<script>

export default {
	mounted() {
		this.$dialog.toast({
			mes: '清理成功,需要重新登录',
			timeout: 1500,
			icon: 'success',
			callback: () => {
				window.history.go(-1)
			}
		});
		localStorage.clear();
		sessionStorage.clear()
	},
};
</script>
<style type="text/css">
.index .swiper img{vertical-align: bottom}
</style>
