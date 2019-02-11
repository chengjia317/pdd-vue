<template>
  <div class="search">
    <!--搜索导航-->
    <search-nav :showSearchPanel="showSearchPanel"/>
    <div class="shop">
      <!--左边-->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item " v-for="(goods, index) in searchlist" :key="index" :class="{current:currentIndex===index}" @click="clickLeftLi(index)" ref="menulist">
            <span>{{goods.name}}</span>
          </li>
        </ul>
      </div>
      <!--右边-->
      <div class="shop-wrapper">
        <ul>
          <li class="shops-li" v-for="(goods, index) in searchlist" :key="index">
            <!--头部-->
            <div class="shops-title">
              <h4>{{goods.name}}</h4>
              <a href="">查看更多 ></a>
            </div>
            <!--身体-->
            <ul class="shops-items">
              <li v-for="(item, index) in goods.items" :key="index">
                <img v-lazy="item.icon" alt="">
                <span>{{item.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--显示面板-->
    <search-panel v-if="isShow"  :showSearchPanel="showSearchPanel"/>
  </div>
</template>

<script>
  import SearchNav from './SearchNav'
  import SearchPanel from './SearchPanel'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    name: "search",
    data(){
      return{
        isShow:false,
        scrollY:0,
        rightHeight:[]//高度数组
      }
    },
    components:{
      SearchNav,
      SearchPanel
    },
    computed:{
      ...mapState(['searchlist']),
      currentIndex(){//返回选中的索引值
        return this.rightHeight.findIndex((liHeight,index)=>{
          this.leftScrollTo(index)
          return this.scrollY>=liHeight&&this.scrollY<this.rightHeight[index+1]
        })
      }
    },
    mounted(){
      this.$store.dispatch('reqSearchList')
    },
    watch:{
      searchlist(){
        this.$nextTick(()=>{
          this.initBScroll();
          this.initRightHeight();
        })
      }
    },
    methods:{
      initBScroll(){//初始化
        this.leftScroll=new BScroll('.menu-wrapper',{});
        this.rightScroll=new BScroll('.shop-wrapper',{
          probeType:3
        })
        //滚动事件 获取y值赋给scrollY
        this.rightScroll.on('scroll',(pos)=>{
          this.scrollY=Math.abs(Math.round(pos.y))
        })
      },
      showSearchPanel(flag){//控制面板的显隐
        this.isShow=flag
      },
      initRightHeight(){//求出rightHeight
        let tempArr=[]//临时数组
        let liHeight=0;//定义初始高度
        let allLi=this.$el.getElementsByClassName('shops-li');
        Array.prototype.slice.call(allLi).forEach((li,index)=>{
          if(index===allLi.length-1){
            li.style.paddingBottom=`${window.innerHeight-li.clientHeight-100}px`
          }
          liHeight+=li.clientHeight
          tempArr.push(liHeight)
        })//遍历伪数组 求出每个Li的高度
        tempArr.unshift(0)
        this.rightHeight=tempArr
        console.log(this.rightHeight)
      },
      clickLeftLi(index){//点击左侧li 右侧跟着滚动
        this.scrollY=this.rightHeight[index]
        this.rightScroll.scrollTo(0,-this.scrollY,300)
      },
      leftScrollTo(index){//左右联动效果
        let menulist=this.$refs.menulist;
        let el=menulist[index]
        this.leftScroll.scrollToElement(el,0,0,-100)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .search
    background #F5F5F5
    width 100%
    height 100%
    overflow hidden
    .shop
      display flex
      position absolute
      top 60px
      bottom 50px
      width 100%
      overflow hidden
      .menu-wrapper
        background-color #e0e0e0
        width 80px
        flex 0 0 80px
        .menu-item
          width 100%
          height 60px
          background-color: #fafafa
          display flex
          justify-content center
          align-items center
          font-weight lighter
          color #666666
          position relative
        .current
          color #e02e24
        .current::before
          content: ''
          background-color #e02e24
          width 4px
          height 30px
          position absolute
          left 0
      .shop-wrapper
        flex 1
        background-color #fff
        .shops-title
          display flex
          flex-direction row
          padding 0 10px
          height 44px
          align-items center
          justify-content space-between
          color #999
          a
            color #999
            text-decoration none
            font-weight lighter
        .shops-items
          display flex
          flex-wrap wrap
          li
            display flex
            flex-direction column
            width 33.3%
            height 90px
            justify-content center
            align-items center
            color #666
            font-weight lighter
            font-size 14px
            img
              width 60%
              height 60%
              margin-bottom 5px
        .phone-type
          width 100%
          display flex
          flex-direction row
          flex-wrap wrap
          border-bottom-1px(#ccc)
          li
            width 33.3%
            display flex
            justify-content center
            align-items center
            margin 5px 0
            img
              width 70%
</style>
