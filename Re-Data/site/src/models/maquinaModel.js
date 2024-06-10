var database = require("../database/config");

function buscarDados(idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal) {
    // console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal);

    var instrucao = `
        SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, valorTotal as memoriaTotal
        FROM registro 
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = ${idMaquina}
        JOIN projeto ON fkProjeto = idProjeto
        WHERE idProjeto = 400
        GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, memoriaTotal;
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosVolume(idMaquina, tipoHardware, valorTotal, nomeRegistro, valorRegistro, fkMaquina, tempoCapturas) {
    // console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, tipoHardware, valorTotal, nomeRegistro, valorRegistro, fkMaquina, tempoCapturas);

    var instrucao = `
    select i.tipoHardware, i.valorTotal as memoriaTotal, r.nomeRegistro, r.valorRegistro, i.fkMaquina, m.idMaquina, (i.valorTotal - r.valorRegistro) as memoriaUtilizada, tempoCapturas
        from maquina as m
            join infoHardware as i on m.idMaquina = i.fkMaquina
                join registro as r
                    on r.fkHardware = i.idHardware
                        where i.tipoHardware = 'Disco' and i.fkMaquina = ${idMaquina};
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosHardware(idMaquina) {
    // console.log("Chegou no model para buscar os dados da Dashboard", idMaquina);

    var instrucao = `
        select idHardware, tipoHardware, nomeHardware, valorTotal, fkMaquina
            from infoHardware
                where fkMaquina = ${idMaquina} limit 4;
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosAlerta(idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal) {
    // console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal);

    var instrucao = `
        SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro as usoCpu, valorTotal as memoriaTotal
        FROM registro 
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = ${idMaquina}
        JOIN projeto ON fkProjeto = idProjeto
        WHERE idProjeto = 400 AND nomeRegistro = 'usoCpu'
        GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, memoriaTotal;
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosAlertaRam(idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal) {
    // console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal);

    var instrucao = `
        SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro as usoRam, valorTotal as memoriaTotal
        FROM registro 
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = ${idMaquina}
        JOIN projeto ON fkProjeto = idProjeto
        WHERE idProjeto = 400 AND nomeRegistro = 'usoRam'
        GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, memoriaTotal;
    `;

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInfosMaquina(idMaquina) {
    console.log("Chegou no model para buscar as infos da máquina", idMaquina);

    var instrucao = `
        select descricao, destino
            from maquina
                where idMaquina = ${idMaquina} limit 2;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarMaquina(novoDestino, novaDescricao, idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarMaquina(): ", novoDestino, novaDescricao, idMaquina);
    var instrucaoSql = `
        UPDATE maquina SET destino = '${novoDestino}', descricao = '${novaDescricao}' WHERE idMaquina = ${idMaquina};
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
            FROM infoHardware
            WHERE fkMaquina = ${idMaquina};
        `;
        console.log("Executando a instrução SQL: \n" + selectInfoQuery);
        const hardwareResults = await database.executar(selectInfoQuery);
        
        if (hardwareResults.length > 0) {
            // 2. Excluir registros da tabela `registro` relacionados aos `idHardware`
            const hardwareIds = hardwareResults.map(row => row.idHardware);
            const deleteRegistroQuery = `
                DELETE FROM registro
                WHERE fkHardware IN (${hardwareIds.join(',')});
            `;
            console.log("Executando a instrução SQL: \n" + deleteRegistroQuery);
            await database.executar(deleteRegistroQuery);

            // 3. Excluir registros da tabela `infoHardware` relacionados à máquina
            const deleteInfoQuery = `
                DELETE FROM infoHardware
                WHERE fkMaquina = ${idMaquina};
            `;
            console.log("Executando a instrução SQL: \n" + deleteInfoQuery);
            await database.executar(deleteInfoQuery);
        }

        // 4. Excluir o registro da tabela `maquina`
        const deleteMaquinaQuery = `
            DELETE FROM maquina
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