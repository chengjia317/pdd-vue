<template>
  <scroll class="scroller" :upCallback="upCallback" ref="mescroll" warpId="index_scroll" id="index_scroll"  v-if="userInfo._id">
    <div class="recommend">
      <shop-list v-for="(item, index) in reclist" :item=item :key="index" :clickCell="dealWithCellBtnClick"
      />
    </div>
  </scroll>
  <is-login v-else></is-login>
</template>

<script>
  import {mapState} from 'vuex'
  import shopList from '@/components/ShopList'
  import isLogin from './../Login/IsLogin'
  import Scroll from '@/components/mescroll/Scroll'

  export default {
    name: "recommend",
    components:{shopList,isLogin,Scroll},
    computed:{
      ...mapState(['reclist','userInfo'])
    },
    methods:{
      dealWithCellBtnClick(id){
        console.log(id)
      },
      upCallback(page){
        const SIZE = 10;
        this.$store.dispatch('reqRecList', {
          'app_name': 'rectab_sim_gyl',
          'offset': (page.num - 1) * SIZE,
          'count': SIZE,
          'scb': (result)=>{
            console.log('成功');
            this.$refs.mescroll.endSuccess(result.length);
          },
          'ecb': (err)=>{
            console.log('失败');
            this.$refs.mescroll.endErr();
          }
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .scroller
    padding-bottom 5rem
    padding-top 1rem

    .recommend
      display flex
      flex-direction row
      flex-wrap wrap
      background-color #f5f5f5
      padding-bottom 5rem
</style>
