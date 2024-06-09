var projetosModel = require("../models/projetosModel");

function cadastrarProjeto(req, res) {

  var nomeDemandaCreate = req.body.nomeDemandaServer;
  var dataInicioCreate = req.body.dataInicioServer;
  var responsavelCreate = req.body.responsavel;
  var dataTerminoCreate = req.body.dataTerminoServer;

  if (nomeDemandaCreate == undefined || dataInicioCreate == undefined || responsavelCreate == undefined || dataTerminoCreate == undefined) {
      res.status(400).send("nomeDemanda está undefined!");
      res.status(400).send("dataInicio está undefined!");
      res.status(400).send("responsavel está undefined!");
      res.status(400).send("dataTermino está undefined!");
  }

  projetosModel.cadastrarProjeto(nomeDemandaCreate, dataInicioCreate, responsavelCreate, dataTerminoCreate).then(function (resposta) {
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

// function criarProjeto(req, res) {

//   var nomeDemanda = req.body.nomeDemandaServer;
//   var dataInicio = req.body.dataInicioServer;
//   var responsavel = req.body.responsavelServer;
//   var dataTermino = req.body.dataTerminoServer;

//   if (nomeDemanda == undefined) {
//     res.status(400).send("Seu nomeDemanda está undefined!");
//   }
//   if (dataInicio == undefined) {
//     res.status(400).send("Seu dataInicio está undefined!");
//   }
//   if (responsavel == undefined) {
//     res.status(400).send("Seu responsável está undefined!");
//   }
//   if (dataTermino == undefined) {
//     res.status(400).send("Seu dataTermino está undefined!");
//   }

//   projetosModel.criarProjeto(nomeDemanda, dataInicio, responsavel, dataTermino) 
//   .then((resultado) => {
//     res.status(201).json(resultado);
//   }
//   ).catch((erro) => {
//     console.log(erro);
//         console.log(
//           "\nHouve um erro ao realizar a criação do Projeto! Erro: ",
//           erro.sqlMessage
//         );
//         res.status(500).json(erro.sqlMessage);
//         });

// }

module.exports = {
  cadastrarProjeto,
  buscarProjetosPorEmpresa,
  listarProjetosPorEmpresa,
  qtdMaquinasPorProjeto
  // criarProjeto
}