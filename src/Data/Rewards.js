// 定义公开接口 --基础支持

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Rewards', {
	// 具体数据  分润类型
	rewards: {
		// 数据为空时的默认值
		empty: [],
		// 接口地址
		url: '{account}/rewards/provider-{providerId}-{providerType}',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			account: {
				in: 'path',
			},
			providerId: {
				in:'path',
			},
			providerType: {
				in: 'path',
			},
			take: {
				in: 'query',
				default:0
			},
			skip: {
				in: 'query',
				default:0
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	sum: {
		// 数据为空时的默认值
		empty: [],
		// 接口地址
		url: '{account}/rewards/provider-{providerId}-{providerType}/sum',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			account: {
				in: 'path',
			},
			providerId: {
				in:'path',
			},
			providerType: {
				in: 'path',
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},

}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}accounts/`,
} );
