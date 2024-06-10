var database = require("../database/config")

function getDadosKpiCpuAlertas(idProjeto) {
    // console.log("Chegou no model para buscar os dados da KPI alertas de CPU", 400);

    var instrucao = `
    SELECT idMaquina, MAX(nomeRegistro) as nomeRegistro, count(idRegistro) as totalCapturas
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina 
        WHERE tipoHardware = 'Cpu' AND valorRegistro >= 5 AND fkProjeto = ${idProjeto}
        GROUP BY idMaquina
        ORDER BY totalCapturas DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiRamAlertas(idProjeto) {
    // console.log("Chegou no model para buscar os dados da KPI alertas da Ram", 400);

    var instrucao = `
    SELECT idMaquina, MAX(nomeRegistro) as nomeRegistro, count(idRegistro) as totalCapturas
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina 
        WHERE tipoHardware = 'Ram' AND valorRegistro >= 5 AND fkProjeto = ${idProjeto}
        GROUP BY idMaquina
        ORDER BY totalCapturas DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiDiscoAlertas(idProjeto) {
    // console.log("Chegou no model para buscar os dados da KPI alertas de Disco", 400);

    var instrucao = `
        SELECT idMaquina, MAX(nomeRegistro) as nomeRegistro, count(idRegistro) as totalCapturas
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina 
        WHERE tipoHardware = 'Disco' AND valorRegistro >= 10.00 AND nomeRegistro = "bytesEscrita" and fkProjeto = ${idProjeto}
        GROUP BY idMaquina
        ORDER BY totalCapturas DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiRedeAlertas(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi alertas de Rede", 400);

    var instrucao = `
        SELECT idMaquina, MAX(nomeRegistro) as nomeRegistro, count(idRegistro) as totalCapturas
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina 
        WHERE tipoHardware = 'Rede' AND nomeRegistro = "Pacotes Recebidos" and fkProjeto = ${idProjeto}
        GROUP BY idMaquina
        ORDER BY totalCapturas DESC
        LIMIT 1;
    `;
    // AND valorRegistro <= 10

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
// =========================================================== FUNÇÕES KPI 2 
// =================================================== CPU ================================================================
function getDadosKpiEventosCriticosCpu20Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 20 SECOND
        AND valorRegistro >= 1
        AND tipoHardware = "Cpu"
        AND nomeRegistro = "usoCpu"
        AND fkProjeto = ${idProjeto}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosCpu40Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 40 SECOND
        AND valorRegistro >= 1
        AND tipoHardware = "Cpu"
        AND nomeRegistro = "usoCpu"
        AND fkProjeto = ${idProjeto}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosCpu60Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 60 SECOND
        AND valorRegistro >= 1
        AND tipoHardware = "Cpu"
        AND nomeRegistro = "usoCpu"
        AND fkProjeto = ${idProjeto}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// =================================================== Ram ================================================================
function getDadosKpiEventosCriticosRam20Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 20 SECOND
        AND valorRegistro >= 70
        AND tipoHardware = "Ram"
        AND nomeRegistro = "usoRam"
        AND fkProjeto = ${idProjeto}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRam40Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 40 SECOND
        AND valorRegistro >= 70
        AND tipoHardware = "Ram"
        AND nomeRegistro = "usoRam"
        AND fkProjeto = ${idProjeto}
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRam60Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 60 SECOND
        AND valorRegistro >= 70
        AND tipoHardware = "Ram"
        AND nomeRegistro = "usoRam"
        AND fkProjeto = ${idProjeto}
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// =================================================== Disco ================================================================

function getDadosKpiEventosCriticosDisco20Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 20 SECOND
        AND valorRegistro <= 2
        AND tipoHardware = "Disco"
        AND nomeRegistro = "bytesEscrita"
        AND fkProjeto = ${idProjeto}
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosDisco40Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 40 SECOND
        AND valorRegistro <= 2
        AND tipoHardware = "Disco"
        AND nomeRegistro = "bytesEscrita"
        AND fkProjeto = ${idProjeto}
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosDisco60Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 60 SECOND
        AND valorRegistro <= 2
        AND tipoHardware = "Disco"
        AND nomeRegistro = "bytesEscrita"
        AND fkProjeto = ${idProjeto};
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// =================================================== Rede ================================================================
function getDadosKpiEventosCriticosRede20Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 20 SECOND
        AND valorRegistro <= 7
        AND tipoHardware = "Rede"
        AND nomeRegistro = "Pacotes Recebidos"
        AND fkProjeto = ${idProjeto};
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRede40Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 40 SECOND
        AND valorRegistro <= 7
        AND tipoHardware = "Rede"
        AND nomeRegistro = "Pacotes Recebidos"
        AND fkProjeto = ${idProjeto};
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiEventosCriticosRede60Seg(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    SELECT COUNT(*) AS eventos_criticos,
        max(valorRegistro) as maior_valor
        FROM registro
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = idMaquina
        JOIN projeto ON fkProjeto = idProjeto
        WHERE tempoCapturas >= NOW() - INTERVAL 60 SECOND
        AND valorRegistro <= 7
        AND tipoHardware = "Rede"
        AND nomeRegistro = "Pacotes Recebidos"
        AND fkProjeto = ${idProjeto};
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiTotalCapturasProjeto(idProjeto) {
    // console.log("Chegou no model para buscar os dados da Kpi eventos da Cpu", 400);

    var instrucao = `
    select count(idRegistro) as capturas_projeto from registro 
    join Infohardware on fkHardware = idHardware
    join maquina on idMaquina = fkMaquina 
    where fkProjeto = ${idProjeto};
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
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

    getDadosKpiTotalCapturasProjeto
}