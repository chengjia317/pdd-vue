var express = require('express');
var router = express.Router();
var sms_util=require('./../util/sms_util')
var User=require('./../models/userModels')
// 引入SVG的验证码文件
var svgCaptcha = require('svg-captcha');
var md5=require('blueimp-md5')
var users={}//用户信息
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取首页轮播图
router.get('/api/homecasual',(req,res)=>{
  const data=require('./../data/homecasual')
  res.json(data)
})
// 导航列表
router.get('/api/homenav',(req,res)=>{
    const navJson=require('./../data/homenav')
    res.json({success_code:200,message:navJson.data})
})
// 商品列表
router.get('/api/homeshoplist',(req,res)=>{
    const data=require('./../data/shopList')
    res.json({success_code:200,message:data})
})
// 推荐列表
router.get('/api/recommendshoplist',(req,res)=>{
    const data=require('./../data/recommend')
    res.json({success_code:200,message:data})
})
// 搜索模块
router.get('/api/searchlist',(req,res)=>{
    const data=require('./../data/search')
    res.json({success_code:200,message:data})
})

//获取随机图形验证码
router.get('/api/captcha', (req, res)=>{
    // 生成随机的验证码
    var captcha = svgCaptcha.create({
        color: true,
        noise: 2,
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    });
    //保存验证码session
    req.session.captcha = captcha.text.toLocaleLowerCase();
    console.log(req.session.captcha);
    // 返给客户端
    res.type('svg');
    res.status(200).send(captcha.data);

});
//用户密码登陆
router.post('/api/login_pwd',(req,res)=>{
    var name=req.body.name;
    var pwd=md5(req.body.pwd);//加密
    var captcha=req.body.captcha
    console.log(captcha,req.session.captcha)
    if(captcha!==req.session.captcha){  //验证
       return res.send({err_code:0,msg:'验证码不正确'})
    }
    delete req.session.captcha;//删除验证码
    User.findOne({name},(err,user)=>{//查询
        if(user){
          if(user.pwd!==pwd){
              res.send({err_code:0,msg:'用户名或密码错误'})//校验密码
          }else{//校验成功
              req.session.userid=user._id;
              res.send({
                  success_code:200,
                  data:{
                      _id:user._id,
                      name:user.name,
                      tel:user.tel
                  }
              })
          }
        }else{
            var userModel=new User({name,pwd})
            userModel.save(function(err,user){
                req.session.userid=user._id
                res.send({
                    success_code:200,
                    data:{
                        _id:user._id,
                        name:user.name
                    }
                })
            })
        }
    })

});

//短信验证码登陆
router.get('/api/send_code',(req,res)=>{
    //手机号
    var tel=req.query.tel;
    //产生6位随机验证码
    var code=sms_util.randomCode(6)
    // sms_util.sendCode(tel,code,function(success) {
    //     if(success){
    //         users[tel]=code//保存值
    //         res.send({success_code:200,msg:'成功获取'})
    //     }else{
    //         res.send({success_code:0,msg:'获取失败'})
    //     }
    // })
    setTimeout(()=>{
        users[tel]=code//保存值
        res.send({success_code:200,msg:'成功获取',code})
    },2000)
})

router.post('/api/login_code',(req,res)=>{
    //获取数据
    const tel=req.body.tel;
    const code=req.body.code;
    if(users[tel]!==code){
      return  res.send({error_code:0,msg:'验证码不正确'})
    }
    delete users[tel]
    User.findOne({tel},(err,user)=>{
        if(user){
            req.session.userid=user._id;
            res.send({
                success_code:200,
                data:{
                    _id:user._id,
                    name:user.name,
                    tel:user.tel
                }
            })
        }else{
            var userModel=new User({tel})
            userModel.save(function(err,user){
                req.session.userid=user._id
                res.send({
                    success_code:200,
                    data:{
                        _id:user._id,
                        name:user.name,
                        tel:user.tel
                    }
                })
            })
        }
    })
})


//根据session中的userid, 去查询对应的用户返回给客户端
const filter = {'pwd': 0, 'l_time': 0, '__v': 0};//过滤掉不需要返回的数据
router.get('/api/userinfo', (req, res)=>{
    const userId = req.session.userid;
    User.findOne({_id: userId}, filter, (err, user)=>{
        if(!user){
            delete req.session.userid;// 清除上一次的userId
            res.send({err_code: 0, msg: '请先登录'});
        }else {
            res.send({success_code: 200, data: user});
        }
    })
});

router.get('/api/logOut',(req,res)=>{
    delete req.session.userid;
    res.send({
        success_code:200,
        msg:'删除成功'
    })
})
module.exports = router;