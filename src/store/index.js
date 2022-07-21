import { createStore } from "vuex";

import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

// 对外暴露Store类的一个实例
export default new createStore({
    // 实现Vuex仓库模式开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});

