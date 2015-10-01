var com = require('../../utils/com.js');

module.exports={
/**
搜索在线导师
URL： /help/v1/searchTeacher
Method: GET
Params: {
     interest：[xx,xx] //兴趣范围
     chatType: int //聊天类型
     teacherLevel: int // 0,1,2   初级导师，中级导师，明星导师
}
**/
searchTeacher : function (req, res, next) {
  com.jsonReturn(res,'找到结果',101,{'name':'alin'});
},


/**
在线预约导师
URL： /help/v1/book
Method: GET
Params:{
     uid: String //导师ID
}
Result：{
     state: {} // 成功 or  失败
     result：{}
}
**/
book:function(req,res,next){
    com.jsonReturn(res,'预约成功',101,null);
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
}

};
