var dashboardModel = require("../models/dashboardModel");

function buscarMaquinasAtivas(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou na funcao buscar máquinas ativas do controller`);
    dashboardModel.buscarMaquinasAtivas(idProjeto)
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

function buscarTempoOpTotal(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou na funcao buscar tempo de operação total do controller`);
    dashboardModel.buscarTempoOpTotal(idProjeto)
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
                    "Houve um erro ao buscar o tempo de operação totl: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarMaquinasAtivas,
    buscarTempoOpTotal
}