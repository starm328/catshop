// 定义公开接口 --基础支持

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Basic', {
	// 具体数据  分润类型
	commissioncategorie: {
		// 数据为空时的默认值
		empty: [],
		// 接口地址
		url: 'commission-categories',
		// 接口参数(传参方式)
		params: {},
		// 不本地缓存
		// nonLocalCache: true,
	},

}, {
	baseUrl: `${App.default.catShop.apiBaseUrl}`,
} );
