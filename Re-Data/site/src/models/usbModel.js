// const { buscarUsbsBloqueados } = require("../controllers/usbController");
var database = require("../database/config");

function cadastrar(idDispositivo, motivoBloqueio) {
    var verificarDispositivo = `
    SELECT idDispositivo FROM dispositivoUsb WHERE idDispositivo = '${idDispositivo}';
`;

    console.log("Executando a instrução SQL para verificar idDispositivo: \n" + verificarDispositivo);

    return database.executar(verificarDispositivo)
        .then(result => {
            if (result.length > 0) {
                //Se dispositivo existe, capturar o último idMaquina.
                var pegarUltimoIdMaquina = `
        SELECT idMaquina FROM Maquina ORDER BY idMaquina DESC LIMIT 1;
    `;
                console.log("Executando a instrução SQL para obter o último idMaquina: \n" + pegarUltimoIdMaquina);

                return database.executar(pegarUltimoIdMaquina);
            } else {
                throw new Error("Dispositivo não encontrado na tabela dispositivoUsb.");
            }
        })
        .then(result => {
            if (result.length > 0) {
                var idMaquina = result[0].idMaquina;
                console.log("Último idMaquina obtido: " + idMaquina)

                var instrucaoUsbCadastro = `
        INSERT INTO blockList (fkDeviceId, motivoBloqueio, fkMaquina) VALUES ('${idDispositivo}', '${motivoBloqueio}', '${idMaquina}');
    `;
                console.log("Executando a instrução SQL: \n" + instrucaoUsbCadastro);
                return database.executar(instrucaoUsbCadastro);
            } else {
                throw new Error("Nenhuma máquina encontrada na tabela Maquina.");
            }
        })
        .then(result => {
            console.log("Resultado da inserção em blackList:", result);
        })
        .catch(err => {
            console.error("Erro ao cadastrar dados: ", err);
        });
}

// function listar() {
//     var instrucaoListagemUsb = `
//         SELECT * FROM dispositivoUsb;
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoListagemUsb);
//     return database.executar(instrucaoListagemUsb);
// }

function buscarUsbs(idDispositivo, deviceId, descricaoUsb) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarUsbs(): ", idDispositivo, deviceId, descricaoUsb)

    var instrucaoBuscarUsbs = `
    SELECT * FROM dispositivoUsb; 
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoBuscarUsbs);
    return database.executar(instrucaoBuscarUsbs);
}

function buscarUsbsBloqueados(idBlockList, motivoBloqueio, deviceId) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarUsbs(): ", idBlockList, motivoBloqueio, deviceId)

    var instrucaoBuscarUsbsBloqueados = `
    SELECT idBlockList, motivoBloqueio, fkDeviceId FROM blockList; 
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoBuscarUsbsBloqueados);
    return database.executar(instrucaoBuscarUsbsBloqueados);
}

function atualizarUsbDescricao(idDispositivo, novaDescricao) {
    var instrucaoAtualizarDescricao = `
    UPDATE dispositivoUsb 
    SET descricao = '${novaDescricao}'
    WHERE idDispositivo = ${idDispositivo};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoAtualizarDescricao);
    return database.executar(instrucaoAtualizarDescricao);
}

function atualizarUsbMotivoBloqueio(idBlockList, motivoBloqueio) {

    var instrucaoAtualizarMotivoBloqueio = `
    UPDATE blockList 
    SET motivoBloqueio = '${motivoBloqueio}'
    WHERE idBlockList = ${idBlockList};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoAtualizarMotivoBloqueio);
    return database.executar(instrucaoAtualizarMotivoBloqueio);
}

module.exports = {
    cadastrar,
    buscarUsbs,
    buscarUsbsBloqueados,
    atualizarUsbDescricao,
    atualizarUsbMotivoBloqueio
};