var database = require("../database/config");

function buscarDados(idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal) {
    console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal);

    var instrucao = `
        SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, valorTotal as memoriaTotal
        FROM registro 
        JOIN infoHardware ON fkHardware = idHardware
        JOIN maquina ON fkMaquina = ${idMaquina}
        JOIN projeto ON fkProjeto = idProjeto
        WHERE idProjeto = 401
        GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, valorRegistro, memoriaTotal;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao)
        .then(result => {
            console.log("Resultado da busca em Maquina:", result);

            console.log("Resultado última maquina id:: \n" + selectIdEmpresa);
        })

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

// function buscarDados(idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal) {
//     console.log("Chegou no model para buscar os dados da Dashboard", idMaquina, idProjeto, idRegistro, nomeRegistro, tempoCapturas, valorRegistro, valorTotal);

//     var instrucao = `
//         SELECT r.idRegistro, r.nomeRegistro, r.tempoCapturas, idProjeto, idMaquina, r.valorRegistro, i.valorTotal as memoriaTotal, i.tipoHardware, r.nomeRegistro as memoriaDisponivel, 
//         i.fkMaquina, m.idMaquina, (i.valorTotal - r.valorRegistro) as memoriaUtilizada
//             FROM registro r JOIN infoHardware i 
//                 ON r.fkHardware = i.idHardware
//                     JOIN maquina m ON i.fkMaquina = m.idMaquina
//                         JOIN projeto p ON m.fkProjeto = p.idProjeto
//                             WHERE m.idMaquina = 500 AND p.idProjeto = 401 AND i.tipoHardware = 'Disco' AND r.nomeRegistro = 'memoriaDisponivel'
//                                 GROUP BY 
//                                     r.idRegistro, 
//                                     r.nomeRegistro, 
//                                     r.tempoCapturas, 
//                                     idProjeto, 
//                                     m.idMaquina, 
//                                     r.valorRegistro, 
//                                     i.valorTotal, 
//                                     i.tipoHardware, 
//                                     r.valorRegistro, 
//                                     i.fkMaquina, 
//                                     m.idMaquina;
//     `;

//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

module.exports = {
    buscarDados,
    buscarDadosVolume
}