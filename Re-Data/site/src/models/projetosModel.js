var database = require("../database/config");

function cadastrarProjeto(nomeDemanda, dataInicio, responsavel, descricao, dataTermino, idEmpresa) {

    var instrucao = `
       INSERT INTO Projeto (nomeDemanda, dataInicio, dataTermino, descricao, responsavel, fkEmpresa) 
                VALUES ('${nomeDemanda}', '${dataInicio}', '${dataTermino}', '${descricao}', '${responsavel}','${idEmpresa}');    
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarProjetosPorEmpresa(idEmpresa, idProjeto, nomeDemanda, dataInicio, responsavel, dataTermino, fkProjeto, idMaquina) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarProjetosPorEmpresa(): ", idEmpresa, idProjeto, nomeDemanda, dataInicio, responsavel, dataTermino, fkProjeto, idMaquina)

    var instrucao = `
    SELECT 
    p.idProjeto as id, 
    p.nomeDemanda, 
    FORMAT(p.dataInicio, 'dd/MM/yyyy - HH:mm') as dataInicio, 
    p.responsavel, 
    FORMAT(p.dataTermino, 'dd/MM/yyyy - HH:mm') as dataTermino, 
    COUNT(m.idMaquina) as qtsMaquinas
FROM Projeto p
LEFT JOIN Maquina m ON p.idProjeto = m.fkProjeto
GROUP BY 
    p.idProjeto, 
    p.nomeDemanda, 
    p.dataInicio, 
    p.responsavel, 
    p.dataTermino;

    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscaridProjeto(idEmpresa) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscaridEmpresa(): ", idProjeto)

    var instrucao = `
        select idProjeto from Projeto where fkEmpresa = ${idEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarProjeto(novoNomeDemanda, novaDataInicio, novaDataTermino, novaDescricao, novoResponsavel, idProjeto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarProjeto(): ", novoNomeDemanda, novaDataInicio, novoResponsavel, novaDescricao, novaDataTermino, idProjeto);
    var instrucaoSql = `
        UPDATE Projeto SET nomeDemanda = '${novoNomeDemanda}', dataInicio = '${novaDataInicio}', dataTermino = '${novaDataTermino}', descricao = '${novaDescricao}', responsavel = '${novoResponsavel}' WHERE idProjeto = ${idProjeto};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function entrarDashProjeto(idProjeto) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrarDashProjeto(): ", idProjeto)

    var instrucao = `
        select idProjeto from Projeto;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

async function deletarProjeto(idProjeto) {
    console.log("Iniciando o processo de exclusão para o projeto com ID:", idProjeto);

    try {
        // 1. Selecionar todos os ids de maquinas relacionados ao projeto
        const selectMaquinasQuery = `
            SELECT idMaquina
            FROM Maquina
            WHERE fkProjeto = ${idProjeto};
        `;
        console.log("Executando a instrução SQL: \n" + selectMaquinasQuery);
        const maquinaResults = await database.executar(selectMaquinasQuery);

        if (maquinaResults.length > 0) {
            // Iterar por todas as maquinas relacionadas ao projeto
            for (let maquina of maquinaResults) {
                const idMaquina = maquina.idMaquina;

                // 2. Selecionar todos os ids de infoHardware relacionados à máquina
                const selectInfoQuery = `
                    SELECT idHardware
                    FROM InfoHardware
                    WHERE fkMaquina = ${idMaquina};
                `;
                console.log("Executando a instrução SQL: \n" + selectInfoQuery);
                const hardwareResults = await database.executar(selectInfoQuery);

                if (hardwareResults.length > 0) {
                    // 3. Excluir registros da tabela `registro` relacionados aos `idHardware`
                    const hardwareIds = hardwareResults.map(row => row.idHardware);
                    const deleteRegistroQuery = `
                        DELETE FROM Registro
                        WHERE fkHardware IN (${hardwareIds.join(',')});
                    `;
                    console.log("Executando a instrução SQL: \n" + deleteRegistroQuery);
                    await database.executar(deleteRegistroQuery);

                    // 4. Excluir registros da tabela `infoHardware` relacionados à máquina
                    const deleteInfoQuery = `
                        DELETE FROM InfoHardware
                        WHERE fkMaquina = ${idMaquina};
                    `;
                    console.log("Executando a instrução SQL: \n" + deleteInfoQuery);
                    await database.executar(deleteInfoQuery);
                }

                // 5. Excluir o registro da tabela `maquina`
                const deleteMaquinaQuery = `
                    DELETE FROM Maquina
                    WHERE idMaquina = ${idMaquina};
                `;
                console.log("Executando a instrução SQL: \n" + deleteMaquinaQuery);
                await database.executar(deleteMaquinaQuery);
            }
        }

        // 6. Excluir o registro da tabela `projeto`
        const deleteProjetoQuery = `
            DELETE FROM Projeto
            WHERE idProjeto = ${idProjeto};
        `;
        console.log("Executando a instrução SQL: \n" + deleteProjetoQuery);
        await database.executar(deleteProjetoQuery);

        console.log("Projeto excluído com sucesso.");
    } catch (error) {
        console.error("Erro ao excluir o projeto:", error);
    }
}



module.exports = {
    cadastrarProjeto,
    buscarProjetosPorEmpresa,
    buscaridProjeto,
    editarProjeto,
    entrarDashProjeto,
    deletarProjeto
};