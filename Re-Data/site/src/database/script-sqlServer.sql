CREATE DATABASE redata;
GO

USE redata;
GO

CREATE TABLE Empresa (
    idEmpresa INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    nomeEmpresa VARCHAR(45) NOT NULL,
    CNPJ CHAR(14) NOT NULL UNIQUE
);

INSERT INTO Empresa (nomeEmpresa, CNPJ) VALUES 
('ReData.INC', '53719031000123');
GO

CREATE TABLE localizacaoEmpresa (
    idLocalizacaoEmpresa INT IDENTITY(200,1) NOT NULL PRIMARY KEY,
    CEP CHAR(8) NOT NULL UNIQUE,
    estado VARCHAR(45) NULL,
    logradouro VARCHAR(150) NULL,
    numero VARCHAR(4) NULL,
    bairro VARCHAR(50) NULL,
    complemento VARCHAR(20) NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

INSERT INTO localizacaoEmpresa (CEP, estado, logradouro, numero, bairro, complemento, fkEmpresa) 
VALUES ('03325764', 'São Paulo', 'Rua Database', '777', 'DataLake', 'Camada de Load', 
        (SELECT MAX(idEmpresa) FROM Empresa));
GO

CREATE TABLE Contato (
    idContato INT IDENTITY(300,1) NOT NULL PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    telefone VARCHAR(11) NOT NULL UNIQUE,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

INSERT INTO Contato (nome, email, telefone, fkEmpresa) 
VALUES ('James Heat Field', 'James@gmail.com', '1197421670', 
        (SELECT MAX(idEmpresa) FROM Empresa));
GO

CREATE TABLE Projeto (
    idProjeto INT IDENTITY(400,1) NOT NULL PRIMARY KEY,
    nomeDemanda VARCHAR(45) NULL,
    dataInicio DATETIME NULL,
    dataTermino DATETIME NULL,
    descricao VARCHAR(250) NULL,
    responsavel VARCHAR(45) NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

INSERT INTO Projeto (nomeDemanda, dataInicio, dataTermino, descricao, responsavel, fkEmpresa) 
VALUES ('Venda de Coca-Cola', GETDATE(), GETDATE(), 'Aumentar vendas de Coca-Cola na Zona Norte', 'Julia', 
        (SELECT MAX(idEmpresa) FROM Empresa));
GO

CREATE TABLE Conta (
    idConta INT IDENTITY(100,1) NOT NULL PRIMARY KEY,
    login VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    siglaConta CHAR(3) NOT NULL,
    dataCriacao DATETIME NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);
GO

INSERT INTO Conta (login, senha, siglaConta, dataCriacao ,fkEmpresa) VALUES ('homolog', 'sptech', 'FCM', current_timestamp, 1);

CREATE TABLE Maquina (
    idMaquina INT IDENTITY(500,1) NOT NULL PRIMARY KEY,
    usuario VARCHAR(45) NOT NULL,
    sistemaOperacional VARCHAR(45) NOT NULL,
    temperatura FLOAT NULL,
    tempoAtividade INT NULL,
	destino VARCHAR(45) NOT NULL,
	descricao VARCHAR(70) NOT NULL,
    fkProjeto INT NOT NULL,
    fkEmpresa INT NOT NULL,
    FOREIGN KEY (fkProjeto) REFERENCES Projeto (idProjeto),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);
GO

CREATE TABLE dispositivoUsb (
    idDispositivo INT IDENTITY(600,1) NOT NULL PRIMARY KEY,
    idDevice CHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(45) NULL
);
GO

CREATE TABLE blackList (
    idBlackList INT IDENTITY(700,1) NOT NULL PRIMARY KEY,
    statusBloqueio BIT NOT NULL,
    motivoBloqueio VARCHAR(250) NULL,
    fkDeviceId INT NOT NULL,
    fkMaquina INT NOT NULL,
    FOREIGN KEY (fkDeviceId) REFERENCES dispositivoUsb (idDispositivo),
    FOREIGN KEY (fkMaquina) REFERENCES Maquina (idMaquina)
);
GO

CREATE TABLE infoHardware (
    idHardware INT IDENTITY(1000,1) NOT NULL PRIMARY KEY,
    tipoHardware VARCHAR(45) NULL,
    nomeHardware VARCHAR(150) NULL,
    unidadeCaptacao VARCHAR(45) NULL,
    valorTotal DECIMAL(10,2) NULL,
    fkMaquina INT NOT NULL,
    FOREIGN KEY (fkMaquina) REFERENCES Maquina (idMaquina)
);
GO

CREATE TABLE registro (
    idRegistro INT IDENTITY(10000,1) NOT NULL PRIMARY KEY,
    nomeRegistro VARCHAR(40) NULL,
    valorRegistro DECIMAL(20,2) NULL,
    tempoCapturas DATETIME NULL,
    fkHardware INT NOT NULL,
    FOREIGN KEY (fkHardware) REFERENCES infoHardware (idHardware)
);
GO