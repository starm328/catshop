// 推荐关系数据

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Relation', {
	// 具体数据

	//推荐码
	refercode: {
		// 数据为空时的默认值
		empty: '加载中..',
		// 接口地址
		url: 'refer-code',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
		},
		// 不本地缓存
		// nonLocalCache:   true,
	},
	//节点推荐码
	noderefercode: {
		// 数据为空时的默认值
		empty: '加载中..',
		// 接口地址
		url: '{node}/refer-code',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			node: {
				in: 'path'
			}
		},
		// 不本地缓存
		// nonLocalCache:   true,
	},
	//用户的分润节点
	refernodes: {
		// 数据为空时的默认值
		empty: [],
		// 接口地址
		url: 'nodes',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
		},
		// 不本地缓存
		// nonLocalCache:   true,
	},
	//直属上级人数
	referrcount: {
		// 数据为空时的默认值
		empty:0 ,
		// 接口地址
		url: '{node}/referrees/count',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			node: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'path',
				default:0
			},

		},
		// 不本地缓存
		// nonLocalCache:   true,
	},
	//下线人数
	explocount: {
		// 数据为空时的默认值
		empty:0 ,
		// 接口地址
		url: '{node}/exploitees/count',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			node: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'path',
				default:0
			},

		},
		// 不本地缓存
		// nonLocalCache:   true,
	},
	//直属上级
	referrer: {
		// 数据为空时的默认值
		empty:{
			id:0,
			label:'',
			type:'',
			role:0
		} ,
		// 接口地址
		url: '{node}/referrer',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			node: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'path',
				default:0
			},
		},
		// 不本地缓存
		// nonLocalCache:   true,
	},
	//上线
	exploiters: {
		// 数据为空时的默认值
		empty:[
			{}
		],
		// 接口地址
		url: '{node}/exploiters',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			node: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'path',
				default:0
			},
		},
		// 不本地缓存
		// nonLocalCache:   true,
	},
	//下线
	exploitees: {
		// 数据为空时的默认值
		empty:[
		{}
		] ,
		// 接口地址
		url: '{node}/exploitees',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			node: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'path',
				default:0
			},
			take:{
				in:'query',
				default:0
			},
			skip:{
				in:'query',
				default:0
			},
			filters:{
				in: 'query',
				default:''
			}
		},
		// 不本地缓存
		// nonLocalCache:   true,
	},
	//直属下级
	referrers: {
		// 数据为空时的默认值
		empty:[
		{}
		] ,
		// 接口地址
		url: '{node}/referrees',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			node: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'path',
				default:0
			},
			take:{
				in:'query',
				default:0
			},
			skip:{
				in:'query',
				default:0
			},
			filters:{
				in: 'query',
				default:''
			}

		},
		// 不本地缓存
		// nonLocalCache:   true,
	},
	// 下线总人数
	exprefecount: {
		// 数据为空时的默认值
		empty:0,
		// 接口地址
		url: '{node}/exploitees/{exploitee}/referrees/count',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			node: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'path',
				default:0
			},
			exploitee:{
				in:'path',
				default:0
			},

		},
		// 不本地缓存
		// nonLocalCache:   true,
	},
	//下线的下线
	exprefe: {
		// 数据为空时的默认值
		empty:[
		{}
		] ,
		// 接口地址
		url: '{node}/exploitees/{exploitee}/referrees',
		// 接口参数(传参方式)
		params: {
			token: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'header',
			},
			node: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'path',
				default:0
			},
			exploitee:{
				in:'path',
				default:0
			},
			take:{
				in:'query',
				default:0
			},
			skip:{
				in:'query',
				default:0
			},
			filters:{
				in: 'query',
				default:''
			}

		},
		// 不本地缓存
		// nonLocalCache:   true,
	},

}, {
	baseUrl:  `${App.default.catShop.apiBaseUrl}relations/`,
} );
