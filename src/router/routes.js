// 引入路由组件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default
    [
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            path: '/center',
            component: Center,
            meta: { show: true },
            // 二级路由组件
            children: [
                {
                    path: 'myOrder',
                    component: MyOrder,
                },
                {
                    path: 'groupOrder',
                    component: GroupOrder,
                },
                {
                    path: '/center',
                    redirect: '/center/myOrder'
                }
            ]
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: { show: true }
        },
        {
            path: '/pay',
            component: Pay,
            meta: { show: true },
            // 路由独享守卫
            befoerEnter:(to,from,next)=>{
                if(from.path=='/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path: '/trade',
            component: Trade,
            meta: { show: true },
            // 路由独享守卫
            befoerEnter:(to,from,next)=>{
                // 去交易页面必须是从购物车而来
                if(from.path=='/shopcart'){
                    next()
                }else{
                    // 中断当前的导航
                    next(false)
                }
            }
        },
        {
            path: '/shopcart',
            component: ShopCart,
            meta: { show: true }
        },
        {
            path: '/detail/:skuid',
            component: Detail,
            meta: { show: true }
        },
        {
            path: '/addcartsuccess',
            component: AddCartSuccess,
            meta: { show: true },
            // 和搜索框跳转相同
            name: 'addcartsuccess',

        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        {
            path: '/search/:keywords?',
            component: Search,
            meta: { show: true },
            name: 'search',
        },
        // 重定向，在项目跑起来的时候,访问/，立马让他定向到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
