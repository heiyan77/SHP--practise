import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from "@/api"

const state = {
    cartList:[]
};
const mutations = {
    CARTLIST(state,cartList){
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({commit}){
        const res = await reqCartList();
        // console.log(res);
        commit("CARTLIST",res.data);
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        const res = await reqDeleteCartById(skuId);
        console.log(commit);
        if (res.code == 200) {
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{skuId, isChecked}) {
        const res = await reqUpdateCheckedById(skuId, isChecked);
        console.log(commit);
        if (res.code == 200) {
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 删除全部选中的商品
    deleteAllCheckedCart({getters,dispatch}){
        let promiseAll = [];
        // 获取购物车中的全部商品 是数组
        getters.cartList.cartInfoList.forEach(item => {
            let res = item.isChecked == 1 ? dispatch("deleteCartListBySkuId",item.skuId) : '';
            // 将每一次返回的promise存到数组中
            promiseAll.push(res);    
        });
        // 有一个失败，返回就为失败
        return Promise.all(promiseAll);
    },
    // 修改全部产品的选中状态
    updateAllCartIsChecked({getters,dispatch},isChecked){
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let res = dispatch("updateCheckedById",{
                skuId:item.skuId,
                isChecked
            });
            promiseAll.push(res);
        });
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state){
        return state.cartList[0] || {};
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}