var idEmpresa = sessionStorage.ID_EMPRESA;
console.log(idEmpresa);

let listaProjetos = [];
let projetoQuadrado = null;

function cadastrarProjeto() {

    var nomeDemanda = input_nomeDemanda_create.value;
    var dataInicio = input_dataInicio_create.value;
    var responsavel = input_responsavel_create.value;
    var descricao = input_descricao_create.value;
    var dataTermino = input_dataTermino_create.value;
    
    console.log("nomeDemanda: ", nomeDemanda);
    console.log("dataInicio: ", dataInicio);
    console.log("responsavel: ", responsavel);
    console.log("responsavel: ", descricao);
    console.log("dataTermino: ", dataTermino)
    
    if (
        nomeDemanda == "" ||
        dataInicio == "" ||
        responsavel == "" ||
        descricao == "" ||
        dataTermino == "" 
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "(Mensagem de erro para todos os campos em branco)";
    
        return false;
    } else {
        
    }
    
    fetch("/projetos/cadastrarProjeto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeDemandaServer: nomeDemanda,
            dataInicioServer: dataInicio,
            responsavelServer: responsavel,
            descricaoServer: descricao,
            dataTerminoServer: dataTermino,
            idEmpresa: sessionStorage.ID_EMPRESA
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
    
            if (resposta.ok) {
                cardErro.style.display = "block";
    
                mensagem_erro.innerHTML =
                    "Projeto adicionado, Redirecionando para tela...";
    
                setTimeout(() => {
                    window.location = "projetos.html";
                }, "2000");
    
            } else {
                throw "Houve um erro ao tentar cadastrar o projeto!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
    
        });
    
}

function editarProjeto(novoNomeDemanda, novaDataInicio, novoResponsavel, novaDescricao, novaDataTermino) {

    console.log(descricaoTela);
    console.log(destinoTela);

    var novoNomeDemanda = input_nomeDemanda_create.value;
    var novaDataInicio = input_dataInicio_create.value;
    var novoResponsavel = input_responsavel_create.value;
    var novaDescricao = input_descricao_create.value;
    var novaDataTermino = input_dataTermino_create.value;

    
    if (novoNomeDemanda == "") {
        console.log('entrei if novo nome demanda');
    } else if (novaDataInicio == "") {
        console.log('entrei if novo nome demanda');
    } else if (novoResponsavel == "") {
        console.log('entrei if novo nome demanda');
    } else if (novaDescricao == "") {
        console.log('entrei if novo nome demanda');
    } else if (novaDataTermino == "") {
        console.log('entrei if novo nome demanda');
    }

    fetch(`/projetos/editarProjeto/${idProjeto}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeDemandaServer: input_nomeDemanda_create.value,
            dataInicioServer: input_dataInicio_create.value,
            responsavelServer: input_responsavel_create.value,
            descricaoServer: input_descricao_create.value,
            dataTerminoServer: input_dataTermino_create.value,

        })
    })
        .then(function (resposta) {

            if (resposta.ok) {
                cardErro.style.display = "block";
                mensagem_erro.innerHTML =
                    "Atualizando dados...";

                // window.alert("Máquina atualizada com sucesso!");
                listarProjetos();
                // window.location = "maquinaDash.html"

            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a edição! Código da resposta: " + resposta.status);
            }

            setInterval(sumirMensagem, 5000);

        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function sumirMensagem() {
    cardErro.style.display = "none";
}

var info_projetos = null;
function listarProjetos() {
    console.log('entrei na função listar projetos');
    console.log(idEmpresa);
    fetch(`/projetos/${idEmpresa}`, {
        method: "GET",
    })
        .then(function (response) {
            console.log('entrei na then listar projetos');
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })


        .then(function (lista_projetos) {
            console.log(lista_projetos);

            // console.log(lista_projetos[0].qtsMaquinas);

            // var qtdMaquinas = lista_projetos[0].qtsMaquinas
            // console.log(qtdMaquinas);

            if (!lista_projetos || lista_projetos.length === 0) {
                console.error('Nenhum dado de projeto encontrado.');
                return;
            }
            info_projetos = lista_projetos
            lista_projetos.forEach(function (projeto) {
                div_projects.innerHTML += `
                    <div class="project-card">
                        <div class="card-alert" id="dangerous">Alert</div>
                        <div class="updateProject"><i onclick="abrirModalUpdate()" class="fa-solid fa-arrows-rotate"></i></div>
                        <div class="deleteProject"><i onclick="abrirModalDelete()" class="fa-solid fa-trash"></i></div>

                        <div class="qtd-machines">
                            <p>Máquinas Alocadas</p>
                            <i>${projeto.qtsMaquinas}</i>
                        </div>

                        <div class="nameDemand">
                            <p>Nome Demanda</p>
                            <i>${projeto.nomeDemanda}</i>
                        </div>

                        <div class="infoProject">
                            <div class="dtInicio">
                                <p>Inicio:</p>
                                <i>${projeto.dataInicio}</i>
                            </div>
                            <div class="responsavel">
                                <p>Responsável:</p>
                                <i>${projeto.responsavel}</i>
                            </div>
                            <div class="dtTermino">
                                <p>Término:</p>
                                <i>${projeto.dataTermino}</i>
                            </div>
                        </div>

                        <div class="statusProject">
                            <div class="spaceButton">
                                <button data-id="${projeto.idProjeto}" class="button-go-project">Acessar Projeto</button>
                            </div>
                        </div>

                    </div>
            `;
            listaProjetos.push(projeto.idProjeto);
            });

            console.log('lista projeto:');
            console.log(listaProjetos);

            projetoQuadrado = document.querySelectorAll('.project-card');

            entrarDashProjeto();

            // var boxProjetos = document.querySelectorAll(".project-card");
            // // var boxQtd = document.querySelectorAll(".nameDemand");
            // for (var i = 0; i < boxProjetos.length; i++) {
            //     boxProjetos[i].addEventListener('click', acessarProjeto);
            //     // boxQtd[i].addEventListener('click', selectProjeto)
            // }
        })
        .catch(function (error) {
            console.error(`#ERRO: ${error}`);
        });
}

var idProjetoRota = 0;
function entrarDashProjeto() {    

    projetoQuadrado.forEach((projeto, index) => {
        projeto.addEventListener("click", function () {
            console.log('entrei na função entrar dash projeto');

            idProjetoRota = listaProjetos[index];

            console.log(`idProjetoRota: ${idProjetoRota}`);

            fetch(`/projetos/${idProjetoRota}`, {
                method: "GET",
            }).then(function (response = idProjetoRota) {

                console.log('entrei na then entrar dash projeto');
                if (!response.ok) {
                    throw new Error('Erro ao carregar os dados');
                }
                return response.json();
            })

            setTimeout(() => {
                window.location = `DashProjeto.html?idProjetoRota=${idProjetoRota}`;
            }, "1000");
        })
    })

}

console.log(idProjetoRota);

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

// Modal [CRUD] - CREATE projetos sair
function abrirModalCreate() {
    const modal = document.getElementById('janela-modal-crud-create')

    modal.classList.add('abrir')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'close' || e.target.id == 'janela-modal-crud-create' || e.target.id == 'close-button') {
            modal.classList.remove('abrir')
        }
    }) 
}

// Modal [CRUD] - UPDATE projetos sair
function abrirModalUpdate() {
    const modal = document.getElementById('janela-modal-crud-update')

    modal.classList.add('abrir')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'close' || e.target.id == 'janela-modal-crud-update' || e.target.id == 'close-button') {
            modal.classList.remove('abrir')
        }
    }) 
}

// Modal [CRUD] - DELETE projetos sair
function abrirModalDelete() {
    const modal = document.getElementById('janela-modal-crud-delete')

    modal.classList.add('abrir')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'close' || e.target.id == 'janela-modal-crud-delete' || e.target.id == 'close-button') {
            modal.classList.remove('abrir')
        }
    }) 
}

// function criarProjeto() {
       
//     nomeDemandaVar = input_nomeDemanda.value;
//     dataInicioVar = input_dataInicio.value;
//     responsavelVar = input_responsavel.value;
//     dataTerminoVar = input_dataTermino.value;

//     console.log("Nome da Demanda:", nomeDemandaVar);
//     console.log("Data de Início:", dataInicioVar);
//     console.log("Responsável:", responsavelVar);
//     console.log("Data de Término:", dataTerminoVar);

//     if (
//         nomeDemandaVar == "" ||
//         dataInicioVar == "" ||
//         responsavelVar == "" ||
//         dataTerminoVar == ""
//     ) 

//     {
//        cardErro.style.display = "block";
//        mensagem_erro.innerHTML =
//             "Preencha todos os campos";
//     } else if (nomeDemandaVar.length > 25) {
//         cardErro.style.display = "block";
//         mensagem_erro.innerHTML =
//             "Insira um nome para demanda válido";
//     } else if (responsavelVar.length > 25) {
//         cardErro.style.display = "block";
//         mensagem_erro.innerHTML =
//             "Insira um responsavel válido!";
//     } else {
//         cardErro.style.display = "block";
//         mensagem_erro.innerHTML =
//             "Projeto criado com sucesso";
//     }

//     fetch("/projeto/criarProjeto", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             nomeDemandaServer: nomeDemandaVar,
//             dataInicioServer: dataInicioVar,
//             responsavelServer: responsavelVar,
//             dataTerminoServer: dataTerminoVar
//         }),
//     })
//         .then(function (resposta) {
//             console.log("resposta: ", resposta);

//             if (resposta.ok) {
            
//                 cardErro.style.display = "block";

//                 mensagem_erro.innerHTML =
//                     "Projeto criado com sucesso";
                
//             } else {
//                 throw "Houve um erro ao tentar realizar a criação do Projeto!";
//             }
//         })
//         .catch(function (resposta) {
//             console.log(`#ERRO: ${resposta}`);
//         });

// }

// var idEmpresa = sessionStorage.ID_EMPRESA;
// var info_projetos = null

// function listarProjetos() {
//     console.log('Entrei na função listar projetos');
//     console.log(idEmpresa);

//     fetch(`/projeto/listarProjetos/${idEmpresa}`, {
//         method: "GET",
//     })
//         .then(function (response) {
//             console.log('entrei na then listar projetos');
//             if (!response.ok) {
//                 throw new Error('Erro ao carregar os dados');
//             }
//             return response.json();
//         })

//         .then(function (lista_projetos) {
//             console.log(lista_projetos);

//             var projetos_list = document.getElementById("div_projects");

//             var project_card = projetos_list.querySelector("project-card");
//             project_card.innerHTML = "";

//             if (!lista_projetos || lista_projetos.length === 0) {
//                 console.error('Nenhum dado de projeto encontrado.');
//                 return;
//             }
//             info_projetos = lista_projetos
//             lista_projetos.forEach(function (projeto) {
//                 var existingRow = document.querySelector(`.qtd-machines[Nome Demanda="${projeto.nomeDemanda}"]`);
//                 if (existingRow) {
//                     existingRow.closest('project-card').innerHTML = `
//                     <div class="project-card">
//                         <div class="card-alert" id="dangerous">Alert</div>
//                         <div class="updateProject"><i onclick="abrirModalUpdate()" class="fa-solid fa-arrows-rotate"></i></div>
//                         <div class="deleteProject"><i onclick="abrirModalDelete()" class="fa-solid fa-trash"></i></div>

//                         <div class="qtd-machines">
//                             <p>Máquinas Alocadas</p>
//                             <i>${projeto.qtsMaquinas}</i>
//                         </div>

//                         <div class="nameDemand">
//                             <p>Nome Demanda</p>
//                             <i>${projeto.nomeDemanda}</i>
//                         </div>

//                         <div class="infoProject">
//                             <div class="dtInicio">
//                                 <p>Inicio:</p>
//                                 <i>${projeto.dataInicio}</i>
//                             </div>
//                             <div class="responsavel">
//                                 <p>Responsável:</p>
//                                 <i>${projeto.responsavel}</i>
//                             </div>
//                             <div class="dtTermino">
//                                 <p>Término:</p>
//                                 <i>${projeto.dataTermino}</i>
//                             </div>
//                         </div>

//                         <div class="statusProject">
//                             <div class="status1">
//                                 <p>Máquinas em perigo: 0</p>
//                                 <p>Máquinas em atenção: 0</p>
//                             </div>
//                             <div class="spaceButton">
//                                 <button class="button-go-project">Acessar Projeto</button>
//                             </div>
//                         </div>

//                     </div>
//             `;
//                 } else {
//                     var row = div_projects.insertRow();
//                     row.innerHTML = `
//                     <div class="project-card">
//                         <div class="card-alert" id="dangerous">Alert</div>
//                         <div class="updateProject"><i onclick="abrirModalUpdate()" class="fa-solid fa-arrows-rotate"></i></div>
//                         <div class="deleteProject"><i onclick="abrirModalDelete()" class="fa-solid fa-trash"></i></div>

//                         <div class="qtd-machines">
//                             <p>Máquinas Alocadas</p>
//                             <i>${projeto.qtsMaquinas}</i>
//                         </div>

//                         <div class="nameDemand">
//                             <p>Nome Demanda</p>
//                             <i>${projeto.nomeDemanda}</i>
//                         </div>

//                         <div class="infoProject">
//                             <div class="dtInicio">
//                                 <p>Inicio:</p>
//                                 <i>${projeto.dataInicio}</i>
//                             </div>
//                             <div class="responsavel">
//                                 <p>Responsável:</p>
//                                 <i>${projeto.responsavel}</i>
//                             </div>
//                             <div class="dtTermino">
//                                 <p>Término:</p>
//                                 <i>${projeto.dataTermino}</i>
//                             </div>
//                         </div>

//                         <div class="statusProject">
//                             <div class="status1">
//                                 <p>Máquinas em perigo: 0</p>
//                                 <p>Máquinas em atenção: 0</p>
//                             </div>
//                             <div class="spaceButton">
//                                 <button class="button-go-project">Acessar Projeto</button>
//                             </div>
//                         </div>

//                     </div>
//             `;
//                 }
//             });
//             tbody.querySelectorAll('.edit_usb').forEach(function (button) {
//                 button.addEventListener('click', function () {
//                     var row = button.closest('tr');
//                     var idDispositivo = row.querySelector('.id_dispositivo').dataset.id;
//                     var descricao = row.querySelector('.descricao_usb').textContent;

//                     document.getElementById('formularioEditar').classList.remove('hidden');
//                     document.getElementById('id_usb_list').value = idDispositivo;
//                     document.getElementById('descricao_usb').value = descricao;
//                 });
//             });
//         })
//         .catch(function (error) {
//             console.error(`#ERRO: ${error}`);
//         });
// }

// var idEmpresa = sessionStorage.ID_EMPRESA;
// var info_projetos = null;

// function listarProjetos() {
//     console.log('Entrei na função listar projetos');
//     console.log(idEmpresa);

//     fetch(`/projetos/listarProjetos/${idEmpresa}`, {
//         method: "GET",
//     })
//     .then(function (response) {
//         console.log('entrei na then listar projetos');
//         if (!response.ok) {
//             throw new Error('Erro ao carregar os dados');
//         }
//         return response.json();
//     })
//     .then(function (lista_projetos) {
//         console.log(lista_projetos);

//         var projectListDiv = document.getElementById("divProjetos");

//         projectListDiv.innerHTML = "";

//         if (!lista_projetos || lista_projetos.length === 0) {
//             console.error('Nenhum dado de projeto encontrado.');
//             return;
//         }
//         info_projetos = lista_projetos
//         lista_projetos.forEach(function (projeto) {
//             var existingRow = document.querySelector(`.qtd-machines[data-id="${projeto.nomeDemanda}"]`);
//             if (existingRow) {
//                 existingRow.innerHTML =  `
//                 <div class="project-card">
//                     <div class="card-alert" id="dangerous">Alert</div>
//                     <div class="updateProject"><i onclick="abrirModalUpdate()" class="fa-solid fa-arrows-rotate"></i></div>
//                     <div class="deleteProject"><i onclick="abrirModalDelete()" class="fa-solid fa-trash"></i></div>

//                     <div class="qtd-machines">
//                         <p>Máquinas Alocadas</p>
//                         <i>${projeto.qtsMaquinas}</i>
//                     </div>

//                     <div class="nameDemand">
//                         <p>Nome Demanda</p>
//                         <i>${projeto.nomeDemanda}</i>
//                     </div>

//                     <div class="infoProject">
//                         <div class="dtInicio">
//                             <p>Inicio:</p>
//                             <i>${projeto.dataInicio}</i>
//                         </div>
//                         <div class="responsavel">
//                             <p>Responsável:</p>
//                             <i>${projeto.responsavel}</i>
//                         </div>
//                         <div class="dtTermino">
//                             <p>Término:</p>
//                             <i>${projeto.dataTermino}</i>
//                         </div>
//                     </div>

//                     <div class="statusProject">
//                         <div class="status1">
//                             <p>Máquinas em perigo: 0</p>
//                             <p>Máquinas em atenção: 0</p>
//                         </div>
//                         <div class="spaceButton">
//                             <button class="button-go-project">Acessar Projeto</button>
//                         </div>
//                     </div>

//                 </div>
//         `;
//             } else {
//                 var projectDiv = document.createElement('div');
//                 projectDiv.innerHTML = `
//                     <div class="project-card">
//                         <div class="id_projeto" data-id="${projeto.idProjeto}">${projeto.idProjeto}</div>
//                         <div class="nome_demanda">${projeto.nomeDemanda}</div>
//                         <div class="data_inicio">${projeto.dataInicio}</div>
//                         <div class="responsavel">${projeto.responsavel}</div>
//                         <div class="data_termino">${projeto.dataTermino}</div>
//                         <button class="edit_projeto">Editar</button>
//                     </div>
//                 `;
//                 projectListDiv.appendChild(projectDiv);
//             }
//         });

//         document.querySelectorAll('.edit_projeto').forEach(function (button) {
//             button.addEventListener('click', function () {
//                 var projectCard = button.closest('.project-card');
//                 var idProjeto = projectCard.querySelector('.id_projeto').dataset.id;
//                 var nomeDemanda = projectCard.querySelector('.nome_demanda').textContent;
//                 var dataInicio = projectCard.querySelector('.data_inicio').textContent;
//                 var responsavel = projectCard.querySelector('.responsavel').textContent;
//                 var dataTermino = projectCard.querySelector('.data_termino').textContent;

//                 document.getElementById('formularioEditar').classList.remove('hidden');
//                 document.getElementById('id_projeto_list').value = idProjeto;
//                 document.getElementById('nome_demanda').value = nomeDemanda;
//                 document.getElementById('data_inicio').value = dataInicio;
//                 document.getElementById('responsavel').value = responsavel;
//                 document.getElementById('data_termino').value = dataTermino;
//             });
//         });
//     })
//     .catch(function (error) {
//         console.error(`#ERRO: ${error}`);
//     });
// }