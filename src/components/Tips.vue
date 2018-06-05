<template>
	<div v-if="contents" class="tips">
		<section>
			<slot></slot>
			{{contents}}
		</section>
	</div>
</template>

<script>

export default {
	props: {
		contents: String,
		timeout : {
			type : Number,
			default : 1000,
		}
	},

	watch: {
		contents( newValue, oldValue ){
			if( !oldValue && newValue ){
				setTimeout( ()=> this.$emit( 'update:contents', undefined ), this.timeout );
			}
		},
	},
};

</script>

<style scoped>
	.tips{display:flex;position:fixed;top:0;right:0;bottom:0;left:50%;margin-left:-187.5px;max-width:375px;background-color:rgba(0,0,0,0.5);z-index:999999;justify-content:space-around;align-items:center;}
	.tips section{background-color:rgba(255, 255, 255, 0.83);padding:1em 2em;max-width:60%;border-radius:5px;text-align:center;}
	.tips section p{padding-bottom:10px;}
	.tips section p i{font-size:28px;}
</style>
