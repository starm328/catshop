// 个人资料

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'User', {
	// 具体数据  第三方账户
	agents: {
		// 数据为空时的默认值
		empty: [
			{
				type: 'WX'
			}
		],
		// 接口地址
		url: 'user-agents',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			tokens: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'query',
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	//读取用户信息条目
	infosfields: {
		// 数据为空时的默认值
		empty: [],
		// 接口地址
		url: 'user-info-fields',
		// 接口参数(传参方式)
		// 不本地缓存
		// nonLocalCache: true,
	},
	//读取个人信息
	infos: {
		// 数据为空时的默认值
		empty: {
			1: ""
		},
		// 接口地址
		url: 'user-info/infos',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},//读取个人头像
	headpicture: {
		// 数据为空时的默认值
		empty: {
			loding:'loding'
		},
		// 接口地址
		url: 'user-info/head-picture',
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

}, {
	baseUrl:  `${App.default.catShop.apiBaseUrl}`,
} );
