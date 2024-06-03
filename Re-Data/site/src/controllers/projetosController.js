var projetosModel = require("../models/projetosModel");

function buscarProjetosPorEmpresa(req, res) {
    var idProjeto = req.params.idEmpresa;
    projetosModel.buscarProjetosPorEmpresa(idProjeto).then((resultado) => {
      if (resultado.length > 0) {
        console.log(resultado)
        res.status(201).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os projetos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarProjetosPorEmpresa(req, res) {
    var idProjeto = req.params.idEmpresa;
    var nomeDemanda = req.params.nomeDemandaServer;
    var dataInicio = req.params.dataInicioServer;
    var responsavel = req.params.responsavelServer;
    var dataTermino = req.params.dataTerminoServer;

    projetosModel.listarProjetosPorEmpresa(idProjeto, nomeDemanda, dataInicio, responsavel, dataTermino).then((resultado) => {
      if (resultado.length > 0) {
        console.log(resultado)
        res.status(201).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar dados dos projetos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function qtdMaquinasPorProjeto(req, res) {
    var idMaquina = req.params.idEmpresa;

    projetosModel.qtdMaquinasPorProjeto(idMaquina).then((resultado) => {
      if (resultado.length > 0) {
        console.log(resultado)
        res.status(201).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar a quantidade de máquinas: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarProjetosPorEmpresa,
    listarProjetosPorEmpresa,
    qtdMaquinasPorProjeto
}