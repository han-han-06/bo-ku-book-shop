import Vue from 'vue'
import Router from 'vue-router'
// 书城首页
// import bookStoreHome from '@/components/BookStoreHome'
// 登录页面
import login from '@/components/LoginIn'
// 注册页面
import registered from '@/components/RegisteredUsers'
const bookStoreHome = () => import('@/components/BookStoreHome')
const bookDetails = ()=>import('@/components/BookDetails')
const bookShopCart = ()=>import('@/components/BookShopCart')
const purchasePage = ()=>import('@/components/PurchasePage')
// const tablePage = ()=>import('@/components/BackManagement/TablePage')
const tableloginIn =()=>import('@/components/BackManagement/TableloginIn')
const manageHome =()=>import('@/components/BackManagement/ManageHome')
const backStageFrame =()=>import('@/components/BackManagement/BackStageFrame')
// 收货地址路由
const userAddress = ()=>import('@/components/UserAddress')
// 订单详情
const individualOrders =()=>import('@/components/IndividualOrders')
// 扫描二维码
const qrCode =()=>import('@/components/QrCode')
// confirmPay
// 确认支付页面
// BookXiaoLiang
const bookXiaoLiang =()=>import('@/components/BookXiaoLiang')
const confirmPay =()=>import('@/components/ConfirmPay')
const addAddress = ()=>import('@/components/AddAddress')
const tableRegister = ()=> import('@/components/BackManagement/TableRegister')
const bookComment = ()=> import('@/components/BookComment')
const purchaseInfo = ()=>import('@/components/PurchaseInfo')
const successPayment =()=>import('@/components/SuccessPayment')
const homeTab =()=>import('@/components/BackManagement/HomeTab')
// 前台个人中心页面
const center =()=>import('@/components/Center')
Vue.use(Router)
const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default new Router({
  routes: [
    {
      path:'/',
      // 重定向路径名
      redirect:'/bookStoreHome',
    },
    {
      path:'/bookXiaoLiang',
      name:"bookXiaoLiang",
      component:bookXiaoLiang
    },
    {
      path: '/bookStoreHome',
      name: 'bookStoreHome',
      component: bookStoreHome
    },
    // 订单
    {
      path:'/individualOrders',
      name:'individualOrders',
      component:individualOrders
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/registered',
      name:'registered',
      component:registered
    },
    {
      path:'/bookDetails',
      name:'bookDetails',
      component:bookDetails
    },
    // 前台个人中心页面
    {
      path:"/center",
      name:'center',
      component:center
    },
    {
      path:'/bookComment',
      name:'bookComment',
      component:bookComment
    },
    {
      path:'/bookShopCart',
      name:'bookShopCart',
      component:bookShopCart
    },
    // 扫描二维码
    {
      path:'/qrCode',
      name:'qrCode',
      component:qrCode
    },
    // 确认支付
    {
      path:"/confirmPay",
      name:'confirmPay',
      component:confirmPay
    },
    {
      path: '/successPayment',
      name: 'successPayment',
      component: successPayment
    },
    {
      path:'/purchasePage',
      name:'purchasePage',
      component:purchasePage,
      children:[
        // 默认显示结账主页
        {
          path:"",
          name:'purchaseInfo',
          component:purchaseInfo
        },
        // 使用地址
        {
          path:'userAddress',
          name:'userAddress',
          component:userAddress,
        },
        // 新增地址
        {
          path:'addAddress',
          name:'addAddress',
          component:addAddress
        }
        // 新增信息主页
        // {
        //   path:"purchaseInfo",
        //   name:'purchaseInfo',
        //   component:purchaseInfo
        // }
      ]
    },
    // 下面是后台管理页面
       // 后台登录
      {
        path:'/tableloginIn',
        name:'tableloginIn',
        component:tableloginIn
      },
      // 后台注册
      {
        path:'/tableRegister',
        name:'tableRegister',
        component:tableRegister
      },
       // 后台卖家个人中心
      {
        path:'buyerCenter',
        name:'buyerCenter',
        component:() =>import('../components/BackManagement/BuyerCenter')
      },
    {
      path:'/backStageFrame',
      name:'backStageFrame',
      component:backStageFrame,
      children:[
        // 后台首页
        {
          path:'homeTab',
          name:'homeTab',
          component:homeTab
        },
        // 管理员页面
        // {
        //   path:'superTable',
        //   name:'superTable',
        //   component:() =>import('../components/BackManagement/SuperTable')
        // }
      ]
    }
  ]
})
