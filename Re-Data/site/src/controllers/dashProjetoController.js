var dashboardModel = require("../models/dashboardModel");

function getDadosDash(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da Dash`);
    dashboardModel.getDadosDash(idProjeto)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar a quantidade total de máquinas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    getDadosDash
}