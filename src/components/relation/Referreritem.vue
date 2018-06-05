<!-- 人脉管理上线组件 -->
<template>
	<div class="referreritem-center st_detail_list">
		<div v-if="exploiters.length ===  0" style="width:100%">
			<st-nodata content="暂无引路人" :icon="style"></st-nodata>
		</div>
		<div class="exploiters-box"  v-if="exploiters.length > 0">
			<h6>引路人</h6>
			<yd-timeline>
			    <yd-timeline-item v-for ="detail in exploiters" v-if="detail" :key="detail.id">
			        <div>
			        	<span slot="left" v-if="detail.head_picture === null"><i class="st-icon icon-my" ></i></span>
			        	<mu-avatar :src="detail.head_picture"  slot="leftAvatar" v-if="detail.head_picture"/>
			     	   <p>{{detail.label}}</p>
			   		</div>
			        <p style="margin-top: 10px;color: rgba(0, 0, 0, 0.54);">{{detail.role.data.label}}</p>
			        <p style="margin-top: 10px;color: rgba(0, 0, 0, 0.54);">ID：{{detail.owner_id}}</p>
			        <p style="margin-top: 10px;color: rgba(0, 0, 0, 0.54);"  v-for="(key,i) in detail.info" v-if="detail.info[1]">{{fields.data.label}}：{{key[fields.data.id]}}</p>

			    </yd-timeline-item>

			</yd-timeline>
		<!-- 	<mobile-tear-sheet>
				<mu-list >
					<div class="detail_list" v-for ="detail in exploiters" v-if="detail">
						<mu-list-item :title="detail.label" :afterText="detail.role.data.label"  afterTextClass="afterclass">
							<span slot="left" v-if="detail.head_picture === null"><i class="st-icon icon-my" ></i></span>
							<mu-avatar :src="detail.head_picture"  slot="leftAvatar" v-if="detail.head_picture"/>
							<span slot="describe" >ID:{{detail.id}}</span>

							</mu-icon-menu>
						</mu-list-item>
						<mu-divider inset/>
					</div>
				</mu-list>
			</mobile-tear-sheet> -->
		</div>
	</div>

</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import CommissionRoles from '@/Services/CommissionRoles';
import FieldsType from '@/Services/FieldsType';
import {TimeLine, TimeLineItem} from 'vue-ydui/dist/lib.px/timeline';
Vue.component(TimeLine.name, TimeLine);
Vue.component(TimeLineItem.name, TimeLineItem);
	export default{
		data() {
				return Data.createMap( {
					exploiters: {
						// 对应 Data 目录下的文件
						subject: 'Refer',
						// 对应其中的具体数据
						entity: 'exploiters',
						// 参数
						params: {
							token: Auth.then(x=>x.token),
							node:0
						},
						preprocessor:exploiters=>{
							return this.preprocessor(exploiters);
						},
					}
				},{
					Auth: Auth.proxy,
					style:'icon-favor',
					fields:'',

			});
		},
		methods: {
			preprocessor(exploiters) {
				exploiters.forEach(exploiters=>{
					CommissionRoles.then(CommissionRoles=>{

						exploiters.role=CommissionRoles.find(x=>x.data.id === exploiters.role)
					});
					FieldsType.then(FieldsType=>{
						exploiters.info.forEach(infos=> {
							for(var key in infos){
								this.fields = FieldsType.find(x=>String(x.data.id) === '1')
							}
						});
					})
				});

				return exploiters;
			},
		},
	}
</script>
<style>
.referreritem-center .mu-list{padding:0;}
.referreritem-center p{text-indent:50px}
.referreritem-center .yd-timeline-content>li{}
.referreritem-center .mu-avatar{position: absolute;left: 0;border:1px solid #eee;top:20px;}
.referreritem-center .icon-my{position:absolute;top:20px;width: 40px;height: 40px;font-size:18px;border:1px solid #ccc;border-radius:50%; display: inline-block;text-align: center;line-height: 40px;color:#ccc;}

</style>
