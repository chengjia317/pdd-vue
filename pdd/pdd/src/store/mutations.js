import {HOME_CASUAL,HOME_NAV,HOME_SHOP_LIST,REC_LIST,SEARCH_LIST,USER_INFO,USER_INFO_DELETE,ADD_COUNT,MINUS_COUNT,SINGLE_SELECTED,ALL_SELECT,DELETE_GOOD} from './mutation-types'

import Vue from 'vue'
export default{
  [HOME_CASUAL](state,{home_casual}){//第二个参数为传递的数据
    state.homecasual=home_casual //state里面的数据赋值
  },
  [HOME_NAV](state,{home_nav}){
    state.homenav=home_nav
  },
  [HOME_SHOP_LIST](state,{home_shop_list}){
    state.homeshoplist=home_shop_list
  },
  [REC_LIST](state,{rec_list}){
    state.reclist=state.reclist.concat(rec_list)
  },
  [SEARCH_LIST](state,{search_list}){
    state.searchlist=search_list
  },
  [USER_INFO](state,{userInfo}){
    state.userInfo=userInfo
  },
  [USER_INFO_DELETE](state){
    state.userInfo={}
  },
  [ADD_COUNT](state,{goods}){
    goods.buy_count++;
  },
  [MINUS_COUNT](state,{goods}){
    if(goods.buy_count>1){
      goods.buy_count--;
    }else{
      const index=state.cartGoods.indexOf('goods')
      state.cartGoods.splice(index,1)
    }
  },
  [SINGLE_SELECTED](state,{goods}){
    if(goods.checked){
      goods.checked=!goods.checked
    }else{
      Vue.set(goods,'checked',true)
    }
  },
  [ALL_SELECT](state,{allSelect}){
    state.cartGoods.forEach((goods,index)=>{
      if(goods.checked){
        goods.checked=!allSelect
      }else{
        Vue.set(goods,'checked',!allSelect)
      }
    })
  },
  [DELETE_GOOD](state,{goods,index}){
    state.cartGoods.splice(index,1)
  }
}
