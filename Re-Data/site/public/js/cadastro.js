function cadastrar() {

    var nomeCompletoVar = input_nomeCompleto.value;
    var emailVar = input_email.value;
    var telefoneVar = input_tel.value;
    var nomeEmpresaVar = input_empresa.value;
    var cnpjVar = input_cnpj.value;
    var cepVar = input_cep.value;
    var enderecoVar = input_endereco.value;
    var numeroEndVar = input_numeroEnd.value;
    var bairroVar = input_bairro.value;
    var complementoVar = input_complemento.value;

    if (
        nomeCompletoVar == "" ||
        emailVar == "" ||
        telefoneVar == "" ||
        nomeEmpresaVar == "" ||
        cnpjVar == "" ||
        cepVar == "" ||
        enderecoVar == "" ||
        numeroEndVar == "" ||
        bairroVar == "" ||
        complementoVar == ""
    )
    // {
    //   return false;
    // }

    {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Preencha todos os campos";
    } else if (telefoneVar.length < 9 || telefoneVar.length > 9) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Insira um telefone válido";
    } else if (emailVar.indexOf('@') < 0 || emailVar.indexOf('.') < 0) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Insira um e-mail válido!";
    } else if (cnpjVar.length != 14) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Insira um cnpj válido!";
    } else if (cepVar.length != 8) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Insira um cep válido!";
    } else if (numeroEndVar < 0) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Coloque um número de endereço válido!";
    }

    else {
        // setInterval(sumirMensagem, 5000);
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Indo para o login...";
    }

    // Enviando o valor da nova input
    fetch("/cadastro/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeCompletoVar,
            emailServer: emailVar,
            telefoneServer: telefoneVar,
            nomeEmpresaServer: nomeEmpresaVar,
            cnpjServer: cnpjVar,
            cepServer: cepVar,
            enderecoServer: enderecoVar,
            numeroEndServer: numeroEndVar,
            bairroServer: bairroVar,
            complementoServer: complementoVar

        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

                // limparFormulario();
                // finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    // return false;
}
        // .catch(function (resposta) {
        //     console.log(`#ERRO: ${resposta}`);
        //     // finalizarAguardar();
        // });

    // return false;

    // function sumirMensagem() {
    //     cardErro.style.display = "none";
    // }
// }