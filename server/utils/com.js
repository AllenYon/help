

var jsonReturn=function(res,msg,code,args) {
  res.jsonp({
    status:{
      msg:msg,
      code:code,
    },
    result:args
  });
};

module.exports.jsonReturn = jsonReturn;
