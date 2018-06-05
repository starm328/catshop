// 定义外部账户类型数据
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
const App= require( '@/configs/app' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'ExternalAccountType', {
	// 外部账户类型
	accounttype: {
		// 数据为空时的默认值
		empty: [
		],
		// 接口地址
		url: '',
		// 接口参数(传参方式)
		params: {
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	//外部账户类型表单
	accountform: {
		// 数据为空时的默认值
		empty: [
		],
		// 接口地址
		url: '/{external_account_type}',
		// 接口参数(传参方式)
		params: {
			external_account_type: {
				in: 'path',
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},

},{
	baseUrl: `${App.default.catShop.apiBaseUrl}external-account-types`,
} );
