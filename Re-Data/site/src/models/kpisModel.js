var database = require("../database/config")

function getDadosKpiCpuAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da Dashboard CPU e RAM", 400);

    var instrucao = `
    select idMaquina, count(idRegistro) as totalCapturas from registro
        join infoHardware on fkHardware = idHardware
        join maquina on fkMaquina = idMaquina 
        where tipoHardware = 'Cpu' and valorRegistro >= 1 and fkProjeto = ${idProjeto}
        group by idMaquina order by totalCapturas desc limit 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiRamAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da Dashboard CPU e RAM", 400);

    var instrucao = `
    select idMaquina, count(idRegistro) as totalCapturas from registro
        join infoHardware on fkHardware = idHardware
        join maquina on fkMaquina = idMaquina 
        where tipoHardware = 'Cpu' and valorRegistro >= 1 and fkProjeto = ${idProjeto}
        group by idMaquina order by totalCapturas desc limit 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiDiscoAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da Dashboard Disco", 400);

    var instrucao = `
    select idMaquina, count(idRegistro) as totalCapturas from registro
        join infoHardware on fkHardware = idHardware
        join maquina on fkMaquina = idMaquina 
        where tipoHardware = 'Disco' and valorRegistro >= 7500 and fkProjeto = ${idProjeto}
        group by idMaquina order by totalCapturas desc limit 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosKpiRedeAlertas(idProjeto) {
    console.log("Chegou no model para buscar os dados da Dashboard Rede", 400);

    var instrucao = `
    select idMaquina, count(idRegistro) as totalCapturas from registro
        join infoHardware on fkHardware = idHardware
        join maquina on fkMaquina = idMaquina 
        where tipoHardware = 'Rede' and valorRegistro >= 100 and fkProjeto = ${idProjeto}
        group by idMaquina order by totalCapturas desc limit 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    getDadosKpiCpuAlertas,
    getDadosKpiRamAlertas,
    getDadosKpiDiscoAlertas,
    getDadosKpiRedeAlertas
}