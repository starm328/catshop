// 定义外部账户数据
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
const App= require( '@/configs/app' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'ExternalAccount', {
	// 具体数据
	externalaccount: {
		// 数据为空时的默认值
		empty: [
			{
				loding: "loding"
			}
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
	// 外部账户详情
	externalshow: {
		// 数据为空时的默认值
		empty:{},
		// 接口地址
		url: '/{external_account_id}',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			external_account_id: {
				in: 'path'
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},

}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}external-accounts`,
} );
