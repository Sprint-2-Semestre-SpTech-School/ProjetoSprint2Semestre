const registros = [];

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

const ctx = document.getElementById('cpuRam');
console.log(ctx);
const cpuRamChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'],
        datasets: [{
            label: 'CPU',
            data: [43, 40, 32, 20, 18, 15, 13, 14, 15],
            backgroundColor: '#3083f0',
            borderColor: '#000050',
            borderWidth: 2,
            fill: true
        },
        {
            label: 'RAM',
            data: [70, 73, 74, 72, 80, 78, 76, 75, 74],
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
console.log(ctx);
const discoQtdChart = new Chart(ctx2, {
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
console.log(ctx);
const discoBytesChart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['01:00', '02:00', '03:00', '04:00', '05:00'],
        datasets: [{
            label: 'Bytes Escritos',
            data: [1200, 1943, 2222, 2121, 1500],
            borderWidth: 5,
            backgroundColor: '#000050',
            borderColor: '#3083f0',
        },
        {
            label: 'Bytes Lidos',
            data: [1550, 1343, 2525, 1876, 1650],
            borderWidth: 5,
            backgroundColor: '#FDAD00',
            borderColor: 'white',
        },
        {
            label: 'Taxa de transferência',
            data: [1000, 1000, 2000, 1000, 3000],
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
console.log(ctx);
const redeChart = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: ['00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'],
        datasets: [{
            label: 'Enviados',
            data: [1200, 1222, 1333, 1543, 2231, 4154, 3212, 5432, 3212],
            borderWidth: 5,
            backgroundColor: '#000050',
            borderColor: '#3083f0',
        },
        {
            label: 'Recebidos',
            data: [1212, 1964, 3243, 5654, 2213, 3977, 3121, 2144, 3431],
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
    fetch("/DashProjeto/getDadosDash/" + 400, {
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

function atualizarGraficos(resposta){
    console.log ("Iniciando atualização dos gráficos...")

    // Cpu & Ram
    const cpuData = resposta.filter(item => item.nomeRegistro == "usoCpu");
    const ramData = resposta.filter(item => item.nomeRegistro == "usoRam");
    // Disco Bytes
    const discoBytesLeiturasData = resposta.filter(item => item.nomeRegistro == "bytesLeitura");
    const discoBytesEscritasData = resposta.filter(item => item.nomeRegistro == "bytesEscrita");
    const discoTempoTransferenciaData = resposta.filter(item => item.nomeRegistro == "tempo de transferência");
    // Rede
    const redePacotesEnviadosData = resposta.filter(item => item.nomeRegistro == "Pacotes Enviados");
    const redePacotesRecebidosData = resposta.filter(item => item.nomeRegistro == "Pacotes Recebidos")
    // Disco Quantidade
    const discoQtdLeiturasData = resposta.filter(item => item.nomeRegistro == "leituras");
    const discoQtdEscriturasData = resposta.filter(item => item.nomeRegistro == "escritas");

    console.log ("Chegou em labels e values")
    const labelsCpu = cpuData.map(item => new Date(item.tempoCapturas).toLocaleTimeString()); // Pegar um valor pra base de tempo
    const cpuValues = cpuData.map(item => parseFloat(item.mediaDados));
    const ramValues = ramData.map(item => parseFloat(item.mediaDados));

    const labelsDiscoBytes = discoBytesLeiturasData.map(item => new Date(item.tempoCapturas).toLocaleTimeString());
    const discoBytesLeiturasValues = discoBytesLeiturasData.map(item => parseFloat(item.mediaDados));
    const discoBytesEscritasValues = discoBytesEscritasData.map(item => parseFloat(item.mediaDados));
    const discoTempoTransferenciaValues = discoTempoTransferenciaData.map(item => parseFloat(item.mediaDados));

    const labelsRede = redePacotesEnviadosData.map(item => new Date(item.tempoCapturas).toLocaleTimeString());
    const redePacotesEnviadosValues = redePacotesEnviadosData.map(item => parseFloat(item.mediaDados));
    const redePacotesRecebidosValues = redePacotesRecebidosData.map(item => parseFloat(item.mediaDados));

    console.log("Chegou nos datasets");
    cpuRamChart.data.labels = labelsCpu;
    cpuRamChart.data.datasets[0].data = cpuValues;
    cpuRamChart.data.datasets[1].data = ramValues;

    discoBytesChart.data.labels = labelsDiscoBytes;
    discoBytesChart.data.datasets[0].data = discoBytesEscritasValues;
    discoBytesChart.data.datasets[1].data = discoBytesLeiturasValues;
    discoBytesChart.data.datasets[2].data = discoTempoTransferenciaValues;

    redeChart.data.labels = labelsRede;
    redeChart.data.datasets[0].data = redePacotesEnviadosValues;
    redeChart.data.datasets[1].data = redePacotesRecebidosValues;
    console.log("Terminou datasets");

    cpuRamChart.update();
    discoBytesChart.update();
    redeChart.update();
    console.log("Atualizando...");
}

setInterval(getDadosDash, 5000);

    function getDadosKpiCpuAlertas() {
        fetch("/kpis/getDadosKpiCpuAlertas/" + 400, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (resposta) {
            resposta.json().then(resposta => {
                setTimeout(function () {
                    registros.push(resposta);
                }, 5000);
                console.log(resposta);
                alterarKpis(resposta);
            })
        })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }

    function getDadosKpiRamAlertas() {
        fetch("/kpis/getDadosKpiCpuAlertas/" + 400, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (resposta) {
            resposta.json().then(resposta => {
                setTimeout(function () {
                    registros.push(resposta);
                }, 5000);
                console.log(resposta);
                alterarKpis(resposta);
            })
        })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }

    function getDadosKpiDiscoAlertas() {
        fetch("/kpis/getDadosKpiDiscoAlertas/" + 400, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (resposta) {
            resposta.json().then(resposta => {
                setTimeout(function () {
                    registros.push(resposta);
                }, 5000);
                console.log(resposta);
                alterarKpis(resposta);
            })
        })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }

    function getDadosKpiRedeAlertas() {
        fetch("/kpis/getDadosKpiRedeAlertas/" + 400, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (resposta) {
            resposta.json().then(resposta => {
                setTimeout(function () {
                    registros.push(resposta);
                }, 5000);
                console.log(resposta);
                alterarKpis(resposta);
            })
        })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }

    function getDadosKpi() {
        getDadosKpiCpuAlertas();
        getDadosKpiRamAlertas();
        getDadosKpiDiscoAlertas();
        getDadosKpiRedeAlertas();
    }

    function alterarKpis(resposta) {
        const textKpi = document.querySelector("#kpiAlertas");
        const idMaquina = resposta.idMaquina;
        const totalCapturas = resposta.totalCapturas;
        console.log(idMaquina);
    }
