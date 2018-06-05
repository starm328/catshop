<!-- 头像修改 -->
<template>
<div class="st-viewbox">
	<div class="user-info-img">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<!-- <v-loged :needUser="true"> -->
			<!-- 遮罩层 -->
			<div class="container" v-show="panel">
				<div>
					<img :src="url" alt="Picture"  ref="image" class="image">
				</div>
				<mu-raised-button label="确定" class="demo-raised-button crop" primary fullWidth backgroundColor="#FF4E4E"  @click="crop"/>
				<mu-raised-button label="取消" class="demo-raised-button close" primary fullWidth backgroundColor="#999"  @click="close"/>

			</div>
			<div style="padding:20px;">
				<div class="croppershow" @click="m_choose">
					<div class="picture" :style="'backgroundImage:url('+headerImage+');background-size:100%'" v-if="headerImage"></div>
					<div class="picture"  v-else><span>点击选择图片</span><i class="st-icon icon-my" ></i></div>
				</div>
				<div style="margin-top:20px;">
					<input type="file" accept="image/*" @change="change" ref="avatarInput">
					<label for="change"></label>
				</div>
			<mu-raised-button label="保存" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" @click="edit"/>
			</div>
		<!-- </v-loged> -->
	</div>
</div>
</template>
<script>
	import Vue from 'vue';
	import Auth from '@/Services/Auth';
	import DataURItoBlob from '@/libs/DataURItoBlob';
	import Cropper from 'cropperjs';
	import Ajaxy from 'ajaxy';
	import configs from '@/configs/app';
	import Tips from '@/components/Tips';
	import Loged from '@/components/compact/Loged';
	export default {
		components: {
			'tips': Tips,
			'v-loged': Loged,
		},
		data () {
			return {
				Auth: Auth.proxy,
				headerImage:'',
				picValue:'',
				cropper:'',
				croppable:false,
				panel:false,
				url:''
			}
		},
		metaInfo () {
			const title = this.$route.meta.title;
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		mounted () {
			//初始化这个裁剪框
			var self = this;
			var image = this.$refs.image;
			this.cropper = new Cropper(image, {
				aspectRatio: 1,
				viewMode: 1,
				background:false,
				zoomable:true,
				mouseWheelZoom:false,
				movable:false,
				dragCrop:false,
				ready: function () {
					self.croppable = true;
				}
			});
		},
		methods: {
			close() {
				this.panel = false;
			},
			m_choose() {
				this.$refs.avatarInput.dispatchEvent(new MouseEvent('click'))
			},
			getObjectURL (file) {
				z('1')
				var url = null ;
				if (window.createObjectURL!=undefined) { // basic
					url = window.createObjectURL(file) ;
				} else if (window.URL!=undefined) { // mozilla(firefox)
					url = window.URL.createObjectURL(file) ;
				} else if (window.webkitURL!=undefined) { // webkit or chrome
					url = window.webkitURL.createObjectURL(file) ;
				}
				return url ;
			},
			change (e) {
				let files = e.target.files || e.dataTransfer.files;
				if (!files.length) return;
				this.panel = true;
				this.picValue = files[0];

				this.url = this.getObjectURL(this.picValue);
				//每次替换图片要重新得到新的url
				if(this.cropper){
				 	this.cropper.replace(this.url);
				}
				this.panel = true;

			},
			crop () {
				this.panel = false;
				var croppedCanvas;
				var roundedCanvas;

				if (!this.croppable) {
				  return;
				}
				// Crop
				croppedCanvas = this.cropper.getCroppedCanvas();
				// console.log(this.cropper)
				// Round
				roundedCanvas = this.getRoundedCanvas(croppedCanvas);

				this.headerImage = roundedCanvas.toDataURL("image/jpg", 0.5);
				this.postImg()

			},
			getRoundedCanvas (sourceCanvas) {

				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				// var width = sourceCanvas.width;
				// var height = sourceCanvas.height;

				canvas.width = 640;
				canvas.height = 640;

				context.imageSmoothingEnabled = true;
				context.drawImage(sourceCanvas, 0, 0, 640, 640);
				context.globalCompositeOperation = 'destination-in';
				context.beginPath();
				context.fillRect(0,0,640,640);
				context.fill();

				return canvas;
			},
			postImg () {
				// this.$dialog.loading.open('提交中');


				// console.log(this.headerImage)
			},
			edit() {
				this.$dialog.loading.open('提交中');
				var fd = new FormData();
				var blob = DataURItoBlob(this.headerImage);
				fd.append('picture', blob);

				// obj.image = this.headerImage;
				// z(this.headerImage);
				if(this.headerImage){
					Auth.then( auth=> {
						Ajaxy.POST( `${configs.catShop.apiBaseUrl}user-info/head-picture`,fd,{token:auth.token,})
							.when( 200, response=> {
								this.$dialog.loading.close();
								this.$router.go(-1);
								Auth.proxy.user.head_picture = this.avatar;

							} )
							.when( 422, response=> {
								this.tips = '图片不能为空'
								this.succeser = false
								this.$dialog.loading.close();
							} )
						;
					} );
				}
			}
		}
	}
</script>

<style>
.user-info-img input[type=file] {
    position: absolute;
    clip: rect(1px,1px,1px,1px);
}
.user-info-img .crop {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 80px;
  height: 40px;
  border:none;
  border-radius: 5px;
  background:white;
}
.user-info-img .close {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 80px;
  height: 40px;
  border:none;
  border-radius: 5px;
  background:white;
}
.user-info-img .croppershow {

  overflow: hidden;
  position: relative;
  border-radius: 10px;
  border: 1px solid #d5d5d5;
  margin:0 auto;
  position: absolute;top:40%;left: 50%;margin-left:-75px;
}
.user-info-img .croppershow .picture{
	position: relative;
	 width: 150px;
	height: 150px;
	text-align: center;line-height: 150px;font-size:90px;color: #ccc;background: #eee;
}
.user-info-img .croppershow .picture span{font-size: 12px;position: absolute;display: block;background: rgba(000,000,000,0.5);width: 100%;left: 0}
.user-info-img .container {
	z-index: 1000;
	position: fixed;
	padding-top: 60px;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background:rgba(0,0,0,1);
}

.user-info-img .image {
  max-height: 100%;
  max-width: 100%;
}

/*.cropper-view-box,.cropper-face {
  border-radius: 50%;
}*/
/*!
 * Cropper.js v1.0.0-rc
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2017 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2017-03-25T12:02:21.062Z
 */

.user-info-img .cropper-container {
  font-size: 0;
  line-height: 0;

  position: relative;

  -webkit-user-select: none;

     -moz-user-select: none;

      -ms-user-select: none;

          user-select: none;

  direction: ltr;
  -ms-touch-action: none;
      touch-action: none
}

.user-info-img .cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg
}

.user-info-img .cropper-wrap-box,
.user-info-img .cropper-canvas,
.user-info-img .cropper-drag-box,
.user-info-img .cropper-crop-box,
.user-info-img .cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.user-info-img .cropper-wrap-box {
  overflow: hidden;
}

.user-info-img .cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}

.user-info-img .cropper-modal {
  opacity: .5;
  background-color: #000;
}

.user-info-img .cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

.user-info-img .cropper-dashed {
  position: absolute;

  display: block;

  opacity: .5;
  border: 0 dashed #eee
}

.user-info-img .cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px
}

.user-info-img .cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px
}

.user-info-img .cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: .75
}

.user-info-img .cropper-center:before,
.user-info-img .cropper-center:after {
  position: absolute;
  display: block;
  content: ' ';
  background-color: #eee
}

.user-info-img .cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px
}

.user-info-img .cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px
}

.user-info-img .cropper-face,
.user-info-img .cropper-line,
.user-info-img .cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: .1;
}

.user-info-img .cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}

.user-info-img .cropper-line {
  background-color: #39f
}

.user-info-img .cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize
}

.user-info-img .cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize
}

.user-info-img .cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize
}

.user-info-img .cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize
}

.user-info-img .cropper-point {
  width: 5px;
  height: 5px;

  opacity: .75;
  background-color: #39f
}

.user-info-img .cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize
}

.user-info-img .cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize
}

.user-info-img .cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize
}

.user-info-img .cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize
}

.user-info-img .cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize
}

.user-info-img .cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize
}

.user-info-img .cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize
}

.user-info-img .cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1
}

@media (min-width: 768px) {

.user-info-img .cropper-point.point-se {
    width: 15px;
    height: 15px
  }
}

@media (min-width: 992px) {

.user-info-img .cropper-point.point-se {
    width: 10px;
    height: 10px
  }
}

@media (min-width: 1200px) {

.user-info-img .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: .75
  }
}

.user-info-img .cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: ' ';
  opacity: 0;
  background-color: #39f
}

.user-info-img .cropper-invisible {
  opacity: 0;
}

.user-info-img .cropper-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}

.user-info-img .cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}

.user-info-img .cropper-hidden {
  display: none !important;
}

.user-info-img .cropper-move {
  cursor: move;
}

.user-info-img .cropper-crop {
  cursor: crosshair;
}

.user-info-img .cropper-disabled .cropper-drag-box,
.user-info-img .cropper-disabled .cropper-face,
.user-info-img .cropper-disabled .cropper-line,
.user-info-img .cropper-disabled .cropper-point {
  cursor: not-allowed;
}


</style>
