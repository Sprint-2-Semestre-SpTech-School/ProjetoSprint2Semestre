const hardwares = document.querySelectorAll(".hardware");
let selectedHardware = null;

let idMaquinaCpu;
let nomeRegistroCpu;
let totalCapturasCpu;

// function pegarId() {
const urlParams2 = new URLSearchParams(window.location.search);
const idProjeto = urlParams2.get('idProjetoRota');

if (idProjeto != null) { localStorage.setItem("idProjetoAtual", idProjeto); }
// var idProjetoCerto = idProjeto;
// }

console.log('Id projeto: ' + idProjeto);

var idEmpresa = sessionStorage.ID_EMPRESA;
var idProjetoSession = sessionStorage.ID_PROJETO;
console.log(sessionStorage.ID_PROJETO_ROTA);

console.log(idEmpresa);

let hardwareSelecionado;

hardwares.forEach((hardware, index) => {
    hardware.addEventListener("click", function () {
        if (index === 0) {
            hardware.style.backgroundColor = "lime";
            hardwares[1].style.backgroundColor = "";
            hardwares[2].style.backgroundColor = "";
            hardwareSelecionado = "cpu/ram"
            // function alterarKpisCpu();
        } else if (index === 1) {
            hardware.style.backgroundColor = "lime";
            hardwares[0].style.backgroundColor = "";
            hardwares[2].style.backgroundColor = "";
            hardwareSelecionado = "disco";
        } else {
            hardware.style.backgroundColor = "lime";
            hardwares[0].style.backgroundColor = "";
            hardwares[1].style.backgroundColor = "";
            hardwareSelecionado = "rede";
        }
    });
});

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

function addMaquina() {
    const modalAddMaquinaDentro = document.getElementById('modalAddMaquina')
    modalAddMaquinaDentro.classList.add('abrir')

    modalAddMaquinaDentro.addEventListener('click', (e) => {
        if (e.target.id == 'fecharModal' || e.target.id == 'modalAddMaquina') {
            modalAddMaquinaDentro.classList.remove('abrir')
        }
    })
}

function adicionarMaquina() {
    var destinoVar = document.getElementById('input_destino').value;
    var descricaoVar = document.getElementById('input_descricao').value;

    if (destinoVar == "" || descricaoVar == "") {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "Preencha todos os campos";
    } else {
        cardErro.style.display = "none";
        mensagem_erro.innerHTML = "Cadastrando máquina...";

        fetch("/dashProjeto/adicionarMaquina", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                destinoServer: destinoVar,
                descricaoServer: descricaoVar,
                idProjetoServer: sessionStorage.ID_PROJETO_ROTA,
                idEmpresaServer: idEmpresa
                // idMaquina: sessionStorage.ID_MAQUINA
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    cardErro.style.display = "block";
                    mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Adicionando máquina...";

                    // setTimeout(() => {
                    //     window.location = "DashProjeto.html";
                    // }, "2000");
                    listarMaquinas();
                    location.reload();

                } else {
                    throw new Error("Houve um erro ao tentar realizar o cadastro!");
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                cardErro.style.display = "block";
                mensagem_erro.innerHTML = `Erro: ${resposta.message}`;
            });
        return false;
    }
}

console.log(idEmpresa);
var info_maquinas = null;
let listaMaq = [];
let maquinaBolinha = null;

function listarMaquinas() {
    console.log('entrei na função listar máquinas');
    // console.log(idProjeto);

    // const urlParams2 = new URLSearchParams(window.location.search);
    // const idProjeto = urlParams2.get('idProjetoRota');

    fetch(`/dashProjeto/${localStorage.idProjetoAtual}`, {
        method: "GET",
    })
        .then(function (response) {
            console.log('entrei na then listar máquinas');
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })
        .then(function (lista_maquinas) {
            console.log('entrei no then das máquinas');
            console.log(lista_maquinas);

            if (!lista_maquinas || lista_maquinas.length === 0) {
                console.error('Nenhum dado de máquina encontrado.');
                return;
            }

            var div_maquinas = document.getElementById('div_maquinas');
            if (!div_maquinas) {
                console.error('Elemento div_maquinas não encontrado.');
                return;
            }

            var telaMaquina = document.getElementById("div_maquinas");

            lista_maquinas.forEach(function (projeto) {
                telaMaquina.innerHTML += `
                <div data-id="${projeto.idMaquina}" class="maquinaImg">
                    <div class="machine">
                        <img src="./assets/imgs/monitor dash.png" alt="">
                    </div>
                </div>
            `;
                listaMaq.push(projeto.idMaquina);
            });

            console.log('lista maq:');
            console.log(listaMaq);

            maquinaBolinha = document.querySelectorAll('.machine');

            entrarDashMaquina();

            var idMaquinaImagem = sessionStorage.ID_MAQUINA;
            console.log(idMaquinaImagem + ' id máquina');

            // var boxMaquina = document.querySelectorAll(".machine");
            // for (var i = 0; i < boxMaquina.length; i++) {
            //     boxMaquina[i].addEventListener('click', entrarDashMaquina(idMaquina));
            // }

        })
        .catch(function (error) {
            console.error(`#ERRO: ${error}`);
        });
}

function entrarDashMaquina() {

    maquinaBolinha.forEach((maquina, index) => {
        maquina.addEventListener("click", function () {
            console.log('entrei na função entrar dash máquina');

            idMaquinaRota = listaMaq[index];

            console.log(`idMaquinaRota: ${idMaquinaRota}`);

            fetch(`/dashProjeto/${idMaquinaRota}`, {
                method: "GET",
            }).then(function (response = idMaquinaRota) {

                console.log('entrei na then entrar dash maquina');
                if (!response.ok) {
                    throw new Error('Erro ao carregar os dados');
                }
                return response.json();
            })

            setTimeout(() => {
                window.location = `maquinaDash.html?idMaquinaRota=${idMaquinaRota}`;
            }, "1000");
        })
    })

}

const ctx = document.getElementById('cpuRam');
const cpuRamChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'CPU',
            data: [],
            backgroundColor: '#3083f0',
            borderColor: '#000050',
            borderWidth: 2,
            fill: true
        },
        {
            label: 'RAM',
            data: [],
            backgroundColor: '#FDAD00',
            borderColor: 'white',
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
        animation: {
            duration: 1500,
            easing: 'easeInQuad'
        },
        plugins: {
            title: {
                display: true,
                text: "Uso de CPU e memória em %",
                color: 'white',
                font: {
                    size: 25,
                    weigth: 'bold',
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
// console.log(ctx);
const discoQtdChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Escritas',
            data: [],
            borderWidth: 5,
            backgroundColor: '#3083f0',
        },
        {
            label: 'Lidas',
            data: [],
            borderWidth: 5,
            backgroundColor: '#FDAD00',
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInQuad'
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

const ctx3 = document.getElementById('taxaLeiturasEscritas');
// console.log(ctx);
const discoBytesChart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Bytes Escritos',
            data: [],
            borderWidth: 5,
            backgroundColor: '#000050',
            borderColor: '#3083f0',
        },
        {
            label: 'Bytes Lidos',
            data: [],
            borderWidth: 5,
            backgroundColor: '#FDAD00',
            borderColor: 'white',
        },
        {
            label: 'Tempo de transferência',
            data: [],
            borderWidth: 5,
            borderDash: [10, 10],
            backgroundColor: 'white',
            borderColor: '#FDAD00',
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInQuad'
        },
        plugins: {
            title: {
                display: true,
                text: "Taxa de bytes de leituras e escritas do HD",
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

const ctx4 = document.getElementById('pacotesEnviadosRecebidos');
// console.log(ctx);
const redeChart = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Enviados',
            data: [],
            borderWidth: 5,
            backgroundColor: '#000050',
            borderColor: '#3083f0',
        },
        {
            label: 'Recebidos',
            data: [],
            borderWidth: 5,
            borderColor: '#FDAD00',
            backgroundColor: 'white'
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInQuad'
        },
        plugins: {
            title: {
                display: true,
                text: "Pacotes enviados e recebidos da rede",
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

function getDadosDash() {
    fetch(`/dashProjeto/getDadosDash/${idProjeto}`, {
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

function atualizarGraficos(resposta) {
    console.log("Iniciando atualização dos gráficos...")

    // Cpu & Ram
    const cpuData = resposta.filter(item => item.nomeRegistro == "usoCpu");
    const ramData = resposta.filter(item => item.nomeRegistro == "usoRam");
    // Disco Bytes
    const discoBytesLeiturasData = resposta.filter(item => item.nomeRegistro == "bytesLeitura");
    const discoBytesEscritasData = resposta.filter(item => item.nomeRegistro == "bytesEscrita");
    const discoTempoTransferenciaData = resposta.filter(item => item.nomeRegistro == "tempo de transferência");
    // Rede
    const redePacotesEnviadosData = resposta.filter(item => item.nomeRegistro == "Pacotes Enviados");
    const redePacotesRecebidosData = resposta.filter(item => item.nomeRegistro == "Pacotes Recebidos");
    // Disco Quantidade
    const discoQtdLeiturasData = resposta.filter(item => item.nomeRegistro == "leituras");
    const discoQtdEscriturasData = resposta.filter(item => item.nomeRegistro == "escritas");

    // console.log("Chegou em labels e values")
    const labelsCpu = cpuData.map(item => new Date(item.tempoCapturas).toLocaleTimeString()); // Pegar um valor pra base de tempo
    const cpuValues = cpuData.map(item => parseFloat(item.mediaDados));
    const ramValues = ramData.map(item => parseFloat(item.mediaDados));

    const labelsDiscoBytes = discoBytesLeiturasData.map(item => new Date(item.tempoCapturas).toLocaleTimeString());
    const discoBytesLeiturasValues = discoBytesLeiturasData.map(item => parseFloat(item.mediaDados));

    const labelsRede = redePacotesEnviadosData.map(item => new Date(item.tempoCapturas).toLocaleTimeString());
    const redePacotesEnviadosValues = redePacotesEnviadosData.map(item => parseFloat(item.mediaDados));
    const redePacotesRecebidosValues = redePacotesRecebidosData.map(item => parseFloat(item.mediaDados));

    const discoBytesEscritasValues = discoBytesEscritasData.map(item => parseFloat(item.mediaDados));
    const discoTempoTransferenciaValues = discoTempoTransferenciaData.map(item => parseFloat(item.mediaDados));

    const labelsDiscoQtd = discoQtdEscriturasData.map(item => new Date(item.tempoCapturas).toLocaleTimeString());

    const discoQtdLeiturasValues = discoQtdLeiturasData.map(item => parseFloat(item.mediaDados));
    const discoEscritasValues = discoQtdEscriturasData.map(item => parseFloat(item.mediaDados))

    // cpuRamChart.data.labels = labelsCpu;
    // cpuRamChart.data.datasets[0].data = cpuValues;
    // cpuRamChart.data.datasets[1].data = ramValues;

    // console.log("Chegou nos datasets CPU e RAM");
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


    // discoBytesChart.data.labels = labelsDiscoBytes;
    // discoBytesChart.data.datasets[0].data = discoBytesEscritasValues;
    // discoBytesChart.data.datasets[1].data = discoBytesLeiturasValues;
    // discoBytesChart.data.datasets[2].data = discoTempoTransferenciaValues;

    // console.log("Chegou nos datasets discoBytes");

    if (discoBytesChart.data.labels.length >= 10) {
        discoBytesChart.data.labels.shift();
    }
    discoBytesChart.data.labels.push(labelsDiscoBytes[labelsDiscoBytes.length - 1]);

    if (discoBytesChart.data.datasets[0].data.length >= 10) {
        discoBytesChart.data.datasets[0].data.shift();
        discoBytesChart.data.datasets[1].data.shift();
        discoBytesChart.data.datasets[2].data.shift();
    }
    discoBytesChart.data.datasets[0].data.push(discoBytesEscritasValues[discoBytesEscritasValues.length - 1]);
    discoBytesChart.data.datasets[1].data.push(discoBytesLeiturasValues[discoBytesLeiturasValues.length - 1]);
    discoBytesChart.data.datasets[2].data.push(discoTempoTransferenciaValues[discoTempoTransferenciaValues.length - 1]);

    if (redeChart.data.labels.length >= 10) {
        redeChart.data.labels.shift();
    }
    redeChart.data.labels.push(labelsRede[labelsRede.length - 1]);

    if (redeChart.data.datasets[0].data.length >= 10) {
        redeChart.data.datasets[0].data.shift();
        redeChart.data.datasets[1].data.shift();
    }
    redeChart.data.datasets[0].data.push(redePacotesEnviadosValues[redePacotesEnviadosValues.length - 1]);
    redeChart.data.datasets[1].data.push(redePacotesRecebidosValues[redePacotesRecebidosValues.length - 1]);

    // redeChart.data.labels = labelsRede;
    // redeChart.data.datasets[0].data = redePacotesEnviadosValues;
    // redeChart.data.datasets[1].data = redePacotesRecebidosValues;
    // console.log("Terminou datasets");

    if (discoQtdChart.data.labels.length >= 10) {
        discoQtdChart.data.labels.shift();
    }
    discoQtdChart.data.labels.push(labelsDiscoQtd[labelsDiscoQtd.length - 1]);

    if (discoQtdChart.data.datasets[0].data.length >= 10) {
        discoQtdChart.data.datasets[0].data.shift();
        discoQtdChart.data.datasets[1].data.shift();
    }
    discoQtdChart.data.datasets[0].data.push(discoEscritasValues[discoEscritasValues.length - 1]);
    discoQtdChart.data.datasets[1].data.push(discoQtdLeiturasValues[discoQtdLeiturasValues.length - 1]);

    cpuRamChart.update();
    discoBytesChart.update();
    redeChart.update();
    discoQtdChart.update();
    // console.log("Atualizando...");
}
setInterval(getDadosDash, 5000);
setInterval(atualizarGraficos, 5000);

let registros = []; // Separar as respostas vindas
let registroCpu;
let registroRam;
let registroDisco;
let registroRede;

function getDadosKpiCpuAlertas() {
    fetch(`/kpis/getDadosKpiCpuAlertas/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            // console.log("RESPOSTA " + resposta);
            setTimeout(function () {
                idMaquinaCpu = resposta[0].idMaquina;
                nomeRegistroCpu = resposta[0].nomeRegistro;
                totalCapturasCpu = resposta[0].totalCapturas;
                // valoresKpiCpuAlertas(idMaquinaCpu, nomeRegistroCpu, totalCapturasCpu);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiRamAlertas() {
    fetch(`/kpis/getDadosKpiRamAlertas/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                idMaquinaRam = resposta[0].idMaquina;
                nomeRegistroRam = resposta[0].nomeRegistro;
                totalCapturasRam = resposta[0].totalCapturas;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            console.log(resposta);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiDiscoAlertas() {
    fetch(`/kpis/getDadosKpiDiscoAlertas/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                console.log(resposta);
                idMaquinaDisco = resposta[0].idMaquina;
                nomeRegistroDisco = resposta[0].nomeRegistro;
                totalCapturasDisco = resposta[0].totalCapturas;
                // valoresKpiDiscoAlertas(idMaquinaDisco, nomeRegistroDisco, totalCapturasDisco);
            }, 1000);
            console.log(resposta);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiRedeAlertas() {
    fetch(`/kpis/getDadosKpiRedeAlertas/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                idMaquinaRede = resposta[0].idMaquina;
                nomeRegistroRede = resposta[0].nomeRegistro;
                totalCapturasRede = resposta[0].totalCapturas;
                // valoresKpiRedeAlertas(idMaquinaRede, nomeRegistroRede, totalCapturasRede);
            }, 1000);
            console.log(resposta);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosCpu20Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosCpu20Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosCpu20Seg = resposta[0].eventos_criticos;
                maiorValorCpu20Seg = resposta[0].maior_valor;
                console.log("Maior Valor Cpu 60s " + maiorValorCpu60Seg)
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosCpu40Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosCpu40Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosCpu40Seg = resposta[0].eventos_criticos;
                maiorValorCpu40Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosCpu60Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosCpu60Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosCpu60Seg = resposta[0].eventos_criticos;
                maiorValorCpu60Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosRam20Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosRam20Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosRam20Seg = resposta[0].eventos_criticos;
                maiorValorRam20Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosRam40Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosRam40Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosRam40Seg = resposta[0].eventos_criticos;
                maiorValorRam40Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosRam60Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosRam60Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosRam60Seg = resposta[0].eventos_criticos;
                maiorValorRam60Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosDisco20Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosDisco20Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosDisco20Seg = resposta[0].eventos_criticos;
                maiorValorDisco20Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosDisco40Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosDisco40Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosDisco40Seg = resposta[0].eventos_criticos;
                maiorValorDisco40Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosDisco60Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosDisco60Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosDisco60Seg = resposta[0].eventos_criticos;
                maiorValorDisco60Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosRede20Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosRede20Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosRede20Seg = resposta[0].eventos_criticos;
                maiorValorRede20Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosRede40Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosRede40Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosRede40Seg = resposta[0].eventos_criticos;
                maiorValorRede40Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiEventosCriticosRede60Seg() {
    fetch(`/kpis/getDadosKpiEventosCriticosRede60Seg/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                // console.log("resp" + resposta);
                eventosCriticosRede60Seg = resposta[0].eventos_criticos;
                maiorValorRede60Seg = resposta[0].maior_valor;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpiTotalCapturasProjeto() {
    fetch(`/kpis/getDadosKpiTotalCapturasProjeto/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                console.log("resp" + resposta);
                capturasTotalProjeto = resposta[0].capturas_projeto;
                // valoresKpiRamAlertas(idMaquinaRam, nomeRegistroRam, totalCapturasRam);
            }, 1000);
            // alterarKpis(resposta);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosProjeto() {
    fetch(`/kpis/getDadosProjeto/${idProjeto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (resposta) {
        resposta.json().then(resposta => {
            setTimeout(function () {
                console.log("resp" + resposta);
                nomeProjeto = resposta[0].nomeDemanda;
                descricaoProjeto = resposta[0].descricao;
            }, 1000);
        })
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function getDadosKpi() {
    getDadosKpiCpuAlertas();
    getDadosKpiRamAlertas();
    getDadosKpiRedeAlertas();
    getDadosKpiDiscoAlertas();

    getDadosKpiEventosCriticosCpu20Seg();
    getDadosKpiEventosCriticosCpu40Seg();
    getDadosKpiEventosCriticosCpu60Seg();

    getDadosKpiEventosCriticosRam20Seg();
    getDadosKpiEventosCriticosRam40Seg();
    getDadosKpiEventosCriticosRam60Seg();

    getDadosKpiEventosCriticosDisco20Seg();
    getDadosKpiEventosCriticosDisco40Seg();
    getDadosKpiEventosCriticosDisco60Seg();

    getDadosKpiEventosCriticosRede20Seg();
    getDadosKpiEventosCriticosRede40Seg();
    getDadosKpiEventosCriticosRede60Seg();

    getDadosKpiTotalCapturasProjeto();
    getDadosProjeto();
}

function atualizarKpis() {
    const withoutMachineText = document.querySelector("#withoutMachine");
    if (maquinaBolinha.length > 0) {
        withoutMachineText.style.display = "none";
    }

    let capturasTotal = document.querySelector("#capturasTotal");
    capturasTotal.innerHTML = `Capturas do projeto: ${capturasTotalProjeto}`;
    let capturaAtual = document.querySelector("#capturaAtual");

    let capturaTitulo = document.querySelector("#capturaTitulo");
    let messageId = document.querySelector("#messageId");
    let logQtd = document.querySelector("#logQtd");

    let capturas2 = document.querySelector("#capture2");
    let messageId2 = document.querySelector("#messageId2");
    let logQtd2 = document.querySelector("#logQtd2");

    let grupo2 = document.querySelector("#group2");
    // ------------------------------------------------------------ KPI 2 --------------------------------------------------------------
    let titleEvents = document.querySelector("#titleEvents");
    let titleEvents2 = document.querySelector("#titleEvents2");

    let capturas20s = document.querySelector("#capturas20s");
    let capturas40s = document.querySelector("#capturas40s");
    let capturas60s = document.querySelector("#capturas60s");

    let valorTempo20s = document.querySelector("#value20s");
    let valorTempo40s = document.querySelector("#value40s");
    let valorTempo60s = document.querySelector("#value60s");

    let capturas20s2 = document.querySelector("#capturas20s2");
    let capturas40s2 = document.querySelector("#capturas40s2");
    let capturas60s2 = document.querySelector("#capturas60s2");

    let valorTempo20s2 = document.querySelector("#value20s2");
    let valorTempo40s2 = document.querySelector("#value40s2");
    let valorTempo60s2 = document.querySelector("#value60s2");
    // -------------------------------------------------------- MÉTRICAS --------------------------------------------------------
    let metricaVerde = document.querySelector("#metricaVerde");
    let metricaAmarela = document.querySelector("#metricaAmarela");
    let metricaVermelha = document.querySelector("#metricaVermelha");
    // ------------------------------------------------------------- KPI 3 ---------------------------------------------------------
    let idMaquinaPorcentagem = document.querySelector("#idMaquinaPorcentagem");
    let porcentagem = document.querySelector("#porcentagem");

    // console.log(capturaTitulo);

    if (hardwareSelecionado === "cpu/ram") {
        capturaTitulo.innerHTML = `Capturas em alerta ${nomeRegistroCpu} e ${nomeRegistroRam}`;
        messageId.innerHTML = `Id: ${idMaquinaCpu}`;
        messageId2.innerHTML = `Id: ${idMaquinaRam}`;
        logQtd.innerHTML = `Logs: ${totalCapturasCpu}`;
        logQtd2.innerHTML = `Logs: ${totalCapturasRam}`;
        capturas2.style.visibility = "visible";
        // ------------------------------------------------------------- KPI 2 ---------------------------------------------------------
        titleEvents.innerHTML = `N° Eventos críticos e capturas em: ${nomeRegistroCpu}`;
        capturas20s.innerHTML = `${eventosCriticosCpu20Seg}`;
        capturas40s.innerHTML = `${eventosCriticosCpu40Seg}`;
        capturas60s.innerHTML = `${eventosCriticosCpu60Seg}`;

        titleEvents2.innerHTML = `N° Eventos críticos e capturas em: ${nomeRegistroRam}`;

        valorTempo20s.innerHTML = `${maiorValorCpu20Seg}`;
        valorTempo40s.innerHTML = `${maiorValorCpu40Seg}`;
        valorTempo60s.innerHTML = `${maiorValorCpu60Seg}`;

        capturas20s2.innerHTML = `${eventosCriticosRam20Seg}`;
        capturas40s2.innerHTML = `${eventosCriticosRam40Seg}`;
        capturas60s2.innerHTML = `${eventosCriticosRam60Seg}`;

        valorTempo20s2.innerHTML = `${maiorValorRam20Seg}`;
        valorTempo40s2.innerHTML = `${maiorValorRam40Seg}`;
        valorTempo60s2.innerHTML = `${maiorValorRam60Seg}`;

        group2.style.display = `block`;
        // -------------------------------------------------------- MÉTRICAS --------------------------------------------------------
        capturaAtual.innerHTML = `Captura atual: ${nomeRegistroCpu} e ${nomeRegistroRam}`;

        metricaVerde.innerHTML = `0 a 70%`;
        metricaAmarela.innerHTML = `70% a 85%`;
        metricaVermelha.innerHTML = `Maior 85%`;
        // ------------------------------------------------------------- KPI 3 ---------------------------------------------------------
        idMaquinaPorcentagem.innerHTML = `Id: ${idMaquinaCpu}`
        porcentagem.innerHTML = `Afeta o seu projeto negativamente em ${(((totalCapturasCpu + totalCapturasRam) * 100) / capturasTotalProjeto).toFixed(4)}%`
        // ------------------------------------------------------------- TROCAR NULL ---------------------------------------------------------
        trocarNulls(valorTempo20s, maiorValorCpu20Seg);
        trocarNulls(valorTempo40s, maiorValorCpu40Seg);
        trocarNulls(valorTempo60s, maiorValorCpu60Seg);

        trocarNulls(valorTempo20s2, maiorValorRam20Seg);
        trocarNulls(valorTempo40s2, maiorValorRam40Seg);
        trocarNulls(valorTempo60s2, maiorValorRam60Seg);
    } else if (hardwareSelecionado === "disco") {
        capturaAtual.innerHTML = `Captura atual: ${nomeRegistroDisco}`;

        capturaTitulo.innerHTML = `Capturas em alerta ${nomeRegistroDisco}`
        messageId.innerHTML = `Id: ${idMaquinaDisco}`
        logQtd.innerHTML = `Logs: ${totalCapturasDisco}`;
        capturas2.style.visibility = "hidden";
        // ------------------------------------------------------------- KPI 2 ---------------------------------------------------------
        titleEvents.innerHTML = `N° Eventos críticos e capturas em: ${nomeRegistroDisco}`;
        capturas20s.innerHTML = `${eventosCriticosDisco20Seg}`;
        capturas60s.innerHTML = `${eventosCriticosDisco60Seg}`;

        valorTempo20s.innerHTML = `${maiorValorDisco20Seg}`;
        valorTempo40s.innerHTML = `${maiorValorDisco40Seg}`;
        valorTempo60s.innerHTML = `${maiorValorDisco60Seg}`;

        group2.style.display = `none`;
        // -------------------------------------------------------- MÉTRICAS --------------------------------------------------------
        metricaVerde.innerHTML = `Maior do que 2`;
        metricaAmarela.innerHTML = `Entre 1 e 2`;
        metricaVermelha.innerHTML = `Menor do que 1`;
        // ------------------------------------------------------------- KPI 3 ---------------------------------------------------------
        idMaquinaPorcentagem.innerHTML = `Id: ${idMaquinaDisco}`
        porcentagem.innerHTML = `Afeta o seu projeto negativamente em ${((totalCapturasDisco * 100) / capturasTotalProjeto).toFixed(4)}%`
        trocarNulls(valorTempo20s, maiorValorDisco20Seg);
        trocarNulls(valorTempo40s, maiorValorDisco40Seg);
        trocarNulls(valorTempo60s, maiorValorDisco60Seg);
        // ------------------------------------------------------------- TROCAR NULL ---------------------------------------------------------
    } else {
        capturaTitulo.innerHTML = `Capturas em alerta ${nomeRegistroRede}`
        messageId.innerHTML = `Id: ${idMaquinaRede}`
        logQtd.innerHTML = `Logs: ${totalCapturasRede}`;
        capturas2.style.visibility = "hidden";
        // ------------------------------------------------------------- KPI 2 ---------------------------------------------------------
        titleEvents.innerHTML = `N° Eventos críticos e capturas em: ${nomeRegistroRede}`
        capturas20s.innerHTML = `${eventosCriticosRede20Seg}`;
        capturas40s.innerHTML = `${eventosCriticosRede40Seg}`;
        capturas60s.innerHTML = `${eventosCriticosRede60Seg}`;

        valorTempo20s.innerHTML = `${maiorValorRede20Seg}`;
        valorTempo40s.innerHTML = `${maiorValorRede40Seg}`;
        valorTempo60s.innerHTML = `${maiorValorRede60Seg}`;

        group2.style.display = `none`;
        // -------------------------------------------------------- MÉTRICAS --------------------------------------------------------
        capturaAtual.innerHTML = `Captura atual: ${nomeRegistroRede}`;

        metricaVerde.innerHTML = `Maior do que 7`;
        metricaAmarela.innerHTML = `Menor do que 7`;
        metricaVermelha.innerHTML = `Menor do que 3`;
        // ------------------------------------------------------------- KPI 3 ---------------------------------------------------------
        idMaquinaPorcentagem.innerHTML = `Id: ${idMaquinaRede}`
        porcentagem.innerHTML = `Afeta o seu projeto negativamente em ${((totalCapturasRede * 100) / capturasTotalProjeto).toFixed(4)}%`

        trocarNulls(valorTempo20s, maiorValorRede20Seg);
        trocarNulls(valorTempo40s, maiorValorRede40Seg);
        trocarNulls(valorTempo60s, maiorValorRede60Seg);
        // ------------------------------------------------------------- TROCAR NULL ---------------------------------------------------------
    }
    let healthBarNumber = document.querySelector("#healthBarNumber");
    let quintil = document.querySelectorAll(".quintil");

    let totalCapturasNegativas = (totalCapturasCpu * 1.2) + (totalCapturasRam * 1.4) + (totalCapturasDisco * 1) + (totalCapturasRede * 1.2);
    let healthBarValue = ((totalCapturasNegativas * 100 / capturasTotalProjeto - 100) * -1).toFixed(3);
    healthBarNumber.innerHTML = `${healthBarValue}%`;

    const projetoNome = document.querySelector("#projetoNome");
    projetoNome.innerHTML = `${nomeProjeto}`

    const projetoDesc = document.querySelector("#projetoDesc");
    projetoDesc.innerHTML = `${descricaoProjeto}`

    if (healthBarValue >= 80) {
        quintil[4].style.border = `8px ridge white`;
        quintil[3].style.border = `8px none white`;
        quintil[2].style.border = `8px none white`;
        quintil[1].style.border = `8px none white`;
        quintil[0].style.border = `8px none white`;
    } else if (healthBarValue >= 60) {
        quintil[4].style.border = `8px none white`;
        quintil[3].style.border = `8px ridge white`;
        quintil[2].style.border = `8px none white`;
        quintil[1].style.border = `8px none white`;
        quintil[0].style.border = `8px none white`;
    } else if (healthBarValue >= 40) {
        quintil[4].style.border = `8px none white`;
        quintil[3].style.border = `8px none white`;
        quintil[2].style.border = `8px ridge white`;
        quintil[1].style.border = `8px none white`;
        quintil[0].style.border = `8px none white`;
    } else if (healthBarValue >= 20) {
        quintil[4].style.border = `8px none white`;
        quintil[3].style.border = `8px none white`;
        quintil[2].style.border = `8px none white`;
        quintil[1].style.border = `8px ridge white`;
        quintil[0].style.border = `8px none white`;
    } else {
        quintil[4].style.border = `8px none white`;
        quintil[3].style.border = `8px none white`;
        quintil[2].style.border = `8px none white`;
        quintil[1].style.border = `8px none white`;
        quintil[0].style.border = `8px ridge white`;
    }

    function trocarNulls(elemento, valor, mensagem = "Nenhum") {
        elemento.innerHTML = valor !== null && valor !== undefined ? valor : mensagem
    }
}

setInterval(atualizarKpis, 500);
setInterval(getDadosKpi, 500);