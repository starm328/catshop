<!-- 推广组件 -->
<template>
	<div>
		<canvas id="qrcode" style="display:block;width:200px;height:200px" ref="qrcode"></canvas>
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

			Auth.then( auth=> {
				Ajaxy.GET( `${configs.catShop.apiBaseUrl}exa-${configs.Titcket.ExtensionApp}/proxy?url=${encodeURIComponent(configs.Titcket.url +'info/'+ this.$route.params.id)}`, { token:auth.token,} ).when( 200, response=>{
					console.log(response)
						// QRCode.toCanvas( this.$refs.qrcode, response.json.code,{
						// 	scale:10,
						// 	margin:1,
						// 	color:{
						// 		dark:'#2a2a2aff',
						// 		light: '#ffffffff'
						// 	}
						// }, x=> x );

				} );
			} );


	},
};
</script>
<style lang="less" scoped>
.ticket-show{
	position:fixed;
	height:100%;
	width:100%;
	background:#c92e3e;
	padding-top:40px;
	.ticket-show-content{
		h5{
			line-height:40px;
			font-size:18px;
			font-weight:normal;
		}
		background:#fff;
		margin:0 40px 0 40px;
		border-bottom:2px dashed #eee;
		position:relative;
		text-align:center;
		&:after{
			content:'';
			display:block;
			position:absolute;
			left:-10px;
			bottom:-10px;
			width:20px;
			height:20px;
			border-radius:50%;
			background:#c92e3e;
			z-index:2;

		}
		&:before{
			content:'';
			display:block;
			position:absolute;
			right:-10px;
			bottom:-10px;
			width:20px;
			height:20px;
			border-radius:50%;
			background:#c92e3e;
			z-index:2;

		}

	}
	.ticket-show-other{
		background:#fff;
		margin:0 40px 0 40px;
		border-bottom:2px dashed #eee;
		position:relative;
		text-align:center;
		line-height:30px;
		color:#999;
	}
}
</style>

