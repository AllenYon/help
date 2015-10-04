var moment = require('moment');

/**
**/
module.exports = function (orm, db) {
  var order = db.define('order', {
    // id        : { type: 'integer', required: true, }
    order_status     : { type: 'integer'},
    seller_uid      : { type: 'integer'},
    buyer_uid      : { type: 'integer'},
    cpq      : { type: 'integer'}, // 25元/15分钟
    price      : { type: 'integer'}, // price = cpq * quator
    seller_rate_score      : { type: 'integer'},
    seller_rate_content      : { type: 'text'},
    buyer_rate_score      : { type: 'integer'},
    buyer_rate_content      : { type: 'text'}
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
