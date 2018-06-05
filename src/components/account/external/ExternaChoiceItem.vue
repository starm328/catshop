<!-- 提现选择列表组件item  -->
<template>
	<div class="external-choice-item">
		<st-nodata content="暂无账户，请添加" v-if="externalaccounts.length === 0">
			<p><router-link :to="{name: 'Externaltype'}"><a class="button default border-radius-near red mini border-radius-30px">添加账户</a></router-link></p>
		</st-nodata>
		<!-- 账户为空时组件 -->

		<div class="st-bread-list" v-else>
			<div v-for="(externalaccount,i) in externalaccounts" :key="externalaccount.id" v-if="externalaccount.type&&type[i]&&type[i].data.is_usable">
				<div :class="['st-bread-tit',externalaccount.type.id]"><p>{{externalaccount.type.label}}</p></div>
				<mu-flat-button :to="{name: 'Withdrawals',params:  {id: $route.params.id, ruleid: $route.params.ruleid,choiceid:externalaccount.id}}" >
					<mu-flexbox>
						<mu-flexbox-item class="flex-demo" v-for="(external,i) in type[i].data.meta" :key="i">
							<span>
								{{external.label}}：{{externalaccount.detail[external.name]}}
							</span>
						</mu-flexbox-item>
					</mu-flexbox>
				</mu-flat-button>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import ExternalAccountTypes from '@/Services/ExternalAccountTypes';
import Loged from '@/components/compact/Loged';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
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
				// 外部账户数据
				externalaccounts: {
					// 对应 Data 目录下的文件
					subject: 'ExternalAccount',
					// 对应其中的具体数据
					entity: 'externalaccount',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
					},
					preprocessor:externalaccounts=>{
						return this.preprocessor(externalaccounts);
					},

				},
			},{
				ExternalAccountTypes,
				type:[]
			});
		},
		methods: {
			// 获取资金类型中，所显示的类型字段
			preprocessor(externalaccounts) {
				externalaccounts.forEach(content=>{
					if(content&&content.type){
						ExternalAccountTypes.then(ExternalAccountType=>{
							this.type.push(ExternalAccountType.find(x=>x.data.id === content.type.id));
						})
					}
				});
				return externalaccounts
			},

		}
	}
</script>
<style>
.external-choice-item a.mu-flat-button{width: 100%;display:block;height: auto;line-height: 20px;padding: 10px;}
</style>
