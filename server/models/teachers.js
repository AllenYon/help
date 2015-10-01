var moment = require('moment');

/**
`id` int(11) NOT NULL AUTO_INCREMENT,
`title` varchar(32) DEFAULT NULL COMMENT '职位名称',
`star` int(11) DEFAULT '0' COMMENT '评级星数',
`max_cpq` int(11) DEFAULT '0' COMMENT '最大可设置CPQ （cost per quator) 每15分钟花费',
`current_cpq` int(11) DEFAULT '0' COMMENT '目前CPQ',
`current_chat_type` tinyint(1) DEFAULT '0' COMMENT '0:电话 1:IM',
`online` tinyint(1) DEFAULT '0' COMMENT '0:offline 1:online',
`fake_phone` varchar(32) DEFAULT NULL COMMENT '一次性电话',
`create_time` int(11) DEFAULT '0',
`update_time` int(11) DEFAULT '0',
**/
module.exports = function (orm, db) {
  var teachers = db.define('teachers', {
    // id        : { type: 'integer', required: true, }
    title     : { type: 'text'},
    star      : { type: 'integer'},
    max_cpq      : { type: 'integer'},
    current_cpq      : { type: 'integer'},
    current_chat_type      : { type: 'integer'},
    online      : { type: 'integer'},
    fake_phone      : { type: 'text'}
  },
  {
    timestamp: true
  },
  {
    hooks: {
      beforeValidation: function () {
        // this.createdAt = new Date();
      }
    },
    validations: {
      // body   : orm.enforce.ranges.length(1, 1024)
    },
    methods: {
      serialize: function () {
        return {
          // body      : this.body,
          // createdAt : moment(this.createdAt).fromNow()
        }
      }
    }
  });

  // Comment.hasOne('message', db.models.message, { required: true, reverse: 'comments', autoFetch: true });
};
