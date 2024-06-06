var kpisModel = require("../models/kpisModel");

function getDadosKpiCpuAlertas(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiCpuAlertas(idProjeto)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhum dado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar o dado associado",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function getDadosKpiRamAlertas(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiRamAlertas(idProjeto)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhum dado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar o dado associado",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function getDadosKpiDiscoAlertas(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiDiscoAlertas(idProjeto)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhum dado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar o dado associado",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function getDadosKpiRedeAlertas(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiRedeAlertas(idProjeto)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhum dado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar o dado associado",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    getDadosKpiCpuAlertas,
    getDadosKpiRamAlertas,
    getDadosKpiDiscoAlertas,
    getDadosKpiRedeAlertas
}