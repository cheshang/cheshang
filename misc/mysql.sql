DROP TABLE IF EXISTS `Session`;
CREATE TABLE `Session` (
  `id` int(12)  unsigned NOT NULL AUTO_INCREMENT,
  `value` binary(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account` (
  `id` int(12)  unsigned NOT NULL AUTO_INCREMENT,
  `value` int(14) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1000000;

DROP TABLE IF EXISTS `Txt`;
CREATE TABLE `Txt` (
  `id` int(12)  unsigned NOT NULL AUTO_INCREMENT,
  `value` mediumtext COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAUL   T CHARSET=utf8 COLLATE=utf8_bin;


DROP TABLE IF EXISTS `Passwd`;
CREATE TABLE `Passwd` (
  `id` int(12)  unsigned NOT NULL AUTO_INCREMENT,
  `value` binary(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


DROP TABLE IF EXISTS `Email`;
CREATE TABLE `Email` (
  `id` int(12)  unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(128) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


DROP TABLE IF EXISTS `Profile`;
CREATE TABLE `Profile` (
  `id` int(12)  unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45),
  `motto` varchar(140),
  `avatar` varchar(128),
  `gender` tinyint(3) unsigned,
  `birthday` int(8) unsigned,
  `city` int(12)  unsigned,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `Oauth2`;
CREATE TABLE `Oauth2` (
  `id` int(12)  unsigned NOT NULL AUTO_INCREMENT,
  `oauth_type` tinyint(3) unsigned NOT NULL,
  `oauth_id` int(12)  unsigned NOT NULL,
  `token` varchar(100) NOT NULL,
  `refresh_token` varchar(100),
  `expires_in` int(12)  unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


DROP TABLE IF EXISTS `Album`;
CREATE TABLE  `Album` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) COLLATE utf8_bin NOT NULL,
  `txt` varchar(150) COLLATE utf8_bin,
  `status` tinyint(3) unsigned NOT NULL,
  `uid` int(12) unsigned NOT NULL,
  `time` int(14) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1000000;

DROP TABLE IF EXISTS `Photo`;
CREATE TABLE  `Photo` (
  `id` int(14) unsigned NOT NULL AUTO_INCREMENT,
  `md5` binary(16) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `status` tinyint(3) unsigned NOT NULL,
  `uid` int(12) unsigned NOT NULL,
  `album_id` int(12) unsigned NOT NULL,
  `size` varchar(16) NOT NULL,
  `time` int(14) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=10000000;


# Dump of table at
# ------------------------------------------------------------

DROP TABLE IF EXISTS `at`;

CREATE TABLE `at` (
  `id` int(12)  unsigned NOT NULL AUTO_INCREMENT,
  `type` int(1) NOT NULL COMMENT '1:专辑被收藏 2:图片被收藏 3:专辑被评论 4:图片被评论 5：我的评论被回复',
  `uid` int(12)  NOT NULL COMMENT '提醒的发出者',
  `to_uid` int(12)  NOT NULL COMMENT '提醒的接收者',
  `status` int(1) NOT NULL COMMENT '0:未阅读,即用户未处理 1:已阅读',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(12)  unsigned NOT NULL AUTO_INCREMENT,
  `type` int(1) NOT NULL COMMENT '1:评论专辑，2:评论图片',
  `obj_id` int(12)  NOT NULL COMMENT '被评论的对象的id',
  `content` varchar(1024) NOT NULL DEFAULT '',
  `uid` int(12)  NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table fav
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fav`;

CREATE TABLE `fav` (
  `id` int(12)  unsigned NOT NULL AUTO_INCREMENT,
  `fav_type` int(1) NOT NULL COMMENT '1:album,2:photo',
  `obj_id` int(12)  NOT NULL COMMENT '被收藏的图片或者专辑的id',
  `uid` int(12)  NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table photo
# ------------------------------------------------------------