<!-- 外部账户类型子组件 -->
<template>
	<div class="external-type-item">
			<div class="st-bread-box" v-for="accounttype in accounttypes" v-if="accounttype.is_usable">
				<router-link :to="{name: 'Externalform',params: {id: accounttype.id}}" >
						<p class="fz-20px fg-gray">{{accounttype.label}}</p>
						<span class="fg-gray">去添加</span>
				</router-link>
			</div>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
	export default{
		components: {
			'v-loged': Loged,
		},
		metaInfo () {
			const title = this.$route.meta.title;
			return {
				title: title,
				meta: [{content: title }]
			}
		},
		data () {
			return Data.createMap( {
				accounttypes: {
					// 对应 Data 目录下的文件
					subject: 'ExternalAccountType',
					// 对应其中的具体数据
					entity: 'accounttype',
					// 参数

				},
			},{

			});
		},
	}
</script>
<style>
.external-type-item .st-bread-box{padding:30px 0;width: 90%;border-radius: 10px;background: #fff;margin:20px auto 0 auto;text-align: center;border-top:2px solid #ebebeb;}
.external-type-item .st-bread-box a{display: block;}
.external-type-item .st-bread-box span{display: inline-block;border-radius: 3px;border:1px solid #9e9e9e;margin-top: 10px;padding:3px 10px;}
</style>
