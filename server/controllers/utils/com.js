

module.exports={
  /**
  true: 已登录
  false : 未登录
  **/
  checkLogin : function(req){
    if (req.session.user==null) {
      com.jsonReturn(res,'未登入',404,null);
      return false;
    }
    return true;
  },
  jsonReturn:function(res,msg,code,args) {
    res.jsonp({
      status:{
        msg:msg,
        code:code,
      },
      result:args
    });
  }
}
