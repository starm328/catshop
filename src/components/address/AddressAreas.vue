<!-- 地址组件，地址城市选择组件 -->
<template>
	<div class="address-areas">
			<section class="showChose">
			  <section class="address">
			    <section class="title">
			      <div class="area" @click="provinceSelected()"  :class="Province?'':'active'"  v-show="Province">{{Province?Province:'请选择'}}</div>
			      <div class="area" @click="citySelected()" :class="City?'':'active'" >{{City?City:'请选择'}}</div>
			      <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
			    </section>
			    <ul>
			      <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.label, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.label}}</li>
			      <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.label, k,v.long_label)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.label}}</li>
			      <li class="addList " v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.label, k,v.long_label)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.label}}<i class="iconfont">&#xe600;</i></li>
			    </ul>
			  </section>
			</section>
			<!-- <div v-for="(v,k) in info">
				{{v.label}}{{v.children.length}}
				<div v-if="v.children.length !== 0" v-for="(v,k) in v.children">{{v.label}}
					<div v-if="v.children.length !== 0 " v-for="(v,k) in v.children">
						{{v.label}} 11
					</div>
				</div>
			</div> -->
	</div>
</template>
<script>
import Data from '@/libs/Data';
import Ajaxy from 'ajaxy';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
	export default {
	  name: 'myAddress',
	  data () {
	  	return Data.createMap( {
	  		info: {
	  			// 对应 Data 目录下的文件
	  			subject: 'Areas',
	  			// 对应其中的具体数据
	  			entity: 'area',
	  			// 参数
	  			params: {
	  				area: configs.catShop.rootArea,
	  			},
	  		},
	  	},{
	  		showChose: false,
	  		showProvince: true,
	  		showCity: false,
	  		showDistrict: false,
	  		showCityList: false,
	  		showDistrictList: false,
	  		GetProvinceId: 2,
	  		District: false,
	  		Province: false,
	  		City: false,
	  		// v-for循环判断是否为当前
	  		selected: false,
	  	});
	  },
	  methods: {
	    choseAdd: function() {
	      this.showChose = true;
	    },
	    closeAdd: function() {
	      this.showChose = false;
	    },
	    _filter(add,name,code) {
	      let result = [];
	      for(let i=0;i<add.length;i++) {
	        if(code == add[i].id){
	          result = add[i][name];
	        }
	      }
	      return result;
	    },
	    getProvinceId: function(code,input,index) {
	      this.province = code;
	      this.Province = input;
	      this.showProvince=false;
	      this.showCity=true;
	      this.showDistrict = false;
	      this.showCityList = this._filter(this.info,'children',this.province);
	      // 点击选择当前
	      this.info.map( a => a.selected = false );
	      this.info[index].selected = true;
	      this.$emit('listen',code,input);
	    },
	    provinceSelected: function() {
	      // 清除市级和区级列表
	      this.showCityList = false;
	      this.showDistrictList = false;
	      // 清除市级和区级选项
	      this.City = false;
	      this.District = false;
	      // 选项页面的切换
	      this.showProvince = true;
	      this.showCity = false;
	      this.showDistrict = false;
	    },
	    getCityId: function(code, input, index,LongLabel) {
	      this.children = code;

	      this.showProvince=false;
	      this.showCity=false;

	      this.showDistrictList = this._filter(this.showCityList,'children',this.children);
	      // 选择当前添加active
	      this.showCityList.map( a => a.selected = false );
	      if(this.showDistrictList === undefined){
	      	  this.showDistrict = false;
	      	  this.$emit('listen',code,LongLabel);
	      	   this.$emit('close');
	      	    this.showCity=true;
	      	   this.showCityList[index].selected = true;
	      }else{
	      	 this.showDistrict = true;
	      	  this.City = input;
	      	  this.$emit('listens',input);
		      this.showCityList[index].selected = true;
	      }

	      // this.$emit('listen',code,input);
	    },
	    citySelected: function() {
	      this.showProvince=false;
	      this.showCity=true;
	      this.showDistrict = false;
	    },
	    getDistrictId: function(code, input, index,LongLabel) {
	      this.district = code;
	      this.District = input;
	      // 选择当前添加active
	      this.showDistrictList.map( a => a.selected = false );
	      this.showDistrictList[index].selected = true;
	      // 选取市区选项之后关闭弹层
	      this.$emit('close');
	      this.$emit('listen',code,LongLabel);
	    },
	    districtSelected: function() {
	      this.showProvince=false;
	      this.showCity=false;
	      this.showDistrict = true;
	    }
	  }
	}
</script>
<style type="text/css">
	.address-areas .myAddress{
	  width: 100%;
	  background-color: white;
	  border-top: 4px solid rgba(245,245,245,1);
	  color:#333;
	}
	.address-areas .myAddress .cont{
	  border-bottom: 1px solid rgba(245,245,245,0.8);
	}
	.address-areas .myAddress .cont span{
	  display: inline-block;
	  font-size: 0.28rem;
	  color: #333;
	  line-height: 0.88rem;
	  margin-left: 0.32rem;
	}
	.address-areas .myAddress .cont section{
	  float:left;
	}
	.address-areas .myAddress .cont p{
	  display: inline-block;
	  font-size: 0.28rem;
	  color: #333333;
	  line-height: 0.88rem;
	  margin-left: 1rem;
	}
	.address-areas .myAddress .cont .pic2{
	  float: right;
	  width: 0.14rem;
	  height: 0.24rem;
	  margin: 0.32rem 0.32rem 0.32rem 0;
	}
	.address-areas .myAddress .cont p.text{
	  margin-left: 0.72rem;
	}

	.address-areas .title{height: 45px;line-height: 45px;border-bottom: 1px solid #ccc;background:#fff;z-index:10003;position: sticky;top:0;}
	.address-areas .title>div{padding:0 10px;height: 45px;line-height: 45px;}
	.address-areas .title h4{
	  display:inline-block;
	  margin-left:3.2rem;
	  font-size:0.32rem;
	  line-height:0.88rem;
	  font-weight:normal;
	  color:#999;
	}
	.address-areas .title span{
	  margin:0.42rem 0 0 2.2rem;
	  font-size:0.45rem;
	  line-height:0.34rem;
	  color:#D8D8D8;
	}
	.address-areas .area{
	  display:inline-block;
	  font-size:13px;
	  line-height:0.88rem;
	  margin-left:0.42rem;
	  color:#333;
	}
	.address-areas .addList{
	  width:95%;
	  margin:0 auto;
	  font-size:13px;
	  line-height:35px;
	  text-indent: 10px;
	  height: 45px;
	  line-height: 45px;
	  color:#333;
	  border-bottom:1px solid #ccc;
	}
	/* 修改的格式 */
	.address-areas .address ul{
	  width:100%;
	  height:calc(100% - 45px;);
	  overflow:auto;
	}
	.address-areas .address .title .active{
	  color:#5E9FFF;
	  border-bottom:1px solid #0071B8;
	}
	.address-areas .address ul i{display: none;}
	.address-areas .address ul .active{
	  color:#0071B8;
	  position: relative;
	}
	.address-areas .address ul .active i{
		display: block;
		position: absolute;
		right: 10px;
		color:#000;
		top:0;
		color:#0071B8;
		font-size:18px;
	}
</style>
