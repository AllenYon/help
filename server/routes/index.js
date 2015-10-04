var user_v1 = require('../controllers/user/v1');
var trade_v1 = require('../controllers/trade/v1');
var teacher_v1 = require('../controllers/teacher/v1');

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
	app.post('/teacher/v1/becomeTeacher',teacher_v1.becomeTeacher);
	app.post('/teacher/v1/update',teacher_v1.update);
	app.post('/teacher/v1/online',teacher_v1.online);
	// app.post('/teacher/v1/offline',teacher_v1.offline);
	// app.get('/teacher/v1/getOnlineStatus',teacher_v1.getOnlineStatus);


	// 撮合交易
	app.get('/trade/v1/searchTeacher',trade_v1.searchTeacher);
	app.post('/trade/v1/book',trade_v1.book);
	app.post('/trade/v1/cancelBook',trade_v1.cancelBook);
	app.post('/trade/v1/pay',trade_v1.pay);
	app.post('/trade/v1/rate',trade_v1.rate);
	app.get('/trade/v1/getOrderList',trade_v1.getOrderList);



};
