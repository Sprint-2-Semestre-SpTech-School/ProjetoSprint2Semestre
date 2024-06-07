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

function getDadosKpiEventosCriticosCpu20Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosCpu20Seg(idProjeto)
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

function getDadosKpiEventosCriticosCpu40Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosCpu40Seg(idProjeto)
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

function getDadosKpiEventosCriticosCpu60Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosCpu60Seg(idProjeto)
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

function getDadosKpiEventosCriticosRam20Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosRam20Seg(idProjeto)
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

function getDadosKpiEventosCriticosRam40Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosRam40Seg(idProjeto)
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

function getDadosKpiEventosCriticosRam60Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosRam60Seg(idProjeto)
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

function getDadosKpiEventosCriticosDisco20Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosDisco20Seg(idProjeto)
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

function getDadosKpiEventosCriticosDisco40Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosDisco40Seg(idProjeto)
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

function getDadosKpiEventosCriticosDisco60Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosDisco60Seg(idProjeto)
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

function getDadosKpiEventosCriticosRede20Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosRede20Seg(idProjeto)
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

function getDadosKpiEventosCriticosRede40Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosRede40Seg(idProjeto)
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

function getDadosKpiEventosCriticosRede60Seg(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da KPI`);
    kpisModel.getDadosKpiEventosCriticosRede60Seg(idProjeto)
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
    getDadosKpiRedeAlertas,

    getDadosKpiEventosCriticosCpu20Seg,
    getDadosKpiEventosCriticosCpu40Seg,
    getDadosKpiEventosCriticosCpu60Seg,

    getDadosKpiEventosCriticosRam20Seg,
    getDadosKpiEventosCriticosRam40Seg,
    getDadosKpiEventosCriticosRam60Seg,

    getDadosKpiEventosCriticosDisco20Seg,
    getDadosKpiEventosCriticosDisco40Seg,
    getDadosKpiEventosCriticosDisco60Seg,

    getDadosKpiEventosCriticosRede20Seg,
    getDadosKpiEventosCriticosRede40Seg,
    getDadosKpiEventosCriticosRede60Seg
}