export default {
	// env: 'product', //正式环境
	env: 'test', //测试环境

	catShop: {
		shopName: 'test',
		shopTitle: 'test',
		apiBaseUrl: 'http://shop.test.mallkd.cn/api/v1/zh-CN/c-test/',
		apiGlobalUrl: 'http://shop.test.mallkd.cn/api/v1/zh-CN/',
		rootArea:1, //地址选择配置
	},

	wechatEnd: {
		apiBaseUrl: 'https://wxe.cat.mallkd.com/',  //微信接口地址
		userProvider: 1,
		wxApp: 9,
		app: 8,
	},

	MobileEnd: {
		apiBaseUrl: 'http://mbe.test.mallkd.cn/',  //手机接口地址
		userProvider: 2,
		app: 1,
	},
	User: {
		realname_infofieldid: 1,
	},
	Category: {
		apiBaseUrl:'http://thbs.test.vpinpai.cn/api/', //文章接口地址
		extensionApp:1,
		app:1,
	},
	Question: {
		apiBaseUrl:'http://thbs.test.vpinpai.cn/', //问卷接口地址
		extensionApp:1,
		app:1
	},
	Sign: {
		Referrer:false
	},
	Titcket: {
		ExtensionApp:3,
		url:'https://tkt.test.mallkd.com/api/extension-app/1/tickets/',
		Authurl:'https://tkt.test.mallkd.com/api/extension-app/1/auth-code/',
	},
	// 二维码参数配置
	Qrcode: {
		qrcode:{
			left:65,	//二维码的左边界
			top:50,		//二维码的上边界
			width:200,	//二维码的宽度
			height:200	//二维码的高度
		},
		picture: {
			left:150,	//头像的左边界
			top:140,	//头像的上边界
			width:30,	//头像的宽度
			height:30,	//头像的高度
		},
		text: {
			left:135,	//昵称的左边界
			top:140,	//昵称的上边界
		}
	}
};

