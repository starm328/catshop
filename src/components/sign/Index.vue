<!-- 绑定用户组件 -->
<template>
<div class="st-viewbox">
	<a class="button addressclose"  @click="close" v-if="action === 'cartb' || action === 'add-to-cart'"><i class="st-icon icon-close" v-if="action"></i></a>
	<a class="button addressclose"  @click="$router.go(-1)" v-else><i class="st-icon icon-close" v-if="action"></i></a>
	<div class="sign-index">
		<div class="st-header st-main-bgcolor show">
				<div class="wrap">
					<div class="l" >
						<mu-icon-button  @click="close" v-if="action === 'cartb' || action === 'add-to-cart'"><i class="st-icon icon-back"></i></mu-icon-button>
						<mu-icon-button  @click="$router.go(-1)" v-else><i class="st-icon icon-back"></i></mu-icon-button>
					</div>
					<div class="c">
						<em>绑定用户</em>
					</div>
					<div class="r">
					</div>
				</div>
		</div>
		<div :class="{'sign_nodata':action}">
			<st-nodata content="还差一步" icon="icon-my">
				<div class="sign-button">
					 <mu-raised-button label="设置新用户" class="demo-raised-button st-bgcolorone" primary  @click="openSignForm"/>
					 <mu-raised-button label="绑定已有用户" class="demo-raised-button st-bgcolortwo" primary  @click="openBindForm"/>
				</div>
			</st-nodata>

			<div :open="showSignForm" :class="{user_kit:1,show: showSignForm}">
				<user-sign @close="closeAndTips" @on-child-change="onChildChange"/>
			</div>
			<div :open="showBindForm" :class="{user_kit:1,show: showBindForm}">
				<user-bind @close="closeBindTips" @on-child-change="onChildChange"/>
			</div>
		</div>
	</div>
</div>

</template>
<script>
import UserSign from '@/components/sign/Sign';
import UserBind from '@/components/sign/Bind';
export default {
	components: {
		'user-sign': UserSign,
		'user-bind': UserBind,
	},
	props:{
		action:String
	},
	data(){
		return {
			showSignForm: false,
			showBindForm: false,
			tips:'',
		};
	},
	metaInfo () {
	    const title = this.$route.meta.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},
	methods : {
		onChildChange(data){
		    //这里的data不需要在上面的html代码中传参
		    console.log(data);
		},
		closeSignForm () {
			this.showSignForm = false;
		},
		openSignForm ( action ) {
			this.showSignForm = true;
		},
		closeSignForm () {
			this.showBindForm = false;
		},
		openBindForm ( action ) {
			this.showBindForm = true;
		},
		closeAndTips(data) {
			this.showSignForm = false;
			this.$emit('updata', data);
			this.$emit('close');

		},
		closeBindTips(data) {
			this.showBindForm = false;
			this.$emit('updata', data);
			this.$emit('close');

		},
		close() {
			this.$emit('close');
		},
	},
};
</script>
<style>

.sign-index{padding-bottom: 30%}
.sign-index .mu-raised-button-primary.st-subbutton{margin-top: 30px;}
.sign-index .user_kit:not(.show) .open_bottomsheet_bg{opacity: 0;visibility:hidden;}
.sign-index .user_kit  .open_bottomsheet_bg{position:fixed;bottom:0;width:100%;transition: opacity 200ms, visibility 200ms;height: 100%;background:rgba(000,000,000,0.5);z-index: 99;left: 0}
.sign-index .sign-button button{width:50%;text-align: center;margin:10px auto;height: 40px;}
.sign-index .sign-button .mu-raised-button-primary{width:50%;text-align: center;margin:10px auto;height: 40px;}


.sign-index .user-sign .user-sign_main{margin-top: 20%}
.sign-index .user-sign .user-sign-content{padding:0 10px;}
.sign-index .user-sign .sing-close{position: fixed;right: 10%;font-size:24px;z-index: 2;color:#000;overflow:auto;}
.sign-index .user-sign .mu-text-field-content .mu-text-field-help{position: static !important;}
.sign-index .user-sign form{padding:2em 2em 4em;}
.sign-index .user-sign {max-width: 375px;-webkit-animation: scale-in 0.3s forwards;position: fixed;width: 100%;left: 50%;top: 0;height:100%;margin-left:-187.5px;-webkit-transition: .3s; transition: .3s; z-index: 1000;
		/* animation: scale-in 0.3s forwards; */background:#fff;overflow: auto;box-shadow: 0px 0px 30px rgba(255,255,255,0.5);}

.sign-index .user_kit:not(.show) .user-sign {position: absolute;width: 80%;left: 10%;top: 30%;-webkit-transition: .3s; transition: .3s; z-index: 300;-webkit-animation: scale-out 0.3s forwards;
animation: scale-out 0.3s forwards;background:#fff;display: none}
@keyframes scale-out {
	0% {
		opacity: 1;
		transform: scale(1);
		-webkit-transform: scale(1);
	}
	100% {
		opacity: 0;
		transform: scale(0.3);
		-webkit-transform: scale(0.3);
	}
}

@keyframes scale-in {
	0% {
		transform: scale(0.7);
		-webkit-transform: scale(0.7); }
	60% {
		transform: scale(1.03);
		-webkit-transform: scale(1.03); }
	100% {
		transform: scale(1);
		-webkit-transform: scale(1); }
}
/*下拉出现动画*/
@keyframes bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}
</style>
