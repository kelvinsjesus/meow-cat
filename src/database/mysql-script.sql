CREATE DATABASE freestyle;
USE freestyle;
DROP DATABASE freestyle;
-- CREATE TABLES

CREATE TABLE User (
    id char(12) PRIMARY KEY,
    name varchar(48) NOT NULL,
    username varchar(32) NOT NULL,
    email varchar(64) NOT NULL,
    password varchar(24) NOT NULL,
    tokenRecovery varchar(64),
    createdAt datetime DEFAULT current_timestamp,
    updatedAt datetime DEFAULT current_timestamp,
    CONSTRAINT uniqueUser UNIQUE (username, email)
);

CREATE TABLE UserProfile(
    id int PRIMARY KEY auto_increment,
    avatarUrl varchar(256),
    bannerUrl varchar(256),
    bio varchar(256),
    location varchar(64),
    status varchar(32),
    userId char(12),
    CONSTRAINT fkUser FOREIGN KEY (userId)
        REFERENCES user(id)
    updatedAt datetime DEFAULT current_timestamp,
);
    -- pets int(select)

CREATE TABLE Pet (
    id int AUTO_INCREMENT,
    name varchar(32) NOT NULL,
    species varchar(24),
    breed varchar(24),
    gender char(1),
    weekLife int,
    weight float,
    userId char(12),
    createdAt datetime DEFAULT current_timestamp,
    updatedAt datetime DEFAULT current_timestamp,
    CONSTRAINT fkUser FOREIGN KEY (userId)
        REFERENCES User(id),
    CONSTRAINT pkPet PRIMARY KEY (id, userId),
    CONSTRAINT checkGender CHECK(gender IN ('M', 'F'))
) AUTO_INCREMENT = 1000;

-- INSERT INTO Pet (gender) VALUES ('M');
-- Error Code: 1406. Data too long for column 'gender' at row 3	0.000 sec
-- Alterar campo para aceitar textos longos
ALTER TABLE Pet MODIFY COLUMN gender longtext;
-- Resolvido!


-- INSERT DATA
INSERT INTO User (id, name, username, email, password) VALUES
    ('105aea522f8c', 'Kelvin Santos', 'kelvin', 'kelvin@email.com', 'secret'),
    ('13de7db5fe12', 'John Doe', 'john_doe', 'john.doe@email.com', 'secret'),
    ('183a48614c84', 'Fala Dele da Silva', 'faladele', 'faladele@email.com', 'secret');

INSERT INTO UserProfile (avatarUrl, bannerUrl, bio, location, status, userId) VALUES
    ('public/assets/avatar/vodcat.png', 'public/assets/banner/vodcat.png', 'Eu tenho o gato mais lindo do mundo', '😸', 'São Paulo, SP', '105aea522f8c');

INSERT INTO Pet (name, species, breed, gender, weekLife, weight, userId) VALUES
    ('Johnny', 'Felino', 'SRD', 'M', 156, 4.3, '105aea522f8c'),
    ('Toni', 'Felino', 'Ashera', 'M', 176, 5.4, '13de7db5fe12'),
    ('Mentiroso', 'Canino', 'Dachshund', 'M', 34, 4.8, '183a48614c84'),
    ('Aurora', 'Canino', 'Chihuahua', 'F', 88, 6.2, '13de7db5fe12'),
    ('Bela', 'Canino', 'Pitbull', 'F', 102, 9.2, '105aea522f8c'),
    ('Chocolate', 'Canino', 'Pitbull', 'M', 102, 11.7, '105aea522f8c');

TRUNCATE Pet;
TRUNCATE User;

-- SELECTS
SELECT * FROM Pet;
SELECT * FROM User;

SELECT * FROM User WHERE email = 'kelvin@email.com' AND password = 'secret';


SELECT u.name,
p.id as IdPet,
p.name NomePet
FROM User as u JOIN Pet as p
		ON p.userId = u.id
			WHERE u.id = '105aea522f8c';


