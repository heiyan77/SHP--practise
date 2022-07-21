// home模块的数据仓库

import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api/index";

// state:仓库存储数据的地方
const state = {// state中数据初始值不能乱写，根据接口返回值进行初始化
    // home中三级菜单的数据
    categroyList:[],
    // 轮播图的数据
    bannerList:[],
    floorList:[],
};
// mutations:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categroyList){
        state.categroyList = categroyList.data.slice(0,15);
    },
    GETBANNERLIST(state,bannerlist){
        state.bannerList = bannerlist.data;
    },
    GETFLOORLIST(state,floorlist){
        state.floorList = floorlist.data;
    }
};
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async categroyList({commit}){
        let result = await reqCategoryList();
        if(result.code === 200){
            commit("CATEGORYLIST",result);
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code === 200){
            commit("GETBANNERLIST",result);
        }
    },
    // 获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code === 200){
            commit("GETFLOORLIST",result);
        }
    }
};
// getters: 理解为计算属性，用于简化仓储数据，让组件获取仓库的数据更加方便
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}
