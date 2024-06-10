function entrar() {
    // aguardar();

    var nomeUsuarioVar = input_usuario.value;
    var senhaVar = input_senha.value;

    if (nomeUsuarioVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "Insira seus dados para fazer login";
        // finalizarAguardar();
        return false;
    } else if (
        nomeUsuarioVar == "" ||
        senhaVar == ""
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Preencha todos os campos";

    } else if (nomeUsuarioVar.length < 1) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Insira um nome de usuário válido";

    } else if (senhaVar.length < 6) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Senha com no mínimo 6 dígitos!";

    } else {
        // setInterval(sumirMensagem, 5000)
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Indo para sua dashboard...";
    }

    console.log("FORM LOGIN: ", nomeUsuarioVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/login/entrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeUsuarioServer: nomeUsuarioVar,
            senhaServer: senhaVar
        }),
    })
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!");

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.NOME_USUARIO = json.nomeUsuario;
                    sessionStorage.SENHA_USUARIO = json.senha;
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.ID_EMPRESA = json.idEmpresa;

                    // console.log("EMPRESA ID: ", idEmpresa);

                    setTimeout(function () {
                        window.location = "projetos.html";
                    }, 1000);
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.error(texto);
                    cardErro.style.display = "block"
                    mensagem_erro.innerHTML = "Usuário ou senha não encontrados";
                    // finalizarAguardar();
                    return false;
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })

    // return false;
}

// function sumirMensagem() {
//     cardErro.style.display = "none"
// }