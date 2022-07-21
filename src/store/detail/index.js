import { reqGetGoodsInfo,reqAddOrUpdateShopCart } from "@/api/index";
//封装临时游客身份模块uuid--->生成一个随机字符串（不能再变了）
import {getUUID} from '@/utils/uuid_token';
const state = {
    goodinfo:{},
    //游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state,goodinfo){
        state.goodinfo = goodinfo;
    }
};
const actions = {
    // 获取产品信息
    async getGoodInfo({commit},skuId){
        let result = await reqGetGoodsInfo(skuId);
        if(result.code === 200){
            commit("GETGOODINFO",result.data);
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId, skuNum}){
        // 加入购物车返回的解构
        const result = await reqAddOrUpdateShopCart(skuId, skuNum);
        console.log(commit,"a");
        if(result.code === 200){// 代表服务器加入购物车成功
            return "ok";
        }else{// 代表服务器加入购物车失败
            return Promise.reject(new Error("faile"));
        }
    }
};
// 为了简化数据
const getters = {
    // 路径导航简化的数据
    categoryView(state){
        // 当前计算出的属性值至少是一个空对象，假的报错就不会存在
        return state.goodinfo.categoryView || {};
    },
    // 产品信息简化的数据
    skuInfo(state){
        return state.goodinfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodinfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}