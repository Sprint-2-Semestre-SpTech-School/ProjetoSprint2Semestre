var projetosModel = require("../models/projetosModel");

function cadastrarProjeto(req, res) {

  var nomeDemanda = req.body.nomeDemandaServer;
  var dataInicio = req.body.dataInicioServer;
  var responsavel = req.body.responsavelServer;
  var descricao = req.body.descricaoServer;
  var dataTermino = req.body.dataTerminoServer;
  var idEmpresa = req.body.idEmpresa;

  if (nomeDemanda == undefined || dataInicio == undefined || responsavel == undefined || descricao == undefined || dataTermino == undefined || idEmpresa == undefined) {
      res.status(400).send("nomeDemanda está undefined!");
      res.status(400).send("dataInicio está undefined!");
      res.status(400).send("dataTermino está undefined!");
      res.status(400).send("responsavel está undefined!");
      res.status(400).send("descrição está undefined!");
      res.status(400).send("idEmpresa está undefined!");
  }

  projetosModel.cadastrarProjeto(nomeDemanda, dataInicio, responsavel, descricao, dataTermino, idEmpresa).then(function (resposta) {
      res.status(200).send("Projeto criado com sucesso");
  }).catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
  })
}

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

function buscaridProjeto(req, res) {
  var idProjeto = req.params.idProjeto;

  projetosModel.buscaridProjeto(idProjeto).then((resultado) => {
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

function editarProjeto(req, res) {
  var novoNomeDemanda = req.body.nomeDemanda;
  var novaDataInicio = req.body.dataInicio;
  var novaDataTermino = req.body.dataTermino;
  var novaDescricao = req.body.descricao;
  var novoResponsavel = req.body.responsavel;
  var idProjeto = req.params.idProjeto;

  projetosModel.editarProjeto(novoNomeDemanda, novaDataInicio, novaDataTermino, novaDescricao, novoResponsavel, idProjeto)
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

function entrarDashProjeto(req, res) {
  var idProjeto = req.params.idProjeto;
  projetosModel.entrarDashProjeto(idProjeto).then((resultado) => {
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

function deletarProjeto(req, res) {
  var idProjeto = req.params.idProjeto;

  projetosModel.deletarProjeto(idProjeto)
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
  cadastrarProjeto,
  buscarProjetosPorEmpresa,
  listarProjetosPorEmpresa,
  qtdMaquinasPorProjeto,
  buscaridProjeto,
  editarProjeto,
  entrarDashProjeto,
  deletarProjeto
}