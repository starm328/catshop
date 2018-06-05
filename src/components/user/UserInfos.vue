<!-- 个人信息组件 -->
<template>
<div class="st-viewbox">
	<div class="user-infos">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
			<a class="button" @click="editOpen" slot="right">编辑</a>
		</st-header>
		<div class="header_mar"></div>
		<div class="initialization on" v-if="!Auth.loaded">
			<div class="loader"></div>
		</div>
		<v-loged :needUser="true">
			<div class="st-lay">
				<yd-cell-group>
					<yd-cell-item  v-for="(infosfield,i) in infosfields" :key="infosfield.id" >
						<span slot="left" >{{infosfield.label}}</span>
						<span slot="right">
							{{infos[infosfield.id]}}

						</span>
						<span slot="right" v-if="!(infos&&infos[infosfield.id])" class="fg-gray ">
							未设置
						</span>

					</yd-cell-item >

				</yd-cell-group>
			</div>
			<div class="st-button-pd wxshow"><mu-raised-button label="编辑" @click="editOpen" class="submit st-subbutton" ripple-color="white" fullWidth primary/></div>
			<yd-popup :value="!!editing" position="bottom" height="100%" class="infos-popup">
				<info-edit @close="editClose" v-if="editing" :infoedit="editing" :infokey="infos"></info-edit>
			</yd-popup>
		</v-loged>
	</div>
</div>
</template>

<script>
import Vue from 'vue';
import Sdk from '@/Services/Sdk';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import User from '@/components/user/User';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
import Infoedit from '@/components/user/Infoedit';
import Loged from '@/components/compact/Loged';
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
export default {
	components: {
		'info-edit':Infoedit,
		'v-loged': Loged,

	},
	data() {
		return Data.createMap( {
			infosfields: {
				// 对应 Data 目录下的文件
				subject: 'User',
				// 对应其中的具体数据
				entity: 'infosfields',
			},
			infos: {
				// 对应 Data 目录下的文件
				subject: 'User',
				// 对应其中的具体数据
				entity: 'infos',
				params: {
					token: Auth.then(x=>x.token),
				},
			},
		},{
			Auth: Auth.proxy,
			editing: null,
		});
	},
	mounted() {
		document.title = this.$route.meta.title
	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},

	methods:{
		editOpen () {
			this.editing = z(this.infosfields);
		},
		editClose () {
			this.editing = null;
		},
		//接收登陆之后的user实现返回是登陆状态
		updata(data){
			z(this.Auth.user = data)
		},
	}

};
</script>

<style type="text/css">
.user-infos{width: 100%}
.user-infos .mu-text-field-content{padding:0;}
.user-infos .mu-text-field{min-height: auto;margin:0;}
.user-infos .infos-popup .yd-popup{max-width: 375px;left: 50%;margin-left:-187.5px;}
</style>
