var database = require("../database/config")

function cadastrarProjeto(nomeDemandaCreate, dataInicioCreate, responsavelCreate, dataTerminoCreate) {
    
    const idEmpresa = idEmpresa; 

    const verificarEmpresa = `SELECT idEmpresa FROM Empresa WHERE idEmpresa = ${idEmpresa};`;

    return database.executar(verificarEmpresa)
        .then(result => {
            if (result.length === 0) {
                throw new Error("Empresa não encontrada.");
            }

            const instrucaoCadastroProjeto = `
                INSERT INTO Projeto (nomeDemanda, dataInicio, responsavel, dataTermino, fkEmpresa) 
                VALUES ('${nomeDemandaCreate}', '${dataInicioCreate}', '${responsavelCreate}', '${dataTerminoCreate}', ${idEmpresa});
            `;
            return database.executar(instrucaoCadastroProjeto);
        })
        .then(result => {
            console.log("Projeto cadastrado com sucesso:", result);
            return result;
        })
        .catch(err => {
            console.error("Erro ao cadastrar projeto:", err);
            throw err;
        });
}

module.exports = {
    cadastrarProjeto
};

// function cadastrarProjeto(nomeDemandaCreate, dataInicioCreate, responsavelCreate, dataTerminoCreate) {
//     var verificarProjeto = `
//     SELECT nomeDemanda FROM Projeto WHERE nomeDemanda = '${nomeDemandaCreate}';
//   `;
  
//     console.log("Executando a instrução SQL para verificar nomeDemanda: \n" + verificarProjeto);
  
//     return database.executar(verificarProjeto)
//         .then(result => {
//             if (result.length > 0) {
//                 //Se Projeto existe, capturar o último idEmpresa.
//                 var pegarUltimoIdEmpresa = `
//         SELECT idEmpresa FROM Empresa ORDER BY idEmpresa DESC LIMIT 1;
//     `;
//                 console.log("Executando a instrução SQL para obter o último idEmpresa: \n" + pegarUltimoIdEmpresa);
  
//                 return database.executar(pegarUltimoIdEmpresa);
//             } else {
//                 throw new Error("Projeto não encontrado na tabela de Empresa.");
//             }
//         })
//         .then(result => {
//             if (result.length > 0) {
//                 var idEmpresa = result[0].idEmpresa;
//                 console.log("Último idEmpresa obtido: " + idEmpresa)
  
//                 var instrucaoCadastroProjeto = `
//         INSERT INTO Projeto (nomeDemanda, dataInicio, responsavel, dataTermino) VALUES ('${nomeDemandaCreate}', '${dataInicioCreate}', '${responsavelCreate}', ${dataTerminoCreate});
//     `;
//                 console.log("Executando a instrução SQL: \n" + instrucaoCadastroProjeto);
//                 return database.executar(instrucaoCadastroProjeto);
//             } else {
//                 throw new Error("Nenhuma projeto encontrado na tabela Empresa.");
//             }
//         })
//         .then(result => {
//             console.log("Resultado da inserção em empresa:", result);
//         })
//         .catch(err => {
//             console.error("Erro ao cadastrar dados: ", err);
//         });
//   }

function buscarProjetosPorEmpresa(idEmpresa, idProjeto, nomeDemanda, dataInicio, responsavel, dataTermino, fkProjeto, idMaquina) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarProjetosPorEmpresa(): ", idEmpresa, idProjeto, nomeDemanda, dataInicio, responsavel, dataTermino, fkProjeto, idMaquina)

    var instrucao = `
    SELECT 
    p.idProjeto as id, 
    p.nomeDemanda, 
    DATE_FORMAT(p.dataInicio, '%d/%m/%Y - %H:%i') as dataInicio, 
    p.responsavel, 
    DATE_FORMAT(p.dataTermino, '%d/%m/%Y - %H:%i') as dataTermino, 
    COUNT(m.idMaquina) as qtsMaquinas
  FROM projeto p
  LEFT JOIN maquina m ON p.idProjeto = m.fkProjeto
  GROUP BY 
    p.idProjeto, 
    p.nomeDemanda, 
    p.dataInicio, 
    p.responsavel, 
    p.dataTermino; 
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function criarProjeto(nomeDemanda, dataInicio, responsavel, dataTermino) {
//   console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function criarProjeto():", nomeDemanda, dataInicio, responsavel, dataTermino);

//   var instrucaoProjeto = `
//       INSERT INTO Projeto (nomeDemanda, dataInicio, responsavel, dataTermino) VALUES ('${nomeDemanda}', ${dataInicio}, ${responsavel}, ${dataTermino})
//   `

//   console.log("Executando a instrução SQL: \n" + instrucaoProjeto);

// }

// function listarProjetosPorEmpresa(idProjeto, nomeDemanda, dataInicio, responsavel, dataTermino) {

//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarProjetosPorEmpresa(): ", idProjeto, nomeDemanda, dataInicio, responsavel, dataTermino)
//     var instrucao = `
//         SELECT  p.idProjeto as id, p.nomeDemanda, p.dataInicio, p.responsavel, p.dataTermino, COUNT(m.idMaquina) as qtsMaquinas    
//             FROM projeto p
//                 LEFT JOIN maquina m ON p.idProjeto = m.fkProjeto
//                     WHERE p.fkEmpresa = 50
//                         GROUP BY p.idProjeto, p.nomeDemanda, p.dataInicio, p.responsavel, p.dataTermino
//                             LIMIT 0, 1000;
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// function qtdMaquinasPorProjeto(idMaquina) {

//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function qtdMaquinasPorProjeto(): ", idMaquina)
//     var instrucao = `
//         SELECT count(idMaquina) as qtsMaquinas FROM maquina WHERE fkProjeto = '${idProjeto}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

module.exports = {
    cadastrarProjeto,
    buscarProjetosPorEmpresa
    // criarProjeto
    // listarProjetosPorEmpresa,
    // qtdMaquinasPorProjeto
};