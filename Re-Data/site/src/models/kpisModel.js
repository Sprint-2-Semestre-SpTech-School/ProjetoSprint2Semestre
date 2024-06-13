var database = require("../database/config");

function getDadosKpiCpuAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da KPI alertas de CPU", idProjeto);

    var instrucao = `
    SELECT idMaquina, MAX(nomeRegistro) as nomeRegistro, COUNT(idRegistro) as totalCapturas
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina 
    WHERE tipoHardware = 'Cpu' AND valorRegistro >= 5 AND fkProjeto = ${idProjeto}
    GROUP BY idMaquina
    ORDER BY totalCapturas DESC
    OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiRamAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da KPI alertas da Ram", idProjeto);

    var instrucao = `
    SELECT idMaquina, MAX(nomeRegistro) as nomeRegistro, COUNT(idRegistro) as totalCapturas
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina 
    WHERE tipoHardware = 'Ram' AND valorRegistro >= 5 AND fkProjeto = ${idProjeto}
    GROUP BY idMaquina
    ORDER BY totalCapturas DESC
    OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiDiscoAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da KPI alertas de Disco", idProjeto);

    var instrucao = `
    SELECT idMaquina, MAX(nomeRegistro) as nomeRegistro, COUNT(idRegistro) as totalCapturas
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina 
    WHERE tipoHardware = 'Disco' AND valorRegistro <= 2.00 AND nomeRegistro = 'bytesEscrita' AND fkProjeto = ${idProjeto}
    GROUP BY idMaquina
    ORDER BY totalCapturas DESC
    OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiRedeAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi alertas de Rede", idProjeto);

    var instrucao = `
    SELECT idMaquina, MAX(nomeRegistro) as nomeRegistro, COUNT(idRegistro) as totalCapturas
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina 
    WHERE tipoHardware = 'Rede' AND nomeRegistro = 'Pacotes Recebidos' AND fkProjeto = ${idProjeto}
    GROUP BY idMaquina
    ORDER BY totalCapturas DESC
    OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosCpu20Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", idProjeto);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -20, GETDATE())
    AND valorRegistro >= 5
    AND tipoHardware = 'Cpu'
    AND nomeRegistro = 'usoCpu'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosCpu40Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", idProjeto);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -40, GETDATE())
    AND valorRegistro >= 5
    AND tipoHardware = 'Cpu'
    AND nomeRegistro = 'usoCpu'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosCpu60Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", idProjeto);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -60, GETDATE())
    AND valorRegistro >= 5
    AND tipoHardware = 'Cpu'
    AND nomeRegistro = 'usoCpu'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRam20Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Ram", idProjeto);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -20, GETDATE())
    AND valorRegistro >= 70
    AND tipoHardware = 'Ram'
    AND nomeRegistro = 'usoRam'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRam40Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Ram", idProjeto);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -40, GETDATE())
    AND valorRegistro >= 70
    AND tipoHardware = 'Ram'
    AND nomeRegistro = 'usoRam'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRam60Seg(idProjeto) {
    console.log("Chegou no model para buscar os dados da Kpi eventos da Ram", idProjeto);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -60, GETDATE())
    AND valorRegistro >= 70
    AND tipoHardware = 'Ram'
    AND nomeRegistro = 'usoRam'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosDisco20Seg(idProjeto) {
    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -20, GETDATE())
    AND valorRegistro <= 2
    AND tipoHardware = 'Disco'
    AND nomeRegistro = 'bytesEscrita'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosDisco40Seg(idProjeto) {
    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -40, GETDATE())
    AND valorRegistro <= 2
    AND tipoHardware = 'Disco'
    AND nomeRegistro = 'bytesEscrita'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosDisco60Seg(idProjeto) {
    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -60, GETDATE())
    AND valorRegistro <= 2
    AND tipoHardware = 'Disco'
    AND nomeRegistro = 'bytesEscrita'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRede20Seg(idProjeto) {
    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -20, GETDATE())
    AND valorRegistro <= 7
    AND tipoHardware = 'Rede'
    AND nomeRegistro = 'Pacotes Recebidos'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRede40Seg(idProjeto) {
    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -40, GETDATE())
    AND valorRegistro <= 7
    AND tipoHardware = 'Rede'
    AND nomeRegistro = 'Pacotes Recebidos'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRede60Seg(idProjeto) {
    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos, MAX(valorRegistro) as maior_valor
    FROM Registro
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE tempoCapturas >= DATEADD(SECOND, -60, GETDATE())
    AND valorRegistro <= 7
    AND tipoHardware = 'Rede'
    AND nomeRegistro = 'Pacotes Recebidos'
    AND fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiTotalCapturasProjeto(idProjeto) {
    var instrucao = `
    SELECT COUNT(idRegistro) AS capturas_projeto 
    FROM Registro 
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON idMaquina = fkMaquina 
    WHERE fkProjeto = ${idProjeto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosProjeto(idProjeto) {
    var instrucao = `
    SELECT nomeDemanda, descricao 
    FROM Projeto 
    WHERE idProjeto = ${idProjeto};
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
};
