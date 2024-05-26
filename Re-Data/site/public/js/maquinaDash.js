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
    }, "1000");}

const ctx = document.getElementById('usoCpuRam');
console.log(ctx);
new Chart(ctx, {
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

const ctx02 = document.getElementById('usoRede');
console.log(ctx02);
new Chart(ctx02, {
    type: 'line',
    data: {
        labels: ['00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'],
        datasets: [{
            label: 'Rede',
            data: [43, 40, 50, 55, 58, 70, 73, 84, 85],
            backgroundColor: '#061980',
            borderColor: '#c7eaf6',
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
                text: "Velocidade da Rede",
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

const ctx03 = document.getElementById('usoVolume');
console.log(ctx03);
new Chart(ctx03, {
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
