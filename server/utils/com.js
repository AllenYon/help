

var jsonReturn=function(res,msg,code,args) {
  res.jsonp({
    state:{
      msg:msg,
      code:code,
    },
    result:args
  });
};

module.exports.jsonReturn = jsonReturn;
