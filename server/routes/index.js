UserModel = require('../models/user.js');
user_v1 = require('../controllers/user/v1.js');
help_v1 = require('../controllers/help/v1.js');
trade_v1 = require('../controllers/trade/v1.js');


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


	// 用户
	app.post('/user/v1/register',user_v1.register);
	app.post('/user/v1/login',user_v1.login);
	app.post('/user/v1/logout',user_v1.logout);
	app.get('/user/v1/getStatus',user_v1.getStatus);
	app.get('/user/v1/sendCaptcha',user_v1.sendCaptcha);
	app.get('/user/v1/isBindPhone',user_v1.isBindPhone);
	app.get('/user/v1/bindPhone',user_v1.bindPhone);
	app.post('/user/v1/fillInfo',user_v1.fillInfo);
	app.get('/user/v1/getProfile',user_v1.getProfile);
	app.get('/user/v1/doFollow',user_v1.doFollow);
	app.get('/user/v1/getFollowList',user_v1.getFollowList);

	// 互助
	app.get('/help/v1/searchTeacher',help_v1.searchTeacher);
	app.get('/help/v1/book',help_v1.book);
	app.get('/help/v1/cancelBook',help_v1.cancelBook);

	// 交易
	app.get('/trade/v1/pay',trade_v1.pay);
	app.get('/trade/v1/rate',trade_v1.rate);
	app.get('/trade/v1/getOrderList',trade_v1.getOrderList);



};
