// 定义地区数据

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Areas', {
	// 具体数据  所有区域
	ares: {
		// 数据为空时的默认值
		empty: [],
		// 接口地址
		url: '',
		// 接口参数(传参方式)
		params: {},
		// 不本地缓存
		// nonLocalCache: true,
	},
	//  某有一个区域下的所有区域
	area: {
		// 数据为空时的默认值
		empty: [],
		// 接口地址
		url: '{area}',
		// 接口参数(传参方式)
		params: {
			area: {
				in: 'path',
			},
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
}, {
	baseUrl:  `${App.default.catShop.apiGlobalUrl}logistics/areas/`,
} );
