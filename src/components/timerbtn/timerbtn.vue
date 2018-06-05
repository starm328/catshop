<template>
	<div class="timerbtn">
		<button @click="run" :disabled="disabled || time > 0" type="button" class="demo-raised-button sendcode-button yd-btn yd-btn-primary" :class="{disabled:disabled}">{{ text }}</button>
	</div>
</template>
<script>
	export default{
		props: {
		  second: {
		    type: Number,
		    default: 60
		  },

		},
		data () {
		 return {
		   time: 0,
		    disabled:false
		 }
		},
		methods: {
		  run () {
		   this.$emit('run');
		  },
		  start(){
		   this.time = this.second;
		   this.timer();
		  },
		  stop(){
		   this.time = 0;
		   this.disabled = false;
		  },
		  setDisabled(val){
		   this.disabled = val;
		  },
		  timer () {
		    if (this.time > 0) {
		      this.time--;
		      setTimeout(this.timer, 1000);
		    }else{
		     this.disabled = false;
		    }
		  }
		},
		computed: {
		  text () {
		    return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
		  }
		}
	}
</script>
<style type="text/css">
	.timerbtn .yd-btn-primary{background: #5e9fff}
	.timerbtn .yd-btn-primary.disabled{background: #ccc}
</style>
