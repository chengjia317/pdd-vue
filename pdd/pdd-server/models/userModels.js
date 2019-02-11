var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/pdd');
//创建集合
var userSchema=mongoose.Schema({
    'name':{type:String},
    'pwd':{type:String},
    'tel':{type:String},
    'l_time':{type:Date,default:Date.now}
});
//输出文档
var User=mongoose.model('user',userSchema);

module.exports=User