// 定义产品数据

// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );
const App= require( '@/configs/app' );
// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Product', {
	// 具体数据
	setTags: {
		// 数据为空时的默认值
		empty: [
			undefined
		],
		// 接口地址
		url: 'set-{setName}/tags',
		// 接口参数(传参方式)
		params: {
			setName: {
				// 传参方式 有 path(路径), query(?后面), header(请求头)
				in: 'path',
				default: 'index',
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
	tagged: {
		empty: [
			{
				loding: 'loding'
			}
		],
		url: 'tagged',
		params: {
			tag: {
				in: 'query',
			},
			take: {
				in: 'query',
			},
			skip: {
				in: 'query',
				default: 0,
			},
		},
	},
	product: {
		empty: {
			id: 0,
			title: '载入中...',
			price: '',
			main_picture: {
				'200x200': 'http://picture.mallkd.com/cb561dabe9d3e4324f83e99a8cf6ba45?x-oss-process=image/resize,m_fill,limit_0,w_200,h_200',
			},
		},
		url: '{product}',
		params: {
			product: {
				in: 'path',
			},
		},
	},
	data: {
		empty: {
			properties: [],
			entities: [
				{
					product: {
						stock: '-',
					}
				}

			],
		},
		url: '{product}/data',
		params: {
			product: {
				in: 'path',
			},
		},
	},
	info: {
		empty: {
			summary: '',
			article: '',
			attributes: [],
		},
		url: '{product}/info',
		params: {
			product: {
				in: 'path',
			},
		},
	},
	//产品分类
	settags: {
		empty: [],
		url: 'set-{setName}/tags',
		params: {
			setName: {
				in: 'path',
			},
		},
	},
	subsets: {
		empty: [
		{}
		],
		url: 'set-{setName}/subsets',
		params: {
			setName: {
				in: 'path',
			},
		},
	},
	search: {
		empty: [],
		url: 'search/{keyWords}',
		params: {
			keyWords: {
				in: 'path',
			},
			take: {
				in: 'query',
				default: 0,
			},
			skip: {
				in: 'query',
				default: 0,
			},
		},
	},
}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}products/`,
} );
