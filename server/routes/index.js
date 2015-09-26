UserModel = require('../models/user.js');
user = require('../controllers/user.js');

var com = require('../utils/com.js');

module.exports=function(app){

	app.get('/',function(req,res){
		res.render('index',{title:'主页'});
	});
  app.get('/login',function(req,res){
    var name = req.query.name;
    var password = req.query.password;

    UserModel.get(name,function(err,user){
        if(!user){
					com.jsonReturn(res,'用户不存在','404');
					return;
        }
        if(user.password!=password){
					com.jsonReturn(res,'密码错误','404');
					return;
        }
        req.session.user=user;
				com.jsonReturn(res,'登录成功','101',{user:user});
    });
  });

  app.get('/logout',function(req,res){
      req.session.user=null;
      res.jsonp({msg:'登出成功'});
      return;
  });

  app.get('/getUserState',function(req,res){
      if (!req.session.user) {
        res.jsonp({msg:'用户未登录'});
        return;
      }
      else {
        res.jsonp({msg:'用户信息',user:req.session.user});
        return;
      }
  });

  app.get('/getAllUsers',function(req,res){
    UserModel.getAll(function(err,users){
      if(!users){
        res.jsonp({msg:'用户不存在'});
        return;
      }
      res.jsonp({msg:'查询所有用户',users:users});
      return;
    });
  });


  app.get('/search',user.search);
	app.get('/reg',user.reg); //注册
	app.get('/importTestUser',user.importTestUser);//导入测试数据

};
