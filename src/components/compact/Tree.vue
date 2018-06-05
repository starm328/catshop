<!-- 树状组件组件 -->
<template>
	<div class="st-tree">
		<!-- 左边内容 -->
		<div>
			<slot name="left"></slot>
		</div>
		<!-- 中间图标 -->
		<slot name="content"></slot>
		<!-- 右边内容 -->
		<div>
			<slot name="right"></slot>
		</div>
	</div>
</template>
<script>
	export default{
	}
</script>
<style lang='less'>
/*
	线条颜色
*/
@linecolor: #fff;
	.st-tree{display: flex;justify-content:center;align-items: center;
		i{margin:0 10px;}
		div{line-height: 27px;
			p{position: relative;height: 29px;font-size:14px;
				&::after{
					background:@linecolor;
					position: absolute;
					content: '';
				}
				&::before{
					background:@linecolor;
					position: absolute;
					content: '';
				}
			}
			&:first-child{
				p{position: relative;padding-right: 10px}
				p:only-child{
					&::after {
						display: none;
					}
					&::before {
						display: none;
					}
				}
				p:not(:first-child):not(:last-child){
					&::after {
						right: -5px;
						width: 10px;
						height: 1px;
						top:14px;
					}
					&::before {
						right: -5px;
						width: 1px;
						height: 29px;
						top:0px;
					}
				}
				p:first-child{
					&::after {
						right: -5px;
						width: 10px;
						height: 1px;
						top:14px;
					}
					&::before {
						right: -5px;
						width: 1px;
						height: 14px;
						top:15px;
						text-align: right;
					}
				}
				p:last-child{
					&::after {
						right: -5px;
						width: 10px;
						height: 1px;
						bottom:14px;
					}
					&::before {
						right: -5px;
						width: 1px;
						height: 14px;
						bottom:15px;
						text-align: right;
					}
				}
			}
			&:last-child{
				p{position: relative;padding-left: 10px;
					&:not(:first-child):not(:last-child){
						&::after {
							left: -5px;
							width: 10px;
							height: 1px;
							top:14px;
						}
						&::before {
							left: -5px;
							width: 1px;
							height: 29px;
							top:0px;
						}
					}
				}
				p:only-child{
					&::after {
						display: none;
					}
					&::before {
						display: none;
					}
				}
				p:last-child{
					&::after {
						left: -5px;
						width: 10px;
						height: 1px;
						bottom:14px;
					}
					&::before {
						left: -5px;
						width: 1px;
						height: 14px;
						bottom:15px;
						text-align: right;
					}
				}
				p:first-child{
					&::after {
						left: -5px;
						width: 10px;
						height: 1px;
						top:14px;
					}
					&::before {
						left: -5px;
						width: 1px;
						height: 14px;
						top:15px;
						text-align: right;
					}
				}
			}
		}
	}

</style>
