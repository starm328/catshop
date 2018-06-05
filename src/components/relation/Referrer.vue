<!-- 人脉管理上线组件 -->
<template>
<div class="st-viewbox">
	<div class="referrer-center ">

		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>

		<v-loged :needUser="true">
			<div class="referrer-box" v-if="referrer.label">
				<h6>引路人</h6>
					<mu-list >
						<div class="detail_list">
							<mu-list-item :title="referrer.label" :afterText="referrerrole.data.label" afterTextClass="afterclass">
								<span slot="left" v-if="referrer.head_picture === null"><i class="st-icon icon-my" ></i></span>
								<mu-avatar :src="referrer.head_picture"  slot="leftAvatar" v-if="referrer.head_picture"/>
								<span slot="describe" >ID:{{referrer.owner_id}}</span>
								<p slot="describe"  v-for="(key,i) in referrer.info" v-if="referrer.info[1]">{{fields.data.label}}：{{key[fields.data.id]}}</p>
							</mu-list-item>
							<mu-divider inset/>
						</div>
					</mu-list>
			</div>
			<v-referrer/>
		</v-loged>
	</div>
</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import FieldsType from '@/Services/FieldsType';
import Loged from '@/components/compact/Loged';
import Referrer from '@/components/relation/Referreritem';
import CommissionRoles from '@/Services/CommissionRoles';

	export default{
		metaInfo () {
		    const title = this.$route.meta.title;
		    return {
		        title: title,
		        meta: [{content: title }]
		    }
		},
		components:{
			'v-loged': Loged,
			'v-referrer': Referrer,
		},
		data(){
			return Data.createMap( {
				referrer: {
					// 对应 Data 目录下的文件
					subject: 'Refer',
					// 对应其中的具体数据
					entity: 'referrer',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
						node:0
					},
					preprocessor:referrer=>{
						return this.preprocessor(referrer);
					},
				},
			},{
				Auth: Auth.proxy,
				referrerrole:'',
				style:'icon-favor',
				fields:''
			});

		},
		methods:{
			preprocessor(referrer) {
					CommissionRoles.then(CommissionRoles=>{
						this.referrerrole=CommissionRoles.find(x=>x.data.id === referrer.role)
					});
					FieldsType.then(FieldsType=>{
						if(referrer.info){
						referrer.info.forEach(infos=> {
							for(var key in infos){
								this.fields = FieldsType.find(x=>String(x.data.id) === '1')
							}
						});
						}
					})
				return referrer;
			},
		}
	}
</script>
<style>
.referrer-center .detail_list{background: #fff}
.referrer-center .referrer-box h6,.referrer-center .exploiters-box h6{ text-indent: 10px;line-height: 35px;font-weight: normal; }
.referrer-center .mu-avatar{position: absolute;left: 0;border:1px solid #eee;top:20px;}
.referrer-center .icon-my{position:absolute;top:20px;width: 40px;height: 40px;font-size:18px;border:1px solid #ccc;border-radius:50%; display: inline-block;text-align: center;line-height: 40px;color:#ccc;}

</style>
