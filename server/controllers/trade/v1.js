var com = require('../utils/com.js');
var orm = require('orm');
module.exports={
/**
搜索在线导师
URL： /help/v1/searchTeacher
Method: GET
Params: {
     skill:xx //兴趣范围
     chatType: int //聊天类型
     teacherLevel: int // 0,1,2   初级导师，中级导师，明星导师
}
排序因子

目前在线
star
level

**/
searchTeacher : function (req, res, next) {
  var searchParams={
    skill:req.query.skill,
    current_chat_type:req.query.current_chat_type,
    level:req.query.level,
    online:1
  };
  req.models.teacher.find(searchParams,['star','Z'],20,function(err,result){
    if (err) {
        throw err;
    }
    com.jsonReturn(res,'找到结果',101,result);
  });
},


/**
学生 在线预约导师
下单操作，
URL： /help/v1/book
Method: POST
Params:{
     uid: String //导师ID
}
**/
book:function(req,res,next){
  if(!com.checkLogin(req)){
    return;
  }
  var buyer_uid=req.session.user.id;
  console.log('buyer_uid '+buyer_uid);
  //导师uid
  var seller_uid=req.body.uid;
  console.log('seller_uid '+seller_uid);

  req.models.user.get(seller_uid,function(err,user){
      console.log('2xx');
      if(err){
        throw err;
      }
      console.log(user);
      if(user.teacher_id==null){
        return com.jsonReturn(res,'该用户不是导师',404,null);
      }

      req.models.teacher.get(user.teacher_id,function(err,teacher){
        if (err) {
            throw err;
        }
        console.log(teacher);
        var insertData={
          order_status:0,
          seller_uid:seller_uid,
          buyer_uid:buyer_uid,
          cpq:teacher.current_cpq,
          price:teacher.current_cpq*1,
        };
        req.models.order.create(insertData,function(err,result){
          if (err) { throw err; }
          return com.jsonReturn(res,'预定成功',101,result);
        });
      })

  })
},


/**
取消预约导师
URL： /help/v1/cancelBook
Method: GET
Params:{
     uid: String //导师ID
}
Result:{
     state:
     result:
}
**/
cancelBook:function(req,res,next){
    com.jsonReturn(res,'取消成功',101,null);
},
/**
支付
URL：/help/v1/pay
Method: POST
Params:{
     orderId: String
}
Result:{
     status：{} // 支付结果
     result：{

     }
}
**/
pay:function(req,res,next){
    com.jsonReturn(res,'支付成功',101,null);
},

/**
评价订单
URL:/help/v1/rate
Method:Post
Params:{
     orderId: String //
     rate_soure:int //
     rate_desc:String //

}
Result:{
     status:{}
     Result:{}
}
**/
rate:function(req,res,next){
    com.jsonReturn(res,'评价成功',101,null);
},



/**
获取所有 订单  （我购买的，我出售）
URL：/help/v1/getOrderList
Method: Get
Params:{
     qType:int
     orderType: int
}
**/
getOrderList:function(req,res,next) {
  com.jsonReturn(res,'操作成功',101,null);
},




};
