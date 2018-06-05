<!-- starm 表单列表组件 -->
<template>
	<div class="yd-cell-item">
		<span class="st-cell-tit">
			<slot name="tit"></slot>
		</span>
		<span class="yd-cell-icon">
			<slot name="icon"></slot>
		</span>
		<div class="yd-cell-left">
			<slot name="left"></slot>
		</div>
		<div class="yd-cell-right">
			<slot name="right"></slot>
		</div>
		<div class="st-clee-inputerror">
			<slot name="error"></slot>
		</div>
	</div>
</template>
<script>
export default {

}
</script>
<style>
.yd-cell-item .yd-cell-right .textright input{text-align: right;}
.yd-cell-item{    flex-wrap: wrap;}
.st-cell-tit{flex: 0 0 100%}
.st-clee-inputerror{flex: 0 0 100%}
.st-clee-inputerror .inputerror{color:#F23030;padding:0 5px 10px 5px; }
</style>
