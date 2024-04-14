var loginModel = require("../models/loginModel");

function entrar(req, res) {
    var usuario = req.body.usuarioServer;
    var senha = req.body.senhaServer;

    if (usuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        loginModel.entrar(usuario, senha)
            .then(
                function (resultadoEntrar) {
                    console.log(`\nResultados encontrados: ${resultadoEntrar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoEntrar)}`); // transforma JSON em String

                    if (resultadoentrar.length == 1) {
                        console.log(resultadoEntrar);

                        res.json({
                            id: resultadoEntrar[0].id,
                            usuario: resultadoEntrar[0].usuario,
                            nome: resultadoEntrar[0].nome,
                            senha: resultadoEntrar[0].senha

                        });

                    } else if (resultadoEntrar.length == 0) {
                        res.status(403).send("Usuário e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar
}