<!-- 浮動按鈕組件-->
<template>
	<div class="st-float-btn" :class="classNames"  :style="styles">
		<div class="st-float-box"  >
			<mu-float-button   class="demo-float-button" icon=" " iconClass="iconfont icon-jia" @click="changeShow" v-if="clickbtn"/>
			<mu-float-button   class="demo-float-button" icon=" " iconClass="iconfont icon-jia" v-else/>
			<div  :style="stylesd" style="position:absolute" :class="[show?'show':'hidden', 'showing']"><slot name="content" :class="classNames"></slot></div>
		</div>

	</div>
</template>
<script>
	export default{
		props:{
			fixed: {
				type:String,
				default:'bottom',
			},
			position: {
				type:String,
				default:'auto',
			},
			top: {
				type:String,
				default:'auto',
			},
			right: {
				type:String,
				default:'auto',
			},
			left: {
				type:String,
				default:'auto',
			},
			bottom: {
				type:String,
				default:'auto',
			},
			clickbtn: {
				type:String,
				default:''
			}
		},
		data() {
			return {
				show:false,
			}
		},
		computed: {
			classNames () {
				let className = {}
				className['st-pfixed'] = this.fixed
				return className
			},
			styles() {
				if (this.position === 'right') {
					return {right: this.right, top: this.top, bottom: this.bottom, left: this.left};
				} else if (this.position === 'left') {
					return {right: this.left, top: this.top, bottom: this.bottom, left: this.left};
				} else if (this.position === 'top'){
					return {right: this.right, top: this.top, bottom: this.bottom, left: this.left};
				} else {
					return {right: this.right, top: this.top, bottom: this.bottom, left: this.left};
				}
			},
			stylesd() {
				if (this.position === 'right') {
					return {right: 0, top: this.top, bottom: '70px', left: '8px'};
				}
			}

		},
		methods: {
			changeShow() {
				this.show = this.show?false:true
			},
		}
	}
</script>
<style lang="less">
.st-float-btn .st-float-box{
	position:relative;
	.showing{
		transition:height 2s;
	}
	.hidden{
		display:none


	}
	.show{
		display:block
	}

}
</style>
