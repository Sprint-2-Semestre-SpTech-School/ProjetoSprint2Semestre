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
                  res.status(204).send("Nenhuma máquina encontrado!");
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
                    res.status(204).send("Nenhuma máquina encontrado!");
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

module.exports = {
    buscarDados,
    buscarDadosVolume
}