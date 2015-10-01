var request =require('supertest');
var server = request.agent('http://localhost:3000');

function testLoginUser(){
    return function(done){
        server
        .post('/user/v1/login')
        .send({username:'test_user_575',password:'test_pwd'})
        .expect(200)
        .end(onResponse);
        function onResponse(err,res){
          if(err) return done(err);
          return done();
        }
    };
};

function testLogout(){
  return function(done){
      server.post('/user/v1/logout').expect(function(res){
        console.log(res.body);
      }).end(function(err,res){
        if (err) {
          return done(err);
        }
        return done();
      });
  };
};

describe('Test 注册新用户',function(){
    it('POST /user/v1/register',function(done){
        var newUser ={
          username:'test_user_'+Math.floor(Math.random()*999),
          password:'test_pwd'
        }
        server.post('/user/v1/register').send(newUser)
        .expect(200,{
          status:{
              code:101,
              msg:'注册成功'
          },
          result:null
        },done);
    });
});
describe('Test login logout',function(){
    it('POST /user/v1/login',testLoginUser());
    it('POST /user/v1/logout',testLogout());
});

describe('loading express', function(){
    it('POST /user/v1/login',testLoginUser());
    it('GET /user/v1/getStatus',function(done){
      server
      .get('/user/v1/getStatus')
      .expect(function(res){
          console.log(res.body);
          delete res.body['result'];
      })
      .expect(200,{
        status:{
          code:101,
          msg:'操作成功'
        }
      },done);
    });
});
