var database = require("../database/config")

function kpiMaquinaLeituras(idMaquina) {
    console.log("Chegou no model para buscar os dados da KPI alertas de CPU", idMaquina);

    var instrucao = `
            SELECT idMaquina, r.nomeRegistro, ROUND(MAX(valorRegistro), 0) as maiorRegistro, MAX(r.tempoCapturas) as tempoCapturas, tipoHardware
                FROM Registro as r
                    JOIN InfoHardware as i ON r.fkHardware = i.idHardware
                        JOIN Maquina as m ON fkMaquina = m.idMaquina
                            WHERE r.nomeRegistro = 'leituras' 
                                AND r.valorRegistro >= 5 AND fkProjeto = 400 AND r.tempoCapturas >= NOW() - INTERVAL 5 MINUTE AND m.idMaquina = 500
                                    GROUP BY r.nomeRegistro, idMaquina, i.tipoHardware
                                        ORDER BY maiorRegistro DESC
                                            LIMIT 1;
        `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpiMaquinaCpu(idMaquina) {
    console.log("Chegou no model para buscar os dados da KPI alertas de CPU", idMaquina);

    var instrucao = `
        SELECT idMaquina, nomeRegistro, MAX(ROUND(valorRegistro, 0)) as maiorRegistroCpu
        FROM Registro
        JOIN InfoHardware ON fkHardware = idHardware
        JOIN Maquina ON fkMaquina = 500
        WHERE tipoHardware = 'Cpu' AND valorRegistro >= 5 AND fkProjeto = 400 AND tempoCapturas >= NOW() - INTERVAL 5 minute
        GROUP BY idMaquina, nomeRegistro
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpiMaquinaRam(idMaquina) {
    console.log("Chegou no model para buscar os dados da KPI alertas de CPU", idMaquina);

    var instrucao = `
        SELECT idMaquina, nomeRegistro, MAX(ROUND(valorRegistro, 0)) as maiorRegistroRam
        FROM Registro
        JOIN InfoHardware ON fkHardware = idHardware
        JOIN Maquina ON fkMaquina = ${idMaquina} 
        WHERE tipoHardware = 'Ram' AND valorRegistro >= 5 AND fkProjeto = 400 AND tempoCapturas >= NOW() - INTERVAL 5 minute
        GROUP BY idMaquina, nomeRegistro
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    kpiMaquinaLeituras,
    kpiMaquinaCpu,
    kpiMaquinaRam
}