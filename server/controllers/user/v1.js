var com = require('../../utils/com.js');

module.exports={
/**
用户注册：
URL: /user/v1/register
Method: Post
Params: {
     username:String
     password:String
}
result:{
     state:{}  // 注册成功 注册失败
     result:{}
}
**/
register:function(req,res,next){
  var newUser={
    username:req.body.username,
    password:req.body.password,
  };
  // 查询是否已经注册
  req.models.users.find({username:req.body.username},1,function(err,result){
    if (err) throw err;
    if (result.length==0) {
      //注册
      req.models.users.create(newUser,function(err,result){
        if (err) throw err;
        console.log(result);
        return com.jsonReturn(res,'注册成功',101,result);
      });
    } else {
      return com.jsonReturn(res,'用户已注册',404,null);
    }
  });
},

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
login:function(req,res,next){
  var username=req.body.username;
  var password=req.body.password;
  req.models.users.find({username:username},1,function(err,result){
    if (err) throw err;
    //未找到
    if (result.length==0) {
      com.jsonReturn(res,'未找到该用户',404,null);
      return;
    }
    if(result[0].password!=password) {
      com.jsonReturn(res,'密码错误',404,null);
      return;
    }
    req.session.user=result[0];
    com.jsonReturn(res,'登录成功',101,result[0]);
  });
},

/**
登出
**/
logout:function(req,res,next){
  req.session.user=null;
  com.jsonReturn(res,'登出成功',101,null);
},

/**
用户状态
**/
getStatus:function(req,res,next){
  if (req.session.user) {
    com.jsonReturn(res,'操作成功',101,req.session.user);
  } else {
    com.jsonReturn(res,'未登录',404,null);
  }
},
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
sendCaptcha:function(req,res,next){
  if (!req.session.user) {
      com.jsonReturn(res,'未登入',404,null);
      return;
  }
  //已经绑定过的手机,返回已经绑定信息
  var phone = req.body.phone;
  req.models.users.find({phone:phone},1,function(err,result){
      if(result.length!=0){
        com.jsonReturn(res,'改手机已绑定',404,null);
        return;
      }
      var user=result[0];
      // TODO sendCaptcha
      com.jsonReturn(res,'发送验证码成功',101,{captcha:9999});
      return;
  });
},

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
isBindPhone:function(req,res,next){
  com.jsonReturn(res,'已绑定',101,null);
},

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
bindPhone:function(req,res,next){
  com.jsonReturn(res,'绑定成功',101,null);
},


/**
完善必要信息 可以跳过的步骤
URL： /user/v1/fillInfo
Method: POST
Params:{
     avatar: String // 头像
     interest:[] //兴趣领域
     desc: String
}
Result:{
     state:{} //成功或失败
}
**/
fillInfo:function(req,res,next){
  if (!req.session.user) {
      com.jsonReturn(res,'未登入',404,null);
      return;
  }
  var info={
    avatar:req.body.avatar,
    interest:req.body.interest,
    desc:req.body.desc
  };

  var uid=req.session.user.id;
  req.models.users.get(uid,function(err,user){
    if(err) throw err;
    user.save(info,function(err){
        if (err) {
            com.jsonReturn(res,'完成信息失败',404,err);
        }
        com.jsonReturn(res,'操作成功',101,user);
    });
  });
},

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
getProfile:function(req,res,next){
    var uid=req.query.uid;
    req.models.users.get(uid,function(err,user){
      if(err) {
        com.jsonReturn(res,'未找到该用户',404,err);
        return;
      }
      if (!user) {
        com.jsonReturn(res,'未找到该用户',404,err);
        return;
      }
      com.jsonReturn(res,'找到该用户',101,user);
    });
},


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
follow:function(req,res,next){
  if (!req.session.user) {
      com.jsonReturn(res,'未登入',404,null);
      return;
  }
  var uid=req.session.user.id;
  var follow_uid = req.body.follow_uid;

  //不能关注自己
  if (uid==follow_uid) {
      com.jsonReturn(res,'不能关注自己',404,null);
      return;
  }

  var query={
    uid:uid,
    follow_uid:follow_uid
  };

  req.models.followers.find(query,1,function(err,result){
    if(err) {
      throw err;
    }
    if(result.length!=0){
      com.jsonReturn(res,'已关注',404,null);
      return;
    }
    req.models.followers.create(query,function(err){
          if (err) {
            throw err;
            // com.jsonReturn(res,'操作失败',404,err);
            // return;
          }
          com.jsonReturn(res,'关注成功',101,null);
    });
  });
},

/**
取消关注
**/
unfollow:function(req,res,next){
  if (!req.session.user) {
      com.jsonReturn(res,'未登入',404,null);
      return;
  }
  var uid=req.session.user.id;
  var follow_uid = req.body.follow_uid;
  //不能关注自己
  if (uid==follow_uid){
      com.jsonReturn(res,'不能取消关注自己',404,null);
      return;
  }

  var query={
    uid:uid,
    follow_uid:follow_uid
  };

  req.models.followers.find(query,1,function(err,result){
    if(err) {
      throw err;
    }
    if(result.length==0){
      // 双方未关注，不能取消关注
      com.jsonReturn(res,'未关注对方',404,null);
      return;
    }
    var removeItem = result[0];
    removeItem.remove(function(err){
        if (err) {
          com.jsonReturn(res,'操作失败',404,err);
          return;
        }
        com.jsonReturn(res,'取消关注成功',101,null);
    });
  });
},



/**
14. 获取所有关注列表
URL：/help/v1/getFollowList
Method: GET
Params:{ }
Result:{}
**/
getFollowList:function(req,res,next){
  if (!req.session.user) {
      com.jsonReturn(res,'未登入',404,null);
      return;
  }
  var query ={
    uid:req.session.user.id
  }
  // Z DESC A ASC
  req.models.followers.find(query,['create_time','A'],function(err,result){
      if (err) {
        com.jsonReturn(res,'操作失败',404,err);
        return;
      }
      com.jsonReturn(res,'操作成功',101,result);
  });
},


};
