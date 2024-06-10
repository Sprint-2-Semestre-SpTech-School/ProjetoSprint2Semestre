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
    // Formulario adicionar na blacklist
    document.getElementById('formularioAdicionar').classList.add('hidden');

    // Formulário edição dispositivoUsb
    document.getElementById('formularioEditar').classList.add('hidden');

    // Exibe o formulário quando o botão "Novo" for clicado
    document.querySelector('.buttonTools').addEventListener('click', function () {
        document.getElementById('formularioAdicionar').classList.remove('hidden');
    });

    // Exibe o formulário do dispositivo usb quando o botão de editar for clicado
    document.querySelectorAll('edit_usb').forEach(function (button) {
        button.addEventListener('click', function () {
            document.getElementById('formularioEditar').classList.remove('hidden');
        });
    });

    document.querySelectorAll('.buttonDeletar').forEach(function (button) {
        button.addEventListener('click', function () {
            console.log("Botão exclusão clicado.");
            document.getElementById('formularioDeletar').classList.remove('hidden');
        });
    });

    // document.querySelectorAll('.delete').forEach(function (button) {
    //     button.addEventListener('click', function () {
    //         document.getElementById('DeleteForm').classList.remove('hidden');
    //     });
    // });

    // Esconde o formulário quando o botão "Salvar" for clicado
    // document.getElementById('saveButton').addEventListener('click', function (event) {
    //     event.preventDefault(); // Impede o envio do formulário para demonstração
    //     document.getElementById('formularioEditar').classList.add('hidden');
    // });
});

// document.addEventListener('DOMContentLoaded', function () {

//     var formularioAdicionar = document.getElementById('formularioAdicionar');
//     formularioAdicionar.addEventListener('submit', function (event) {
//         event.preventDefault();
//         var fkDeviceId = document.getElementById('id_usb').value;
//         var motivoBloqueio = document.getElementById('motivo_bloqueio').value;
//         cadastrar(fkDeviceId, motivoBloqueio);
//     });
// });

document.addEventListener('DOMContentLoaded', function () {

    var formularioEditar = document.getElementById('formularioEditar');
    formularioEditar.addEventListener('submit', function (event) {
        event.preventDefault();
        var idDispositivo = document.getElementById('id_usb_list').value;
        var novaDescricao = document.getElementById('descricao_usb').value;
        atualizarUsbDescricao(idDispositivo, novaDescricao);
    });
});

document.addEventListener('DOMContentLoaded', function () {

    var formularioDeletar = document.getElementById('formularioDeletar');
    formularioDeletar.addEventListener('submit', function (event) {
        event.preventDefault();
        var idDelete = document.getElementById('deleteId').value;
        atualizarUsbDescricao(idDelete);
    });
});

document.addEventListener('DOMContentLoaded', function () {

    var formularioEditarMotivo = document.getElementById('formularioEditarMotivo');
    formularioEditarMotivo.addEventListener('submit', function (event) {
        event.preventDefault();
        var idBlockList = document.getElementById('id_usb_blocklist').value;
        var novoMotivo = document.getElementById('novo_motivo').value;
        // console.log("idBlockList: ", idBlockList);
        atualizarUsbMotivoBloqueio(idBlockList, novoMotivo);
    });
});

// Procura pelo botão e vê se o id existe.
document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('edit_blacklist')) {
        var row = e.target.closest('tr');
        var idBlockList = row.querySelector('.id_blacklist').textContent;
        var motivoBloqueio = row.querySelector('.motivo_bloqueio_blacklist').textContent;

        document.getElementById('formularioEditarMotivo').classList.remove('hidden');
        document.getElementById('id_usb_blacklist').value = idBlockList;
        document.getElementById('novo_motivo').value = motivoBloqueio;
    }
});

document.addEventListener('DOMContentLoaded', function () {

    var formularioDeletar = document.getElementById('formularioDeletar');
    formularioDeletar.addEventListener('submit', function (event) {
        event.preventDefault();
        var idBlockList = document.getElementById('deleteId').value;

        deletarUsbBloqueado(idBlockList);
    });
});

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('delete')) {
        var row = e.target.closest('tr');
        var idBlockList = row.querySelector('.id_blacklist').textContent;

        document.getElementById('formularioDeletar').classList.remove('hidden');
        document.getElementById('deleteId').value = idBlockList;
    }
});

var idMaquina = sessionStorage.ID_MAQUINA;
var info_usb = null;

function listarUsbs() {
    console.log('Entrei na função listar usbs');
    console.log(idMaquina);

    fetch(`/usb/listarUsbs/${idMaquina}`, {
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
                var existingRow = document.querySelector(`.id_dispositivo[data-id="${usb.idDispositivo}"]`);
                if (existingRow) {
                    existingRow.closest('tr').innerHTML = `
                    <td><i class="id_dispositivo" data-id="${usb.idDispositivo}">${usb.idDispositivo}</i></td>
                    <td><i class="device_id">${usb.idDevice}</i></td>
                    <td><i class="descricao_usb">${usb.descricao}</i></td>
                    <td>
                        <button class="edit">Editar</button>
                    </td>
                `;
                } else {
                    var row = tbody.insertRow();
                    row.innerHTML = `
                    <td><i class="id_dispositivo" data-id="${usb.idDispositivo}">${usb.idDispositivo}</i></td>
                    <td><i class="device_id">${usb.idDevice}</i></td>
                    <td><i class="descricao_usb">${usb.descricao}</i></td>
                    <td>
                        <button class="edit_usb">Editar</button>
                    </td>
                `;
                }
            });
            tbody.querySelectorAll('.edit_usb').forEach(function (button) {
                button.addEventListener('click', function () {
                    var row = button.closest('tr');
                    var idDispositivo = row.querySelector('.id_dispositivo').dataset.id;
                    var descricao = row.querySelector('.descricao_usb').textContent;

                    document.getElementById('formularioEditar').classList.remove('hidden');
                    document.getElementById('id_usb_list').value = idDispositivo;
                    document.getElementById('descricao_usb').value = descricao;
                });
            });
        })
        .catch(function (error) {
            console.error(`#ERRO: ${error}`);
        });
}

function listarUsbsBloqueados() {
    console.log('Entrei na função listar usbs bloqueados');
    console.log(idMaquina);

    fetch(`/usb/listarUsbsBloqueados/${idMaquina}`, {
        method: "GET",
    })
        .then(function (response) {
            console.log('entrei na then listar usbs bloqueados');
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })

        .then(function (lista_usbs_bloqueados) {
            console.log(lista_usbs_bloqueados);

            // console.log(lista_projetos[0].qtsMaquinas);

            // var qtdMaquinas = lista_projetos[0].qtsMaquinas
            // console.log(qtdMaquinas);

            var usb_list_bloqueados = document.getElementById("tabelaUsbBloqueado");

            var tbody = usb_list_bloqueados.querySelector("tbody");
            tbody.innerHTML = "";

            if (!lista_usbs_bloqueados || lista_usbs_bloqueados.length === 0) {
                console.error('Nenhum dado de usb encontrado.');
                return;
            }
            info_usb_bloqueado = lista_usbs_bloqueados;
            lista_usbs_bloqueados.forEach(function (usb) {

                var existingRow = document.querySelector(`.id_bloqueio[data-id="${usb.idBlockList}"]`);
                if (existingRow) {
                    existingRow.closest('tr').innerHTML = `
                <td><i class="id_blacklist"></i>${usb.idBlockList}</td>
                <td><i class="motivo_bloqueio_blacklist"></i>${usb.motivoBloqueio}</td>
                <td><i class="id_dispositivo_blacklist"></i>${usb.fkDeviceId}</td>
                <td>
                    <button class="edit_blacklist">Editar</button>
                    <button class="delete">Excluir</button>
                </td>
                `;
                } else {
                    var row = tbody.insertRow();
                    row.innerHTML = `
                <td><i class="id_blacklist"></i>${usb.idBlockList}</td>
                <td><i class="motivo_bloqueio_blacklist"></i>${usb.motivoBloqueio}</td>
                <td><i class="id_dispositivo_blacklist"></i>${usb.fkDeviceId}</td>
                <td>
                    <button class="edit_blacklist">Editar</button>
                    <button class="delete">Excluir</button>
                </td>
                `;
                }
            });
            tbody.querySelectorAll('.edit_blacklist').forEach(function (button) {
                button.addEventListener('click', function () {
                    var row = button.closest('tr');
                    var idBlockList = row.querySelector('.id_blacklist').textContent;
                    var motivoBloqueio = row.querySelector('.motivo_bloqueio_blacklist').textContent;

                    // Exibir o formulário de edição com os dados preenchidos
                    document.getElementById('formularioEditarMotivo').classList.remove('hidden');
                    document.getElementById('id_usb_blacklist').value = idBlockList;
                    document.getElementById('novo_motivo').value = motivoBloqueio;
                });
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

function atualizarUsbDescricao(idDispositivo, novaDescricao) {
    fetch(`/usb/atualizarUsbDescricao/${idDispositivo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ descricao: novaDescricao })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Erro ao atualizar a descrição');
            }
            return response.json();
        })
        .then(function (data) {
            console.log('Descrição atualizada com sucesso:', data);
            document.getElementById('formularioEditar').classList.add('hidden');
            listarUsbs(); // Atualize a lista para refletir as mudanças
        })
        .catch(function (error) {
            console.error(`#ERRO: ${error}`);
        });
}

function atualizarUsbMotivoBloqueio(idBlockList, novoMotivo) {
    fetch(`/usb/atualizarUsbMotivoBloqueio/${idBlockList}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ motivoBloqueio: novoMotivo })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Erro ao atualizar o motivo bloqueio');
            }
            return response.json();
        })
        .then(function (data) {
            console.log('Motivo bloqueio atualizada com sucesso:', data);
            document.getElementById('formularioEditarMotivo').classList.add('hidden');
            listarUsbsBloqueados(); // Atualize a lista para refletir as mudanças
        })
        .catch(function (error) {
            console.error(`#ERRO: ${error}`);
        });
}

function deletarUsbBloqueado(idBlockList) {
    // console.log("Criar função de apagar usb escolhido - ID" + idBlockList);
    fetch(`/usb/deletarUsbBloqueado/${idBlockList}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Usb deletado com sucesso!");
            // window.location = "/dashboard/mural.html"
        } else if (resposta.status == 404) {
            console.log(resposta);
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a exclusão! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var idDispositivo = id_usb.value;
    var motivoBloqueio = motivo_bloqueio.value;
    if (
        idDispositivo == "" ||
        motivoBloqueio == ""
    ) 
    {
    //    cardErro.style.display = "block";
    //    mensagem_erro.innerHTML =
    //        "(Mensagem de erro para todos os campos em branco)";

        // finalizarAguardar();
    //    return false;
    } else {
        // setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/usb/cadastrar", {
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
               // cardErro.style.display = "block";

                //mensagem_erro.innerHTML =
                    "Dispositivo adicionado na blocklist! Redirecionando para tela...";

                setTimeout(() => {
                    window.location = "dispositivoUsb.html";
                }, 1000);

                // limparFormulario();
                // finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar adicionar o dispositivo!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

    // return false;
}
