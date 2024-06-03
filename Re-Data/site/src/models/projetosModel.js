var database = require("../database/config")

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
    buscarProjetosPorEmpresa,
    // listarProjetosPorEmpresa,
    // qtdMaquinasPorProjeto
};