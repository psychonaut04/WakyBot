CREATE DATABASE `wakybot`;
CREATE TABLE servers ( ID int NOT NULL AUTO_INCREMENT, prefix varchar(15) NOT NULL, language varchar(6) NOT NULL, guildid VARCHAR(17) NOT NULL, PRIMARY KEY (ID) );
CREATE TABLE sync ( ID int NOT NULL AUTO_INCREMENT, account_id int NOT NULL, discorduser varchar(255) NOT NULL, mainchar tinyint(1) NOT NULL, PRIMARY KEY (ID) );
