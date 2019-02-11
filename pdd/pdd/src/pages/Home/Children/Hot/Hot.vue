<template>
  <div id="hot">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(casual, index) in homecasual" :key="index">
          <img :src="casual.imgurl" alt="" width="100%">
        </div>
      </div>
      <!--分页-->
      <div class="swiper-pagination"></div>
    </div>
    <hot-nav/>
    <hot-shop-list/>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HotNav from './HotNav'
  import HotShopList from './HotShopList'
  import {mapState} from 'vuex'
  export default{
    components:{
      HotNav,
      HotShopList
    },
    mounted(){
      this.$store.dispatch('reqHomeCasual')//请求轮播图数据
      this.$store.dispatch('reqHomeNav')
      this.$store.dispatch('reqHomeShopList')
    },
    computed:{
      ...mapState(['homecasual','homenav'])
    },
    watch: {
      homecasual() {
        this.$nextTick(() => {
          // 2. 初始化轮播图
          new Swiper('.swiper-container', {
            autoplay: true,
            loop: true,
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../../../common/stylus/mixins.styl"
  #hot
    overflow-x hidden !important
    width 100%
    height 100%
    padding-top 4rem
    background $bg
</style>
