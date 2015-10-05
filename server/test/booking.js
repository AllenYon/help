var request =require('supertest');
var server = request.agent('http://localhost:3000');
var com =require('./com');
var utils=require('../controllers/utils/com')

describe('预定订单',function(){
    var skills=['Android','iOS'];
    var strInterest=JSON.stringify(skills);
    var student={
      username:'student_'+utils.randomInt(0,999),
      password:'test_pwd',
    };
    var teachers;

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
    it('学生搜索在线导师，根据Star降序排序',function(done){
      var query={
        skill:skills[0],
        current_chat_type:0,
        level:0
      }
      server.get('/trade/v1/searchTeacher').query(query)
      .expect(function(res){
        if (res.body.status.code!=101) {
          return '操作失败';
        }
        console.log(res.body);
        teachers=res.body.result;
      }).end(done);
    });
    it('选择第一个导师，并且预约',function(done){
      if (teachers==null||teachers.length==0) {
          console.log('没有找到合适的导师');
          console.log('推荐其他');
          return done();
      }
      var bookData={
          uid:teachers[0].user_id,
      }
      server.post('/trade/v1/book').send(bookData)
      .expect(function(res){
        if (res.body.status.code!=101) {
          return '操作失败';
        }
        console.log(res.body);
      }).end(done);
    });
    it('取消预约',function(done){
        done();
    });
    it('再生成订单,并付款',function(done){
        done();
    })
    it('电话联系，完成交易',function(done){
        done();
    });
    it('双方评价订单',function(done){
        done();
    });
});
