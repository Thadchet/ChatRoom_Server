CREATE DATABASE IF NOT EXISTS `data` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `data`;

CREATE TABLE IF NOT EXISTS Users (
    ID int NOT NULL AUTO_INCREMENT,
    Username varchar(255) UNIQUE,
    Password varchar(255),
    Profile varchar(255),
    Status varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS ChatRooms (
    RoomID int NOT NULL AUTO_INCREMENT,
    Member int ,
    RoomName varchar(255),
    PRIMARY KEY (RoomID , Member),
    foreign key(Member)
        references Users(ID)
);

CREATE TABLE IF NOT EXISTS ChatHistory (
    RoomID int NOT NULL,
    MessageID int NOT NULL AUTO_INCREMENT,
    CreatedAt timestamp default current_timestamp, 
    UpdatedBy int NOT NULL,
    Message varchar(255),
    PRIMARY KEY (MessageID),
    foreign key(RoomID)
        references ChatRooms(RoomID)
);

CREATE TABLE IF NOT EXISTS Friends (
    ID int NOT NULL,
    FriendID int NOT NULL,
    PRIMARY KEY (ID , FriendID),
    foreign key(ID)
        references Users(ID),
    foreign key(FriendID)
        references Users(ID)
);