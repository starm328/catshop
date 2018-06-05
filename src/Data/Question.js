// 问卷扩展数据

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Article', {
	// 具体数据 文章问卷问卷详情
	attach: {
		empty: [
			{
				loding: 'loding'
			}
		],
		url: '{article}/attach',
		params: {
			'article': {
				in: 'path',
				default:0
			},

		}
	},
	// 问卷问题内容
	question: {
		empty: [
			{
				loding:'loding'
			}
		],
		url: '{attach}/question',
		params: {
			'attach': {
				in: 'path',
				default:0
			},

		}
	},
	// 问卷问题多选或单选选项
	selector: {
		empty: [],
		url: '{question}/selector',
		params: {
			'question': {
				in: 'path',
				default:0
			},

		}
	},// 问卷详情
	content: {
		empty: [],
		url: '{attach}/content',
		params: {
			'attach': {
				in: 'path',
				default:0
			},

		}
	},
}, {
	baseUrl:  `${App.default.Category.apiBaseUrl}`,
} );
