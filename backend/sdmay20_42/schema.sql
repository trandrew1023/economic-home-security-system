create database home_security_system;
create user 'sdmay2042'@'%' identified by 'sdmay2042';
grant all privileges on home_security_system.* to 'sdmay2042'@'%';
flush privileges;

create table user(
    user_id int not null auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    username varchar(50) not null,
    password varchar(512) not null,
    email varchar(100) not null,
    primary key(user_id)
);

create table camera(
    camera_id int not null auto_increment,
    user_id int not null,
    device_type int not null,
    ip varchar(24) not null,
    status boolean,
    primary key(camera_id),
    foreign key(user_id) references user(user_id)                                                                                                                                                                                                                                                   
);

create table clips(
    clip_id int not null auto_increment, 
    user_id int not null,
    camera_id int not null,
    clip_url varchar(256) not null,
    date_added date not null,
    primary key(clip_id),
    foreign key(user_id) references user(user_id),
    foreign key(camera_id) references camera(camera_id)
);
