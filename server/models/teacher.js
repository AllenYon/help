var moment = require('moment');

/**
**/
module.exports = function (orm, db) {
  var teacher = db.define('teacher', {
    // id        : { type: 'integer', required: true, }
    user_id     : { type: 'integer'},
    title     : { type: 'text'},
    skill      : { type: 'text'},
    star      : { type: 'integer'},
    level      : { type: 'integer'},
    max_cpq      : { type: 'integer'},
    current_cpq      : { type: 'integer'},
    current_chat_type      : { type: 'integer'},
    online      : { type: 'integer'},
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

  // teacher.hasOne('user', db.models.user, { required: true,  autoFetch: true });
};
