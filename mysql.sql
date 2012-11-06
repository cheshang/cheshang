
CREATE TABLE IF NOT EXISTS `Txt` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `value` mediumtext COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
