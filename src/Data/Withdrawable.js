// 定义提现数据
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
const App= require( '@/configs/app' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Withdrawable', {
	// 可提现资金类型
	withdrawable: {
		// 数据为空时的默认值
		empty: [
		],
		// 接口地址
		url: 'withdrawable',
		// 接口参数(传参方式)
		params: {
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	// 提现规则
	withdrawRules: {
		// 数据为空时的默认值
		empty: [
		],
		// 接口地址
		url: 'withdrawable/{accountType}/withdrawRules',
		// 接口参数(传参方式)
		params: {
			accountType: {
				in: 'path'
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	// 提现约束
	limits: {
		// 数据为空时的默认值
		empty: [
		],
		// 接口地址
		url: 'withdraw-rules/{withdraw_rule}/limits',
		// 接口参数(传参方式)
		params: {
			withdraw_rule: {
				in: 'path',
				default: 0
			},
			is_hard: {
				in: 'query',
				default:1
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	// 提现申请记录
	withdrawlist: {
		// 数据为空时的默认值
		empty: [
			{
				loding: 'loding'
			}
		],
		// 接口地址
		url: 'manual-withdraws',
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
	// 提现申请记录详情
	withdrawshow: {
		// 数据为空时的默认值
		empty: [
		],
		// 接口地址
		url: 'manual-withdraws/{unique_code}',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			unique_code: {
				in: 'path'
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},

},{
	baseUrl: `${App.default.catShop.apiBaseUrl}`,
} );
