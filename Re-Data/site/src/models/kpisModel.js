var database = require("../database/config")

function getDadosKpiCpuAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da KPI alertas de CPU", idProjeto);

    var instrucao = `
    SELECT TOP 1 idMaquina, MAX(nomeRegistro) AS nomeRegistro, COUNT(idRegistro) AS totalCapturas
FROM Registro
INNER JOIN InfoHardware ON Registro.fkHardware = InfoHardware.idHardware
INNER JOIN Maquina ON InfoHardware.fkMaquina = Maquina.idMaquina
WHERE InfoHardware.tipoHardware = 'Cpu' AND Registro.valorRegistro >= 5 AND Maquina.fkProjeto = ${idProjeto}
GROUP BY Maquina.idMaquina
ORDER BY totalCapturas DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiRamAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da KPI alertas da Ram", 400);

    var instrucao = `
    SELECT TOP 1 m.idMaquina, MAX(r.nomeRegistro) AS nomeRegistro, COUNT(r.idRegistro) AS totalCapturas
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
WHERE ih.tipoHardware = 'Ram' AND r.valorRegistro >= 5 AND m.fkProjeto = ${idProjeto}
GROUP BY m.idMaquina
ORDER BY totalCapturas DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiDiscoAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da KPI alertas de Disco", 400);

    var instrucao = `
        SELECT TOP 1 m.idMaquina, MAX(r.nomeRegistro) AS nomeRegistro, COUNT(r.idRegistro) AS totalCapturas
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
WHERE ih.tipoHardware = 'Disco' AND r.valorRegistro <= 2.00 AND r.nomeRegistro = 'bytesEscrita' AND m.fkProjeto = ${idProjeto}
GROUP BY m.idMaquina
ORDER BY totalCapturas DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiRedeAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi alertas de Rede", 400);

    var instrucao = `
       SELECT TOP 1 
    m.idMaquina, 
    MAX(r.nomeRegistro) AS nomeRegistro, 
    COUNT(r.idRegistro) AS totalCapturas
FROM 
    Registro r
INNER JOIN 
    InfoHardware i ON r.fkHardware = i.idHardware
INNER JOIN 
    Maquina m ON fkMaquina = m.idMaquina
WHERE 
    i.tipoHardware = 'Rede' 
    AND r.nomeRegistro = 'Pacotes Recebidos' 
    AND fkProjeto = ${idProjeto}
GROUP BY 
    m.idMaquina
ORDER BY 
    totalCapturas DESC;
    `;
    // AND valorRegistro <= 10

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
// =========================================================== FUNÇÕES KPI 2 
// =================================================== CPU ================================================================
function getDadosKpiEventosCriticosCpu20Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -20, GETDATE())
AND r.valorRegistro >= 5
AND ih.tipoHardware = 'Cpu'
AND r.nomeRegistro = 'usoCpu'
AND m.fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosCpu40Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -40, GETDATE())
AND r.valorRegistro >= 5
AND ih.tipoHardware = 'Cpu'
AND r.nomeRegistro = 'usoCpu'
AND m.fkProjeto = ${idProjeto}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosCpu60Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -60, GETDATE())
AND r.valorRegistro >= 5
AND ih.tipoHardware = 'Cpu'
AND r.nomeRegistro = 'usoCpu'
AND m.fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// =================================================== Ram ================================================================
function getDadosKpiEventosCriticosRam20Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -20, GETDATE())
AND r.valorRegistro >= 70
AND ih.tipoHardware = 'Ram'
AND r.nomeRegistro = 'usoRam'
AND m.fkProjeto = ${idProjeto}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRam40Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -40, GETDATE())
AND r.valorRegistro >= 70
AND ih.tipoHardware = 'Ram'
AND r.nomeRegistro = 'usoRam'
AND m.fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRam60Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -40, GETDATE())
AND r.valorRegistro >= 70
AND ih.tipoHardware = 'Ram'
AND r.nomeRegistro = 'usoRam'
AND m.fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// =================================================== Disco ================================================================

function getDadosKpiEventosCriticosDisco20Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -20, GETDATE())
AND r.valorRegistro <= 2
AND ih.tipoHardware = 'Disco'
AND r.nomeRegistro = 'bytesEscrita'
AND m.fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosDisco40Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -40, GETDATE())
AND r.valorRegistro <= 2
AND ih.tipoHardware = 'Disco'
AND r.nomeRegistro = 'bytesEscrita'
AND m.fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosDisco60Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -60, GETDATE())
AND r.valorRegistro <= 2
AND ih.tipoHardware = 'Disco'
AND r.nomeRegistro = 'bytesEscrita'
AND m.fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// =================================================== Rede ================================================================
function getDadosKpiEventosCriticosRede20Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -20, GETDATE())
AND r.valorRegistro <= 7
AND ih.tipoHardware = 'Rede'
AND r.nomeRegistro = 'Pacotes Recebidos'
AND m.fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRede40Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -40, GETDATE())
AND r.valorRegistro <= 7
AND ih.tipoHardware = 'Rede'
AND r.nomeRegistro = 'Pacotes Recebidos'
AND m.fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRede60Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
       MAX(valorRegistro) AS maior_valor
FROM Registro r
INNER JOIN InfoHardware ih ON r.fkHardware = ih.idHardware
INNER JOIN Maquina m ON ih.fkMaquina = m.idMaquina
INNER JOIN Projeto p ON m.fkProjeto = p.idProjeto
WHERE r.tempoCapturas >= DATEADD(SECOND, -60, GETDATE())
AND r.valorRegistro <= 7
AND ih.tipoHardware = 'Rede'
AND r.nomeRegistro = 'Pacotes Recebidos'
AND m.fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiTotalCapturasProjeto(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    select count(idRegistro) as capturas_projeto from registro 
    join Infohardware on fkHardware = idHardware
    join maquina on idMaquina = fkMaquina 
    where fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosProjeto(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    select nomeDemanda, descricao from Projeto where idProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    getDadosKpiCpuAlertas,
    getDadosKpiRamAlertas,
    getDadosKpiDiscoAlertas,
    getDadosKpiRedeAlertas,

    getDadosKpiEventosCriticosCpu20Seg,
    getDadosKpiEventosCriticosCpu40Seg,
    getDadosKpiEventosCriticosCpu60Seg,

    getDadosKpiEventosCriticosRam20Seg,
    getDadosKpiEventosCriticosRam40Seg,
    getDadosKpiEventosCriticosRam60Seg,

    getDadosKpiEventosCriticosDisco20Seg,
    getDadosKpiEventosCriticosDisco40Seg,
    getDadosKpiEventosCriticosDisco60Seg,

    getDadosKpiEventosCriticosRede20Seg,
    getDadosKpiEventosCriticosRede40Seg,
    getDadosKpiEventosCriticosRede60Seg,

    getDadosKpiTotalCapturasProjeto,
    getDadosProjeto
}