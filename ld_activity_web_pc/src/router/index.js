import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

//初始路由，无需任何权限即可进入
const initRouter = [
  {
    path: '/',
    name: 'index',
    hidden: true,
    meta: { title: '' },
    component: () => import('@/views/login/index'),
  },
  {
    path: '/layout',
    name: 'Layout',
    meta: { title: '', breadcrumb: false },
    component: () => import('@/layout/index'),
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '创建活动', icon: 'dashboard' }
    }]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: { title: '登录' },
    component: () => import('@/views/login/index')
  },
  {
    path: '/activity-list',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/activityList/index'),
        name: 'ActivityList',
        meta: { title: '活动列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/index',
    meta: { title: '活动统计', icon: 'chart' },
    alwaysShow: true,
    children: [
      {
        path: 'index',
        name: 'Statistics',
        component: () => import('@/views/statistics/index'),
        meta: { title: '抽奖记录', icon: 'chart' }
      },
    ]
  },
  {
    path: '/activityProcess',
    component: Layout,
    hidden: true,
    redirect: '/activityProcess/index',
    children: [
      {
        path: 'index',
        name: 'ActivityProcess',
        hidden: true,
        component: () => import('@/views/activityProcess/index'),
        meta: { title: '抽奖活动配置', icon: 'chart', breadcrumb: false, activeMenu: '/dashboard' }
      },
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
]

// 动态路由，在用户登陆后，根据菜单过滤并挂载
export const dynamicRouter = []

export default new Router({
  routes: initRouter,
})


const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
