
-- --------------------------------------------------------
-- --------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL COMMENT '用户名',
  `password` char(32) DEFAULT NULL COMMENT '密码',
  `phone` varchar(32) DEFAULT NULL COMMENT '电话号码',
  `avatar` varchar(518) DEFAULT NULL COMMENT '头像',
  `desc` varchar(518) DEFAULT NULL COMMENT '自我介绍',
  `interest` varchar(32) DEFAULT NULL COMMENT '兴趣列表 json  ',
  `tid` int(11) DEFAULT '0' COMMENT '导师信息关联ID',
  `utype` tinyint(1) DEFAULT '0' COMMENT '0:普通用户 1:导师',
  `cfans` int(11) DEFAULT '0' COMMENT '粉丝数',
  `cfollows` int(11) DEFAULT '0' COMMENT '关注数',
  `cbuys` int(11) DEFAULT '0' COMMENT '购买数',
  `csells` int(11) DEFAULT '0' COMMENT '出售数',
  `cpost` int(11) DEFAULT '0' COMMENT '发表数',
  `create_time` datetime,
  `update_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------
-- --------------------------------------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE  TABLE IF NOT EXISTS `teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) DEFAULT NULL COMMENT '职位名称',
  `star` int(11) DEFAULT '0' COMMENT '评级星数',
  `max_cpq` int(11) DEFAULT '0' COMMENT '最大可设置CPQ （cost per quator) 每15分钟花费',
  `current_cpq` int(11) DEFAULT '0' COMMENT '目前CPQ',
  `current_chat_type` tinyint(1) DEFAULT '0' COMMENT '0:电话 1:IM',
  `online` tinyint(1) DEFAULT '0' COMMENT '0:offline 1:online',
  `fake_phone` varchar(32) DEFAULT NULL COMMENT '一次性电话',
  `create_time` datetime,
  `update_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
--

DROP TABLE IF EXISTS `followers`;
CREATE  TABLE IF NOT EXISTS `followers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '关注发起人',
  `follow_uid` int(11) NOT NULL COMMENT '被关注人',
  `create_time` datetime ,
  `update_time` datetime ,
  PRIMARY KEY (`id`,`uid`,`follow_uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8  AUTO_INCREMENT=1 ;


-- --------------------------------------------------
-- ----------------------------------

DROP TABLE IF EXISTS `orders`;
CREATE  TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_status` int(1) DEFAULT '0' COMMENT '订单状态',
  `seller_uid` int(11) DEFAULT NULL COMMENT '导师id',
  `buyer_uid` int(11) DEFAULT NULL COMMENT '学生id',
  `cpq` int(11) DEFAULT '0' COMMENT '成交CPQ',
  `price` int(11) DEFAULT '0' COMMENT '成交价格',
  `seller_rate_score` int(1) DEFAULT '0' COMMENT '导师评价分',
  `seller_rate_content` varchar(528) DEFAULT NULL COMMENT '评价内容',
  `buyer_rate_score` int(1) DEFAULT '0' COMMENT '学生评价分',
  `buyer_rate_content` varchar(528) DEFAULT NULL COMMENT '评价内容',
  `create_time` datetime,
  `update_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
