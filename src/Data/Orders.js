// 定义订单数据

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Orders', {
	orders: {
		// 数据为空时的默认值
		empty: [{
			"items":[
				{
					picture:{},
					rawPrice:{}
				}
			],
			"status":{id: "", label: ""},
			"rawPrice":{}
		}],
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
				default: 0,
			},
		},
		// 不本地缓存
		//nonLocalCache: true,
	},
	ordercode: {
		// 数据为空时的默认值
		empty: {
			code:'',
			status: {},
			rawPrice: {},
			items: {},
			receiver: {
				area: {
					long_label:[]
				},

			}
		},
		// 接口地址
		url: '/{orderCode}',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			orderCode: {
				in: 'path',
			},
		},
		// 不本地缓存
		//nonLocalCache: true,
	},
	//  某有一个区域下的所有区域
	orderstatus: {
		empty: [{
			"items":[
				{
					picture:{},
					rawPrice:{}
				}
			],
			"status":{id: "", label: ""},
			"rawPrice":{}
		}],
		url:'-statused-{orderStatus}',
		params: {
			orderStatus: {
				in: 'path',
			},
			token: {
				in: 'header',
			},
			take: {
				in: 'query',
				default: 0,
			},
		},

	},
	count:{
		empty: 0,
		url:'-statused-{orderStatus}/count',
		params: {
			orderStatus: {
				in: 'path',
			},
			token: {
				in: 'header',
			},
		},
	}

}, {
	baseUrl:`${App.default.catShop.apiBaseUrl}orders`,
} );
