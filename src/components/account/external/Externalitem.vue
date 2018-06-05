<!-- 外部账户列表组件 -->
<template>
	<div class="external-item">
		<st-nodata content="暂无账户，请添加" v-if="externalaccounts.length === 0">
			<p><router-link :to="{name: 'Externaltype'}"><a class="button default border-radius-near red mini border-radius-30px">添加账户</a></router-link></p>
		</st-nodata>
		<!-- 账户为空时组件 -->

		<div class="st-bread-list" v-else>
			<div v-for="(externalaccount,i) in externalaccounts" :key="externalaccount.id" v-if="externalaccount.type&&ExternalAccountTypes&&ExternalAccountTypes.length">
				<div :class="['st-bread-tit',externalaccount.type.id]"><p>{{externalaccount.type.label}}</p></div>
				<mu-flat-button >
					<mu-flexbox>
						<mu-flexbox-item class="flex-demo" v-for="(external,i) in ExternalAccountType(i).meta" :key="i">
							<span>
								{{external.label}}: {{externalaccount.detail[external.name]}}
								<!-- {{external.label}}：{{externalaccount.detail[external.name]}} -->
							</span>
						</mu-flexbox-item>
					</mu-flexbox>
				</mu-flat-button>
				<mu-flexbox class="mt8 border-top" >
					<mu-flexbox-item class="flex-demo">
						<mu-radio label="设为提现账户" name="group" class="demo-radio" @change="switchIsCurrent(externalaccount.id,i)" :value="''+externalaccount.is_default" @input="val=>{externalaccount.is_default=+val}"  nativeValue="1"/>
					</mu-flexbox-item>
					<mu-flexbox-item class="flex-demo address_gonn" style="text-align:right">
						<span @click="deleteOpen(i,externalaccount.id)"><i class="iconfont">&#xe613;</i>删除</span>
						<span><router-link :to="{name: 'Externaleidtform',params: {type:ExternalAccountType(i).id,id: externalaccount.id}}" v-if="ExternalAccountType(i).is_usable"><i class="iconfont">&#xe616;</i>编辑</router-link></span>
					</mu-flexbox-item>
				</mu-flexbox>
			</div>
		</div>
		<!-- 底部添加账户按钮，在有数据的时候显示，没有数据的添加按钮为空数据中的添加 -->
		<mu-raised-button label="添加账户" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" :to="{name: 'Externaltype'}"  v-if="externalaccounts.length > 0"/>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
// import ExternalAccountTypes from '@/Services/ExternalAccountTypes';
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
					// preprocessor:externalaccounts=>{
					// 	return this.preprocessor(externalaccounts);
					// },

				},
				ExternalAccountTypes: {
					// 对应 Data 目录下的文件
					subject: 'ExternalAccountType',
					// 对应其中的具体数据
					entity: 'accounttype',
					// 参数
				},
			},{
				// ExternalAccountTypes,
				type:[],

			});
		},
		methods: {
			ExternalAccountType(i) {
				// z(this.externalaccounts[i].type.id)
					return this.ExternalAccountTypes.find(x=>x.id === this.externalaccounts[i].type.id)
				// this.ExternalAccountTypes.find(x=>z(x).id === this.externalaccounts[i].type.id)

			},
			// 获取资金类型中，所显示的类型字段
			// preprocessor(externalaccounts) {
			// 	externalaccounts.forEach(content=>{
			// 		ExternalAccountTypes.then(ExternalAccountType=>{
			// 			this.type.push(z(ExternalAccountType.find(x=>x.data.id === content.type.id)));
			// 		})
			// 	});
			// 	return externalaccounts
			// },
			// 删除确认框
			deleteOpen(i,q) {
				this.$dialog.confirm({
					title: '提示',
					mes: '确认删除当前账号',
					opts:  [
						{
							txt: '取消',
							color: false,
							callback: () => {
								timeout: 1000
							}
						},
						{
							txt: '确定',
							color: true,
							callback: () => {
								this.deleteexternal(q);
								timeout: 1000
							}
						}
					]
				});
			},
			//删除账户
			deleteexternal(id){
				Auth.then( auth=> {
					Ajaxy.DELETE( `${configs.catShop.apiBaseUrl}external-accounts/${id}`, { token: auth.token, } )
						.when( 401, response=> Auth.refreshToken().then( token=> this.deleteAddress(externalaccounts) ) )
						.when( 200, response=> {
							this.externalaccounts.forEach((externalaccounts,i)=>{
								if(externalaccounts.id == id){
									//从列表中删除
									this.externalaccounts.splice(i,1);
								}
							});
						} )
					;
				} );
			},
			//设置默认账户
			switchIsCurrent(current,i) {
				var that = this;
				Auth.then( auth=> {
					Ajaxy.patch( `${configs.catShop.apiBaseUrl}external-accounts/${current}/set-current`, { token: auth.token, } )
						.when( 401, response=> Auth.refreshToken().then( token=> this.submit() ) )
						.when( 200, response=> {
						} )

					;
				} );
			},
		}
	}
</script>
<style>
.external-item .address_gonn span {
    float: right;
    margin-right: 5px;
    color: #999;
}
.external-item   .address_gonn span i{margin-right: 5px}
.external-item{padding-bottom: 50px}
.external-item  .address_gonn span a{color:#999;}
</style>
