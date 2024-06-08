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

    // // Esconde o formulário quando o botão "Salvar" for clicado
    // document.getElementById('saveButton').addEventListener('click', function (event) {
    //     event.preventDefault(); // Impede o envio do formulário para demonstração
    //     document.getElementById('formularioAdicionar').classList.add('hidden');
    // });

    // Exibe o formulário quando o botão de editar for clicado
    document.querySelectorAll('.edit').forEach(function (button) {
        button.addEventListener('click', function () {
            document.getElementById('formularioEditar').classList.remove('hidden');
            // Aqui você pode adicionar o código para preencher o formulário com os dados do usuário a ser editado
        });
    });

    // Esconde o formulário quando o botão "Salvar" for clicado
    // document.getElementById('saveButton').addEventListener('click', function (event) {
    //     event.preventDefault(); // Impede o envio do formulário para demonstração
    //     document.getElementById('formularioEditar').classList.add('hidden');
    // });
});

var idMaquina = sessionStorage.ID_MAQUINA;
var info_usb = null;

function listarUsbs() {
    console.log('Entrei na função listar usbs');
    console.log(idMaquina);

    fetch(`/usb/${idMaquina}`, {
        method: "GET",
    })
        .then(function (response) {
            console.log('entrei na then listar usbs');
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })

        .then(function (lista_usbs) {
            console.log(lista_usbs);

            // console.log(lista_projetos[0].qtsMaquinas);

            // var qtdMaquinas = lista_projetos[0].qtsMaquinas
            // console.log(qtdMaquinas);

            var usb_list = document.getElementById("tabelaUsbConectado");

            var tbody = usb_list.querySelector("tbody");
            tbody.innerHTML = "";

            if (!lista_usbs || lista_usbs.length === 0) {
                console.error('Nenhum dado de usb encontrado.');
                return;
            }
            info_usb = lista_usbs
            lista_usbs.forEach(function (usb) {
                var row = usb_list.insertRow();
                row.innerHTML = `
                    <td><i class="id_dispositivo">${usb.idDispositivo}</i></td>
                    <td><i class="device_id">${usb.idDevice}</i></td>
                    <td><i class="descricao_usb">${usb.descricao}</i></td>
                    <td>
                        <button class="edit">Editar</button>
                    </td>
                `;
            });
            // var boxUsb = document.querySelectorAll(".usb_list");
            // // var boxQtd = document.querySelectorAll(".nameDemand");
            // for (var i = 0; i < boxUsb.length; i++) {
            //     boxUsb[i].addEventListener('click', acessarProjeto);
            //     // boxQtd[i].addEventListener('click', selectProjeto)
            // }
        })
        .catch(function (error) {
            console.error(`#ERRO: ${error}`);
        });
}