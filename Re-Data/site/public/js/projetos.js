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