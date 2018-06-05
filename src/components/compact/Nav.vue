<!-- 公用组件，底部导航组件 -->
<template>
	<mu-paper :class="{nav_bottom:1,show: $route.meta.navValue}">
		<mu-bottom-nav :value="$route.meta.navValue" >
			<mu-bottom-nav-item value="index" title="首页" icon=" " to="/" iconClass="st-icon icon-shop" />
			<mu-bottom-nav-item value="category" title="分类" icon=" " to="/category" iconClass="st-icon icon-rank"  />
			<mu-bottom-nav-item value="cart" title="购物车" icon=" " to="/cart" iconClass="st-icon icon-cart" />
			<mu-bottom-nav-item value="user" title="个人中心" icon=" " to="/user" iconClass="st-icon icon-my" />
		</mu-bottom-nav>
	</mu-paper>
</template>
<script>
	export default{

	}
</script>
<style type="text/css">
.nav_bottom:not(.show){transform: translateY(100%);}
.nav_bottom{position:fixed;bottom:0;width:100%;transition: transform 200ms;max-width:375px;z-index: 1}
.nav_bottom.show+.mkd_ui{padding-bottom: 56px;}
.mu-buttom-item{min-width: auto}
</style>
