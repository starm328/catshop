<!-- 推广组件 -->
<template>
	<div>
		<img :src="head_picture +'&v='+(+new Date)" width="100%;" id="tulipimg" style="display:none;"   crossorigin="anonymous">
		<canvas id="qrcode" style="display:none;width:200px;height:200px" ref="qrcode"></canvas>
		<canvas id="qrcodetext" ref="qrcodetext" height="500" style="width:338px;display:none"> </canvas>
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
import Tips from '@/components/Tips';

export default {
	components:{
		'tips': Tips,
	},
	props: {
		infos:String
	},
	data(){
		return Data.createMap( {
			headpicture:{
				subject: 'User',
				entity: 'headpicture',
				params: {
					token: Auth.then(x=>x.token),
				},
			},
		},{
			Auth: Auth.proxy,
			tips:'',
			loading:false,
			head_picture:'',
		});

	},
	mounted(){
		// if(!localStorage.getItem('Userimg')){

			this.$dialog.loading.open('加载中');
			Auth.then( auth=> {
				Ajaxy.GET( `${configs.catShop.apiBaseUrl}relations/refer-code`, { token:auth.token,} ).when( 200, response=>{
						QRCode.toCanvas( this.$refs.qrcode, location.protocol + '//'+ location.host + '/?relation='+this.$route.params.code+'/#/',{
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
						var promise = new Promise((got,los)=> picture.addEventListener('load',()=>got()));
						if(this.headpicture&&this.headpicture.head_picture){
							this.head_picture = this.headpicture.head_picture['200x200'];
						}
						if(this.headpicture.head_picture)  {
							promise.then(()=> {

								this.$dialog.loading.close();
								ctx.drawImage(this.$refs.qrcode,configs.Qrcode.qrcode.left,configs.Qrcode.qrcode.top,configs.Qrcode.qrcode.width,configs.Qrcode.qrcode.height);
								ctx.drawImage(picture,configs.Qrcode.picture.left,configs.Qrcode.picture.top,configs.Qrcode.picture.width,configs.Qrcode.picture.height);

								var bgqrcodeimg =document.getElementById('bgqrcodeimg');
								// z(document.getElementById('qrcodetext').toDataURL('image/png'))
								// z(document.getElementById('qrcode').toDataURL('image/png'))
								bgqrcodeimg.innerHTML='<img src="'+document.getElementById('qrcodetext').toDataURL('image/png')+'" id="tulip" style="width:100%">';
							})
						}else{
							this.$dialog.toast({
								mes: '未上传头像',
								timeout: 1500,
								icon: 'error',
								callback: () => {
									this.$dialog.confirm({
										title: '上传头像',
										mes: '是否选择重新上传头像',
										opts: () => {
											this.$router.push({name: 'UserInfo'})
										}
									});
								}
							});
							this.$dialog.loading.close();
							ctx.drawImage(this.$refs.qrcode,190,400,60,60);
							// ctx.drawImage(picture,130,183,60,60);
							var bgqrcodeimg =document.getElementById('bgqrcodeimg');
								// z(document.getElementById('qrcodetext').toDataURL('image/png'))
								// z(document.getElementById('qrcode').toDataURL('image/png'))
							bgqrcodeimg.innerHTML='<img src="'+document.getElementById('qrcodetext').toDataURL('image/png')+'" id="tulip" style="width:100%">';
						}

				} );
			} );


	},
};
</script>
<style type="text/css">
	.extend-main .extend-content{background: #fff;width: 90%;margin:10px auto;border-radius: 5px;max-width: 375px;overflow:hidden;}
	.extend-main .extend-tishi{   width: fit-content;margin:0 auto;background: hsl(350, 100%, 27%);border-radius: 20px;color: #fff;padding: 3px 10px;margin-top:20px;}
	.extend-main #qrcodeimg img{width: 100%;}
	.extend-main .extend-content .extend-code{text-align: center;font-size:30px;padding:20% 0;}
	.extend-main #tulipimg{border-radius: 50%;}
	.extend-main .extend-content .extend-code p{font-size:16px;color: #000}
</style>
