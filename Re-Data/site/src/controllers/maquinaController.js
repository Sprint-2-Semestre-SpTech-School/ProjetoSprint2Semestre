var maquinaModel = require("../models/maquinaModel");

function buscarDados(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Estou no controller para pegar os dados da Dash`);
    maquinaModel.buscarDados(idMaquina)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhuma máquina encontrada!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar a máquina associads",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarDadosVolume(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Estou no controller para pegar os dados do volume`);
    maquinaModel.buscarDadosVolume(idMaquina)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhuma máquina encontrada!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar a máquina associada",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarDadosHardware(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Estou no controller para pegar os dados da Dash`);
    maquinaModel.buscarDadosHardware(idMaquina)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhuma máquina encontrada!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar a máquina associads",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarDadosAlerta(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Estou no controller para pegar os dados da Dash`);
    maquinaModel.buscarDadosAlerta(idMaquina)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhuma máquina encontrada!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar a máquina associada",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarDadosAlertaRam(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Estou no controller para pegar os dados da Dash`);
    maquinaModel.buscarDadosAlertaRam(idMaquina)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhuma máquina encontrada!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar a máquina associada",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarInfosMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Estou no controller para pegar as infos da máquina`);
    maquinaModel.buscarInfosMaquina(idMaquina)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhuma info encontrada!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar a máquina associads",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editarMaquina(req, res) {
    var novoDestino = req.body.destino;
    var novaDescricao = req.body.descricao;
    var idMaquina = req.params.idMaquina;

    maquinaModel.editarMaquina(novoDestino, novaDescricao, idMaquina)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletarMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinaModel.deletarMaquina(idMaquina)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar a máquina: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
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