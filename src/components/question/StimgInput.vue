<!--单选组件 -->
<template>
	<div class="st-input-image">
		<div class="file">
				<input type="hidden" :name="String(formid)+'[type]'" value="image">
				<input  type="file" accept="image/*" ref="avatarInput" @change="changeImage($event)" :name="String(formid)+'[value]'"/>
		</div>
		<div class="large">
			<div class="large_img" @click="m_choose">
				<p v-if="avatar === '' ">选择图片</p>
				<img :src="avatar" v-else>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import DataURItoBlob from '@/libs/DataURItoBlob';
import Cropper from 'cropperjs';
import Data from '@/libs/Data';
	export default{
		props:{
			id:Number,
			formid:Number,
		},
		data() {
			return {
				avatar:'',
			}
		},

		methods: {
			m_choose() {
				this.$refs.avatarInput.dispatchEvent(new MouseEvent('click'))
			},
			changeImage(e) {
				var file = e.target.files[0]
				var reader = new FileReader()
				var that = this
				reader.readAsDataURL(file)
				reader.onload = function(e) {
					that.avatar = this.result
				}
			},
		}
	}
</script>
<style type="text/css">
	.st-input-image{position: absolute;width: 100%;top:0;right:28px;line-height: 45px;}
	.st-input-image .large_img img{width: 40px}
	.st-input-image  input[type=file] {
	    position: absolute;
	    clip: rect(1px,1px,1px,1px);
	}
</style>
