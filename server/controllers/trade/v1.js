var com = require('../utils/com.js');


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
exports.pay=function(req,res,next){
    com.jsonReturn(res,'支付成功',101,null);
};

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
exports.rate=function(req,res,next){
    com.jsonReturn(res,'评价成功',101,null);
};


/**
获取所有 订单  （我购买的，我出售）

URL：/help/v1/getOrderList
Method: Get
Params:{
     qType:int
     orderType: int
}
Result:{
     status:{}
     result:{
          list:[{},{}]
     }
}
**/

exports.getOrderList=function(req,res,next) {
  com.jsonReturn(res,'操作成功',101,null);
};
