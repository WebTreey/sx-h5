import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views'),
      meta: {

      }
    },
    {
      path: '/catelist',
      name: 'catelist',
      meta: {
        title: '分类'
      },
      component: () => import('@/views/catelist')
    },
    {
      path: '/cart',
      name: 'cart',
      meta: {
        title: '购物车'
      },
      component: () => import('@/views/cart')
    },
    {
      path: '/catelist/details/:id',
      name: 'catelist/details',
      meta: {
        title: '产品列表'
      },
      component: () => import('@/views/catelist/details')
    },
    {
      path: '/productList/details/:id',
      name: 'productList/details',
      meta: {
        title: '详情介绍'
      },
      component: () => import('@/views/productList/details')
    },
    {
      path: '/productList/details/info/:id',
      name: 'productList/details/info',
      meta: {
        title: '商品详情'
      },
      component: () => import('@/views/productList/info')
    },
    {
      path: '/search',
      name: 'search',
      meta: {
        title: ''
      },
      component: () => import('@/views/search')
    },
    {
      path: '/store/:id',
      name: 'store',
      meta: {
        title: '自营平台'
      },
      component: () => import('@/views/PtStore')
    },
    {
      path: '/order',
      name: 'order',
      meta: {
        title: '订单'
      },
      component: () => import('@/views/order')
    },
    {
      path: '/order/pay',
      name: 'order/pay',
      meta: {
        title: '支付'
      },
      component: () => import('@/views/order/pay')
    },
    {
      path: '/address',
      name: 'address',
      meta: {
        title: '收货地址管理'
      },
      component: () => import('@/views/address')
    },
    {
      path: '/address/newaddress',
      name: 'address/newaddress',
      meta: {
        title: '新增收货地址'
      },
      component: () => import('@/views/address/newaddress')
    },
    {
      path: '/PtStore/list/:id',
      name: '/PtStore/list',
      meta: {
        title: '商家列表'
      },
      component: () => import('@/views/PtStore/list')
    },
    {
      path: '/personalCenter',
      name: '/personalCenter',
      meta: {
        title: '个人中心'
      },
      component: () => import('@/views/personalCenter')
    },
    {
      path: '/personalCenter/orderCenter',
      name: '/personalCenter/orderCenter',
      meta: {
        title: '订单中心'
      },
      component: () => import('@/views/personalCenter/orderCenter')
    },
    {
      path: '/personalCenter/orderCenter/details/:id',
      name: '/personalCenter/orderCenter/details',
      meta: {
        title: '订单详情'
      },
      component: () => import('@/views/personalCenter/orderCenter/details')
    },
    {
      path: '/personalCenter/orderCenter/returnGoods/:id',
      name: '/personalCenter/orderCenter/returnGoods',
      meta: {
        title: '申请退换货'
      },
      component: () => import('@/views/personalCenter/orderCenter/returnGoods')
    },
    {
      path: '/personalCenter/refund',
      name: '/personalCenter/refund',
      meta: {
        title: '我的退货'
      },
      component: () => import('@/views/personalCenter/refund')
    },
    {
      path: '/personalCenter/refund/backDeliverGoods',
      name: '/personalCenter/refund/backDeliverGoods',
      meta: {
        title: '退货发货'
      },
      component: () => import('@/views/personalCenter/refund/backDeliverGoods')
    },
    {
      path: '/personalCenter/refund/lookBackLogistics',
      name: '/personalCenter/refund/lookBackLogistics',
      meta: {
        title: '查看物流'
      },
      component: () => import('@/views/personalCenter/refund/lookBackLogistics')
    },
    {
      path: '/personalCenter/refund/addcomplaint',
      name: '/personalCenter/refund/addcomplaint',
      meta: {
        title: '申述'
      },
      component: () => import('@/views/personalCenter/refund/addcomplaint')
    },
    {
      path: '/personalCenter/rechange',
      name: '/personalCenter/rechange',
      meta: {
        title: '我的换货'
      },
      component: () => import('@/views/personalCenter/rechange')
    },
    {
      path: '/personalCenter/rechange/exchangeDeliverGoods',
      name: '/personalCenter/rechange/exchangeDeliverGoods',
      meta: {
        title: '换货发货'
      },
      component: () => import('@/views/personalCenter/rechange/exchangeDeliverGoods')
    },
    {
      path: '/personalCenter/rechange/lookExchangeLogistics',
      name: '/personalCenter/rechange/lookExchangeLogistics',
      meta: {
        title: '查看物流'
      },
      component: () => import('@/views/personalCenter/rechange/lookExchangeLogistics')
    },
    {
      path: '/statePages',
      name: '/statePages',
      meta: {
        title: '订单状态'
      },
      component: () => import('@/views/statePages')
    }
  ]
})
