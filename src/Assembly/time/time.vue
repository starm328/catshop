<!-- stui 时间组件 -->
<template>
	<span class="time" v-if="newdate">
		<span>{{newdate.getFullYear()}}年</span><span>{{newdate.getMonth()+1}}月</span><span>{{newdate.getDate()}}日</span><span>{{newdate.getHours()}}:</span><span>{{`${newdate.getUTCMinutes()}`.padStart(2 ,'0')}}:</span><span>{{newdate.getSeconds()}}</span>
	</span>
</template>
<script>
export default {
	props: {
		time: {
			type:String,
			default:''
		}
	},
	computed:{
		newdate () {
			if(this.time){
				return new Date(this.time)
			}
		}
	}
}
</script>
<style lange="less">

</style>
