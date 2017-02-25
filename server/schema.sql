DROP DATABASE IF EXISTS `chat`;

CREATE DATABASE `chat`;

USE `chat`;
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `message` MEDIUMTEXT NULL DEFAULT NULL,
  `user_id` INTEGER NOT NULL,
  `room_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'rooms'
-- 
-- ---

DROP TABLE IF EXISTS `rooms`;
    
CREATE TABLE `rooms` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `roomname` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users_rooms'
-- 
-- ---

DROP TABLE IF EXISTS `users_rooms`;
    
CREATE TABLE `users_rooms` (
  `id` INTEGER(9) NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `room_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (room_id) REFERENCES `rooms` (`id`);
ALTER TABLE `users_rooms` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `users_rooms` ADD FOREIGN KEY (room_id) REFERENCES `rooms` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users_rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `messages` (`id`,`message`,`user_id`,`room_id`) VALUES
-- ('','','','');
-- INSERT INTO `rooms` (`id`,`roomname`) VALUES
-- ('','');
-- INSERT INTO `users` (`id`,`username`) VALUES
-- ('','');
-- INSERT INTO `users_rooms` (`id`,`user_id`,`room_id`) VALUES
-- ('','','');

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

