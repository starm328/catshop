<!-- 推广组件 -->
<template>
	<div class="qrcode-main"  >
		<img :src="headpicture.head_picture['200x200'] +'&v='+(+new Date)" width="100%;" id="tulipimg" style="display:none;" crossorigin="anonymous">
		<!-- <img src="./images/bg3.jpg" width="100%;" id="tulipbg" style="display:none;width:640;height:1138;"> -->
		<!-- <img src="./images/img-bg.png" id="imgbg" style="display:none;"> -->
		<canvas id="qrcode" style="display:none;width:200px;height:200px" ref="qrcode"></canvas>
		<canvas id="qrcodetext" ref="qrcodetext" height="300" style="width:338px;display:none"> </canvas>
		<div id="qrcodeimg" style="display:none"></div>
		<div id="bgqrcodeimg"></div>
	</div>
</template>
<script>
import Vue from 'vue';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import QRCode from 'qrcode';
import Data from '@/libs/Data';
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';

export default {
	props: {
		infos:String,
		headpicture:Object
	},
	data(){
		return {

			Auth: Auth.proxy,
			tips:'',
			loading:false,
			head_picture:'',
			configs,
		};
	},
 	mounted() {
 		this.$dialog.loading.open('加载中');
 		Auth.then( auth=> {
 			Ajaxy.GET( `${configs.catShop.apiBaseUrl}relations/refer-code`, { token:auth.token,} ).when( 200, response=>{
 					QRCode.toCanvas( this.$refs.qrcode, location.protocol + '//'+ location.host + '/?relation='+response.json + '#/',{
 						scale:20,
 						margin:1,
 						color:{
 							dark:'#2a2a2aff',
 							light: '#ffffffff'
 						}
 					}, x=> x );
 					var qrcodeimg =document.getElementById('qrcodeimg');
 					qrcodeimg.innerHTML='<img src="'+document.getElementById('qrcode').toDataURL('image/png')+'" id="tulip">';
 					var c=this.$refs.qrcodetext;
 					c.width = 310 * 2;
 					c.height = 300 * 2;
 					var ctx=c.getContext("2d");
 					ctx.scale(2,2);
 					var picture=document.getElementById("tulipimg");
 					// var imgbg=document.getElementById("imgbg");
 					// var img=document.getElementById("tulipbg");
 					var img2=document.getElementById("tulip");

 						this.$dialog.loading.close();
 						// ctx.drawImage(img,0,0,310,500);
 						ctx.drawImage(this.$refs.qrcode,configs.Qrcode.qrcode.left,configs.Qrcode.qrcode.top,configs.Qrcode.qrcode.width,configs.Qrcode.qrcode.height);
 						// ctx.drawImage(picture,130,183,60,60);
 						// ctx.drawImage(imgbg,100,173,120,85);
 						// 文字生成到canvas
 						var gradient=ctx.createLinearGradient(0,0,c.width,0);
 						gradient.addColorStop("0","#000");
 						// 填充一个渐变
 						ctx.font="14px Verdana";
 						ctx.fillStyle=gradient;
 						// ctx.fillText(this.Auth.user.username,configs.Qrcode.qrcode.left,configs.Qrcode.qrcode.top)

 						var bgqrcodeimg =document.getElementById('bgqrcodeimg');
 							// z(document.getElementById('qrcodetext').toDataURL('image/png'))
 							// z(document.getElementById('qrcode').toDataURL('image/png'))
 						bgqrcodeimg.innerHTML='<img src="'+document.getElementById('qrcodetext').toDataURL('image/png')+'" id="tulip" style="width:100%">';

 			} );
 		} );
 	}
};
</script>
<style type="text/css">
</style>
