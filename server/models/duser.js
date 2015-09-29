var mongodb=require('./db');

function User(user){
	// 用户名
	this.name=user.name;
	// 密码
	this.password=user.password;
	// 用户类型
	this.type=user.type;
	// 领域范围
	// this.iscope=user.iscope;
	// 是否在线
	// this.online=user.online;
	// 付费金额
	this.amount=user.amount;

};

module.exports=User;

User.prototype.save=function(callback){

	var user={
		name : this.name,
		password:this.password,
		type:this.type,
		amount:this.amount
	};

	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//将用户数据插入 users集合
			collection.insert(user,{
				safe:true
			},function(err,user){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,user[0]);
			});
		});
	});
};

User.importTestUser = function(users,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//将用户数据插入 users集合
			collection.insert(users,function(err,result){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,result);
			});
		});
	});
};

User.get=function(name,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({name:name},function(err,user){
				mongodb.close();
				if (err) {
						return callback(err);
				}
				callback(null,user);
			});
		});
	});
};




User.getAll = function(callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find().toArray(function(err,users){
				mongodb.close();
				if (err) {
						return callback(err);
				}
				callback(null,users);
			});
		});
	});
};


//搜索老师
User.search=function(type,iscope,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find({
				type:type
				// iscope:iscope
			}).toArray(function(err,users){
				mongodb.close();
				if (err) {
						return callback(err);
				}
				callback(null,users);
			});
		});
	});
};
