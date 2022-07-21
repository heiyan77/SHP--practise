// 路由信息

// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

export default [
    {
        path: '/center',
        component: () => import("@/pages/Center/MyCenter.vue"),// 路由懒加载写法
        meta: { show: true },
        children:[// 引入二级路由组件
            {
                path:"/center",
                redirect:"/center/myorder"
            },
            {
                path:"myorder",
                component:() => import("@/pages/Center/MyOrder")
            },
            {
                path:"grouporder",
                component:() => import("@/pages/Center/GroupOrder")
            }
        ]
    },
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: '/home',
        name: 'home',
        component: () => import("@/pages/Home/MyHome.vue"),
        meta: { show: true }
    },
    {
        path: '/login',
        component: () => import("@/pages/Login/MyLogin.vue"),
        meta: { show: false }
    },
    {
        path: '/register',
        component: () => import("@/pages/Register/MyRegister.vue"),
        meta: { show: false }
    },
    {
        path: '/search/:keyword?',
        component: () => import("@/pages/Search/MySearch.vue"),
        meta: { show: true },
        name: "search",// 配合对象写法路由传参
        // 路由组件之间能传递props参数
        // 1.布尔值写法 只能传params参数
        // props:true,
        // 2.对象写法 额外的给路由组件传递一些props
        // props:{a:1,b:2},

        // 3.函数写法 常用
        // 可以将params参数、query参数，通过props传递给 路由组件
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        },
    },
    {
        path: '/detail/:skuid',
        component: () => import("@/pages/Detail/MyDetail.vue"),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: "addcartsuccess",
        component: () => import("@/pages/AddCartSuccess"),
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: () => import("@/pages/ShopCart"),
        meta: { show: true }
    },
    {
        path: '/trade',
        component: () => import("@/pages/Trade/MyTrade.vue"),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            console.log("@@to",to);
            if(from.path == "/shopcart"){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: '/pay',
        component: () => import("@/pages/Pay/MyPay.vue"),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            console.log("@@to",to);
            if(from.path == "/trade"){
                next();
            }else{
                next(false);// 中断路由跳转
            }
        }
    },
    {
        path: '/paySuccess',
        component: () => import("@/pages/PaySuccess"),
        meta: { show: true }
    }
]