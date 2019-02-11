// 请求接口汇总
import ajax from './ajax'
// 基础路径
const BASE_URL = '/local_api';
// 请求首页轮播图
export const getHomeCasual= ()=>ajax(BASE_URL+'/api/homecasual')
export const getHomeNav= ()=>ajax(BASE_URL+'/api/homenav')
export const getHomeShopList= ()=>ajax(BASE_URL+'/api/homeshoplist')
export const getRecommendList=()=>ajax(BASE_URL+'/api/recommendshoplist')
export const getSearchList=()=>ajax(BASE_URL+'/api/searchlist')
export const getCode=(tel)=>ajax(BASE_URL+'/api/send_code',{tel})
export const getInfoCode=(tel,code)=>ajax(BASE_URL+'/api/login_code',{tel,code},'POST')
export const getCaptcha=(name,pwd,captcha)=>ajax(BASE_URL+'/api/login_pwd',{name,pwd,captcha},'POST')
export const getUser=()=>ajax(BASE_URL+'/api/userinfo')//自动登陆
export const logOut=()=>ajax(BASE_URL+'/api/logout')
