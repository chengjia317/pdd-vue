<template>
  <div class="user-detail">
    <div class="user-detail-top">
      <router-link to="/me" tag="a">返回个人中心</router-link>
    </div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <img src="./images/me_icon.png" alt="">
      </div>
      <div class="user-item">
        <span>手机</span>
        <span>{{userInfo.tel}}</span>
      </div>
      <div class="user-item">
        <span>昵称</span>
        <span><input type="text" v-model="user_name"></span>
      </div>
      <div class="user-item" @click="sheetVisible=true">
        <span>性别</span>
        <span>{{user_sex}}</span>
      </div>
      <div class="user-item">
        <span>常住地</span>
        <span><input type="text" v-model="user_address"></span>
      </div>
      <div class="user-item" @click="$refs.picker.open()">
        <span>生日</span>
        <span>{{user_birthday}}</span>
      </div>
      <div class="user-item">
        <span>个性签名</span>
        <span><input type="text" v-model="user_sign"></span>
      </div>

      <button @click="saveDate">修改</button>
    </div>
    <!--选择性别-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <!--选择出生年月-->
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleDate"
      :startDate="startDate"
      :endDate="endDate"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import moment from 'moment'
  import {mapState} from  'vuex'
  export default {
    name: "me-detail",
    data() {
      return {
        user_name: 'cc',
        user_sex: '',
        user_address: '苏州',
        user_sign:'我爱学习',
        user_birthday:'',
        sheetVisible: false,
        actions: [
          {name: '男', method: this.selectSex},
          {name: '女', method: this.selectSex},
        ],
        endDate:new Date(),
        startDate:new Date('1970-01-01')
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      selectSex(sex){
        this.user_sex=sex.name
      },
      handleDate(data){
        this.user_birthday=moment(data).format('YYYY年MM月DD日')
      },
      saveDate(){
        this.$router.replace('/me')
      }

      }
  }
</script>

<style lang="stylus" scoped>
  .user-detail
    width 100%
    height 100%
    .user-detail-top
      width 100%
      height 60px
      line-height 60px
      padding-left 10px
      font-weight bold
    .user-detail-group
      .user-icon
        height 60px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          border-radius 50%
      .user-item
        height 55px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        input
          border none
          outline none
          text-align right
      button
        width 90%
        height 40px
        line-height 40px
        background-color mediumpurple
        text-align center
        margin 20px 5%
        border none
        font-size 16px
        color #fff
        border-radius 10px
    .right-title-color
      color #999
      font-size 14px
</style>
