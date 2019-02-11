<template>
  <div id="home">
    <ly-tab v-model="selectedId" :items="items" @change="handleChange" class="fix"/>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        selectedId: 0,//当前选中的ID
        items: [
          {label: '热门'},
          {label: '服饰'},
          {label: '鞋包'},
          {label: '母婴'},
          {label: '百货'},
          {label: '食品'},
          {label: '内衣'},
          {label: '男装'},
          {label: '电器'}
        ],
        // 二级路由的路径
        subRouteUrl: ['/home/hot','/home/dress','/home/box','/home/mbaby','/home/general','/home/food','/home/shirt','/home/man','/home/ele']
      }
    },
    methods:{
      handleChange(item,index){
        this.$router.replace(this.subRouteUrl[index])
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #home
    width 100%
    height 100%
    background-color red
    display flex
    .fix
      position fixed
      left 0
      top 0
      width 100%
      z-index 999
</style>
