<!-- 地址组件，地址列表组件 -->
<template>
<div class="st-viewbox">
	<v-loged :needUser="true">
		<div class="address-list" >
				<address-item  @child-info="get"></address-item>
				<router-link :to="{name: 'Addressadd'}">
					<mu-raised-button label="新增地址" class="demo-raised-button st-fixed fullHeight" primary fullWidth backgroundColor="#FF4E4E" v-if="myaddid > 0"/>
				</router-link>
		</div>
	</v-loged>
</div>
</template>
<script>
import Vue from 'vue';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
import AddressItem from '@/components/address/AddressItem';
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
Vue.component(Popup.name, Popup);
export default{

	data() {
		return {
			show2: false,
			msgParent:'',
			myaddid:'',
		}
	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},

	components: {
		'v-loged': Loged,
		'address-item': AddressItem,
	},
	methods: {
		AddClose() {
			this.show2 = false;
		},
		get(id){
          this.myaddid = id;
        },
	},
}
</script>
<style type="text/css">
.address-list{
	position: absolute;
	width: 100%;
	min-height: -webkit-calc(100% - 100px);
	max-width: 375px;
}
</style>
