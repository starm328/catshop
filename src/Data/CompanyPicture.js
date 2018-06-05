// 定义商家图片

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'CompanyPicture', {
	// 具体数据  商家图片
	pciture: {
		// 数据为空时的默认值
		empty: {},
		// 接口地址
		url: 'pic-{pictureRole}/pictures',
		// 接口参数(传参方式)
		params: {
			pictureRole: {
				in: 'path'
			}
		},
		// 不本地缓存
		// nonLocalCache: true,
	},
}, {
	baseUrl:  `${App.default.catShop.apiBaseUrl}`,
} );
