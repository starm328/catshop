// 定义账户数据
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
const App= require( '@/configs/app' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'ExtensionProxy', {
	// 具体数据
	Tickets: {
		// 数据为空时的默认值
		empty: [
			{
				loding: 'loding'
			}
		],
		// 接口地址
		url: '{extensionApp}/proxy',
		// 接口参数(传参方式)
		params: {
			extensionApp: {
				in: 'path'
			},
			token: {
				in: 'header'
			},
			url: {
				in:'query'
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	TicketsShow: {
		// 数据为空时的默认值
		empty:{
			loding:'loding'
			},
		// 接口地址
		url: '{extensionApp}/proxy',
		// 接口参数(传参方式)
		params: {
			extensionApp: {
				in: 'path'
			},
			token: {
				in: 'header'
			},
			url: {
				in:'query'
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},

}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}exa-`,
} );
