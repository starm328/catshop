// 定义账户数据
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
const App= require( '@/configs/app' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Account', {
	// 具体数据
	reasons: {
		// 数据为空时的默认值
		empty: [
		],
		// 接口地址
		url: 'reasons',
		// 接口参数(传参方式)
		params: {
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	accounts: {
		// 数据为空时的默认值
		empty: [
		],
		// 接口地址
		url: '',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	statistics: {
		// 数据为空时的默认值
		empty: {
		},
		// 接口地址
		url: '/{account}/count/{counters}',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			account: {
				in: 'path',
			},
			counters: {
				in: 'path',
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	details: {
		// 数据为空时的默认值
		empty: [
			{
				loding: 'loding'
			}
		],
		// 接口地址
		url: '/{account}/details',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			account: {
				in: 'path',
			},
			take: {
				in: 'query',
				default: 0,
			},
			skip: {
				in: 'query',
				default:0
			},
			filters:{
				in: 'query',
				default:''
			}



		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	detailpage: {
		// 数据为空时的默认值
		empty: [],
		// 接口地址
		url: '/{account}/details/{accountDetail}',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			account: {
				in: 'path',
			},
			accountDetail: {
				in: 'path',
			},


		},
		// 不本地缓存
		// nonLocalCache: true,
	},

}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}accounts`,
} );
