<template>
	<div class="ticket-item">
		<!-- <div class="initialization on" v-if="titcket[0].loding === 'loding'">
			<div class="loader"></div>
		</div> -->

		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" v-if="titcket.length > 0">
			<yd-list theme="1" slot="list">
				<div  v-for="item in titcket" v-if="item && item.type" >

					<!-- 失效或则已使用过的 -->
					<div class="stm-titcket-item" :class="new Date(item.expired_at) > new Date() || item.expired_at !== null || item.status_id == 'used'?  'stm-titcket-item--disabled' : '' " v-if="new Date(item.expired_at) < new Date() && item.expired_at !== null || item.status_id == 'used'">
							<div class="stm-titcket-item__head">
								<div class="stm-titcket-item__lines"></div>
								<div class="stm-titcket-item__gradient">
									<h2>{{item.type.label}}</h2>
									<p v-if="new Date(item.expired_at) < new Date() && item.expired_at !== null"><span>失效</span></p>
									<p v-else-if="item.status_id == 'new'">未使用</p>
									<p v-else-if="item.status_id == 'used'">已使用</p>
									<p v-else-if="item.status_id == 'binded'">绑定用户</p>
								</div>
							</div>
							<div class="stm-titcket-item__body">
								<h2 v-if="item.expired_at == null">长期有效</h2><h2 v-else>{{item.expired_at}}</h2>	<span>{{item.label}}</span>
							</div>
					</div>

					<router-link  :to="{name:'TicketShow',params:{id:item.code}}"  v-else>
						<div class="stm-titcket-item" :class="new Date(item.expired_at) < new Date() && item.expired_at !== null? 'stm-titcket-item--disabled' : '' || item.status_id == 'used'">
								<div class="stm-titcket-item__head">
									<div class="stm-titcket-item__lines"></div>
									<div class="stm-titcket-item__gradient">
										<h2>{{item.type.label}}</h2>
										<p v-if="new Date(item.expired_at) < new Date() && item.expired_at !== null"><span>失效</span></p>
										<p v-else-if="item.status_id == 'new'">未使用</p>
										<p v-else-if="item.status_id == 'used'">已使用</p>
										<p v-else-if="item.status_id == 'binded'">绑定用户</p>
									</div>
								</div>
								<div class="stm-titcket-item__body">
									<h2 v-if="item.expired_at == null">长期有效</h2><h2 v-else>{{item.expired_at}}</h2>	<span>{{item.label}}</span>
								</div>
						</div>
					</router-link>
				</div>
			</yd-list>
		</yd-infinitescroll>
		<!-- 			没有数据 组件		 -->
		<div v-else-if="titcket.length == 0" style="width:100%">
			<st-nodata content="暂无相关数据"></st-nodata>
		</div>
		<!-- 			没有数据 组件end		 -->
	</div>
</template>
<script>
import Vue from 'vue';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(ListTheme.name, ListTheme);
export default {
	name: 'ticket-item',
	props: {
		statusId:Array
	},
	data () {
		return this.createMap();
	},
	watch: {
		statusId(){
			this.createMap(this._data);
			this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit'); //筛选之后初始化列表数据
		},
	},
	methods: {
		createMap(data =  {}){
			 return Data.createMap( {
				titcket:{
					subject: 'ExtensionProxy',
					entity: 'Tickets',
					params: {
						extensionApp:configs.Titcket.ExtensionApp,
						token: Auth.then(x=>x.token),
						url: configs.Titcket.url +'list/'+ (this.statusId.length == 0 ? '?' : '?statuses='+this.statusId.join('-') + '&') + 'take=10&skip=0'
					},
				},

			 },{
			 	take:10,
			 	skip:10
			 },data);
		},
		loadList() {
			Auth.then( auth=> {
				Ajaxy.get( `${configs.catShop.apiBaseUrl}exa-${configs.Titcket.ExtensionApp}/proxy?url=${encodeURIComponent(configs.Titcket.url+'list/'+ (this.statusId.length == 0 ? '?' : '?statuses='+this.statusId.join('-') + '&') +'take='+this.take+'&skip='+ this.skip)}`,{},{token: auth.token} )
					.when( 401, response=> Auth.refreshToken().then( token=> this.get(titcket) ) )
					.when( 200, response=> {
						const _list = response.json;
						this.titcket = [...this.titcket, ..._list];
						if (_list.length < this.take) {
							/* 所有数据加载完毕 */
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						/* 单次请求数据完毕 */
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
						this.skip = this.skip + 10;
					} )

				;
			})
		},
	}

}
</script>

<style lang="less" scoped>
.ticket-item{
	margin-top:20px;
	.stm-titcket-item {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		height: 100px;
		margin: 0 15px 10px;
		.stm-titcket-item__head {
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				height: 100%;
				line-height: 1;
				min-width: 126px;
				.stm-titcket-item__lines {
						height: 100%;
						min-width: 18px;
						border-left:3px dashed #f75656;

				}
				.stm-titcket-item__gradient {
						-webkit-box-flex: 1;
						-webkit-flex: 1;
						flex: 1;
						color: #fff;
						display: -webkit-box;
						display: -webkit-flex;
						display: flex;
						margin-left: -1px;
						text-align: center;
						margin-left: -16px;
						-webkit-box-orient: vertical;
						-webkit-box-direction: normal;
						-webkit-flex-direction: column;
						flex-direction: column;
						-webkit-box-pack: center;
						-webkit-justify-content: center;
						justify-content: center;
						background-image: linear-gradient(45deg, #f23030, #ff8c8c);
						h2 {
								font-size:18px;
								font-weight: normal;
								margin: 0 0 10px;
								span {
										font-size: 16px;
								}
						}
						p {
								margin: 0;
								font-size: 14px;
								font-weight: 300;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
						}
				}
		}
		.stm-titcket-item__body {
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				flex: 1;
				height: 100%;
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				padding: 0 15px;
				overflow: hidden;
				position: relative;
				background-color: #fff;
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				-webkit-flex-direction: column;
				flex-direction: column;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				border-radius: 0 4px 4px 0;
				p,h2,span{
					line-height: 1.4;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					color: #999;
					font-size: 12px;
					margin: 5px 0 0;
				}
				h2{
					margin: 0;
					opacity: .8;
					font-size: 16px;
					font-weight: normal;
				}
		}
		&.stm-titcket-item--disabled .stm-titcket-item__gradient {
			background-image: linear-gradient(45deg, #a4a9b2, #b7bcc3);
		}
		&.stm-titcket-item--disabled .stm-titcket-item__lines {
			border-left:3px dashed #abb0b8;
		}
		&.stm-titcket-item--disabled .stm-titcket-item__gradient {
			background-image: linear-gradient(45deg, #a4a9b2, #b7bcc3);
		}

	}

}

</style>
