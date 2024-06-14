var database = require("../database/config")

function kpiMaquinaLeituras(idMaquina, idProjeto) {
    console.log("Chegou no model para buscar os dados da KPI alertas de CPU", idMaquina);

    var instrucao = `
    SELECT 
    idMaquina, 
    nomeRegistro, 
    ROUND(MAX(valorRegistro), 0) AS maiorRegistro, 
    MAX(tempoCapturas) AS tempoCapturas, 
    tipoHardware
FROM 
    Registro 
INNER JOIN 
    InfoHardware ON fkHardware = idHardware
INNER JOIN 
    Maquina m ON fkMaquina = idMaquina
WHERE 
    nomeRegistro = 'leituras' 
    AND valorRegistro >= 5 
    AND tempoCapturas >= DATEADD(mi, -5, GETDATE()) 
    AND idMaquina = ${idMaquina}
GROUP BY 
    nomeRegistro, 
    idMaquina, 
    tipoHardware
ORDER BY 
    maiorRegistro DESC
OFFSET 0 ROWS
FETCH FIRST 1 ROW ONLY;
        `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpiMaquinaCpu(idMaquina) {
    console.log("Chegou no model para buscar os dados da KPI alertas de CPU", idMaquina);

    var instrucao = `
        SELECT 
    m.idMaquina, 
    r.nomeRegistro, 
    MAX(ROUND(r.valorRegistro, 0)) AS maiorRegistroCpu
FROM 
    Registro r
INNER JOIN 
    InfoHardware i ON r.fkHardware = i.idHardware
INNER JOIN 
    Maquina m ON fkMaquina = m.idMaquina
WHERE 
    i.tipoHardware = 'Cpu' 
    AND r.valorRegistro >= 5 
    AND idMaquina = ${idMaquina} 
    AND r.tempoCapturas >= DATEADD(mi, -5, GETDATE())
GROUP BY 
    m.idMaquina, 
    r.nomeRegistro
ORDER BY 
    maiorRegistroCpu DESC
OFFSET 0 ROWS
FETCH FIRST 1 ROW ONLY;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpiMaquinaRam(idMaquina) {
    console.log("Chegou no model para buscar os dados da KPI alertas de CPU", idMaquina);

    var instrucao = `
SELECT 
    m.idMaquina, 
    r.nomeRegistro, 
    MAX(ROUND(r.valorRegistro, 0)) AS maiorRegistroRam
FROM 
    Registro r
INNER JOIN 
    InfoHardware i ON r.fkHardware = i.idHardware
INNER JOIN 
    Maquina m ON fkMaquina = m.idMaquina
WHERE 
    i.tipoHardware = 'Ram' 
    AND r.valorRegistro >= 5 
    AND idMaquina = 500
GROUP BY 
    m.idMaquina, 
    r.nomeRegistro
ORDER BY 
    maiorRegistroRam DESC
OFFSET 0 ROWS
FETCH FIRST 1 ROW ONLY;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    kpiMaquinaLeituras,
    kpiMaquinaCpu,
    kpiMaquinaRam
}