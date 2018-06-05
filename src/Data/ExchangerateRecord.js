// 定义多资金兑换记录数据

// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
const App= require( '@/configs/app' );
// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Exchangeraterecord', {
	// 多资金兑换记录
	record: {
		// 数据为空时的默认值
		empty:[],
		// 接口地址
		url: '',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			take: {
				in: 'query',
				default: 0
			},
			skip: {
				in: 'query',
				default:0
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},

}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}exchange-list`,
} );
