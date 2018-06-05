<!-- 第三方账号绑定组件子组件 -->
<template>
<div class="agent-show">
	<st-header  :title='$route.meta.title' fixed>
		<mu-icon-button  @click="$router.go(-1)" slot="left">
			<i class="st-icon icon-back"></i>
		</mu-icon-button>
	</st-header>
	<v-loged :needUser="true">
		<div class="anget-show-warp" v-if="$route.params.type=='WX'">
			<div class="agent-icon">
				<span>
					<i class="iconfont icon-weixin" style="font-size:50px;color:#3caf36"></i>
					<!-- <i class="iconfont icon-zhengque1"></i> -->
				</span>
			</div>
			<p>你的账号：{{$route.params.label}}</p>
			<div class="content-pad-r10">
				<yd-button size="large" type="primary" class="st-subbutton st-auxi-bgcolor" @click.native="deleteagent">解绑</yd-button>
			</div>
		</div>
		<div class="anget-show-warp" v-if="$route.params.type=='MB'">
			<div class="agent-icon">
				<span>
					<i class="iconfont icon-shouji"></i>
					<i class="iconfont icon-zhengque1"></i>
				</span>
			</div>
			<p>你的手机号：{{$route.params.label}}</p>
			<div class="content-pad-r10">
				<yd-button size="large" type="primary" class="st-subbutton st-auxi-bgcolor" @click.native="deleteagent">解绑</yd-button>
			</div>
		</div>

	</v-loged>
</div>
</template>

<script>
import Vue from 'vue';
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Loged from '@/components/compact/Loged';
export default {
	components:{
		'v-loged': Loged,
	},
	metaInfo () {
		const title = this.$route.meta.title;
		return {
			title: title,
			meta: [{content: title }]
		}
	},
	data() {
		return Data.createMap( {

		},{
			Auth: Auth.proxy,
		});

	},
	methods : {
		deleteagent(){
			this.$dialog.confirm({
				title: '',
				mes: '确认解绑此账号',
				opts:[
					{
						txt: '取消',
						color: false,
						callback: () => {
						}
					},
					{
						txt: '确定',
						color: true,
						callback: () => {
							Auth.then( auth=> {
								Ajaxy.DELETE( `${configs.catShop.apiBaseUrl}user-agents/${this.$route.params.id}`, { token: auth.token, } )
									.when( 401, response=> Auth.refreshToken().then( token=> this.deleteAddress() ) )
									.when( 200, response=> {
										this.$dialog.toast({
											mes: '解绑成功',
											timeout: 1500,
											icon: 'success',
											callback: () => {
												this.$router.go(-1);
											}
										});

									} )
									.when( 204, response=> {
										this.$dialog.toast({
											mes: '当前登录的账户无法解绑',
											timeout: 1500,
											icon: 'error'
										});
									} )
								;
							} );
						}
					}

				]
			});


		},

	},
	　
};
</script>

<style lang="less">
	.agent-show{
		.anget-show-warp{
			text-align: center;
			p{
				font-weight:bold;
			}
			.agent-icon{
				span{position:relative;display:inline-block;margin:20px 0}
				i{
					color:#666;
					font-size:84px;
					&:nth-child(2){
						position:absolute;
						left:32px;
						top:30px;
						font-size:20px;
						color:#3caf36
					}
				}
			}
		}
	}
</style>
