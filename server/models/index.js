// var orm      = require('../../../../');
var settings = require('../settings');
var orm = require("orm");
var modts = require("orm-timestamps");

var connection = null;

function setup(db, cb) {
  require('./user')(orm, db);
  require('./followers')(orm, db);
  // require('./comment')(orm, db);
  return cb(null, db);
}

module.exports = function (cb) {
  if (connection) return cb(null, connection);

  orm.connect(settings.mysql, function (err, db) {
    if (err) return cb(err);
    
    // 自动生成 create_time update_time
    db.use(modts, {
       createdProperty: 'create_time',
       modifiedProperty: 'update_time',
       expireProperty: false,
       dbtype: { type: 'date', time: true },
       now: function() { return new Date(); },
       expire: function() { var d = new Date(); return d.setMinutes(d.getMinutes() + 60); },
       persist: true
   });

    connection = db;
    db.settings.set('instance.returnAllErrors', true);
    setup(db, cb);
  });
};
