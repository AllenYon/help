var UserModel = require('../models/user.js');
var TestUsers = require('../data/testUsers.js');
var orm = require("orm");

exports.test = function (req,res,next) {
  // body...
  req.models.customers.find({ name: "22" }, function (err, people) {
      // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
      if (err) throw err;

      console.log("People found: %d", people.length);
      console.log("First person: %s, age %s", people[0].name, people[0].city);

      // people[0].age = 16;
      people[0].save(function (err) {
          // err.msg = "under-age";
      });
      jsonReturn(res,"success",err);
  });
}

exports.search = function (req, res, next) {
  if (!req.session.user) {
    res.jsonp({msg:'用户未登录'});
    return;
  }
  var type = req.query.type; //string to int
  if (!type) {
      jsonReturn(res,"type 为空");
  }
  var iscope = req.query.iscope;
  var amount = req.query.amount;
  UserModel.search(parseInt(type),iscope,function(err,result){
    if(!result){
      jsonReturn(res,"未找到结果");
    } else {
      jsonReturn(res,"找到结果",result);
    }
  });
};


//注册
exports.reg=function(req,res,next){
  var newUser=new User({
    name: req.body.name,
    password:req.body.password,
    type:req.body.type,
    amount:req.body.amount
  });

  UserModel.get(newUser.name,function(err,user){
      if(err){console.log(err);}
      if(user){
        jsonReturn(res,"用户已存在");
      }
      newUser.save(function(err,user){
          if(err){
            jsonReturn(res,"错误");
          }
          jsonReturn(res,"注册成功",user);
      });
  });
};

exports.importTestUser=function(req,res,next){
    UserModel.importTestUser(TestUsers.data, function(err,result){
      if (err) {
        jsonReturn(res,"错误",err);
      } else {
        jsonReturn(res,"导入成功");
      }
    });
};

function jsonReturn(res,msg,args) {
  res.jsonp({
    msg:msg,
    result:args
  });
  return;
}
