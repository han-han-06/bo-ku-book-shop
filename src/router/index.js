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
const addAddress = ()=>import('@/components/AddAddress')
const tableRegister = ()=> import('@/components/BackManagement/TableRegister')
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
    {
      path:'/bookShopCart',
      name:'bookShopCart',
      component:bookShopCart
    },
    {
      path:'/purchasePage',
      name:'purchasePage',
      component:purchasePage,
      children:[
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
      ]
    },
    // 下面是后台管理页面
    {
      path:'/backStageFrame',
      name:'backStageFrame',
      component:backStageFrame,
      children:[
        // 后台登录
        {
          path:'',
          name:'tableloginIn',
          component:tableloginIn
        },
        // 后台注册
        {
          path:'tableRegister',
          name:'tableRegister',
          component:tableRegister
        },
        // 后台首页
        {
          path:'manageHome',
          name:'manageHome',
          component:manageHome
        },
      ]
    }
  ]
})
