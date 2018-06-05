<!-- 券二维码组件 -->
<template>
	<div class="ticket-show">
		<st-header  :title='$route.meta.title' fixed>
			 <a class="back-white" slot='left' @click='$router.go(-1)'></a>
		</st-header>
		<div class="header_mar"></div><!--头部是绝对定位，给他加上一个相应的一个高度的盒子 -->
		<!-- 内容组件 ( 完成在已经登陆并且注册 )  -->
		<v-loged :needUser="true">
			<div class="ticket-show-content">
				<h5 v-if="show">{{show.type.label}}</h5>

				<canvas id="qrcode" ref="qrcode"></canvas>
			</div>
			<div class="ticket-show-other">
				<p v-if="show">券编码：{{show.code}}</p>
				<p v-if="show.expired_at == null">过期时间：长期有效</p>
				<p v-else-if="new Date(show.expired_at) > new Date() && show.expired_at !== null">过期时间：{{show.expired_at}}</p>
			</div>
		</v-loged>
		<!-- 内容组件 结束  -->
	</div>
</template>

<script>
import Loged from '@/components/compact/Loged';
import ShowItem from '@/components/ticket/ShowItem';
import Ajaxy from 'ajaxy';
import Auth from '@/Services/Auth';
import QRCode from 'qrcode';
import configs from '@/configs/app';
export default {
	name: 'ticket-show',
	metaInfo () {
		const title = this.$route.meta.title;
		return {
			title: title,
			meta: [{content: title }]
		}
	},
	components: {
		'v-loged': Loged,
		'show-item': ShowItem,
	},
	data () {
		return {
			show:''
		}
	},
	mounted(){
		// if(!localStorage.getItem('Userimg')){
			Auth.then( auth=> {
			this.$dialog.loading.open('加载中');
				Ajaxy.GET( `${configs.catShop.apiBaseUrl}exa-${configs.Titcket.ExtensionApp}/proxy?url=${encodeURIComponent(configs.Titcket.url +'info/'+ this.$route.params.id)}`, { token:auth.token,} )
				.when( 200, response=>{
					this.show = response.json
					Ajaxy.post( `${configs.catShop.apiBaseUrl}exa-${configs.Titcket.ExtensionApp}/proxy?url=${encodeURIComponent(configs.Titcket.Authurl)}`,{code:response.json.code},{ token:auth.token,} )
						.when(200,authcode=>{
							this.$dialog.loading.close()
							console.log(authcode);
							QRCode.toCanvas( this.$refs.qrcode, z(JSON.stringify({code:response.json.code,type:response.json.type.id,authcode:authcode.json.auth_code,id:response.json.batch_id})),{
								scale:4,
								margin:1,
								color:{
									dark:'#2a2a2aff',
									light: '#ffffffff'
								}
							}, x=> x );
						})
						.when(410,response=>{
							this.$dialog.toast({
								mes: '此券已被使用',
								timeout: 1500,
								icon: 'error',
								callback: () => {
									this.$dialog.loading.close();
									this.$router.go(-1)
								}
							});
						})


				} );
			} );


	},
}
</script>
<style lang="less" scoped>
.ticket-show{
	position:fixed;
	height:100%;
	width:100%;
	background:#c92e3e;
	padding-top:40px;
	.ticket-show-content{
		padding:20px 0;
		canvas{
			display:block;
			margin:0 auto;
		}
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

