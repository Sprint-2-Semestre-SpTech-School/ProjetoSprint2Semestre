var database = require("../database/config")

function getDadosDash(idProjeto) {
    console.log("Chegou no model para buscar os dados da Dashboard", idProjeto);

    var instrucao = `
    select idRegistro, nomeRegistro, valorRegistro, tempoCapturas, idProjeto from registro 
		join infoHardware on fkHardware = idHardware
        join maquina on fkMaquina = idMaquina
        join projeto on fkProjeto = idProjeto
        where idProjeto = ${idProjeto};;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    getDadosDash
}