var user_v1 = require('../controllers/user/v1');
var help_v1 = require('../controllers/help/v1');
var trade_v1 = require('../controllers/trade/v1');
var teacher_v1 = require('../controllers/teacher/v1');


var com = require('../utils/com.js');

module.exports=function(app){

	app.get('/',function(req,res){
		res.render('index',{title:'主页'});
	});

	// 用户
	app.post('/user/v1/register',user_v1.register);
	app.post('/user/v1/login',user_v1.login);
	app.post('/user/v1/logout',user_v1.logout);
	app.post('/user/v1/fillInfo',user_v1.fillInfo);
	app.post('/user/v1/follow',user_v1.follow);
	app.post('/user/v1/unfollow',user_v1.unfollow);

	app.get('/user/v1/sendCaptcha',user_v1.sendCaptcha);
	app.get('/user/v1/getStatus',user_v1.getStatus);
	app.get('/user/v1/isBindPhone',user_v1.isBindPhone);
	app.get('/user/v1/bindPhone',user_v1.bindPhone);
	app.get('/user/v1/getProfile',user_v1.getProfile);
	app.get('/user/v1/getFollowList',user_v1.getFollowList);

	//导师
	app.post('/user/v1/becomeTeacher',user_v1.becomeTeacher);

	// 互助
	app.get('/help/v1/searchTeacher',help_v1.searchTeacher);
	app.get('/help/v1/book',help_v1.book);
	app.get('/help/v1/cancelBook',help_v1.cancelBook);

	// 交易
	app.get('/trade/v1/pay',trade_v1.pay);
	app.get('/trade/v1/rate',trade_v1.rate);
	app.get('/trade/v1/getOrderList',trade_v1.getOrderList);



};
