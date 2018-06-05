// 定义账户数据
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
const App= require( '@/configs/app' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'AccountExchange', {
	// 具体数据
	exchanges: {
		// 数据为空时的默认值
		empty: [
		],
		// 接口地址
		url: 'active-exchanges',
		// 接口参数(传参方式)
		// 不本地缓存
		// nonLocalCache: true,
	},

}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}`,
} );
