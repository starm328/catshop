import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
//其他项目

// 2.0主要
import Index from '@/components/Index';
import clearlocalstorage from '@/components/Clearlocalstorage';
import ProductPage from '@/components/product/ProductPage';
import ProductCategory from '@/components/product/ProductCategory';
import User from '@/components/user/Index';
import UserInfo from '@/components/user/UserInfo';
import Cart from '@/components/cart/Index';
import Address from '@/components/address/Index';
import AddressSelect from '@/components/address/AddressSelect';
import Pay from '@/components/pay/Index';
import Order from '@/components/orderlist/Index';
import OrderPage from '@/components/orderlist/OrderPage';
import Sign from '@/components/sign/Sign';
import LoginSuccess from '@/components/login/LoginSuccess';
import Addressadd from '@/components/address/AddressAdd';
import Addressedit from '@/components/address/Addressedit';
import AddressaddSelct from '@/components/address/AddressAdditem';
import Payment from '@/components/pay/Payment';
import CategoryList from '@/components/category/Index';
import Account from '@/components/account/Index';
import Accountlist from '@/components/account/AccountList';
import Accountpage from '@/components/account/Accountpage';
import ExeternalAccount from '@/components/account/external/Index';
import ExternaChoice from '@/components/account/external/ExternaChoice';//提现选择账户页面
import Externaltype from '@/components/account/external/Externaltype';
import Externalform from '@/components/account/external/Externalform';
import Externaleidtform from '@/components/account/external/ExternalEidtform';
import WithdrawalLists from '@/components/account/withdrawal/Index';
import Withdrawals from '@/components/account/withdrawal/Withdrawals';//提现输入金额
import WithdrawalRecord from '@/components/account/withdrawal/WithdrawalRecord';//提现記錄
import WithdrawalShow from '@/components/account/withdrawal/WithdrawalShow';//提现详情
import Searchlist from '@/components/product/SearchList';//提现类型列表
import Relation from '@/components/relation/Index';
import Referrer from '@/components/relation/Referrer';
import Referrees from '@/components/relation/Referrees';
import Exploitees from '@/components/relation/Exploitees';
import Explreferr from '@/components/relation/Explreferr';
import Imginfo from '@/components/user/UserimgInfo';//用户头像
import UserInfos from '@/components/user/UserInfos';//用户信息
import RestPassword from '@/components/user/RestPassword';//修改密码
import UserAgents from '@/components/user/Useragents';//用户第三方账号
import UserAgentShow from '@/components/user/AgentShow';//解绑第三方账号
import AccountExchange from '@/components/account/AccountExchange';//资金兑换
import AccountExto from '@/components/account/AccountExto';//资金兑换
import Exchangerate from '@/components/account/exchangerate/Index';//多种资金兑换
import Exchangeto from '@/components/account/exchangerate/Exchangeto';//多种资金兑换
import ExchangetoRecord from '@/components/account/exchangerate/ExchangetoRecord';//多种资金兑换记录
import Extension from '@/components/relation/Extension/Index';//推广素材
import Commissions from '@/components/account/commissions/Index';//分润明细
import RewardShow from '@/components/account/reward/Show';//奖励明细
import Article from '@/components/article/Index';//文章
import ArticleCate from '@/components/article/ArticleCate';//文章
import ArticleShow from '@/components/article/ArticleShow';
import ArticleList from '@/components/article/ArticleList';
import QuestionForm from '@/components/question/QuestionForm';
import Question from '@/components/question/Index';
import Questionans from '@/components/question/Questionans';
import Agent from '@/components/agent/Index';
import AgentQrcoude from '@/components/agent/Extension/Index';
import Ticket from '@/components/ticket/Index';
import TicketShow from '@/components/ticket/Show';
Vue.use(Router);
Vue.use(Meta);

Router.prototype.go = function() {
    this.isBack = true
    window.history.go(-1)
}

export default new Router( {
	// mode: 'history',
	routes: [
	//其他项目


	// 2.0主要
		{
			path: '/clearlocalstorage',
			name: 'clearlocalstorage',
			// component: resolve => require(['@/components/sign/Sign'], resolve) /* <== 注册页面 */,
			component: clearlocalstorage,
			meta: {
				title: '清理缓存',
			},
		},
		{
			path: '/sign',
			name: 'Sign',
			// component: resolve => require(['@/components/sign/Sign'], resolve) /* <== 注册页面 */,
			component: Sign,
			meta: {
				title: '注册',
			},
		},
		{
			path: '/loginsuccess',
			name: 'LoginSuccess',
			// component: resolve => require(['@/components/login/LoginSuccess'], resolve) /* <== 登陆页面 */,
			component: LoginSuccess,
			meta: {
				title: '登陆成功',
			},
		},
		{
			path: '/',
			name: 'Index',
			// component: resolve => require(['@/components/Index'], resolve) /* <== 搜索 */,
			component: Index,
			meta: {
				navValue: 'index',
				title: '首页',
				search: '搜索',
				keepAlive: true,
				isBack:false
			},
		},
		{
			path: '/product/:id',
			name: 'ProductPage',
			// component: resolve => require(['@/components/product/ProductPage'], resolve) /* <== 产品详情 */,
			component: ProductPage,
			meta: {
				title: '产品详情',
			},
		},
		{
			path: '/product_category/:id/:name',
			name: 'ProductCategory',
			// component: resolve => require(['@/components/product/ProductCategory'], resolve) /* <== 产品分类 */,
			component: ProductCategory,
			meta: {
				title: '产品分类',
				keepAlive: true,
				isBack:false


			},
		},
		{
			path: '/category',
			name: 'CategoryList',
			// component: resolve => require(['@/components/category/Index'], resolve) /* <== 全部分类 */,
			component: CategoryList,
			meta: {
				navValue : 'category',
				title: '分类',
			},
		},
		{
			path: '/searchlist-:keyWords',
			name: 'Searchlist',
			component: Searchlist,
			// component: resolve => require(['@/components/product/SearchList'], resolve) /* <== 搜索结果列表 */,
			meta: {
				title: '搜索列表',
			},
		},
		{
			path: '/user',
			name: 'User',
			// component: resolve => require(['@/components/user/Index'], resolve) /* <== 个人中心 */,
			component: User,
			meta: {
				navValue : 'user',
				title: '个人中心',
			},
		},
		{
			path: '/user/info',
			name: 'UserInfo',
			// component: resolve => require(['@/components/user/UserInfo'], resolve) /* <==个人资料 */,
			component: UserInfo,
			meta: {
				title: '个人资料',
			},
		},
		{
			path: '/user/imginfo',
			name: 'Imginfo',
			// component: resolve => require(['@/components/user/UserimgInfo'], resolve) /* <== 个人头像修改 */,
			component: Imginfo,
			meta: {
				title: '个人头像',
				selsect:'修改头像'
			},
		},
		{
			path: '/user/infos/edit',
			name: 'UserInfos',
			// component: resolve => require(['@/components/user/UserInfos'], resolve) /* <== 个人信息编辑 */,
			component: UserInfos,
			meta: {
				title: '个人信息',
				selsect:'编辑'

			},
		},
		{
			path: '/user/infos/edit/password',
			name: 'RestPassword',
			// component: resolve => require(['@/components/user/RestPassword'], resolve) /* <== 修改密码 */,
			component: RestPassword,
			meta: {
				title: '修改密码',


			},
		},
		{
			path: '/user/infos/agents',
			name: 'UserAgents',
			// component: resolve => require(['@/components/user/Useragents'], resolve) /* <== 绑定的第三方账号 */,
			component: UserAgents,
			meta: {
				title: '第三方账号',

			},
		},
		{
			path: '/user/infos/agents/:type-:label-:id',
			name: 'UserAgentShow',
			// component: resolve => require(['@/components/user/UserAgentShow'], resolve) /* <== 绑定的第三方账号 */,
			component: UserAgentShow,
			meta: {
				title: '第三方账号',

			},
		},

		{
			path: '/cart',
			name: 'Cart',
			component: Cart,
			// component: resolve => require(['@/components/cart/Index'], resolve) /* <== 绑定的第三方账号 */,

			meta: {
				navValue : 'cart',
				title: '购物车',
			},

		},
		{
			path: '/user/address',
			name: 'Address',
			// component: resolve => require(['@/components/address/Index'], resolve) /* <== 地址管理 */,
			component: Address,
			meta: {
				title: '地址管理',
				edit: ' ',
			},
		},
		{
			path: '/user/address/add',
			name: 'Addressadd',
			// component: resolve => require(['@/components/address/AddressAdd'], resolve) /* <== 新增地址 */,
			component: Addressadd,
			meta: {
				title: '新增地址',
				edit: ' ',
			},
		},
		{
			path: '/address/selectadd',
			name: 'AddressaddSelct',
			// component: resolve => require(['@/components/address/AddressAdditem'], resolve) /* <== 地址管理 */,
			component: AddressaddSelct,
			meta: {
				title: '新增地址',
				edit: ' ',
			},
		},
		{
			path: '/address/edit',
			name: 'Addressedit',
			// component: resolve => require(['@/components/address/Addressedit'], resolve) /* <== 地址管理 */,
			component: Addressedit,
			meta: {
				title: '编辑地址',
				edit: ' ',
			},
		},
		{
			path: '/select/:selname',
			name: 'AddressSelect',
			// component: resolve => require(['@/components/address/AddressSelect'], resolve) /* <== 下单时选择地址 */,
			component: AddressSelect,
			meta: {
				title: '选择地址',
				selsect: '选择地址',

			},
		},
		{
			path: '/user/order/pay',
			name: 'Pay',
			// component: resolve => require(['@/components/pay/Index'], resolve) /* <== 支付订单 */,
			component: Pay,
			meta: {
				title: '支付订单',
			},
		},
		{
			path: '/payment/:payod',
			name: 'Payment',
			// component: resolve => require(['@/components/pay/Payment'], resolve) /* <== 订单支付支付状态 */,
			component: Payment,
			meta: {
				title: '支付状态',
			},
		},
		{
			path: '/order/l-:id-:status',
			name: 'Order',
			// component: resolve => require(['@/components/orderlist/Index'], resolve) /* <== 我的订单 */,
			component: Order,
			meta: {
				title: '我的订单',
			},
		},
		{
			path: '/order/o-:id',
			name: 'OrderPage',
			// component: resolve => require(['@/components/orderlist/OrderPage'], resolve) /* <== 订单详情 */,
			component: OrderPage,
			meta: {
				title: '订单详情',
			},
		},
		{
			path: '/user/account',
			name: 'Account',
			// component: resolve => require(['@/components/account/Index'], resolve) /* <== 资金管理 */,
			component: Account,
			meta: {
				title: '资金管理',
			},
		},
		{
			path: '/user/account/external/index',
			name: 'ExeternalAccount',
			// component: resolve => require(['@/components/account/external/Index'], resolve) /* <== 提现账户 */,
			component: ExeternalAccount,
			meta: {
				title: '提现账户',
			},
		},
		{
			path: '/user/account/external/choice-:id-:ruleid',
			name: 'ExternaChoice',
			// component: resolve => require(['@/components/account/external/ExternaChoice'], resolve) /* <== 提现时选择账户 */,
			component: ExternaChoice,
			meta: {
				title: '选择账户',
			},
		},
		{
			path: '/user/account/external/type/index',
			name: 'Externaltype',
			// component: resolve => require(['@/components/account/external/Externaltype'], resolve) /* <== 提现 的账户类型 */,
			component: Externaltype,
			meta: {
				title: '账户类型',
			},
		},
		{
			path: '/user/account/external/type/form/:id',
			name: 'Externalform',
			// component: resolve => require(['@/components/account/external/Externalform'], resolve) /* <== 添加提现账户 */,
			component: Externalform,
			meta: {
				title: '添加账户',
			},
		},
		{
			path: '/user/account/external/edit/form-:type/:id',
			name: 'Externaleidtform',
			// component: resolve => require(['@/components/account/external/ExternalEidtform'], resolve) /* <==修改账户*/,
			component: Externaleidtform,
			meta: {
				title: '修改账户',
			},
		},
		{
			path: '/user/account/withdrawal/form-:id-:ruleid',
			name: 'Withdrawals',
			// component: resolve => require(['@/components/account/withdrawal/Withdrawals'], resolve) /* <== 提现 */,
			component: Withdrawals,
			meta: {
				title: '提现',
			},
		},
		{
			path: '/user/account/withdrawal/record',
			name: 'WithdrawalRecord',
			// component: resolve => require(['@/components/account/withdrawal/WithdrawalRecord'], resolve) /* <== 提现记录列表 */,
			component: WithdrawalRecord,
			meta: {
				title: '提现记录',
			},
		},
		{
			path: '/user/account/withdrawal/record/show-:code',
			name: 'WithdrawalShow',
			// component: resolve => require(['@/components/account/withdrawal/WithdrawalShow'], resolve) /* <== 提现详情 */,
			component: WithdrawalShow,
			meta: {
				title: '提现详情',
			},
		},
		{
			path: '/user/account/withdrawal',
			name: 'WithdrawalLists',
			// component: resolve => require(['@/components/account/withdrawal/Index'], resolve) /* <== 选择资金类型，进行提现 */,
			component: WithdrawalLists,
			meta: {
				title: '选择资金提现',
			},
		},
		{
			path: '/user/account/exchange/:id',
			name: 'AccountExchange',
			// component: resolve => require(['@/components/account/AccountExchange'], resolve) /* <== 资金兑换 */,
			component: AccountExchange,
			meta: {
				title: '资金兑换',
			},
		},
		{
			path: '/user/account/exchangeto/:fromid/:toid',
			name: 'AccountExto',
			// component: resolve => require(['@/components/account/AccountExto'], resolve) /* <== 资金兑换 */,
			component: AccountExto,
			meta: {
				title: '兑换',
			},
		},
		{
			path: '/user/account/exchangerate/to-:id',
			name: 'Exchangeto',
			// component: resolve => require(['@/components/account/exchangerate/Exchangeto'], resolve) /* <== 多资金兑换 */,
			component: Exchangeto,
			meta: {
				title: '兑换',
			},
		},
		{
			path: '/user/account/exchangerate/',
			name: 'Exchangerate',
			// component: resolve => require(['@/components/account/exchangerate/Index'], resolve) /* <== 多种资金兑换 */,
			component: Exchangerate,
			meta: {
				title: '多资金兑换',
			},
		},
		{
			path: '/user/account/exchangerate/ExchangetoRecord',
			name: 'ExchangetoRecord',
			// component: resolve => require(['@/components/account/exchangerate/Index'], resolve) /* <== 多种资金兑换 */,
			component: ExchangetoRecord,
			meta: {
				title: '兑换记录',
			},
		},
		{
			path: '/account/list/:tit-:id',
			name: 'Accountlist',
			// component: resolve => require(['@/components/account/AccountList'], resolve) /* <== 资金明细 */,
			component: Accountlist,
			meta: {
				title: '明细',
				accountlist: '明细',
			},
		},
		{
			path: '/account-page/:account-:detail',
			name: 'Accountpage',
			// component: resolve => require(['@/components/account/Accountpage'], resolve) /* <== 资金明细 */,
			component: Accountpage,
			meta: {
				title: '详情',
				accountlist: '详情',
			},
		},
		{
			path: '/user/relation',
			name: 'Relation',
			// component: resolve => require(['@/components/relation/Index'], resolve) /* <== 人脉管理 */,
			component: Relation,
			meta: {
				title: '人脉管理',
			},
		},
		{
			path: '/user/relation/referrer',
			name: 'Referrer',
			// component: resolve => require(['@/components/relation/Referrer'], resolve) /* <== 查看上线 */,
			component: Referrer,
			meta: {
				title: '查看引路人',
			},
		},
		{
			path: '/user/relation/referrees',
			name: 'Referrees',
			// component: resolve => require(['@/components/relation/Referrees'], resolve) /* <== 直属下线 */,
			component: Referrees,
			meta: {
				title: '直属人脉',
				accountlist: '直属人脉',
				keepAlive: true,
				isBack:false
			},
		},
		{
			path: '/user/relation/exploitees',
			name: 'Exploitees',
			// component: resolve => require(['@/components/relation/Exploitees'], resolve) /* <== 所有下线 */,
			component: Exploitees,
			meta: {
				title: '所有人脉',
				accountlist: '所有人脉',
				keepAlive: true,
				isBack:false
			},
		},
		{
			path: '/user/relation/explreferr/:id-:label/',
			name: 'Explreferr',
			// component: resolve => require(['@/components/relation/Explreferr'], resolve) /* <== 下线的下线 */,
			component: Explreferr,
			meta: {
				title: '人脉',
				accountlist: '人脉',
			},
		},

		{
			path: '/user/relation/extension/:name',
			name: 'Extension',
			// component: resolve => require(['@/components/relation/Extension/Index'], resolve) /* <== 推广素材 */,
			component: Extension,
			meta: {
				title: '推广素材',
				accountlist: '推广素材',
			},
		},
		{
			path:'/user/account/commissions/:cate-:id',
			name:'Commissions',
			component: Commissions,
			meta: {
				title:'分润明细',
			}
		},
		{
			path:'/user/account/rewardshow/:account-:providerId-:providerType',
			name:'RewardShow',
			component: RewardShow,
			meta: {
				title:'奖励明细',
			}
		},
		{
			path:'/article',
			name:'ArticleCate',
			component: ArticleCate,
			meta: {
				title:'文章',
				keepAlive: true,
				isBack:false
			}
		},
		{
			path:'/article-:id',
			name:'Article',
			component: Article,
			meta: {
				title:'文章',
				keepAlive: true,
				isBack:false
			}
		},
		{
			path: '/article/show/:id',
			name: 'ArticleShow',
			component: ArticleShow,
			meta: {
				title: '文章详情',
			},
		},
		{
			path: '/article/sub/:id/:name',
			name: 'ArticleList',
			component: ArticleList,
			meta: {
				title: '分类',
				keepAlive: true,
				isBack:false
			},
		},
		{
			path: '/question',
			name: 'Question',
			component: Question,
			meta: {
				title: '表单问卷',
			},
		},
		{
			path: '/question/:id',
			name: 'QuestionForm',
			component: QuestionForm,
			meta: {
				title: '表单问卷',
			},
		},
		{
			path: '/question/anstion/:id',
			name: 'Questionans',
			component: Questionans,
			meta: {
				title: '问卷统计',
			},
		},
		{
			path: '/agent',
			name: 'Agent',
			component: Agent,
			meta: {
				title: '代理中心',
			},
		},
		{
			path: '/agent-:code',
			name: 'AgentQrcoude',
			component: AgentQrcoude,
			meta: {
				title: '推广二维码',
			},
		},
		{
			path: '/ticket-list',
			name: 'Ticket',
			component: Ticket,
			meta: {
				title: '券列表',
			},
		},
		{
			path: '/ticket-show/:id',
			name: 'TicketShow',
			component: TicketShow,
			meta: {
				title: '券详情',
			},
		},
	],
	scrollBehavior(to, from, savedPosition) {
	     if (savedPosition) {
	         return savedPosition
	     } else {
	         return {
	             x: 0,
	             y: 0
	         }
	     }
	 }
} );
