// 定义多资金兑换数据

// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
const App= require( '@/configs/app' );
// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Exchangerate', {
	// 多资金兑换列表
	list: {
		// 数据为空时的默认值
		empty:[],
		// 接口地址
		url: '',
		// 接口参数(传参方式)
		// 不本地缓存
		// nonLocalCache: true,
	},
	//多资金兑换详情
	item: {
		// 数据为空时的默认值
		empty:{
			'from': [],
			'to': []
		},
		// 接口地址
		url: '/{multi_exchange_rate}',
		// 接口参数(传参方式)
		params: {
			multi_exchange_rate: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'path',
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},

}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}multi-exchange-rates`,
} );
