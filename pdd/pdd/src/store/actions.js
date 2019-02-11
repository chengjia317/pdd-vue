import {HOME_CASUAL,HOME_NAV,HOME_SHOP_LIST,REC_LIST,SEARCH_LIST,USER_INFO,USER_INFO_DELETE,ADD_COUNT,MINUS_COUNT,SINGLE_SELECTED,ALL_SELECT,DELETE_GOOD} from './mutation-types'

import {getHomeCasual,getHomeNav,getHomeShopList,getRecommendList,getSearchList,getUser,logOut} from './../api'


export default{
  //首页轮播图
  async reqHomeCasual({commit}){
    const result=await getHomeCasual();
    if(result.success_code===200){
      commit(HOME_CASUAL,{home_casual:result.message});
    }
  },
  async reqHomeNav({commit}){
    const result=await getHomeNav();
    if(result.success_code===200){
      commit(HOME_NAV,{home_nav:result.message});
    }
  },
  async reqHomeShopList({commit}){
    const result=await getHomeShopList();
    if(result.success_code===200){
      commit(HOME_SHOP_LIST,{home_shop_list:result.message});
    }
  },
  async reqRecList({commit},params){
    const result=await getRecommendList(params)
    let scb=params.scb
    let ecb=params.ecb
    if(result.success_code===200){
      commit(REC_LIST,{rec_list:result.message.data})
      scb&&scb(result.message.data)
    }else{
      ecb&&ecb('error')
    }
  },
  async reqSearchList({commit}){
    const result=await getSearchList()
    if(result.success_code===200){
      commit(SEARCH_LIST,{search_list:result.message.data})
    }
  },
  UserInfo({commit},userInfo){//用户信息处理
    commit(USER_INFO,{userInfo})
  },
  async reqUserInfo({commit}){
    const result=await getUser()
    if(result.success_code===200){
      commit(USER_INFO,{userInfo:result.data})
    }
  },
  async reqUserInfoDelete({commit}){
    const result=await logOut()
    if(result.success_code===200){
      commit(USER_INFO_DELETE)
    }
  },
  cartCount({commit},{goods,isAdd}){
    if(isAdd){
      commit(ADD_COUNT,{goods})
    }else{
      commit(MINUS_COUNT,{goods})
    }
  },
  singleSelect({commit},{goods}){
    commit(SINGLE_SELECTED,{goods})
  },
  selectAll({commit},{allSelect}){
    commit(ALL_SELECT,{allSelect})
  },
  deleteGood({commit},{goods,index}){
    commit(DELETE_GOOD,{goods,index})
  }
}
