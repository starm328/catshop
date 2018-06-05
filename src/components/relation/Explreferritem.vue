<!-- 人脉管理所有人脉的人脉子组件 -->
<template>
	<div class="explreferr_item st_detail_list" >
		<div class="explreferr_item_num">总人数：{{exprefecount.exprefecount}}</div>
		<div v-show="exploitee.exploitee.length === 0" style="width:100%">
			<st-nodata content="暂无人脉" :icon="style"></st-nodata>
		</div>
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" v-show="exploitee.exploitee.length > 0">
			<yd-list theme="1" slot="list">
					<mu-list :value="value" @change="handleChange">
						<!-- <mu-sub-header>今天</mu-sub-header> -->
						<div class="detail_list" v-for ="detail in exploitee.exploitee" v-if="detail&&detail.role">

							<mu-list-item :title="detail.label" :afterText="detail.role.data?detail.role.data.label:''" afterTextClass="afterclass"  :to="{name: 'Explreferr', params: {id: detail.id,label:detail.label}}">
								<span slot="left" v-if="detail.head_picture === null"><i class="st-icon icon-my" ></i></span>
								<mu-avatar :src="detail.head_picture"  slot="leftAvatar" v-if="detail.head_picture"/>
								<span slot="describe">ID:{{detail.owner_id}}</span>
								<span slot="describe" v-if="detail.has_children == true" class="has_children"></span>
								<p slot="describe"  v-for="(key,i) in detail.info" v-if="fields&&fields.data&&detail.info[0][1]">{{fields.data.label}}：{{key[fields.data.id]}}</p>
							</mu-list-item>
							<mu-divider inset/>
						</div>
					</mu-list>
			</yd-list>
			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip">——— 亲，看完了———</span>
			<!-- 加载中提示 -->
			<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
		</yd-infinitescroll>
	</div>
</template>
<script>
import Vue from 'vue';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import statuses from '@/Services/Statuses';
import CommissionRoles from '@/Services/CommissionRoles';
import FieldsType from '@/Services/FieldsType';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(ListTheme.name, ListTheme);
	export default{
		props:{
			roleIn:Array,
		},
		data() {
			return {
				statuse:'',
				page: 15,
				pageSize: 15,
				value: 2,
				node:0,
				style:'icon-favor',
				fields:'',
				exploitee:'',
				exprefecount:'',
				isFirstEnter:false,
			}
		},
		activated() {
		if(!this.$route.meta.isBack || this.isFirstEnter){
			// 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
			// 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
			this.page= 15;
			this.pageSize=15;
			this.createMap();
			this.createMapex();
			this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
		}
			this.page= this.page;
			this.pageSize=this.pageSize;
			// 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
			this.$route.meta.isBack=false;
			this.isFirstEnter=false;
		},
		created() {
			this.createMap();
			this.createMapex();
			this.page= 15;
			this.pageSize=15;
			this.isFirstEnter=true;
		  // 只有第一次进入或者刷新页面后才会执行此钩子函数
		  // 使用keep-alive后（2+次）进入不会再执行此钩子函数
		},

		watch: {
			roleIn(){
				this.createMap();
				this.createMapex();
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');//筛选之后初始化列表数据
			},
			$route(){
				this.createMap();
				this.createMapex();
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');//筛选之后初始化列表数据
			},
		},
		methods: {
			createMap(){
				return this.exploitee =  Data.createMap( {
					exploitee:{
						subject: 'Refer',
						entity: 'exprefe',
						params: {
							token: Auth.then(x=>x.token),
							take: 15,
							node:0,
							exploitee: this.$route.params.id,
							filters:{
								roleIn:this.roleIn,
							}
						},
						preprocessor:exploitee=>{
							return this.preprocessor(exploitee);
						},
					},
				});

			},
			createMapex(){
				return this.exprefecount =  Data.createMap( {
					exprefecount:{
						subject: 'Refer',
						entity: 'exprefecount',
						params: {
							token: Auth.then(x=>x.token),
							exploitee: this.$route.params.id,
							node:0,
						},
					}
				});

			},
			preprocessor(exploitee) {
				exploitee.forEach(exploitee=>{
					CommissionRoles.then(CommissionRoles=>{
						exploitee.role=CommissionRoles.find(x=>x.data.id === exploitee.role)
					});
					FieldsType.then(FieldsType=>{
						if(exploitee.info){
						exploitee.info.forEach(infos=> {
							for(var key in infos){
								this.fields = FieldsType.find(x=>String(x.data.id) === '1')
							}
						});
						}
					})
				})
				return exploitee;
			},
			handleChange (val) {
			     this.value = val
		   },
			loadList() {
				Auth.then( auth=> {
					Ajaxy.get( `${configs.catShop.apiBaseUrl}relations/${this.node}/exploitees/${this.$route.params.id}/referrees`, {take:this.pageSize, skip:this.page,'filters[roleIn]':this.roleIn,},{token: auth.token} )
						.when( 401, response=> Auth.refreshToken().then( token=> this.get(exploitee) ) )
						.when( 200, response=> {
							const _list = response.json;
							this.exploitee.exploitee = [...this.exploitee.exploitee, ..._list];
							this.preprocessor(response.json);
							if (_list.length < this.pageSize) {
								/* 所有数据加载完毕 */
								this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
								return;
							}
							/* 单次请求数据完毕 */
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
							this.page = this.page + this.pageSize
						} )

					;
				})
			},

		}

	}
</script>
<style>
.explreferr_item .mu-avatar{position: absolute;left: 0;border:1px solid #eee;top:20px;}
.explreferr_item button.st-fixed {
    left: 0;
    margin: 0;
}
.explreferr_item .has_children::after{
	margin-left: .05rem;
	margin-right: -.08rem;
	display: block;
	font-family: YDUI-INLAY;
	font-size: 14px;
	color: #c9c9c9;
	content: "\E608";
	position: absolute;
	right: 10px;
	top: 0;
}
.explreferr_item .explreferr_item_num{background: linear-gradient(rgb(94, 159, 255), rgb(117, 169, 247));color:#fff;line-height: 40px;text-align: center;}
</style>
