<!-- 人脉管理直属人脉子组件 -->
<template>
	<div class="Referreeitem-center st_detail_list">
	<div v-show="referrers.referrers.length === 0" style="width:100%">
		<st-nodata content="暂无人脉" :icon="style"></st-nodata>
	</div>
	<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" >
		<yd-list theme="1" slot="list">
				<mu-list >
					<!-- <mu-sub-header>今天</mu-sub-header> -->
					<div  >
						<div class="detail_list" v-for="(referrer,i) in referrers.referrers" v-if="referrer&&referrer.role">
							<mu-list-item :title="referrer.label"  afterTextClass="afterclass" :afterText="referrer.role.data?referrer.role.data.label:''" :to="{name: 'Explreferr', params: {id: referrer.id,label:referrer.label}}">
								<span slot="left" v-if="referrer.head_picture === null"><i class="st-icon icon-my" ></i></span>
								<mu-avatar :src="referrer.head_picture"  slot="leftAvatar" v-if="referrer.head_picture"/>
								<span slot="describe" v-if="referrer.has_children == true" class="has_children"></span>
								<span slot="describe" >ID:{{referrer.owner_id}}</span>
								<p slot="describe"  v-for="(key,i) in referrer.info"  v-if="fields&&referrer.info[0][1]">{{fields.data.label}}：{{key[fields.data.id]}}</p>
							</mu-list-item>
							<mu-divider inset/>
						</div>
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
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
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
				page:15,
				pageSize:15,
				node:0,
				style:'icon-favor',
				fields:'',
				referrers:'',
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
			this.page= 15;
			this.pageSize=15;
			this.isFirstEnter=true;
		  // 只有第一次进入或者刷新页面后才会执行此钩子函数
		  // 使用keep-alive后（2+次）进入不会再执行此钩子函数
		},
		mounted() {

		},
		watch: {
			roleIn(){
				this.createMap();
				this.page= 15;
				this.pageSize=15;
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');//筛选之后初始化列表数据
			},
		},

		methods: {
			createMap(){
				return this.referrers =  Data.createMap( {
					referrers: {
						// 对应 Data 目录下的文件
						subject: 'Refer',
						// 对应其中的具体数据
						entity: 'referrers',
						// 参数
						params: {
							token: Auth.then(x=>x.token),
							node:0,
							take:15,
							filters:{
								roleIn:this.roleIn,
							}
						},
						preprocessor:referrers=>{
							return this.preprocessor(referrers);
						},
					},
				});

			},
			preprocessor(referrers) {
				referrers.forEach(referrer=>{
					CommissionRoles.then(CommissionRoles=>{
						referrer.role=CommissionRoles.find(x=>x.data.id === referrer.role)
					});
					FieldsType.then(FieldsType=>{
						if(referrer.info){
							referrer.info.forEach(infos=> {
								for(var key in infos){
									// console.log(FieldsType)
									// console.log(key)
									this.fields = FieldsType.find(x=>String(x.data.id) === '1')
								}
							});
						}

					})
				})
				return referrers;
			},
			loadList() {
				Auth.then( auth=> {
					Ajaxy.get( `${configs.catShop.apiBaseUrl}relations/${this.node}/referrees?`, {take:this.pageSize, skip:this.page,'filters[roleIn]':this.roleIn},{token: auth.token} )
						.when( 401, response=> Auth.refreshToken().then( token=> this.get(referrers) ) )
						.when( 200, response=> {
							const _list = response.json;
							this.referrers.referrers = [...this.referrers.referrers, ..._list];
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
		},
	}
</script>
<style>
.Referreeitem-center  .mu-avatar{position: absolute;left: 0;border:1px solid #eee;top:20px;}
.Referreeitem-center  .has_children::after{
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
.Referreeitem-center .mu-list{padding:0;}
</style>
