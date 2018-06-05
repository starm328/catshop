// 文章扩展数据

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Article', {
	// 具体数据 文章
	//文章分类
	category: {
		empty: [
			{
				loding: 'loding'
			}
		],
		url: '{apply}/category',
		params: {
			'apply': {
				in: 'path',
				default:0
			},

		}
	},
	//分类下的文章
	article: {
		empty: [
			{
				loding: 'loding'
			}
		],
		url: '{category}/article',
		params: {
			'category': {
				in: 'path',
				default:0
			},
			'take': {
				in: 'query',
				default:0,
			},
			'skip': {
				in: 'query',
				default:0,
			}

		}
	},
	//分类下的分类
	subcategory: {
		empty: [],
		url: '{category}/subcategory',
		params: {
			'category': {
				in: 'path',
				default:0
			},
		}
	},
	//文章详情
	detail: {
		empty: {},
		url: '{article}/detail',
		params: {
			'article': {
				in: 'path',
				default:0
			},

		}
	},
}, {
	baseUrl:  `${App.default.Category.apiBaseUrl}`,
} );
