var database = require("../database/config");

function buscarDados(idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal) {
    console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal);

    var instrucao = `
        SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, valorTotal as memoriaTotal
        FROM registro 
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = 500
        JOIN projeto ON fkProjeto = idProjeto
        WHERE idProjeto = 400
        GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, memoriaTotal;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosVolume(idMaquina, tipoHardware, valorTotal, nomeRegistro, valorRegistro, fkMaquina, tempoCapturas) {
    console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, tipoHardware, valorTotal, nomeRegistro, valorRegistro, fkMaquina, tempoCapturas);

    var instrucao = `
    select i.tipoHardware, i.valorTotal as memoriaTotal, r.nomeRegistro, r.valorRegistro, i.fkMaquina, m.idMaquina, (i.valorTotal - r.valorRegistro) as memoriaUtilizada, tempoCapturas
        from maquina as m
            join infoHardware as i on m.idMaquina = i.fkMaquina
                join registro as r
                    on r.fkHardware = i.idHardware
                        where i.tipoHardware = 'Disco' and i.fkMaquina = 500;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosHardware(fkMaquina) {
    console.log("Chegou no model para buscar os dados da Dashboard", fkMaquina);

    var instrucao = `
        select tipoHardware, nomeHardware, valorTotal, unidadeCaptacao, fkMaquina
            from infoHardware
                where fkMaquina = 500 limit 4;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosAlerta(idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal) {
    console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal);

    var instrucao = `
        SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro as usoCpu, valorTotal as memoriaTotal
        FROM registro 
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = 500
        JOIN projeto ON fkProjeto = idProjeto
        WHERE idProjeto = 400 AND nomeRegistro = 'usoCpu'
        GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, memoriaTotal;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosAlertaRam(idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal) {
    console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal);

    var instrucao = `
        SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro as usoRam, valorTotal as memoriaTotal
        FROM registro 
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = 500
        JOIN projeto ON fkProjeto = idProjeto
        WHERE idProjeto = 400 AND nomeRegistro = 'usoRam'
        GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, memoriaTotal;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarDados,
    buscarDadosVolume,
    buscarDadosHardware,
    buscarDadosAlerta,
    buscarDadosAlertaRam
}