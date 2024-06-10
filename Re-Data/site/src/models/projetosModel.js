var database = require("../database/config");

function cadastrarProjeto(nomeDemanda, dataInicio, responsavel, descricao, dataTermino, idEmpresa) {

    var instrucao = `
       INSERT INTO Projeto (nomeDemanda, dataInicio, dataTermino, descricao, responsavel, fkEmpresa) 
                VALUES ('${nomeDemanda}', '${dataInicio}', '${dataTermino}', '${descricao}', '${responsavel}','${idEmpresa}');    
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

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

function editarProjeto(nomeDemanda, dataInicio, responsavel, descricao, dataTermino, idProjeto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarProjeto(): ", nomeDemanda, dataInicio, responsavel, descricao, dataTermino, idProjeto);
    var instrucaoSql = `
        UPDATE projeto SET nomeDemanda = '${nomeDemanda}', dataInicio = '${dataInicio}', dataTermino = '${dataTermino}', descricao = '${descricao}', responsavel = '${responsavel}' WHERE idProjeto = ${idProjeto};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function entrarDashProjeto(idProjeto) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrarDashProjeto(): ", idProjeto)

    var instrucao = `
        select idProjeto from Projeto;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarProjeto,
    buscarProjetosPorEmpresa,
    editarProjeto,
    entrarDashProjeto
};