<template>
  <div id="wrapper">
    <div id="scroller">
      <ul>
        <li>
          <div v-for="(item, index) in homenav.item1" :key="index">
            <img :src="item.iconurl" alt="">
            <span v-text="item.icontitle"></span>
          </div>
        </li>
        <li>
          <div v-for="(item, index) in homenav.item2" :key="index">
            <img :src="item.iconurl" alt="">
            <span v-text="item.icontitle"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import IScroll from 'iscroll'
  export default{
    computed:{
      ...mapState(['homenav'])
    },
    mounted(){
      new IScroll('#wrapper',{scrollX:true});
      this.$el.addEventListener('touchmove',this.handleTouchMove())
    },
    methods:{
      handleTouchMove(e){
        e.preventDefault();
      }
    }
  }

</script>

<style scoped lang="stylus">
   #wrapper
     position relative
     width 100%
     height 14rem
     background-color #fff
     padding-top 1rem
     #scroller
       width 64rem
       height 100%
       ul
         list-style none
         padding 0
         margin 0
         width 100%
         height 100%
         li
          width 100%
          height 6rem
          div
            width 8rem
            height 6rem
            float left
            display flex
            flex-direction column
            justify-content center
            align-items center
            font-size 1.2rem
            img
              width 3rem
            span
              text-align center
              margin-top 0.5rem
</style>
