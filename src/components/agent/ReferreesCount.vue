<template>
	<yd-countup
	:endnum="referrcount"
	duration="1"
	decimals="0"
	separator=","
	useEasing
	start
	></yd-countup>
</template>

<script>
import Auth from '@/Services/Auth';
import Data from '@/libs/Data';
export default {
	components: {
	},
	props:{
		id:Number
	},
	data(){
		return Data.createMap( {
			referrcount: {
				// 对应 Data 目录下的文件
				subject: 'Refer',
				// 对应其中的具体数据
				entity: 'referrcount',
				// 参数
				params: {
					token: Auth.then(x=>x.token),
					node:this.id,
				},
			},
		},{
		});
	},
	methods : {

	},
};
</script>
<style>

</style>
