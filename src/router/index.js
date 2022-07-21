import { createRouter,createWebHashHistory } from 'vue-router'
import routes from "./routes";
import store from '@/store';
// createWebHistory 

// 重写VueRouter原型上的push方法
// 1.先把原来的push备份一份
// let originPush = VueRouter.prototype.push;
// let originReplace = VueRouter.prototype.replace;
// // call||apply的区别
// // 相同：都可以调用函数一次，都可以篡改函数的上下文(this)一次
// // 不同：call传递参数用逗号隔开，apply传递数组
// // 2.重写push
// VueRouter.prototype.push = function (location, resolve, reject) {
//     if (resolve && reject) {
//         originPush.call(this, location, resolve, reject);
//     } else {
//         originPush.call(this, location, () => { }, () => { });
//     }
// }
// // location:往哪里跳转
// // resolve:成功的回调
// // reject:失败的回调
// // 2.重写replace
// VueRouter.prototype.replace = function (location, resolve, reject) {
//     if (resolve && reject) {
//         originReplace.call(this, location, resolve, reject);
//     } else {
//         originReplace.call(this, location, () => { }, () => { });
//     }
// }

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history:createWebHashHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(){// 滚动行为
        // 返回y=0，代表滚动条在最上方
        return {top:0}
    },
});

// 全局路由守卫:前值守卫【在路由跳转之前进行判断】
router.beforeEach(async (to,from,next)=>{
    // to:可以获取要跳转到的路由信息
    // from:可以获取从那个路由而来的信息
    // mext:放行函数 next()放行  next('路径')放行到指定路由
    console.log(from);
    // 用户登陆了才会有token
    const token = store.state.user.token; 
    // 用户信息
    const name = store.state.user.userInfo.name;
    if(token){// 用户登陆了
        // 用户登陆了就不能去登录页和注册页了
        if(to.path=="/login"||to.path=="/register"){
            next("/home");
        }else{
            // 登录后，去的不是登录页
            if(name){// 用户信息已存在【空对象也为真】
                next();
            }else{// 没有用户信息，需要派发action获取用户信息
                try {// 获取用户信息成功
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {// 获取用户信息失败[token失效了]
                    // 1.清除token
                    await store.dispatch("userLogout");

                    next();// 做个实验可删除

                    console.log(error);
                }
            }
        }
    }else{// 用户没登录 [后期在处理]
        // 不能去交易相关的页面
        // 不能去支付相关的页面
        // 不能去个人的页面
        // 如果去以上页面跳转到登录
        let toPath = to.path;
        
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 把想去但没有去成功的信息，存储在地址栏中[路由]
            next("/login?redirect=" + toPath);
        }else{// 去的不是上面这些路由
            next();
        }
    }
})

export default router