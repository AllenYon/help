module.exports={
  testLoginUser:function(server,newUser,done){
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
  },

  testLogout:function(server){
    return function(done){
        server.post('/user/v1/logout').expect(function(res){
        }).end(function(err,res){
          if (err) {
            return done(err);
          }
          return done();
        });
    };
  },

  testGetStatus:function(server,done){
    server
    .get('/user/v1/getStatus')
    .expect(function(res){
      if (res.body.code!=101) {
          return 'code is not 101';
      }
    })
    .end(done);
  }

}
