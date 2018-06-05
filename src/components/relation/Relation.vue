<!-- 人脉管理组件父组件 -->
<template>
<div class="st-viewbox">
	<div class="relation-center">
		<div class="top dearest_bgcolor">
			<div class="dearest">
				<h6>
					<span class="title">推广素材</span>
					<!-- <router-link :to="{name: 'Extension',params: {name: 'text'}}"><span class="extensin-btn"><i class="iconfont">&#xe62e;</i>推荐码</span></router-link> -->
					<router-link :to="{name: 'Extension',params: {name: 'qrcode'}}"><span class="extensin-btn"><i class="iconfont">&#xe612;</i>二维码</span></router-link>

				</h6>
				<ul>
					<li>
						<a class="button">
							<small>直属人脉</small>
							<b>
								<yd-countup
								:endnum="referrcount"
								duration="1"
								decimals="0"
								separator=","
								useEasing
								start
								></yd-countup>
							</b>
						</a>
					</li>
					<li>
						<a class="button">
							<small>所有人脉</small>
							<b>
								<yd-countup
								:endnum="explocount"
								duration="1"
								decimals="0"
								separator=","
								useEasing
								start
								></yd-countup>
							</b>
						</a>
					</li>

				</ul>
			</div>
		</div>
		<mu-list>
			<router-link :to="{name:'Referrer'}">
				<mu-list-item title="引路人" >
					<mu-icon value=" " slot="leftAvatar" class="st-icon icon-locationfill"/>
					<mu-icon value=" " slot="right" class="st-icon icon-right"/>
				</mu-list-item>
			</router-link>
			<router-link :to="{name: 'Referrees'}">
				<mu-list-item title="查看直属人脉" >
					<mu-icon value=" " slot="leftAvatar" class="st-icon icon-locationfill"/>
					<mu-icon value=" " slot="right" class="st-icon icon-right"/>
				</mu-list-item>
			</router-link>
			<router-link :to="{name: 'Exploitees'}">
				<mu-list-item title="查看所有人脉" >
					<mu-icon value=" " slot="leftAvatar" class="st-icon icon-upstagefill"/>
					<mu-icon value=" " slot="right" class="st-icon icon-right"/>
				</mu-list-item>
			</router-link>
		</mu-list>
	</div>
	<tips :contents.sync="tips"  :timeout="1000"><p><i class="iconfont" >&#xe64a;</i></p></tips>
</div>

</template>
<script>
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Tips from '@/components/Tips';
	export default{
		components:{
			'tips': Tips,
		},
		data(){
			return Data.createMap( {
				refercode: {
					// 对应 Data 目录下的文件
					subject: 'Refer',
					// 对应其中的具体数据
					entity: 'refercode',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
					},
				},
				referrcount: {
					// 对应 Data 目录下的文件
					subject: 'Refer',
					// 对应其中的具体数据
					entity: 'referrcount',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
						node:0,
					},
				},
				explocount: {
					// 对应 Data 目录下的文件
					subject: 'Refer',
					// 对应其中的具体数据
					entity: 'explocount',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
						node:0,
					},
				},
			},{
				tips:''
			});

		},
		methods:{
			copy() {
				var d = document.getElementById("contents");
				d.select();
				document.execCommand("Copy");
				this.tips = "复制成功"


			}
		}
	}
</script>
<style>
.relation-center{min-height: 500px}
.relation-center .top{
	padding:10px 0;
}

/*swiper*/
.relation-center .mu-item-wrapper {
    background: #fff;
    position: relative;
}
.relation-center .mu-item-wrapper::after {
    clear: both;
    display: block;
    content: '';
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: #eee;
}
.relation-center .mu-list a {
    color: inherit;
}
</style>
