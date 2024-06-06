// Modal para sair
function sair() {
    const modalSairDentro = document.getElementById('modalSair')
    modalSairDentro.classList.add('abrir')

    modalSairDentro.addEventListener('click', (e) => {
        if (e.target.id == 'fecharModal' || e.target.id == 'modalSair') {
            modalSairDentro.classList.remove('abrir')
        }
    })
}

function sairConta() {
    setTimeout(() => {
        window.location = "login.html";
    }, "1000");
}

// Formulario
document.addEventListener('DOMContentLoaded', function () {
    // Esconde o formulário quando a página carregar
    document.getElementById('formularioAdicionar').classList.add('hidden');

    // Exibe o formulário quando o botão "Novo" for clicado
    document.querySelector('.buttonTools').addEventListener('click', function () {
        document.getElementById('formularioAdicionar').classList.remove('hidden');
    });

    // Esconde o formulário quando o botão "Salvar" for clicado
    document.getElementById('saveButton').addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio do formulário para demonstração
        document.getElementById('formularioAdicionar').classList.add('hidden');
    });

    // Exibe o formulário quando o botão de editar for clicado
    document.querySelectorAll('.edit').forEach(function (button) {
        button.addEventListener('click', function () {
            document.getElementById('formularioEditar').classList.remove('hidden');
            // Aqui você pode adicionar o código para preencher o formulário com os dados do usuário a ser editado
        });
    });

    // Esconde o formulário quando o botão "Salvar" for clicado
    document.getElementById('saveButton').addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio do formulário para demonstração
        document.getElementById('formularioEditar').classList.add('hidden');
    });
});

function cadastrar() {
    aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var idDispositivo = id_usb.value;
    var motivoBloqueio = motivo_bloqueio.value;
    if (
        idDispositivo == "" ||
        motivoBloqueio == ""
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "(Mensagem de erro para todos os campos em branco)";

        finalizarAguardar();
        return false;
    } else {
        setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/dispositivoUsb/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idDispositivoServer: idDispositivo,
            motivoBloqueioServer: motivoBloqueio
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Dispositivo adicionado na blacklist! Redirecionando para tela...";

                setTimeout(() => {
                    window.location = "dispositivoUsb.html";
                }, "2000");

                limparFormulario();
                finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar adicionar o dispositivo!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}