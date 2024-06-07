// const ctx = document.getElementById('myChart');
// console.log(ctx);
// new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//         labels: ['Total Máquinas', 'Atenção', 'Perigo'],
//         datasets: [
//         {
//             label: 'Máquinas',
//             data: [20, 0, 2],
//             backgroundColor: '#FDAD00',
//             borderColor: 'white',
//             borderWidth: 2,
//             fill: true
//         }]
//     },
//     options: {
//         maintainAspectRatio: false,
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//         plugins: {
//             title: {
//                 display: true,
//                 text: "Quantidade de máquinas alocadas",
//                 color: 'white',
//                 font: {
//                     size: 10,
//                 }
//             }
//         },
//         elements: {
//             line: {
//                 cubicInterpolationMode: 'monotone'
//             }
//         }
//     }
// });

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

var idEmpresa = sessionStorage.ID_EMPRESA;
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
                div_projetos.innerHTML += `
                <div class="project-card">
                
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
                        <div class="status1">
                            <p>Máquinas em perigo: 0</p>
                            <p>Máquinas em atenção: 0</p>
                        </div>
                        <div class="spaceButton">
                            <button onclick="acessarProjeto()" class="button-go-project">Acessar Projeto</button>
                        </div>
                    </div>

                </div>
            `
            });
            var boxProjetos = document.querySelectorAll(".project-card");
            // var boxQtd = document.querySelectorAll(".nameDemand");
            for (var i = 0; i < boxProjetos.length; i++) {
                boxProjetos[i].addEventListener('click', acessarProjeto);
                // boxQtd[i].addEventListener('click', selectProjeto)
            }
        })
        .catch(function (error) {
            console.error(`#ERRO: ${error}`);
        });
}