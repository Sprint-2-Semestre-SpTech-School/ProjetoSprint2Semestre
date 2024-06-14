var kpiMaquinaModel = require("../models/kpiMaquinaModel");

function kpiMaquinaLeituras(req, res) {
    var idMaquina = req.params.idMaquina;
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI da máquina`);
    kpiMaquinaModel.kpiMaquinaLeituras(idMaquina)
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

function kpiMaquinaCpu(req, res) {
    var idMaquina = req.params.idMaquina;
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI da máquina`);
    kpiMaquinaModel.kpiMaquinaCpu(idMaquina)
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

function kpiMaquinaRam(req, res) {
    var idMaquina = req.params.idMaquina;
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI da máquina`);
    kpiMaquinaModel.kpiMaquinaRam(idMaquina)
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
    kpiMaquinaLeituras,
    kpiMaquinaCpu,
    kpiMaquinaRam
}