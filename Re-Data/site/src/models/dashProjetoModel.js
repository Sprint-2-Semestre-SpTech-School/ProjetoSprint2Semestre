var database = require("../database/config")

function getDadosDash(idProjeto) {
    console.log("Chegou no model para buscar os dados da Dashboard", 400);

    var instrucao = `
    SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, AVG(valorRegistro) AS mediaDados
FROM registro 
JOIN infoHardware ON fkHardware = idHardware
JOIN maquina ON fkMaquina = idMaquina
JOIN projeto ON fkProjeto = idProjeto
WHERE idProjeto = ${idProjeto} 
GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    getDadosDash
}