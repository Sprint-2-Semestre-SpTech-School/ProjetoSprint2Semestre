var cadastroModel = require("../models/cadastroModel");

function cadastrar(req, res) {
    var nomeCompleto = req.body.nomeServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var endereco = req.body.enderecoServer;
    var numeroEnd = req.body.numeroEndServer;
    var bairro = req.body.bairroServer;
    var complemento = req.body.complementoServer;

    if (nomeCompleto == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }
    if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    }
    if (nomeEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    }
    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    }
    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    }
    if (endereco == undefined) {
        res.status(400).send("Seu endereço está undefined!");
    }
    if (numeroEnd == undefined) {
        res.status(400).send("Seu número de endereço está undefined!");
    }
    if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    }
    if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    }
    // else {

    // cadastroModel.cadastrar(nomeCompleto, email, telefone, empresa, cnpj, cep, endereco, numeroEnd, bairro, complemento).then(function (resultado) {
    //     res.status(200).send("Cadastro criado com sucesso");
    // }).catch(function (erro) {
    //     res.status(500).json(erro.sqlMessage);
    // })

    cadastroModel.cadastrar(nomeCompleto, email, telefone, nomeEmpresa, cnpj, cep, endereco, numeroEnd, bairro, complemento)
        .then(
            function (resultado) {
                res.json(resultado);
                if(resultado.length == 1) {
                    res.status(200).send("Cadastro concluído")
                } 
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
// }

module.exports = {
    cadastrar
}