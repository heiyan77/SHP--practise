// 引入mockjs模块
import Mock from "mockjs";
// 把JSON数据格式引入
import banner from "./banner";
import floor from "./floor";

// mock数据，参数一请求地址，参数二请求数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});