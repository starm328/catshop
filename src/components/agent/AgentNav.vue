<!-- 资金组件，资金统计子组件 -->
<template>
	<div class="agent-nav">
		<mu-list>
			<router-link :to="{name: 'AgentQrcoude',params: {code: noderefercode}}">
				<mu-list-item title="二维码" >
					<p slot="leftAvatar"><i class="iconfont">&#xe612;</i></p>
					<mu-icon value=" " slot="right" class="st-icon icon-right"/>
				</mu-list-item>
			</router-link>
		</mu-list>
	</div>
</template>
<script>
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
	export default{
		props:{
			id:Number
		},
		watch: {
			id() {
				this.createMap(this._data);
			}
		},
		data () {
			return this.createMap()
		},
		methods: {
			createMap(data = {}) {
				return Data.createMap( {
					noderefercode: {
						// 对应 Data 目录下的文件
						subject: 'Refer',
						// 对应其中的具体数据
						entity: 'noderefercode',
						// 参数
						params: {
							token: Auth.then(x=>x.token),
							node:this.id,
						},
					},
				},{
				},data);
			},
		}
	}
</script>
<style lang="less">
	.agent-nav{
		.mu-ripple-wrapper{
			background:#fff;
		}
		.mu-list a {
		    color: inherit;
		}
	}
</style>
