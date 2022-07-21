import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// Vue3的全局事件总线
import mitt from 'mitt';

// 三级联动组件----全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue';
// 轮播图组件----全局组件
import MyCarousel from '@/components/Carousel/MyCarousel.vue';
// 分页器组件
import MyPagination from '@/components/Pagination/MyPagination.vue';

// 引入mock数据
import "@/mock/mockServe";

// 引入swiper样式
import "swiper/bundle"
import "swiper/css/bundle";

// 统一接收api接口文件里面的全部接口函数
// 统一引入
import * as API from "@/api";

// 按需引入element-plus
import {ElMessageBox} from "element-plus";
import 'element-plus/dist/index.css';

// 引入懒加载插件
import lazyPlugin from 'vue3-lazy';
import atm from "@/assets/1.gif";

const app = createApp(App);

// 参数一：全局组件的名字(name) 参数二：哪一个组件
app.component(TypeNav.name, TypeNav);
app.component(MyCarousel.name, MyCarousel);
app.component(MyPagination.name,MyPagination);
// 把element-plus组件的 弹出框api挂载到原型上
app.config.globalProperties.$message = ElMessageBox;
app.config.globalProperties.$alert = ElMessageBox.alert;

// Vue3的全局事件总线配置
app.config.globalProperties.$eventBus = new mitt();
app.config.globalProperties.$API = API;

app.use(lazyPlugin,{// 懒加载配置
    // 懒加载默认图片
    loading:atm
});

app.use(router).use(store).mount('#app');