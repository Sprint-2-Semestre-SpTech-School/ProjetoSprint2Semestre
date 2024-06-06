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
            backgroundColor: '#98a40b',
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
                backgroundColor: '#98a40b',
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

function buscarDados() {
    fetch("/maquina/buscarDados/" + 500, {
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

function buscarDadosVolume() {
    fetch("/maquina/buscarDadosVolume/" + 500, {
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

function atualizarGraficos(resposta){
    console.log ("Iniciando atualização dos gráficos...");

    // Cpu & Ram
    const cpuData = resposta.filter(item => item.nomeRegistro == "usoCpu");
    const ramData = resposta.filter(item => item.nomeRegistro == "usoRam");

    // Rede
    const redePacotesEnviadosData = resposta.filter(item => item.nomeRegistro == "Pacotes Enviados");
    const redePacotesRecebidosData = resposta.filter(item => item.nomeRegistro == "Pacotes Recebidos");

    console.log ("Chegou em labels e values")
    const labelsCpu = cpuData.map(item => new Date(item.tempoCapturas).toLocaleTimeString()); // Pegar um valor pra base de tempo
    const cpuValues = cpuData.map(item => parseFloat(item.valorRegistro));
    const ramValues = ramData.map(item => parseFloat(item.valorRegistro));

    const labelsRede = redePacotesEnviadosData.map(item => new Date(item.tempoCapturas).toLocaleTimeString());
    const redePacotesEnviadosValues = redePacotesEnviadosData.map(item => parseFloat(item.valorRegistro));
    const redePacotesRecebidosValues = redePacotesRecebidosData.map(item => parseFloat(item.valorRegistro));

    console.log("Chegou nos datasets");
    // cpuRamChart.data.labels = labelsCpu;
    // cpuRamChart.data.datasets[0].data = cpuValues;
    // cpuRamChart.data.datasets[1].data = ramValues;

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
    discoChart.data.datasets[0].data.push(redePacotesEnviadosValues[redePacotesEnviadosValues.length - 1]);
    discoChart.data.datasets[1].data.push(redePacotesRecebidosValues[redePacotesRecebidosValues.length - 1]);

    // discoChart.data.labels = labelsRede;
    // discoChart.data.datasets[0].data = redePacotesEnviadosValues;
    // discoChart.data.datasets[1].data = redePacotesRecebidosValues;

    console.log("Terminou datasets");

    cpuRamChart.update();
    discoChart.update();
    // discoBytesChart.update();
    console.log("Atualizando...");
}

function atualizarGraficosVolume(respostaVolume){
    console.log ("Iniciando atualização dos gráficos de volume...");

    // DISCO VOLUME
    const discoMemoriaUtilizadaData = respostaVolume.filter(item => item.tipoHardware == "Disco");
    const discoMemoriaDisponivelData = respostaVolume.filter(item => item.nomeRegistro == "memoriaDisponivel");

    console.log ("Chegou em labels e values")
    const labelsDisco = discoMemoriaDisponivelData.map(item => new Date(item.tempoCapturas).toLocaleTimeString());
    const discoMemoriaUtilizadaValues = discoMemoriaUtilizadaData.map(item => parseFloat(item.memoriaUtilizada));
    const discoMemoriaDisponivelValues = discoMemoriaDisponivelData.map(item => parseFloat(item.valorRegistro));

    console.log("Chegou nos datasets");

    // discoBytesChart.data.labels = labelsDisco;
    // discoBytesChart.data.datasets[0].data = discoMemoriaUtilizadaValues;
    // discoBytesChart.data.datasets[1].data = discoMemoriaDisponivelValues;

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

setInterval(buscarDados, 5000);
setInterval(buscarDadosVolume, 5000);

// setInterval(buscarDadosVolume, 5000);

// var idMaquina = 400;
// function buscarDados() {
//     fetch(`/maquina/buscarDados/${idMaquina}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//         .then(resposta => {
//             if (resposta.status == 200) {
//                 resposta.json().then(resposta => {

//                     console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

//                     alertar(resposta);
//                 });
//             } else {
//                 console.error(`Nenhum dado encontrado para o id ${maquina.idMaquina} ou erro na API`);
//             }
//         })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados da máquina para o gráfico: ${error.message}`);
//         });
// }

// function exibirMaquinasDoUsuario() {
//     var maquina = JSON.parse(idMaquina);
//     maquina.forEach(item => {

//         document.getElementById('div_topDash').innerHTML += `
//         <canvas id="myChartCanvas${item.idRegistro}" class="grafico"></canvas>
//         <canvas id="myChartCanvas${item.idRegistro}" class="grafico"></canvas>
//       `

//         obterDadosGrafico(item.idRegistro);
//     });

//     // if (aquarios.length > 0) {
//     //     exibirAquario(aquarios[0].id)
//     // }
// }

// function exibirMaquina(idMaquina) {
//     let todosOsGraficos = JSON.parse(sessionStorage.ID_MAQUINA);

//     for (i = 0; i < todosOsGraficos.length; i++) {
//         // exibindo - ou não - o gráfico
//         if (todosOsGraficos[i].idRegistro != idMaquina) {
//             let elementoAtual = document.getElementById(`grafico${todosOsGraficos[i].idRegistro}`)
//             if (elementoAtual.classList.contains("display-block")) {
//                 elementoAtual.classList.remove("display-block")
//             }
//             elementoAtual.classList.add("display-none")

//             // alterando estilo do botão
//             // let btnAtual = document.getElementById(`div_dashboard${todosOsGraficos[i].id}`)
//             // if (btnAtual.classList.contains("btn-pink")) {
//             //     btnAtual.classList.remove("btn-pink")
//             // }
//             btnAtual.classList.add("btn-white")
//         }
//     }

//     // exibindo - ou não - o gráfico
//     let graficoExibir = document.getElementById(`grafico${idMaquina}`)
//     graficoExibir.classList.remove("display-none")
//     graficoExibir.classList.add("display-block")

//     // alterando estilo do botão
//     // let btnExibir = document.getElementById(`div_dashboard${idMaquina}`)
//     // btnExibir.classList.remove("btn-white")
//     // btnExibir.classList.add("btn-pink")
// }

// function obterDadosGrafico(idMaquina) {

//     // alterarTitulo(idMaquina)

//     if (proximaAtualizacao != undefined) {
//         clearTimeout(proximaAtualizacao);
//     }

//     fetch(`/registro/ultimos/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (resposta) {
//                 console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
//                 resposta.reverse();

//                 plotarGrafico(resposta, idMaquina);

//             });
//         } else {
//             console.error('Nenhum dado encontrado ou erro na API');
//         }
//     })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//         });
// }

// var valorRegistroRam = ;
// var valorRegistroCpu = ;

// function plotarGrafico(resposta, idMaquina) {

//     console.log('iniciando plotagem do gráfico...');

//     // Criando estrutura para plotar gráfico - labels
//     let labels = [];

//     // Criando estrutura para plotar gráfico - dados
//     let dados = {
//         labels: labels,
//         datasets: [{
//             label: 'CPU',
//             data: [],
//             fill: true,
//             backgroundColor: '#061980',
//             borderColor: '#c7eaf6',
//             tension: 0.1
//         },
//         {
//             label: 'RAM',
//             data: [],
//             fill: true,
//             backgroundColor: '#98a40b',
//             borderColor: '#eeff83',
//             tension: 0.1
//         }]
//     };

//     console.log('----------------------------------------------')
//     console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
//     console.log(resposta)

//     // Inserindo valores recebidos em estrutura para plotar o gráfico
//     for (i = 0; i < resposta.length; i++) {
//         var registro = resposta[i];
//         labels.push(registro.tempoCapturas);
//         dados.datasets[0].data.push(registro.valorRegistroCpu);
//         dados.datasets[1].data.push(registro.valorRegistroRam);
//     }

//     console.log('----------------------------------------------')
//     console.log('O gráfico será plotado com os respectivos valores:')
//     console.log('Labels:')
//     console.log(labels)
//     console.log('Dados:')
//     console.log(dados.datasets)
//     console.log('----------------------------------------------')

//     // Criando estrutura para plotar gráfico - config
//     const config = {
//         type: 'line',
//         data: dados,
//     };

//     // Adicionando gráfico criado em div na tela
//     let myChart = new Chart(
//         document.getElementById(`myChartCanvas${idMaquina}`),
//         config
//     );

//     setTimeout(() => atualizarGrafico(idMaquina, dados, myChart), 2000);
// }

// function atualizarGrafico(idMaquina, dados, myChart) {



//     fetch(`/registro/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (novoRegistro) {

//                 buscarDados(idMaquina);
//                 // alertar(novoRegistro, idMaquina);
//                 console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
//                 console.log(`Dados atuais do gráfico:`);
//                 console.log(dados);

//                 let avisoCaptura = document.getElementById(`avisoCaptura${idMaquina}`)
//                 avisoCaptura.innerHTML = ""


//                 if (novoRegistro[0].tempoCapturas == dados.labels[dados.labels.length - 1]) {
//                     console.log("---------------------------------------------------------------")
//                     console.log("Como não há dados novos para captura, o gráfico não atualizará.")
//                     avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
//                     console.log("Horário do novo dado capturado:")
//                     console.log(novoRegistro[0].tempoCapturas)
//                     console.log("Horário do último dado capturado:")
//                     console.log(dados.labels[dados.labels.length - 1])
//                     console.log("---------------------------------------------------------------")
//                 } else {
//                     // tirando e colocando valores no gráfico
//                     dados.labels.shift(); // apagar o primeiro
//                     dados.labels.push(novoRegistro[0].tempoCapturas); // incluir um novo momento

//                     dados.datasets[0].data.shift();  // apagar o primeiro de cpu
//                     dados.datasets[0].data.push(novoRegistro[0].valorRegistroCpu); // incluir uma nova medida de cpu

//                     dados.datasets[1].data.shift();  // apagar o primeiro de ram
//                     dados.datasets[1].data.push(novoRegistro[0].valorRegistroRam); // incluir uma nova medida de ram

//                     myChart.update();
//                 }

//                 // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//                 proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados, myChart), 2000);
//             });
//         } else {
//             console.error('Nenhum dado encontrado ou erro na API');
//             // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//             proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados, myChart), 2000);
//         }
//     })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//         });

// }