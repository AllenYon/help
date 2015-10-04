var com = require('../utils/com.js');
var orm=require('orm');

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
  生成一个 teacherId
  **/
  becomeTeacher:function(req,res,next){
    var user_id = req.body.user_id;
    req.models.user.get(user_id,function(err,user){
      if (err) {
          if (err.code == orm.ErrorCodes.NOT_FOUND) {
            return com.jsonReturn(res,'未找到该用户',404,null);
          } else {
            return next(err);
          }
      }
      // console.log(user);
      if (user.teacher_id!=null) {
        return com.jsonReturn(res,'已经是导师',404,null);
      }
      var newTeacher={
        user_id:user_id,
        title:req.body.title,
        skill:req.body.skill,
        star:req.body.star,
        level:req.body.level,
        max_cpq:req.body.max_cpq,
        current_cpq:0,
        current_chat_type:0,
        online:0,
        fake_phone:null,
      };
      //创建导师关联
      req.models.teacher.create(newTeacher,function(err,item){
        user.save({teacher_id:item.id},function(err) {
          return com.jsonReturn(res,'创建导师成功',101,user);
        });
      });
    });

    //
    // req.models.message.get(req.params.messageId, function (err, message) {
    //   if (err) {
    //     if (err.code == orm.ErrorCodes.NOT_FOUND) {
    //       res.send(404, "Message not found");
    //     } else {
    //       return next(err);
    //     }
    //   }
    //
    //   params.message_id = message.id;
    //
    //   req.models.comment.create(params, function (err, message) {
    //     if(err) {
    //       if(Array.isArray(err)) {
    //         return res.send(200, { errors: helpers.formatErrors(err) });
    //       } else {
    //         return next(err);
    //       }
    //     }
    //
    //     return res.send(200, message.serialize());
    //   });
    // });
  },

  /**
  获取上线状态
  **/
  // getOnlineStatus:function(req,res,next){
  //   if(!com.checkLogin(req)){
  //     return;
  //   }
  //   var teacher=req.session.user;
  //   if (!teacher.isTeacher()) {
  //     return com.jsonReturn(res,'操作失败',404,null);
  //   }
  //   req.models.teacher.get(teacher.tid,function(err,result){
  //     if(err){
  //       return com.jsonReturn(res,'操作失败',404,err);
  //     }
  //     return com.jsonReturn(res,'获取状态成功',101,result.online);
  //   });
  // },
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
    // console.log(teacher.isTeacher());
    if (teacher.teacher_id==null) {
      return com.jsonReturn(res,'操作失败',404,null);
    }
    var teacher_id= teacher.teacher_id;
    var updateData={
      online:1,
      current_cpq:req.body.current_cpq,
      // current_chat_type:req.body.current_chat_type==null?0:1
    }
    _update(res,req.models.teacher,teacher_id,updateData);
  },

  /**
  下线
  Params:{
    tid:
  }
  **/
  // offline:function(req,res,next){
  //   if(!com.checkLogin(req)){
  //     return;
  //   }
  //   var teacher=req.session.user;
  //   if (!teacher.isTeacher()) {
  //     return com.jsonReturn(res,'操作失败',404,null);
  //   }
  //   var tid= teacher.tid;
  //   var updateData={
  //     online:0
  //   }
  //   _update(res,req.models.teacher,tid,updateData);
  // },

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
    req.models.teacher.get(updateId,function(err,result){
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
