var com = require('../../utils/com.js');

/**
用户注册：
URL: /user/v1/register
Method: Post
Params:
{
     nickname:String
     password:String
}
result:{
     state:{}  // 注册成功 注册失败
     result:{

     }
}
**/
exports.register=function(req,res,next){

  com.jsonReturn(res,'注册成功',101,null);
};

/**
v1 登录注册接口
Method: Post
Params: {
    phone:String
    username:String
    pwd:String
}
Result: {
    state:{},
    result:{
         user:{
              ...
         }
    }
}
**/
exports.login=function(req,res,next){

  com.jsonReturn(res,'登录成功',101,null);
};

/**
用户绑定手机, 发送验证码
URL： /user/v1/sendCaptcha
Method: Post
Params:
{
      phone:String
}
result:{
     state:{
          msg:  // 发送成功， 已经注册
          code:
     },
     result:{
     }
}
**/
exports.sendCaptcha=function(req,res,next){
  com.jsonReturn(res,'发送验证码成功',101,null);
};

/**
v1 是否已经绑定手机
URL： /user/v1/isBindPhone
Method:GET
Params:{
}
Result:
{
     status:{}
     result:{}
}
**/
exports.isBindPhone=function(req,res,next){
  com.jsonReturn(res,'已绑定',101,null);
};

/**
绑定手机
URL：/user/v1/bindPhone
Method:POST
Params:{
     phone: String
     captcha: String
}
Result:{
}
**/
exports.bindPhone=function(req,res,next){
  com.jsonReturn(res,'绑定成功',101,null);
};


/**
完善必要信息 可以跳过的步骤
URL： /user/v1/fillInfo
Method: POST
Params:{
     avatar: String // 头像
     interest:[] //兴趣领域
     dest: String
}
Result:{
     state:{} //成功或失败
}
**/
exports.fillInfo=function(req,res,next){
  com.jsonReturn(res,'完成信息成功',101,null);
};

/**
5. 获取个人信息

URL： /user/v1/getProfile
Method: GET
Params:{
     uid: String
}
RESULT:{
     state:
     result:{
         user:{
          }
     }
}
**/
exports.getProfile=function(req,res,next){
    com.jsonReturn(res,'成功',101,{'name':'alin'});
};


/**
13.  关注用户
URL :  /help/v1/doFollow
Method: POST
Params: {
     from_uid:String
     to_udi:String
}
Result:{
}

**/
exports.doFollow=function(req,res,next){
    com.jsonReturn(res,"dofollow",101,null);
};


/**
14. 获取所有关注列表
URL：/help/v1/getFollowList
Method: GET
Params:{

}
Result:{}
**/
exports.getFollowList=function(req,res,next){
    com.jsonReturn(res,"getFollowList",101,null);
};
