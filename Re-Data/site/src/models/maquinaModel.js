var database = require("../database/config");

function buscarDados(idMaquina) {
    console.log("Chegou no model para buscar os dados da Dashboard", idMaquina);

    var instrucao = `
        SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, valorTotal AS memoriaTotal
FROM Registro
INNER JOIN InfoHardware ON fkHardware = idHardware
INNER JOIN Maquina m ON fkMaquina = idMaquina
INNER JOIN Projeto ON fkProjeto = idProjeto
WHERE idMaquina = ${idMaquina}
GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, valorTotal;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarDadosVolume(idMaquina, tipoHardware, valorTotal, nomeRegistro, valorRegistro, fkMaquina, tempoCapturas) {
    console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, tipoHardware, valorTotal, nomeRegistro, valorRegistro, fkMaquina, tempoCapturas);

    var instrucao = `
    SELECT i.tipoHardware, i.valorTotal AS memoriaTotal, r.nomeRegistro, r.valorRegistro, i.fkMaquina, m.idMaquina, (i.valorTotal - r.valorRegistro) AS memoriaUtilizada, r.tempoCapturas
FROM Maquina AS m
INNER JOIN InfoHardware AS i ON m.idMaquina = i.fkMaquina
INNER JOIN Registro AS r ON r.fkHardware = i.idHardware
WHERE i.tipoHardware = 'Disco' AND i.fkMaquina = ${idMaquina};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarDadosHardware(idMaquina) {
    console.log("Chegou no model para buscar os dados da Dashboard", idMaquina);

    var instrucao = `
        SELECT TOP 4 idHardware, tipoHardware, nomeHardware, valorTotal, unidadeCaptacao, fkMaquina
FROM InfoHardware
WHERE fkMaquina = ${idMaquina};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarDadosAlerta(idMaquina) {
    console.log("Chegou no model para buscar os dados da Dashboard", idMaquina);

    var instrucao = `
        SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro AS usoCpu, valorTotal AS memoriaTotal
FROM Registro 
INNER JOIN InfoHardware ON fkHardware = idHardware
INNER JOIN Maquina ON fkMaquina = idMaquina
INNER JOIN Projeto ON fkProjeto = idProjeto
WHERE idMaquina = ${idMaquina} AND nomeRegistro = 'usoCpu'
GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, valorTotal;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarDadosAlertaRam(idMaquina) {
    console.log("Chegou no model para buscar os dados da Dashboard", idMaquina);

    var instrucao = `
        SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro AS usoRam, valorTotal AS memoriaTotal
        FROM Registro 
        JOIN InfoHardware ON fkHardware = idHardware
        JOIN Maquina ON fkMaquina = idMaquina
        JOIN Projeto ON fkProjeto = idProjeto
        WHERE idMaquina = ${idMaquina} AND nomeRegistro = 'usoRam'
        GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, valorTotal;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarInfosMaquina(idMaquina) {
    console.log("Chegou no model para buscar as infos da máquina", idMaquina);

    var instrucao = `
        SELECT TOP 2 descricao, destino
FROM Maquina
WHERE idMaquina = ${idMaquina};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function editarMaquina(novoDestino, novaDescricao, idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarMaquina(): ", novoDestino, novaDescricao, idMaquina);

    var instrucaoSql = `
        UPDATE Maquina SET destino = '${novoDestino}', descricao = '${novaDescricao}' WHERE idMaquina = ${idMaquina};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


async function deletarMaquina(idMaquina) {
    console.log("Iniciando o processo de exclusão para a máquina com ID:", idMaquina);

    try {
        // 1. Selecionar todos os ids de infoHardware relacionados à máquina
        const selectInfoQuery = `
            SELECT idHardware
            FROM InfoHardware
            WHERE fkMaquina = ${idMaquina};
        `;
        console.log("Executando a instrução SQL: \n" + selectInfoQuery);
        const hardwareResults = await database.executar(selectInfoQuery);

        if (hardwareResults.length > 0) {
            // 2. Excluir registros da tabela `registro` relacionados aos `idHardware`
            const hardwareIds = hardwareResults.map(row => row.idHardware);
            const deleteRegistroQuery = `
                DELETE FROM Registro
                WHERE fkHardware IN (${hardwareIds.join(',')});
            `;
            console.log("Executando a instrução SQL: \n" + deleteRegistroQuery);
            await database.executar(deleteRegistroQuery);

            // 3. Excluir registros da tabela `infoHardware` relacionados à máquina
            const deleteInfoQuery = `
                DELETE FROM InfoHardware
                WHERE fkMaquina = ${idMaquina};
            `;
            console.log("Executando a instrução SQL: \n" + deleteInfoQuery);
            await database.executar(deleteInfoQuery);
        }

        // 4. Excluir o registro da tabela `maquina`
        const deleteMaquinaQuery = `
            DELETE FROM Maquina
            WHERE idMaquina = ${idMaquina};
        `;
        console.log("Executando a instrução SQL: \n" + deleteMaquinaQuery);
        await database.executar(deleteMaquinaQuery);

        console.log("Máquina excluída com sucesso.");
    } catch (error) {
        console.error("Erro ao excluir a máquina:", error);
    }
}


module.exports = {
    buscarDados,
    buscarDadosVolume,
    buscarDadosHardware,
    buscarDadosAlerta,
    buscarDadosAlertaRam,
    buscarInfosMaquina,
    editarMaquina,
    deletarMaquina
}