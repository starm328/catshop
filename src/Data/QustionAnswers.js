// 问卷扩展数据

const App= require( '@/configs/app' );
// 引入数据类
const DataProvider= require( '@/libs/DataProvider' );

// 实例化数据类                   (  对应文件名
module.exports= new DataProvider( 'Answers', {
	// 具体数据 文章问卷问卷详情
	answer: {
		empty: [],
		url: '{apply}/attach/{attach}/showresult',
		params: {
			apply: {
				in: 'path'
			},
			attach: {
				in: 'path',
			},
		}
	},
}, {
	baseUrl:`${App.default.Question.apiBaseUrl}`,
} );
