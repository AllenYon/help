var com = require('../utils/com.js');

/**
**/
var _update=function(res,teacherModel,tid,updateData){
  teacherModel.get(tid,function(err,result){
      if (err) {
          return com.jsonReturn(res,'未找到',404,null);
      }
      result.save(updateData,function(err){
        if (err) {
          return com.jsonReturn(res,'更新失败',404,null);
        }
        return com.jsonReturn(res,'更新成功',101,result);
      })
  });
};

module.exports={
  /**
  成为导师
  **/
  becomeTeacher:function(req,res,next){
    var uid = req.body.uid;
    req.models.users.get(uid,function(err,user){
      if (err) {
          throw err;
      }
      if (!user) {
          return com.jsonReturn(res,'未找到该用户',404,null);
      }
      //Todo 已经是导师 如何判断已经是导师
      if (user.tid!=null) {
          return com.jsonReturn(res,'已经是导师',404,null);
      }
      var newTeacher={
        title:req.body.title,
        skill:req.body.skill,
        star:0,
        level:0,
        max_cpq:0,
        current_cpq:0,
        current_chat_type:0,
        online:0,
        fake_phone:null,
      };
      //创建导师关联
      req.models.teachers.create(newTeacher,function(err,item){
        user.save({tid:item.id,utype:1},function(err) {
          return com.jsonReturn(res,'创建导师成功',101,user);
        });
      });
    })
  },

  /**
  获取上线状态
  **/
  getOnlineStatus:function(req,res,next){
    if(!com.checkLogin(req)){
      return;
    }
    var teacher=req.session.user;
    if (teacher.utype==0) {
      return com.jsonReturn(res,'操作失败',404,null);
    }
    req.models.teacher.get(teacher.tid,function(err,result){
      if(err){
        return com.jsonReturn(res,'操作失败',404,err);
      }
      return com.jsonReturn(res,'获取状态成功',101,result.online);
    });
  },
  /**
  上线
  Params:{
    tid:
  }
  **/
  online:function(req,res,next){
    if(!com.checkLogin(req)){
      return;
    }
    var teacher=req.session.user;
    if (teacher.utype==0) {
      return com.jsonReturn(res,'操作失败',404,null);
    }
    var tid= teacher.tid;
    var updateData={
      online:1
    }
    _update(res,req.models.teachers,tid,updateData);
  },

  /**
  下线
  Params:{
    tid:
  }
  **/
  offline:function(req,res,next){
    if(!com.checkLogin(req)){
      return;
    }
    var teacher=req.session.user;
    if (teacher.utype==0) {
      return com.jsonReturn(res,'操作失败',404,null);
    }
    var tid= teacher.tid;
    var updateData={
      online:0
    }
    _update(res,req.models.teachers,tid,updateData);
  },

  /**
  更新
  **/
  update:function(req,res,next){
    var updateId=req.body.tid
    var updateData={
      title:req.body.title,
      skill:req.body.skill,
      star:req.body.star,
      level:req.body.level,
      max_cpq:req.body.max_cpq,
      current_cpq:req.body.current_cpq,
      current_chat_type:req.body.current_chat_type,
      online:req.body.online,
      fake_phone:req.body.fake_phone
    };
    req.models.teachers.get(updateId,function(err,result){
        if (err) {
            return com.jsonReturn(res,'未找到',404,null);
        }
        result.save(updateData,function(err){
          if (err) {
            return com.jsonReturn(res,'更新失败',404,null);
          }
          return com.jsonReturn(res,'更新成功',101,result);
        })
    });
  },



}
