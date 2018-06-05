<template>
	<div class="st-header st-main-bgcolor" :class="{show: $route.meta.title,'fixed': fixed}">
		<div class="wrap">
			<div class="l">
				<slot name="left"></slot>
			</div>
			<div class="c">
				<em>{{title}}</em>
				<slot name="mid"></slot>
			</div>
			<div class="r">
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props: {
			fixed: Boolean,
			title: String
		}
	}
</script>
<style type="text/css">
	.st-header .button {
			color: #fff;
			}
	.st-header .button {
		display: inline-block;
		font-size: 18px;
		position: relative;
		-webkit-transition: opacity .15s;
		transition: opacity .15s;
		border: none;
		padding: 13.5px;
		text-align: center;
		line-height: 1;
	}
	.st-header button{height: auto;margin-top:-5px;}
	.st-header button i{font-size:18px;}
	.st-header button a {color: #fff}
	.st-header {
		position: fixed;
		top: 0;
		width: 100%;
		height: 43px;
		color: #fff;
		z-index: 999;
		max-width: 375px;
	}

	.st-header:not(.show){display: none;}
	.st-header .wrap {
		min-height: 44px;
		position: relative;
	}
	.st-header .l:not(.show){display: block;}
	.st-header .r.show{display: block;}
	.st-header .l{display: none}
	.st-header .l {
		z-index: 5;
		position: absolute;
		left: 0;
		top: 0;
	}
	.st-header .c {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		text-align: center;
		z-index: 0;
	}
	.st-header .c em {
		display: block;
		height: 45px;
		line-height: 45px;
		font-style: normal;
	}
	.st-header .r {
		position: absolute;
		z-index: 5;
		right: 0;
		top: 0;
	}
	.st-header .r a{color:#fff;}

</style>
