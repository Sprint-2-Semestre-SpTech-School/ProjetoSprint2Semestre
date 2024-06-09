// const { kpiMaquinaPacotes } = require("../../src/models/kpiMaquinaModel");

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

function telaProjeto() {
    setTimeout(() => {
        window.location = "projetos.html";
    }, "100");
}

function dashProjeto() {
    setTimeout(() => {
        window.location = "DashProjeto.html";
    }, "100");
}

function dashMaq() {
    setTimeout(() => {
        window.location = "maquinaDash.html";
    }, "100");
}

const ctx = document.getElementById('usoCpuRam');
console.log(ctx);
const cpuRamChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'],
        datasets: [{
            label: 'CPU',
            data: [43, 40, 32, 20, 18, 15, 13, 14, 15],
            backgroundColor: '#061980',
            borderColor: '#c7eaf6',
            borderWidth: 2,
            fill: true
        },
        {
            label: 'RAM',
            data: [70, 73, 74, 72, 80, 78, 76, 75, 74],
            backgroundColor: '#e8e052',
            borderColor: '#eeff83',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Uso de CPU e RAM a cada 05 segundos",
                color: 'white',
                font: {
                    size: 20,
                    // weigth: 'lighter',
                }
            }
        },
        elements: {
            line: {
                cubicInterpolationMode: 'monotone'
            }
        }
    }
});

const ctx2 = document.getElementById('qtdLeiturasEscritas');
console.log(ctx);
const discoChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        datasets: [{
            label: 'Escritas',
            data: [5255, 7753, 3321, 1100, 3300, 1000, 7777],
            borderWidth: 5,
            backgroundColor: '#3083f0',
        },
        {
            label: 'Lidas',
            data: [3423, 2112, 3211, 3421, 3903, 2532, 2122],
            borderWidth: 5,
            backgroundColor: '#e8e052',
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: "Quantidade de leituras e escritas do HD",
                color: 'white',
                font: {
                    size: 25,
                    weigth: 'bold',
                }
            }
        },
        elements: {
            line: {
            }
        }
    }
});

const ctx3 = document.getElementById('usoVolume');
console.log(ctx3);
const discoBytesChart = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        datasets: [
            {
                label: 'Utilizado',
                data: [43, 4, 90, 95, 50, 60, 23, 41, 20],
                borderColor: '#eeff83',
                backgroundColor: '#e8e052',
            },
            {
                label: 'Disponível',
                data: [43, 40, 50, 55, 58, 70, 73, 84, 85],
                borderColor: '#061980',
                backgroundColor: '#061980',
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Uso de Volume",
                color: 'white',
                font: {
                    size: 20,
                    // weigth: 'lighter',
                }
            }
        }
    },
});

var idEmpresa = sessionStorage.ID_EMPRESA;
console.log(idEmpresa);

// var idMaquinaRota = response;

const urlParams = new URLSearchParams(window.location.search);
const idMaquinaRota = urlParams.get('idMaquinaRota');

console.log(idMaquinaRota);

// function entrarDashMaquina() {    

//     maquinaBolinha.forEach((maquina, index) => {
//         maquina.addEventListener("click", function () {
//             console.log('entrei na função entrar dash máquina');

//             idMaquinaRota = listaMaq[index];

//             fetch(`/dashProjeto/${idMaquinaRota}`, {
//                 method: "GET",
//             }).then(function (response = idMaquinaRota) {

//                 console.log('entrei na then entrar dash maquina');
//                 if (!response.ok) {
//                     throw new Error('Erro ao carregar os dados');
//                 }
//                 return response.json();
//             })

//             setTimeout(() => {
//                 window.location = "maquinaDash.html";
//             }, "1000");
//         })
//     })

// }

// var idMaquinaRota = sessionStorage.ID_MAQUINA;
// var idMaquinaRota = 501;
console.log(idMaquinaRota)
// PEGANDO DADOS DO INFO HARDWARE
function buscarDadosHardware() {
    console.log(idMaquinaRota)
    fetch(`/maquina/buscarDadosHardware/${idMaquinaRota}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

        .then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));
            resposta.json()
                .then((json) => {
                    console.log(json);
                    console.log(json[0].tipoHardware);

                    console.log(json);
                    console.log(json[0].nomeHardware);

                    console.log(json);
                    console.log(json[0].valorTotal);

                    console.log(json);
                    console.log(json[0].unidadeCaptacao);

                    var tipoHardwareTela1 = json[0].tipoHardware;
                    var tipoHardwareTela2 = json[1].tipoHardware;
                    var tipoHardwareTela3 = json[2].tipoHardware;
                    var tipoHardwareTela4 = json[3].tipoHardware;
                    console.log(tipoHardwareTela1);
                    console.log(tipoHardwareTela2);
                    console.log(tipoHardwareTela3);
                    console.log(tipoHardwareTela4);

                    var nomeHardwareTela1 = json[0].nomeHardware;
                    var nomeHardwareTela2 = json[1].nomeHardware;
                    var nomeHardwareTela3 = json[2].nomeHardware;
                    var nomeHardwareTela4 = json[3].nomeHardware;
                    console.log(nomeHardwareTela1);
                    console.log(nomeHardwareTela2);
                    console.log(nomeHardwareTela3);
                    console.log(nomeHardwareTela4);

                    var valorTotalTela1 = json[0].valorTotal
                    var valorTotalTela2 = json[1].valorTotal;
                    var valorTotalTela3 = json[2].valorTotal;
                    var valorTotalTela4 = json[3].valorTotal;
                    console.log(valorTotalTela1);
                    console.log(valorTotalTela2);
                    console.log(valorTotalTela3);
                    console.log(valorTotalTela4);

                    var unidadeCaptacaoTela1 = json[0].unidadeCaptacao
                    var unidadeCaptacaoTela2 = json[1].unidadeCaptacao;
                    var unidadeCaptacaoTela3 = json[2].unidadeCaptacao;
                    var unidadeCaptacaoTela4 = json[3].unidadeCaptacao;
                    console.log(unidadeCaptacaoTela1);
                    console.log(unidadeCaptacaoTela2);
                    console.log(unidadeCaptacaoTela3);
                    console.log(unidadeCaptacaoTela4);

                    var nomeHardwareTela = json[0].nomeHardware
                    console.log(nomeHardwareTela);

                    var valorTotalTela = json[0].valorTotal
                    console.log(valorTotalTela);

                    var unidadeCaptacaoTela = json[0].unidadeCaptacao
                    console.log(unidadeCaptacaoTela);

                    var telaInfoHardware = document.getElementById("div_infoHardware")
                    telaInfoHardware.innerHTML = `
                    <div class="divTituloGrande">
                        <h3 class="tituloHardware"><i class="fas fa-laptop"></i> Dados do hardware</h3>
                    </div>
                    <div id="div_titulos" class="titulos">
                        <div class="tipoTitulo">
                            <p>Tipo do hardware</p>
                        </div>

                        <div class="nomeTitulo">
                            <p>Nome do hardware</p>
                        </div>

                        <div class="valorUnidadeTitulo">
                            <p>Valor Total</p>
                         </div>
                    </div>

                    <div class="infos">                          
                        <div id="div_tipoHardware" class="hardware">
                            <div class="tipo">
                                <p>${tipoHardwareTela1}</p>
                            </div>

                            <div class="nome">
                                <p>${nomeHardwareTela1}</p>
                            </div>

                            <div class="valorUnidade">
                                <p>${valorTotalTela1}${unidadeCaptacaoTela1}</p>
                            </div>
                        </div>

                        <div id="div_nomeHardware" class="hardware">
                          <div class="tipo">
                                <p>${tipoHardwareTela2}</p>
                            </div>

                            <div class="nome">
                                <p>${nomeHardwareTela2}</p>
                            </div>

                            <div class="valorUnidade">
                                <p>${valorTotalTela2}${unidadeCaptacaoTela2}</p>
                            </div>
                        </div>                   

                        <div id="div_valorTotal" class="hardware">
                           <div class="tipo">
                                <p>${tipoHardwareTela3}</p>
                            </div>

                            <div class="nome">
                                <p>${nomeHardwareTela3}</p>
                            </div>

                            <div class="valorUnidade">
                                <p>${valorTotalTela3}${unidadeCaptacaoTela3}</p>
                            </div>
                        </div>

                        <div id="div_valorTotal" class="hardware">
                            <div class="tipo">
                                <p>${tipoHardwareTela4}</p>
                            </div>

                            <div class="nome">
                                <p>${nomeHardwareTela4}</p>
                            </div>

                            <div class="valorUnidade">
                                <p>${valorTotalTela4}${unidadeCaptacaoTela4}</p>
                            </div>
                        </div>
                    </div>
                `;
                })
        })

        .catch(function (erro) {
            console.error('Erro desconhecido na API.');
        }
        );
}

// PRIMEIRA KPI - TEMPO DE ATIVIDADE
function kpiMaquinaLeituras() {
    console.log(idMaquinaRota)
    fetch(`/kpiMaquina/kpiMaquinaLeituras/${idMaquinaRota}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

        .then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));
            resposta.json()
                .then((json) => {
                    console.log(json);
                    console.log(json[0].maiorRegistro);

                    var maiorRegistroTela = json[0].maiorRegistro
                    console.log(maiorRegistroTela);

                    var telaKpiLeitura = document.getElementById("id_kpi01")
                    telaKpiLeitura.innerHTML = `${maiorRegistroTela}`;

                })
        })

        .catch(function (erro) {
            console.error('Erro desconhecido na API.');
        }
        );
}

// SEGUNDA KPI - USO DE CPU
function kpiMaquinaCpu() {
    console.log(idMaquinaRota)
    fetch(`/kpiMaquina/kpiMaquinaCpu/${idMaquinaRota}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

        .then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));
            resposta.json()
                .then((json) => {
                    console.log(json);
                    console.log(json[0].maiorRegistroCpu);

                    var maiorRegistroCpuTela = json[0].maiorRegistroCpu;
                    console.log(maiorRegistroCpuTela);

                    var telaKpiCpu = document.getElementById("id_kpi02");
                    var telaKpiCpuImg = document.getElementById("id_kpiImg02");

                    while (telaKpiCpuImg.firstChild) {
                        telaKpiCpuImg.removeChild(telaKpiCpuImg.firstChild);
                    }
                    var img = document.createElement('img');

                    if (maiorRegistroCpuTela <= 75) {
                        telaKpiCpu.style.color = 'rgb(148, 255, 148)';
                        telaKpiCpu.innerHTML = `${maiorRegistroCpuTela}%`;

                        img.src = './assets/imgs/check-removebg-preview.png';
                        img.alt = 'Bom';
                        img.style.width = '2vw';

                    } else if (maiorRegistroCpuTela <= 90) {
                        telaKpiCpu.style.color = 'rgb(220, 143, 0)';
                        telaKpiCpu.innerHTML = `${maiorRegistroCpuTela}%`;

                        img.src = './assets/imgs/atencao-removebg-preview.png';
                        img.alt = 'Atencao';
                        img.style.width = '2vw';

                    } else {
                        telaKpiCpu.style.color = 'rgb(255, 9, 9)';
                        telaKpiCpu.innerHTML = `${maiorRegistroCpuTela}%`;

                        img.src = './assets/imgs/erro-removebg-preview.png';
                        img.alt = 'Ruim';
                        img.style.width = '1vw';

                    }

                    telaKpiCpuImg.appendChild(img);

                })
        })

        .catch(function (erro) {
            console.error('Erro desconhecido na API.');
        }
        );
}

// TERCEIRA KPI - USO DE RAM
function kpiMaquinaRam() {
    console.log(idMaquinaRota)
    fetch(`/kpiMaquina/kpiMaquinaRam/${idMaquinaRota}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

        .then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));
            resposta.json()
                .then((json) => {
                    console.log(json);
                    console.log(json[0].maiorRegistroRam);

                    var maiorRegistroRamTela = json[0].maiorRegistroRam;
                    console.log(maiorRegistroRamTela);

                    var telaKpiRam = document.getElementById("id_kpi03");
                    var telaKpiRamImg = document.getElementById("id_kpiImg03");

                    while (telaKpiRamImg.firstChild) {
                        telaKpiRamImg.removeChild(telaKpiRamImg.firstChild);
                    }
                    var img = document.createElement('img');

                    if (maiorRegistroRamTela <= 75) {
                        telaKpiRam.style.color = 'rgb(148, 255, 148)';
                        telaKpiRam.innerHTML = `${maiorRegistroRamTela}%`;

                        img.src = './assets/imgs/check-removebg-preview.png';
                        img.alt = 'Bom';
                        img.style.width = '2vw';

                    } else if (maiorRegistroRamTela <= 90) {
                        telaKpiRam.style.color = 'rgb(220, 143, 0)';
                        telaKpiRam.innerHTML = `${maiorRegistroRamTela}%`;

                        img.src = './assets/imgs/atencao-removebg-preview.png';
                        img.alt = 'Atencao';
                        img.style.width = '2vw';

                    } else {
                        telaKpiRam.style.color = 'rgb(255, 9, 9)';
                        telaKpiRam.innerHTML = `${maiorRegistroRamTela}%`;

                        img.src = './assets/imgs/erro-removebg-preview.png';
                        img.alt = 'Ruim';
                        img.style.width = '1vw';
                    }

                    telaKpiRamImg.appendChild(img);

                })
        })

        .catch(function (erro) {
            console.error('Erro desconhecido na API.');
        }
        );
}

// PEGANDO DADOS PARA OS ALERTAS
function buscarDadosAlerta() {

    console.log('entrei no buscardadosalerta');
    fetch(`/maquina/buscarDadosAlerta/${idMaquinaRota}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        console.log("Dados recebidos: ", JSON.stringify(resposta));
        resposta.json()
            .then((json) => {
                console.log(json);

                var ultimoDado = json[json.length - 1];
                console.log('Último dado:', ultimoDado);

                var alertaCpu = ultimoDado.usoCpu;

                console.log('alertaCpu:', alertaCpu);

                alertasCpu(alertaCpu);

            })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function buscarDadosAlertaRam() {

    console.log('entrei no buscardadosalerta');
    fetch(`/maquina/buscarDadosAlertaRam/${idMaquinaRota}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        console.log("Dados recebidos: ", JSON.stringify(resposta));
        resposta.json()
            .then((json) => {
                console.log(json);

                var ultimoDadoRam = json[json.length - 1];
                console.log('Último dado:', ultimoDadoRam);

                var alertaRam = ultimoDadoRam.usoRam;

                console.log('alertaRam:', alertaRam);

                alertasRam(alertaRam);

            })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

// PEGANDO DADOS PARA OS DOIS GRÁFICOS DE CIMA
function buscarDados() {
    fetch(`/maquina/buscarDados/${idMaquinaRota}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            atualizarGraficos(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

// PEGANDO OS DADOS PARA O GRÁFICO DE BAIXO
function buscarDadosVolume() {
    fetch(`/maquina/buscarDadosVolume/${idMaquinaRota}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (respostaVolume) {
        respostaVolume.json().then(respostaVolume => {
            atualizarGraficosVolume(respostaVolume);
        })
    })
        .catch(function (respostaVolume) {
            console.log(`#ERRO: ${respostaVolume}`);
        });
}

// ATUALIZANDO GRÁFICOS
function atualizarGraficos(resposta) {
    console.log("Iniciando atualização dos gráficos...");

    // Cpu & Ram
    const cpuData = resposta.filter(item => item.nomeRegistro == "usoCpu");
    const ramData = resposta.filter(item => item.nomeRegistro == "usoRam");

    // Rede
    const discoLeiturasData = resposta.filter(item => item.nomeRegistro == "leituras");
    const discoEscritasData = resposta.filter(item => item.nomeRegistro == "escritas");

    console.log("Chegou em labels e values")
    const labelsCpu = cpuData.map(item => new Date(item.tempoCapturas).toLocaleTimeString()); // Pegar um valor pra base de tempo
    const cpuValues = cpuData.map(item => parseFloat(item.valorRegistro));
    const ramValues = ramData.map(item => parseFloat(item.valorRegistro));

    const labelsRede = discoLeiturasData.map(item => new Date(item.tempoCapturas).toLocaleTimeString());
    const discoLeiturasValues = discoLeiturasData.map(item => parseFloat(item.valorRegistro));
    const discoEscritasValues = discoEscritasData.map(item => parseFloat(item.valorRegistro));

    console.log("Chegou nos datasets");

    if (cpuRamChart.data.labels.length >= 10) { // Tamanho máximo das labels de 10
        cpuRamChart.data.labels.shift(); // Remove primeiro elemento do Array 
    }
    cpuRamChart.data.labels.push(labelsCpu[labelsCpu.length - 1]);

    if (cpuRamChart.data.datasets[0].data.length >= 10) {
        cpuRamChart.data.datasets[0].data.shift();
        cpuRamChart.data.datasets[1].data.shift();
    }
    cpuRamChart.data.datasets[0].data.push(cpuValues[cpuValues.length - 1]);
    cpuRamChart.data.datasets[1].data.push(ramValues[ramValues.length - 1]); // Pegando o dado e ajustando index

    if (discoChart.data.labels.length >= 10) {
        discoChart.data.labels.shift();
    }
    discoChart.data.labels.push(labelsRede[labelsRede.length - 1]);

    if (discoChart.data.datasets[0].data.length >= 10) {
        discoChart.data.datasets[0].data.shift();
        discoChart.data.datasets[1].data.shift();
    }
    discoChart.data.datasets[0].data.push(discoLeiturasValues[discoLeiturasValues.length - 1]);
    discoChart.data.datasets[1].data.push(discoEscritasValues[discoEscritasValues.length - 1]);

    console.log("Terminou datasets");


    cpuRamChart.update();
    discoChart.update();
    // discoBytesChart.update();
    console.log("Atualizando...");

}

// ATUALIZANDO GRÁFICO DE BAIXO
function atualizarGraficosVolume(respostaVolume) {
    console.log("Iniciando atualização dos gráficos de volume...");

    // DISCO VOLUME
    const discoMemoriaUtilizadaData = respostaVolume.filter(item => item.tipoHardware == "Disco");
    const discoMemoriaDisponivelData = respostaVolume.filter(item => item.nomeRegistro == "memoriaDisponivel");

    console.log("Chegou em labels e values")
    const labelsDisco = discoMemoriaDisponivelData.map(item => new Date(item.tempoCapturas).toLocaleTimeString());
    const discoMemoriaUtilizadaValues = discoMemoriaUtilizadaData.map(item => parseFloat(item.memoriaUtilizada));
    const discoMemoriaDisponivelValues = discoMemoriaDisponivelData.map(item => parseFloat(item.valorRegistro));

    console.log("Chegou nos datasets");

    if (discoBytesChart.data.labels.length >= 10) { // Tamanho máximo das labels de 10
        discoBytesChart.data.labels.shift(); // Remove primeiro elemento do Array 
    }
    discoBytesChart.data.labels.push(labelsDisco[labelsDisco.length - 1]);

    if (discoBytesChart.data.datasets[0].data.length >= 10) {
        discoBytesChart.data.datasets[0].data.shift();
        discoBytesChart.data.datasets[1].data.shift();
    }
    discoBytesChart.data.datasets[0].data.push(discoMemoriaUtilizadaValues[discoMemoriaUtilizadaValues.length - 1]);
    discoBytesChart.data.datasets[1].data.push(discoMemoriaDisponivelValues[discoMemoriaDisponivelValues.length - 1]); // Pegando o dado e ajustando index

    console.log("Terminou datasets");

    discoBytesChart.update();
    console.log("Atualizando...");
}

function alertasCpu(alertaCpu) {
    console.log('entrei na função dos alertas');

    // verificações de cpu
    var msgAlertaCpu = document.getElementById("msgAlertaCpu");
    var cardAlertaCpu = document.querySelector(".cardAlertaCpu"); // Supondo que este seja o elemento que você quer animar

    cardAlertaCpu.classList.remove('piscarGreen', 'piscarYellow', 'piscarRed');

    if (alertaCpu <= 75) {
        msgAlertaCpu.innerHTML = `A CPU da máquina está <b style="color: green">abaixo de 75%</b>!`;
        cardAlertaCpu.classList.add('piscarGreen');
        cardAlertaCpu.style.borderColor = 'green';
    } else if (alertaCpu > 75 && alertaCpu <= 90) {
        msgAlertaCpu.innerHTML = `A CPU da máquina está entre <b style="color: rgb(220, 143, 0)">75% e 90%</b>!`;
        cardAlertaCpu.classList.add('piscarYellow');
        cardAlertaCpu.style.borderColor = 'rgb(220, 143, 0)';
    } else if (alertaCpu > 90) {
        msgAlertaCpu.innerHTML = `A CPU da máquina está <b style="color: red">CRÍTICA!!</b>`;
        cardAlertaCpu.classList.add('piscarRed');
        cardAlertaCpu.style.borderColor = 'red';
    }
}

function alertasRam(alertaRam) {
    console.log('entrei na função dos alertas da ram');

    // verificações de ram 
    var msgAlertaRam = document.getElementById("msgAlertaRam");
    var cardAlertaRam = document.querySelector(".cardAlertaRam"); // Supondo que este seja o elemento que você quer animar

    cardAlertaRam.classList.remove('piscarGreen', 'piscarYellow', 'piscarRed');

    if (alertaRam <= 75) {
        msgAlertaRam.innerHTML = `A RAM da máquina está <b style="color: green">abaixo de 75%</b>!`;
        cardAlertaRam.classList.add('piscarGreen');
        cardAlertaRam.style.borderColor = 'green';
    } else if (alertaRam > 75 && alertaRam <= 90) {
        msgAlertaRam.innerHTML = `A RAM da máquina está entre <b style="color: rgb(220, 143, 0)">75% e 90%</b>!`;
        cardAlertaRam.classList.add('piscarYellow');
        cardAlertaRam.style.borderColor = 'rgb(220, 143, 0)';
    } else if (alertaRam > 90) {
        msgAlertaRam.innerHTML = `A RAM da máquina está <b style="color: red">CRÍTICA!!</b>`;
        cardAlertaRam.classList.add('piscarRed');
        cardAlertaRam.style.borderColor = 'red';
    }
}

setInterval(buscarDados, 5000);
setInterval(buscarDadosVolume, 5000);
setInterval(kpiMaquinaLeituras, 5000);
setInterval(kpiMaquinaCpu, 5000);
setInterval(kpiMaquinaRam, 5000);
setInterval(buscarDadosAlerta, 5000);
setInterval(buscarDadosAlertaRam, 5000);