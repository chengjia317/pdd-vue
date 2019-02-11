<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar v-show="$route.meta.showTab"></tab-bar>
  </div>
</template>

<script>
  // 1. 引入组件
  import TabBar from './components/TabBar'
  export default {
    name: "App",
    components:{
      TabBar
    },
    mounted(){
      this.$store.dispatch('reqUserInfo')//调用数据接口
    }
  }
</script>

<style scoped lang="stylus">
  html,body
    font-size: 10px
  #app
    width 100%
    height 100%
    background-color #f5f5f5
    position relative
</style>
