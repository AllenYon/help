var com = require('../../utils/com.js');

module.exports={
    /**
    成为导师
    **/
    becomeTeacher:function(req,res,next){
      console.log(req.body);
      var uid = req.body.uid;
      req.models.users.get(uid,function(err,user){
        if (err) {
            throw err;
        }
        console.log(user);
        if (!user) {
            return com.jsonReturn(res,'未找到该用户',404,null);
        }
        //已经是导师
        if (user.tid!=null) {
            console.log(user.tid);
            return com.jsonReturn(res,'已经是导师',404,null);
        }
        var newTeacher={
          title:req.body.title,
          star:0,
          max_cpq:0,
          current_cpq:0,
          current_chat_type:0,
          online:0,
          fake_phone:null,
        };
        //创建导师关联
        req.models.teachers.create(newTeacher,function(err,item){
          console.log(item);
          user.save({tid:item.id},function(err) {
            return com.jsonReturn(res,'创建导师成功',101,user);
          });
        });
      })
    },
}
