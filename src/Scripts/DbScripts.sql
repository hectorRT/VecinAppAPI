CREATE DATABASE VecinAppDb;
USE VecinAppDb;

CREATE TABLE IF NOT EXISTS Vecindario(
    IdVecindario INT PRIMARY KEY AUTO_INCREMENT,
    Fondo INT,
    Nombre VARCHAR(50),
    ciudad VARCHAR(50),
    sector VARCHAR(50),
    direccionLocal varchar(50),
    provincia VARCHAR(50),
    montoAporteMensual INT,
    FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Cuota(
    IdCuota INT PRIMARY KEY AUTO_INCREMENT,
    idVecindario INT,
    Fecha DATETIME (6),
    numeroCuota INT,
    monto VARCHAR(50),
    balance VARCHAR(50),
    fechaUltimoPago DATETIME (6),
    saldada VARCHAR(50),
    FOREIGN KEY (idVecindario) REFERENCES Vecindario (IdVecindario)
);

CREATE TABLE IF NOT EXISTS EstadosDiscusiones(
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
    DateModification datetime default now()
);

CREATE TABLE IF NOT EXISTS Eventos(

    IdEvento INT PRIMARY KEY AUTO_INCREMENT,
    IdVecindario INT NOT NULL,
    Nombre VARCHAR(100),
    Descripcion VARCHAR(200),
    Lugar VARCHAR(100),
    HoraInicio DATETIME,
    HoraFin DATETIME,
    FechaCreacion DATETIME
);

CREATE TABLE IF NOT EXISTS tipoAportes(
    IdTipoAporte INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50)
    );

CREATE TABLE IF NOT EXISTS Vecinos(
    IdVecino INT PRIMARY KEY AUTO_INCREMENT,
    IdVecindario INT,
    IdCargo INT,   
    Idfrecuencia Int,
    Nombres VARCHAR(50),
    Apellidos VARCHAR(75),
    Cedula VARCHAR(15),
    Direccion VARCHAR(50),
    Email VARCHAR(75),
    Clave varchar(25)
);


CREATE TABLE IF NOT EXISTS Aportes(
    IdAporte INT PRIMARY KEY AUTO_INCREMENT,
    IdVecino INT not null,
    IdTipoAporte INT DEFAULT 0,
    FechaCreacion DATETIME NOT NULL,
    Nombre VARCHAR(500),
    Nota VARCHAR(500),
    ModifyBy INT default 0,
    DateModification datetime default now(),
    FOREIGN KEY (IdVecino) REFERENCES Vecinos(IdVecino)
    );
		
CREATE TABLE IF NOT EXISTS Solicitudes(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Fecha VARCHAR(10),
    Tema VARCHAR(25),
    Descripcion VARCHAR(100)
);


CREATE TABLE IF NOT EXISTS Cargos (

    IdCargo INT PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(25)
);

insert into cargos(nombre) values('Presidente');
insert into cargos(nombre) values('Secretario');
insert into cargos(nombre) values('Tesorero');
insert into cargos(nombre) values('Integrante');

CREATE TABLE IF NOT EXISTS FrecuenciaPagoCuotas(
    IdFrecuencia INT PRIMARY KEY AUTO_INCREMENT,
    frecuencia varchar(25)
);

insert into FrecuenciaPagoCuotas(frecuencia) values('Mensual');
insert into FrecuenciaPagoCuotas(frecuencia) values('Quincenal');
insert into FrecuenciaPagoCuotas(frecuencia) values('Semanal');

CREATE TABLE IF NOT EXISTS PagoCuota(
    IdPago INT PRIMARY KEY AUTO_INCREMENT,
    idVecino INT,
    idCuota INT,
    monto VARCHAR(50),
    Fecha DATETIME,
    nota VARCHAR (50),
    FOREIGN KEY (idVecino) REFERENCES Vecinos (idVecino),
		FOREIGN KEY (idCuota) REFERENCES Cuota (IdCuota) 
);

CREATE TABLE IF NOT EXISTS SUPLIDORES(
    IdSuplidor INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Telefono VARCHAR(20),
    Direccion VARCHAR(250),
    Representante VARCHAR(100),
    TelRepresentante VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Gastos(
IdGasto INT PRIMARY KEY AUTO_INCREMENT,
IdVecino INT,
IdSuplidor INT,
Descripcion VARCHAR(100),
Monto INT,
Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

