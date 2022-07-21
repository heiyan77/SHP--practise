// 登录与注册模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api";
import {setToken,getToken,removeToken} from "@/utils/token";

const state = {
    code:'',
    token:getToken(),// 如果没有TOKEN就位null，等同于‘’
    userInfo:{}
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    // 清楚本地数据
    CLEAR(state){
        // 把仓库中相关用户信息清空
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        const res = await reqGetCode(phone);
        if(res.code == 200){
            commit("GETCODE",res.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 用户注册
    async userRegister({commit},user){
        console.log(commit);
        const res = await reqUserRegister(user);
        if(res.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 用户登录
    async userLogin({commit},data){
        console.log(commit);
        const res = await reqUserLogin(data);
        // 服务器下发token，用户唯一标识符(uuid)
        // 将来通过带token找服务器要用户信息进行展示
        if(res.code == 200){
            commit("USERLOGIN",res.data.token);
            // 持久化存储token
            setToken(res.data.token);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        const res = await reqUserInfo();
        if(res.code == 200){
            commit("GETUSERINFO",res.data);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 退出登录
    async userLogout({commit}){
        const res = await reqLogout();
        if(res.code == 200){
            commit("CLEAR");
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}