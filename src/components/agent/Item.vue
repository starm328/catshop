<!-- 资金组件，资金统计子组件 -->
<template>
	<div class="agent-item dearest" style="min-height:180px;">
		<span class="title">
				(身份ID：{{account.id}})
		</span>
		<em>
			{{authlabel.label}}
		</em>
		<ul>
			<li>
				<a class="button">
					<small>直属下级</small>
					<b>
						<st-ReferreesCount :id="account.id"></st-ReferreesCount>
					</b>
				</a>
			</li>
			<li>
				<a class="button">
					<small>下线</small>
					<b>
						<st-ExploCount :id="account.id"></st-ExploCount>
					</b>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
	import Vue from 'vue';
	import Data from '@/libs/Data';
	import {CountUp} from 'vue-ydui/dist/lib.px/countup';
	import Auth from '@/Services/Auth';
	import Ajaxy from 'ajaxy';
	import configs from '@/configs/app';
	import accountTypes from '@/Services/AccountTypes';
	import ReferreesCount from '@/components/agent/ReferreesCount';
	import ExploCount from '@/components/agent/ExploCount';
	import CommissionRoles from '@/Services/CommissionRoles';
	Vue.component(CountUp.name, CountUp);
	export default{
		props: {
			account:{},
		},
		components:{
			'st-ReferreesCount':ReferreesCount,
			'st-ExploCount':ExploCount,
		},
		data () {
			return Data.createMap( {

			},{
				accounttype:'',
				CommissionRoles,
				authlabel:''
			});
		},
		watch:{
			$route(){
				this.CommissionRole()
			}
		},
		created(){  this.CommissionRole() },
		methods: {
			CommissionRole() {
				return CommissionRoles.then(CommissionRoles=>{
					this.authlabel=CommissionRoles.find(x=>x.data.id ===this.account.role)//根据用户接口ID　获取身份
				})
			}
		}

	}
</script>
