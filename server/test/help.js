var request =require('supertest');
var server = request.agent('http://localhost:3000');
var com =require('./com');


describe('搜索导师',function(){
    var skills=['Android','iOS'];
    var strInterest=JSON.stringify(skills);
    var student={
      username:'student_'+Math.floor(Math.random()*999),
      password:'test_pwd',
    };
    var info={
      avatar:'http://baidu.com',
      desc:'这个家伙很懒',
      interest:strInterest
    };


    var teachers=new Array();
    // 模拟导师
    for (var i = 0; i < 10; i++) {
      var randomInt = Math.round(Math.random()*1);
      teachers[i]={
        username:'teacher_'+i+'_'+new Date().getTime(),
        password:'test_pwd',
        title:'蘑菇街HR',
        skill: skills[randomInt],
        star:0,
        max_cpq:0,
        current_cpq:0,
        current_chat_type:0,
        online:0,
        fake_phone:null
      };
    }


    teachers.forEach(function(item){
      it('注册导师',function(done){
        server.post('/user/v1/register').send(item)
        .expect(function(res){
          if (res.body.status.code!=101) {
            return '注册失败';
          }
          item.uid=res.body.result.id;
        }).end(done);
      });
      it('成为导师',function(done){
        server.post('/teacher/v1/becomeTeacher').send(item)
        .expect(function(res){
          if (res.body.status.code!=101) {
            throw new Error('code is not 101');
          }
          item.tid=res.body.result.tid;
        }).end(done);
      });
      it('登录该用户',function(done){
          com.testLoginUser(server,item,done);
      });
      var randomInt = Math.round(Math.random()*2);
      if(randomInt==0){
        it('随机上线N/2个导师',function(done){
          server.post('/teacher/v1/online').send(item)
            .expect(function(res){
              if (res.body.status.code!=101) {
                throw new Error('code is not 101');
              }
              // item.tid=res.body.result.tid;
            }).end(done);
        });
      }
      it('登出',com.testLogout(server));
    });

    it('注册一个学生',function(done){
      server.post('/user/v1/register').send(student)
      .expect(function(res){
        if (res.body.status.code!=101) {
          return '注册失败';
        }
        student=res.body.result;
      }).end(done);
    });
    it('登录该用户',function(done){
        com.testLoginUser(server,student,done);
    });
    it('学生完善用户信息，兴趣为XX',function(done){
      server.post('/user/v1/fillInfo').send(info)
      .expect(function(res){
        if (res.body.status.code!=101) {
          return '操作失败';
        }
      }).end(done);
    });

    it('学生搜索在线导师，根据Star降序排序',function(done){
      var query={
        skill:'Android',
        current_chat_type:0,
        level:0
      }
      server.get('/help/v1/searchTeacher').query(query)
      .expect(function(res){
        if (res.body.status.code!=101) {
          return '操作失败';
        }
        console.log(res.body);
      }).end(done);
    });
});
