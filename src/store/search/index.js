// search模块的数据仓库
import { reqGetSearchInfo } from "@/api/index";
// state:仓库存储数据的地方
const state = {
    searchList:{},
};
// mutations:修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList.data;
    }
};
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取search数据              也叫作 载荷
    async getSearchList({commit},params = {}){// params 如果不传默认为空对象
        // 当前这个函数在调用获取服务器数据的时候，至少传递一个参数(空对象)
        // params参数：是当前用户派发action的时候，第二个传递过来的参数，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if(result.code === 200){
            commit("GETSEARCHLIST",result);
        }
    }
};
// getters: 理解为计算属性，用于简化仓储数据，让组件获取仓库的数据更加方便
const getters = {
    goodsList(state){// 当前形参state是当前仓库中的state，并非大仓库中的state
        // 在网络不给力||断网的情况下 至少返回一个数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    attrsList(state){
        return state.searchList.attrsList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
