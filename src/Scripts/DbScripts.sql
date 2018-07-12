CREATE DATABASE VecinAppDb;

USE VecinAppDb;

CREATE TABLE IF NOT EXISTS Estados(
    IdEstado INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR (100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Discusiones(
    IdDiscusion INT PRIMARY KEY AUTO_INCREMENT,
    IdVecino INT DEFAULT 0,
    Titulo VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(500) NOT NULL,
    Conclusion VARCHAR(500) DEFAULT '',
    Estado TINYINT(1) NOT NULL,
    FechaCreacion DATETIME DEFAULT NOW(),
    ModifyBy INT default 0,
    DateModification datetime default now()
);

CREATE TABLE IF NOT EXISTS DiscusionComentarios(
    IdComentario INT PRIMARY KEY AUTO_INCREMENT,
    IdDiscusion INT NOT NULL,
    IdVecino INT DEFAULT 0,
    Fecha DATETIME NOT NULL,
    Comentario VARCHAR(500),
    ModifyBy INT default 0,
    DateModification datetime default now(),
    FOREIGN KEY (IdDiscusion) REFERENCES Discusiones(IdDiscusion)
);

CREATE TABLE IF NOT EXISTS Vecinos(
    IdVecino INT PRIMARY KEY AUTO_INCREMENT,
    Nombres VARCHAR(50),
    Apellidos VARCHAR(75),
    Cedula VARCHAR(15),
    Email VARCHAR(75),
    Direccion VARCHAR(100),
    IdVecindario INT NOT NULL,
    IdCargo INT NOT Null   
);
CREATE TABLE IF NOT EXISTS Solicitudes(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Fecha VARCHAR(10),
    Tema VARCHAR(25),
    Descripcion VARCHAR(25)
);