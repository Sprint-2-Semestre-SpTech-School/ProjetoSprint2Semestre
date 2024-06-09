var dashboardModel = require("../models/dashProjetoModel");

function getDadosDash(req, res) {
    var idProjeto = req.params.idProjeto;

    console.log(`Estou no controller para pegar os dados da Dash`);
    dashboardModel.getDadosDash(idProjeto)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);

                } else {
                    res.status(204).send("Nenhum projeto encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Erro ao buscar o projeto associado",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function adicionarMaquina(req, res) {
    var destino = req.body.destinoServer;
    var descricao = req.body.descricaoServer;

    if (destino == undefined) {
        return res.status(400).send("Seu destino está undefined!");
    } else if (descricao == undefined) {
        return res.status(400).send("Sua descrição está undefined!");
    }


    dashboardModel.adicionarMaquina(destino, descricao)
    .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}

function buscaridMaquina(req, res) {
  var idMaquina = req.params.idMaquina;

  dashboardModel.buscaridMaquina(idMaquina).then((resultado) => {
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

function buscarMaquinasPorProjeto(req, res) {
    var idProjeto = req.params.idProjeto;
    dashboardModel.buscarMaquinasPorProjeto(idProjeto).then((resultado) => {
      if (resultado.length > 0) {
        console.log(resultado)
        res.status(201).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as máquinas: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarMaquinasPorProjeto(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.listarMaquinasPorProjeto(idMaquina).then((resultado) => {
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

function entrarDashMaquina(req, res) {
    var idMaquina = req.params.idMaquina;
    dashboardModel.entrarDashMaquina(idMaquina).then((resultado) => {
      if (resultado.length > 0) {
        console.log(resultado)
        res.status(201).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as máquinas: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function editarMaquina(req, res) {
  var novoDestino = req.body.descricao;
  var novaDescricao = req.params.descricao;
  var idMaquina = req.params.idMaquina;

  avisoModel.editarMaquina(novoDestino, novaDescricao, idMaquina)
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

module.exports = {
    getDadosDash,
    adicionarMaquina,
    buscaridMaquina,
    buscarMaquinasPorProjeto,
    listarMaquinasPorProjeto,
    entrarDashMaquina, 
    editarMaquina
}