var request =require('supertest');
var server = request.agent('http://localhost:3000');
var com = require('./com');

describe.skip('注册新用户,并登陆登出',function(){
    var newUser=null;
    before(function(done){
      newUser={
        username:'test_user_'+Math.floor(Math.random()*999),
        password:'test_pwd',
        phone:'1111'
      };
      done();
    })
    it('注册',function(done){
        server.post('/user/v1/register').send(newUser)
        .expect(function(res){
          if (res.body.status.code!=101) {
            return '注册失败';
          }

          newUser=res.body.result;
        }).end(done);
    });
    it('登录',function(done){
        com.testLoginUser(server,newUser,done);
    });
    it('获取状态',function(done){
        com.testGetStatus(server,done);
    });
    it('登出',com.testLogout(server));

});
