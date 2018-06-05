<!-- 产品搜索组件 -->
<template>
<div class="st-viewbox">
	<div class="search-index">
		<div class="search-box"><p @click="back"><i class="st-icon icon-back"></i></p><div class="serch-form"><yd-search v-model="value1" :on-submit="submitHandler"></yd-search></div></div>
	</div>
</div>
</template>

<script>
	import Vue from 'vue';
	import {Search} from 'vue-ydui/dist/lib.px/search';
	Vue.component(Search.name, Search);
	export default {
		data(){
			return {
			    value1: ''
			}
		},
		methods: {
			submitHandler(value) {
				this.$router.push({name:'Searchlist' ,params: {keyWords: value}})
			},
			back(){
				this.$emit('close')
			}
		}
	};
</script>
<style type="text/css">
	.search-index{position: fixed;top:0;z-index: 9999;width: 100%;background: #ccc;height: 100%;max-width: 375px}
	.search-index p{float: left;line-height:50px;height:50px;text-align: center;width: 10%;background:#efeff4;font-size:22px;color:#999;}
	.search-index .serch-form{float: right;width: 90%;}
	.search-index .yd-search-input>.cancel-text{color:#5E9FFF;}
	.search-index .yd-search-input:after{display: none}
</style>
