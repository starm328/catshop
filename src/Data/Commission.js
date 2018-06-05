// 定义分润数据

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Commission', {
	// 具体数据  所有区域
	item: {
		// 数据为空时的默认值
		empty: [
			{
				status: "loding"
			}
		],
		// 接口地址
		url: '/{account}/commissions/cate-{category}',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			category: {
				in: 'path',
			},
			account: {
				in: 'path',
			},
			take: {
				in: 'query',
				default:0
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	sum: {
		// 数据为空时的默认值
		empty: [
			{
				status: "loding"
			}
		],
		// 接口地址
		url: '/{account}/commissions/cate-{category}/sum',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			category: {
				in: 'path',
			},
			account: {
				in: 'path',
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},

}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}accounts`,
} );
