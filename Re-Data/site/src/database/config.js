const sql = require('mssql');
const mysql = require("mysql2"); // Ensure this is required correctly

// CONEXÃO DO SQL SERVER - AZURE (NUVEM)
const sqlServerConfig = {
    server: "44.194.59.3",
    database: "redata",
    user: "sa",
    password: "redata",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true // Add this line
    }
}

// CONEXÃO DO MYSQL WORKBENCH
const mySqlConfig = {
    host: "localhost",
    database: "redata",
    user: "root",
    password: "ADS70#sptech",
};

function executar(instrucao) {
    // VERIFICA A VARIÁVEL DE AMBIENTE SETADA EM app.js
    if (process.env.AMBIENTE_PROCESSO === "producao") {
        return new Promise((resolve, reject) => {
            sql.connect(sqlServerConfig).then(() => {
                return sql.query(instrucao);
            }).then(resultados => {
                console.log(resultados);
                resolve(resultados.recordset);
            }).catch(erro => {
                reject(erro);
                console.log('ERRO: ', erro);
            });
            sql.on('error', erro => {
                console.log("ERRO NO SQL SERVER (Azure): ", erro);
            });
        });
    } else if (process.env.AMBIENTE_PROCESSO === "desenvolvimento") {
        return new Promise((resolve, reject) => {
            const conexao = mysql.createConnection(mySqlConfig);
            conexao.connect();
            conexao.query(instrucao, (erro, resultados) => {
                conexao.end();
                if (erro) {
                    reject(erro);
                } else {
                    console.log(resultados);
                    resolve(resultados);
                }
            });
            conexao.on('error', erro => {
                console.log("ERRO NO MySQL WORKBENCH: ", erro.sqlMessage);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js");
        });
    }
}

module.exports = {
    executar
}