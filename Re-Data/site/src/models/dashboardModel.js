var database = require("../database/config")

function buscarMaquinasAtivas(idProjeto) {
    console.log("ACESSEI O DASHBOARD MODEL para buscar quantidade de máquinas ativas, function buscarMaquinasAtivas()", idProjeto);

    var instrucao = `
    select count(idMaquina) as qtdMaquinas from Maquina where fkProjeto = '${idProjeto}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarTempoOpTotal(idProjeto) {
    console.log("ACESSEI O DASHBOARD MODEL para buscar o tempo de operação total, function buscarTempoOpTotal()", idProjeto);

    var instrucao = `
    select sum(tempoAtividade) as tempoOpTotal from Maquina where fkProjeto = '${idProjeto}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarMaquinasAtivas,
    buscarTempoOpTotal
}