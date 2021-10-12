import { request } from "../untils/request"

//获取奖品列表
export const luckyitems = (params) => request({
    url: "/m1/cj/get-luckyitems",
    method: "GET",
    params
})
//开始抽奖
export const setLottery = (data) => request({
    url: "/m1/cj/start-cj",
    method: "POST",
    data
})

//获取剩余抽奖次数
export const acquireRemain = (data) => request({
    url: "/m1/cj/v1/user/remain",
    method: "POST",
    data
})

//获取openid和userid
export const getOpenId = (data) => request({
    url: "/m1/user/add-user",
    method: "POST",
    data
})
