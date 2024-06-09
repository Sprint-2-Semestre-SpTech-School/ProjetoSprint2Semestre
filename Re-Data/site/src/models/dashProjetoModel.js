var database = require("../database/config")

function getDadosDash(idProjeto) {
    console.log("Chegou no model para buscar os dados da Dashboard", idProjeto);

    var instrucao = `
    SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, AVG(valorRegistro) AS mediaDados
FROM registro 
JOIN infoHardware ON fkHardware = idHardware
JOIN maquina ON fkMaquina = ${idMaquina}
JOIN projeto ON fkProjeto = idProjeto
WHERE idProjeto = ${idProjeto} 
GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarMaquina(destino, descricao) {
    console.log("Chegou no model para buscar os dados da Dashboard", destino, descricao);

    var instrucao = `
        insert into maquina (destino, descricao, fkProjeto, fkEmpresa) VALUES ('${destino}', '${descricao}', 400, 1);
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscaridMaquina(idProjeto) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscaridMaquina(): ", idMaquina)

    var instrucao = `
        select idMaquina from maquina where fkProjeto = ${idProjeto};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarMaquinasPorProjeto(idProjeto) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarProjetosPorEmpresa(): ", idProjeto)

    var   instrucao = `
        select * from maquina where fkProjeto = ${idProjeto};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrarDashMaquina(idMaquina) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrarDashMaquina(): ", idMaquina)

    var instrucao = `
        select idMaquina from maquina;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarMaquina(novoDestino, novaDescricao, idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarMaquina(): ", novoDestino, novaDescricao);
    var instrucaoSql = `
        UPDATE maquina SET destino = ${novoDestino}, descricao = ${novaDescricao} WHERE idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getDadosDash,
    adicionarMaquina,
    buscaridMaquina,
    buscarMaquinasPorProjeto,
    entrarDashMaquina,
    editarMaquina
}