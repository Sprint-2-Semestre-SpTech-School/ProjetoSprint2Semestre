-- Drop the database if it exists
IF DB_ID('redata') IS NOT NULL
BEGIN
    DROP DATABASE redata;
END;
GO

-- Create the database
CREATE TABLE Empresa (
    idEmpresa INT IDENTITY(1,1) PRIMARY KEY,
    nomeEmpresa VARCHAR(45) NOT NULL,
    CNPJ CHAR(14) NOT NULL UNIQUE
);
GO

-- Create the Conta table
CREATE TABLE Conta (
    idConta INT IDENTITY(100,1) PRIMARY KEY,
    login VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,
    siglaConta CHAR(3) NOT NULL,
    dataCriacao DATETIME NOT NULL,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fk_Conta_Empresa1 FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);
GO

-- Create the LocalizacaoEmpresa table
CREATE TABLE LocalizacaoEmpresa (
    idLocalizacaoEmpresa INT IDENTITY(200,1) PRIMARY KEY,
    CEP CHAR(8) NOT NULL UNIQUE,
    estado VARCHAR(45) NULL,
    logradouro VARCHAR(150) NULL,
    numero VARCHAR(4) NULL,
    bairro VARCHAR(50) NULL,
    complemento VARCHAR(20) NULL,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fk_LocalizacaoEmpresa_Empresa1 FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);
GO

-- Create the Contato table
CREATE TABLE Contato (
    idContato INT IDENTITY(300,1) PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    telefone VARCHAR(11) NOT NULL UNIQUE,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fk_Contato_Empresa1 FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);
GO

-- Create the Projeto table
CREATE TABLE Projeto (
    idProjeto INT IDENTITY(400,1) PRIMARY KEY,
    nomeDemanda VARCHAR(45) NULL,
    dataInicio CHAR(10) NULL,
    dataTermino CHAR(10) NULL,
    descricao VARCHAR(250) NULL,
    responsavel VARCHAR(45) NULL,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fk_Projeto_Empresa1 FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa),
    CONSTRAINT UQ_Projeto UNIQUE (idProjeto, fkEmpresa)
);
GO

-- Create the Maquina table
CREATE TABLE Maquina (
    idMaquina INT IDENTITY(500,1) PRIMARY KEY,
    usuario VARCHAR(45) NULL,
    sistemaOperacional VARCHAR(45) NULL,
    temperatura FLOAT NULL,
    tempoAtividade INT NULL,
    destino VARCHAR(45) NULL,
    descricao VARCHAR(200) NULL,
    fkProjeto INT NOT NULL,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fk_Maquina_Projeto1 FOREIGN KEY (fkProjeto, fkEmpresa) REFERENCES Projeto (idProjeto, fkEmpresa)
);
GO

-- Create the DispositivoUsb table
CREATE TABLE DispositivoUsb (
    idDispositivo INT IDENTITY(600,1) PRIMARY KEY,
    idDevice CHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(45) NULL
);
GO

-- Create the BlockList table
CREATE TABLE BlockList (
    idBlockList INT IDENTITY(700,1) PRIMARY KEY,
    statusBloqueio TINYINT NULL,
    motivoBloqueio VARCHAR(250) NULL,
    fkDeviceId INT NOT NULL,
    fkMaquina INT NOT NULL,
    CONSTRAINT fk_BlockList_DispositivoUsb1 FOREIGN KEY (fkDeviceId) REFERENCES DispositivoUsb (idDispositivo),
    CONSTRAINT fk_BlockList_Maquina1 FOREIGN KEY (fkMaquina) REFERENCES Maquina (idMaquina)
);
GO

-- Create the InfoHardware table
CREATE TABLE InfoHardware (
    idHardware INT IDENTITY(1000,1) PRIMARY KEY,
    tipoHardware VARCHAR(45) NULL,
    nomeHardware VARCHAR(150) NULL,
    unidadeCaptacao VARCHAR(45) NULL,
    valorTotal DECIMAL(10,2) NULL,
    fkMaquina INT NOT NULL,
    CONSTRAINT fk_InfoHardware_Maquina1 FOREIGN KEY (fkMaquina) REFERENCES Maquina (idMaquina)
);
GO

-- Create the Registro table
CREATE TABLE Registro (
    idRegistro INT IDENTITY(10000,1) PRIMARY KEY,
    nomeRegistro VARCHAR(250),
    valorRegistro DECIMAL(20,4) NULL,
    tempoCapturas DATETIME NULL,
    fkHardware INT NOT NULL,
    CONSTRAINT fk_Registro_InfoHardware1 FOREIGN KEY (fkHardware) REFERENCES InfoHardware (idHardware)
);
GO