<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current:show}" @click="showModel(true)">短信登录</a>
          <a href="javascript:;" :class="{current:!show}" @click="showModel(false)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current:show}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="tel">
              <button :class="['get-verification',{'tel_right':telRight}]" v-if="!time" @click.prevent="getCode">获取验证码</button>
              <button class="get-verification" v-else>已发送({{time}}s)</button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login-hint">
              温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current:!show}">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="用户名" v-model="userName">
              </section>
              <section class="login-verification">
                <input type="password" maxlength="20" placeholder="密码" v-model="pwd" v-if="codeShow">
                <input type="text" maxlength="20" placeholder="密码" v-else v-model="pwd">
                <div class="switch-show">
                  <img :class="{on:codeShow}" @click="showCode" src="./images/hide_pwd.png" alt="" width="20">
                  <img :class="{on:!codeShow}" @click="showCode" src="./images/show_pwd.png" alt="" width="20">
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                <img class="get-verification" src="http://localhost:1688/api/captcha" alt="captcha" ref="captcha" @click="refreshCaptcha">
              </section>
            </section>
          </div>
          <button class="login-submit" @click="login">登录</button>
        </form>
        <button class="login-back" @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {getCode,getCaptcha,getInfoCode} from "../../api";
  import {mapActions} from 'vuex'
  import {Toast} from 'mint-ui'
  export default {
    name: "login",
    data(){
      return{
       show:true, //展示短信验证码登陆
       tel:'',
       code:'',
       captcha:'',
       userName:'',
       pwd:'',
       time:0,
       codeShow:true,//显示密码
       userInfo:''//存储信息
      }
    },
    computed:{
      telRight(){
        return /^1[34578]\d{9}$/.test(this.tel);
      }
    },
    methods:{
      ...mapActions(['UserInfo']),
      showModel(flag){
        this.show=flag
      },
      showCode(){
        this.codeShow=!this.codeShow
      },
      async getCode(){
        if(this.telRight){//校验成功
          this.time=60;
          if(this.time>0){
            this.timer=setInterval(()=>{
              this.time--
            },1000)
          }else{
            clearInterval(this.timer)
          }
        }
        const result=await getCode(this.tel)//获取成功返回结果
        console.log(result)
        if(result.err_code===0){//获取失败
          Toast({
            message: result.message,
            position: 'center',
            duration: 3000
          });
          setTimeout(()=>{
            clearInterval(this.timer)
            this.time=0
          },3000)
        }
      },
      refreshCaptcha(){//切换验证码
         this.$refs.captcha.src='http://localhost:1688/api/captcha?time'+new Date()
      },
      async login(){
        if(this.show){
          if(!this.tel){
            Toast('手机号不能为空')
            return;
          }else if(!this.telRight){
            Toast('手机号格式不正确')
            return;
          }
          if(!this.code){
            Toast('请输入验证码')
            return;
          }else if(!/^\d{6}/gi.test(this.code)){
            Toast('验证码不正确')
            return;
          }
          const result=await getInfoCode(this.tel,this.code)
          console.log(result)
          if(result.success_code===200){
            this.userInfo=result.data
          }else{
            this.userInfo={
              msg:'登陆失败'
            }
          }
        }else{
          if(!this.userName){
            Toast('请输入用户名')
            return;
          }else if(!this.pwd){
            Toast('请输入密码')
            return;
          }else if(!this.captcha){
            Toast('请输入验证码!');
            return;
          }
          const result=await getCaptcha(this.userName,this.pwd,this.captcha);
          console.log(result)
          if(result.success_code===200){
            this.userInfo=result.data
          }else{
            this.userInfo={
              msg:'用户名或密码错误'
            }
          }
        }
        console.log(this.userInfo,this.UserInfo)
        if(!this.userInfo._id){
          Toast(this.userInfo.msg)
        }else{
         this.UserInfo(this.userInfo)
          console.log(this.UserInfo(this.userInfo))
         this.$router.replace('/')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/mixins.styl"
  .login-container
    width 100%
    height 100%
    background #fff
    .login-inner
      padding-top 60px
      width 80%
      margin 0 auto
      .login-header
        .login-logo
          font-size 40px
          font-weight bold
          color mediumpurple
          text-align center
        .login-header-title
          padding-top 40px
          padding-bottom 10px
          text-align center
          > a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.current
              color mediumpurple
              font-weight 700
              border-bottom 2px solid mediumpurple
      .login-content
        > form
          > div
            display none
            &.current
              display block
            input
              width 100%
              height 100%
              padding-left 8px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid mediumpurple
            .login-message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get-verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.tel_right
                  color purple
            .login-verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch-show
                position absolute
                right 10px
                top 12px
                img
                  display none
                img.on
                  display block
            .login-hint
              margin-top 12px
              color #999
              font-size 12px
              line-height 20px
              > a
                color mediumpurple
          .login-submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background mediumpurple
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .login-back
          display block
          width 100%
          height 42px
          margin-top 15px
          border-radius 4px
          background transparent
          border: 1px solid mediumpurple
          color mediumpurple
          text-align center
          font-size 16px
          line-height 42px
</style>
