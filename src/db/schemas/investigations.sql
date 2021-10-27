DROP DATABASE IF EXISTS `Investigations`;
CREATE SCHEMA IF NOT EXISTS `Investigations`
  DEFAULT CHARACTER SET utf8;
USE `Investigations`;

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id`                              INT           NOT NULL      AUTO_INCREMENT UNIQUE,

  `firstName`                       VARCHAR(255)  NOT NULL,
  `lastName`                        VARCHAR(255)  NOT NULL,
  `email`                           VARCHAR(255),
  `password`                        VARCHAR(255)  NOT NULL,
  `phone`                           VARCHAR(255)  NULL,
  `avatarImageLocation`             VARCHAR(255)  NULL,
  `lastLogin`                       TIMESTAMP     NULL,

  `valid`                           TINYINT       NOT NULL      DEFAULT 1,
  `created`                         TIMESTAMP     NOT NULL      DEFAULT CURRENT_TIMESTAMP,
  `updated`                         TIMESTAMP     NOT NULL      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
) ENGINE = InnoDB;


DROP TABLE IF EXISTS `UserRole`;
CREATE TABLE IF NOT EXISTS `UserRole` (
  `id`                              INT           NOT NULL      AUTO_INCREMENT UNIQUE,
  `userId`                          INT           NOT NULL,

  `role`                            VARCHAR(36)   NOT NULL,

  -- Figure out proper permissions to assign here
  -- `read`                            TINYINT       NOT NULL      DEFAULT 0,
  -- `write`                           TINYINT       NOT NULL      DEFAULT 0,
  -- `remove`                          TINYINT       NOT NULL      DEFAULT 0,
  -- `update`                          TINYINT       NOT NULL      DEFAULT 0,
  -- `billing`                         TINYINT       NOT NULL      DEFAULT 0,
  -- `accounting`                      TINYINT       NOT NULL      DEFAULT 0,
  -- `disconnects`                     TINYINT       NOT NULL      DEFAULT 0,
  -- `administration`                  TINYINT       NOT NULL      DEFAULT 0,

  `valid`                           TINYINT       NOT NULL      DEFAULT 1,
  `created`                         TIMESTAMP     NOT NULL      DEFAULT CURRENT_TIMESTAMP,
  `updated`                         TIMESTAMP     NOT NULL      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  CONSTRAINT `userId_userRole_fk` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE = InnoDB;



-- INSERT INTO `UserRole` (`id`, `uuid`, `role`, `read`, `write`, `remove`, `update`, `billing`, `accounting`, `disconnects`, `administration`)
--  VALUES 
-- ('1', 'eb340322-a19c-413e-b182-e7a87671e20a', 'Read Only', '1', '0', '0', '0', '0', '0', '0', '0'),
-- ('2', 'eb340322-a19c-413e-b182-e7a87671e20b', 'Admin', '1', '1', '1', '1', '0', '0', '0', '1'),
-- ('3', 'eb340322-a19c-413e-b182-e7a87671e20c', 'Billing Admin', '1', '1', '1', '1', '1', '0', '0', '1'),
-- ('4', 'eb340322-a19c-413e-b182-e7a87671e20d', 'Internal', '1', '1', '0', '1', '0', '0', '0', '0'),
-- ('5', 'eb340322-a19c-413e-b182-e7a87671e20e', 'Super User', '1', '1', '1', '1', '1', '1', '1', '1'),
-- ('6', 'eb340322-a19c-413e-b182-e7a87671e20f', 'Disconnect Admin', '1', '1', '1', '1', '0', '0', '1', '1'),
-- ('7', 'eb340322-a19c-413e-b182-e7a87671e20h', 'Accounting Admin', '1', '1', '1', '1', '0', '1', '0', '1');
