DROP TABLE IF EXISTS `Txt`;
CREATE TABLE `Txt` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` mediumtext COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `Passwd`;
CREATE TABLE `Passwd` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` char(32) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `Email`;
CREATE TABLE `Email` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(128) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `Profile`;
CREATE TABLE `Profile` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `avatar` varchar(128) NOT NULL,
  `gender` tinyint(3) unsigned NOT NULL,
  `birthday` int(8) unsigned NOT NULL,
  `city` int(11) unsigned NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `Oauth`;
CREATE TABLE `Oauth` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned NOT NULL,
  `type` tinyint(3) unsigned NOT NULL,
  `auth_id` int(11) unsigned NOT NULL,
  `code` varchar(45) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expires_in` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


# Dump of table album
# ------------------------------------------------------------

DROP TABLE IF EXISTS `album`;

CREATE TABLE `album` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '1:正常，0:不可访问',
  `uid` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table at
# ------------------------------------------------------------

DROP TABLE IF EXISTS `at`;

CREATE TABLE `at` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` int(1) NOT NULL COMMENT '1:专辑被收藏 2:图片被收藏 3:专辑被评论 4:图片被评论 5：我的评论被回复',
  `uid` int(11) NOT NULL COMMENT '提醒的发出者',
  `to_uid` int(11) NOT NULL COMMENT '提醒的接收者',
  `status` int(1) NOT NULL COMMENT '0:未阅读,即用户未处理 1:已阅读',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` int(1) NOT NULL COMMENT '1:评论专辑，2:评论图片',
  `obj_id` int(11) NOT NULL COMMENT '被评论的对象的id',
  `content` varchar(1024) NOT NULL DEFAULT '',
  `uid` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table fav
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fav`;

CREATE TABLE `fav` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fav_type` int(1) NOT NULL COMMENT '1:album,2:photo',
  `obj_id` int(11) NOT NULL COMMENT '被收藏的图片或者专辑的id',
  `uid` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table photo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photo`;

CREATE TABLE `photo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(512) NOT NULL DEFAULT '',
  `title` varchar(64) DEFAULT '',
  `uid` int(11) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


