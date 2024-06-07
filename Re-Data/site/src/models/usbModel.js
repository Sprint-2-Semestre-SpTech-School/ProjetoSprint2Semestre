var database = require("../database/config");

// function cadastrar(idDispositivo, motivoBloqueio) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

//     var instrucaoUsb = `INSERT INTO blackList (fkDeviceId, motivoBloqueio) VALUES (${idDispositivo}, ${motivoBloqueio})`;

//     console.log("Executando a instrução SQL: \n" + instrucaoUsb);
//     return database.executar(instrucaoUsb);
// }

function cadastrar(idDispositivo, motivoBloqueio) {
    var instrucaoUsbCadastro = `
        INSERT INTO blackList (fkDeviceId, motivoBloqueio) VALUES ('${idDispositivo}', '${motivoBloqueio}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoUsbCadastro);
    return database.executar(instrucaoUsbCadastro)
        .then(result => {
            console.log("Resultado da inserção em blackList:", result);
            console.log("Executando a instrução SQL: \n" + instrucaoUsbCadastro);
        })
        .catch(err => {
            console.error("Erro ao cadastrar dados: ", err);
        });
}

module.exports = {
    cadastrar
};