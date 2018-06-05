// 定义购物车数据

// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
const App= require( '@/configs/app' );
// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Cart', {
	// 具体数据
	show: {
		// 数据为空时的默认值
		empty: {
			contents: [
				{
					loding: 'loding'
				}
			]
		},
		// 接口地址
		url: '{cartId}',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			cartId: {
				in: 'path',
				default: 0,
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	current:{
		empty: 0,
		// 接口地址
		url: 'current',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
		},
		// 不本地缓存
		nonLocalCache: true,
	},
	count: {
		// 数据为空时的默认值
		empty: 0,
		// 接口地址
		url: '{cartId}/count',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			cartId: {
				in: 'path',
				default: 0,
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}carts/`,
} );
