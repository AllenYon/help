var request =require('supertest');
var server = request.agent('http://localhost:3000');

function testLoginUser(newUser,done){
    server
    .post('/user/v1/login')
    .send({username:newUser.username,password:newUser.password})
    .expect(function(res){
        var user=res.body.result;
        if (user.username!=newUser.username||user.password!=newUser.password) {
          return '用户名或密码不匹配';
        }
        if (user.phone!='1111') {
          return '手机号码不对';
        }
        if (res.body.status.code!=101) {
            return 'code 不正确';
        }
    })
    .end(done);
};

function testLogout(){
  return function(done){
      server.post('/user/v1/logout').expect(function(res){
      }).end(function(err,res){
        if (err) {
          return done(err);
        }
        return done();
      });
  };
};

describe('Test 注册新用户',function(){
    var newUser=null;
    before(function(done){
      newUser={
        username:'test_user_',
        password:'test_pwd',
        phone:'1111'
      };
        done();
    })
    it('POST /user/v1/register',function(done){
        var random=Math.floor(Math.random()*999);

        newUser.username='test_user_'+random;

        server.post('/user/v1/register').send(newUser)
        .expect(function(res){
          if (res.body.status.code!=101) {
            return '注册失败';
          }

          newUser=res.body.result;
        }).end(done);
    });
    it('POST /user/v1/login',function(done){
        testLoginUser(newUser,done);
    });
    it('POST /user/v1/logout',testLogout());
    it('POST /user/v1/login',function(done){
        testLoginUser(newUser,done);
    });
    it('GET /user/v1/getStatus',function(done){
      server
      .get('/user/v1/getStatus')
      .expect(function(res){
          delete res.body['result'];
      })
      .expect(200,{
        status:{
          code:101,
          msg:'操作成功'
        }
      },done);
    });

    it('POST  /teacher/v1/becomeTeacher',function(done){
      var postData={
        uid:newUser.id,
        title:'蘑菇街HR'
      };
      server.post('/teacher/v1/becomeTeacher').send(postData)
      .expect(function(res){
        if (res.body.status.code!=101) {
          throw new Error('code is not 101');
        }
        newUser.tid=res.body.result.tid;
      }).end(done);

    });

    it('POST /teacher/v1/update',function(done){
      var updateData={
        tid:newUser.tid,
        title:'蘑菇街k',
        star:1,
        max_cpq:0,
        current_cpq:0,
        current_chat_type:0,
        online:0,
        fake_phone:'1388383'
      };
      server.post('/teacher/v1/update').send(updateData)
      .expect(function(res){
        if (res.body.status.code!=101) {
          throw new Error('code is not 101');
        }
      }).end(done);

    });
});
