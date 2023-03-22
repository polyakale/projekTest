CREATE DATABASE taxi6
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

CREATE TABLE taxi6.cars (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  licenceNumber VARCHAR(10) DEFAULT NULL,
  hourlyRate INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;


CREATE TABLE taxi6.trips (
  id INT(11) NOT NULL AUTO_INCREMENT,
  numberOfMinits INT(11) DEFAULT NULL,
  date DATETIME NOT NULL,
  carId INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

ALTER TABLE taxi6.trips 
  ADD CONSTRAINT FK_trips_cars_id FOREIGN KEY (carId)
    REFERENCES taxi6.cars(id);


CREATE TABLE taxi6.users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;


# teszt adatok

DELETE FROM trips;
DELETE FROM cars;
DELETE FROM users;


INSERT cars
  (id, name, licenceNumber, hourlyRate)
  VALUES
  (1, 'Mercedesz', 'MM123', 2500),
  (2, 'Fiat', 'FF123', 3500),
  (3, 'BMW', 'BB123', 2900);

INSERT trips
  (numberOfMinits,date,carId)
  VALUES
  (23, '2022.12.13 12:00:00', 1), (15, '2022.12.13 13:20:00', 1),
  (29, '2022.12.13 12:00:00', 2), (10, '2022.12.13 14:25:00', 2), (41, '2022.12.13 20:15:00', 2),
  (10, '2022.12.13 12:00:00', 3), (18, '2022.12.13 13:25:00', 3), (22, '2022.12.13 18:15:00', 3);


INSERT users
  (id, email, password)
  VALUES
  (1, 'x@gmail.com', 'xjeszó'), (2, 'y@gmail.com', 'yjeszó'),(3, 'z@gmail.com', 'zjeszó');

SELECT * FROM cars;
SELECT * FROM trips;
SELECT * FROM users;

# statikus teszt adatok generálása
CALL genStat();

# véletlen függvények

# véletlen szám
SELECT RAND();
select FLOOR( RAND() * (3-1 + 1) + 1) as RandomValue;


set @min = 1;
set @max = 6;
select FLOOR( RAND() * (@max-@min + 1) + @min) as RandomValue;

select randInt(100,999);

select @min, @rand;

# véletlen autó
SELECT  ELT(randInt(1,5),'Mercedesz',
'Fiat',
'BMW','Volvo','Toyota');



select randCar();

# véletlen rendszám 
select randLicense(randCar());

# véletlen a cars táblába
set @c = randCar();
insert cars
  (id, name, licenceNumber, hourlyRate)
  VALUES
  (6, @c, randLicense(@c), randInt(1000,2500));


# véletlen dátum
select TIMESTAMPADD(MINUTE, randInt(15,60), '2022.11.12 12:22:00') as date;


# véletlen autók gen
call genDin(25, '2022.11.12 12:00:00', 2,10);

# véletlen vezetéknév
select genVez();


SELECT * FROM cars
  WHERE id = 12;

select * from users;

# -------------------
# sql injection

# union, union all
SELECT * FROM cars
UNION
SELECT * FROM cars;

SELECT * FROM cars
UNION ALL
SELECT * FROM cars;

SELECT name FROM cars
UNION
SELECT email FROM users;

SELECT * FROM cars WHERE id = 2 UNION SELECT *, '' FROM users;

# információk az adatbázisról
# mi az adatbázis neve
SELECT database();

SELECT * FROM cars WHERE id = 2 UNION SELECT database(), '','','';

# milyen táblák vannak
select table_name from information_schema.tables where table_schema='taxi6';

SELECT * FROM cars WHERE id = 2 UNION select table_name, '','','' from information_schema.tables where table_schema='taxi6';


# a tábla oszlopai, típusai
select column_name, data_type from information_schema.columns where table_name='users' and table_schema='taxi6';
SELECT * FROM cars WHERE id = 2 UNION select column_name,'', '','' from information_schema.columns where table_name='users' and table_schema='taxi6';

# CRUD mûveletek
# Create: post (http), insert (sql)
# új autó
INSERT INTO cars
  (name, licenceNumber, hourlyRate)
  VALUES
  ('trabant', 'tt123', 20000);

# törlés
DELETE from cars
  WHERE id = 1003;

# módosítás: put
UPDATE cars SET
  name = 'cc',
  licenceNumber = 'vvv',
  hourlyRate = 1
  WHERE id = 1002;

select t1.name, t2.name from cars t1, cars t2
ORDER by t1.name;