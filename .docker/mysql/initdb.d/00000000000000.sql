CREATE DATABASE IF NOT EXISTS `test`;

CREATE DATABASE IF NOT EXISTS `troublesome`;

GRANT ALL PRIVILEGES ON `test`.* TO 'troublesome' @'%';

GRANT ALL PRIVILEGES ON `troublesome`.* TO 'troublesome' @'%';