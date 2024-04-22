const ctx = document.getElementById('myChart1');
console.log(ctx);
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'],
        datasets: [{
            label: 'CPU',
            data: [10, 13, 15, 57, 85, 44, 17, 20, 22],
            borderWidth: 2,
            fill: true
        },
        {
            label: 'RAM',
            data: [70, 73, 74, 72, 80, 78, 76, 75, 74],
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                title: {
                    display: true,
                    text: '% de uso'
                },
                beginAtZero: true,
            }
        },
        elements: {
            line: {
                cubicInterpolationMode: 'monotone'
            }
        }
    }
});

const ctx2 = document.getElementById('myChart2');
console.log(ctx);
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        datasets: [{
            label: 'Escritas',
            data: [5255, 7753, 3321, 1100, 3300, 1000, 7777],
            borderWidth: 2
        },
        {
            label: 'Lidas',
            data: [3423, 2112, 3211, 3421, 3903, 2532, 2122],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx3 = document.getElementById('myChart3');
console.log(ctx);
new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['01:00', '02:00', '03:00', '04:00', '05:00'],
        datasets: [{
            label: 'Bytes Escritos',
            data: [1200, 1943, 2222, 2121, 1500],
            borderWidth: 2
        },
        {
            label: 'Bytes Lidos',
            data: [1550, 1343, 2525, 1876, 1650],
            borderWidth: 2
        },
        {
            label: 'Taxa de transferência',
            data: [1000, 1000, 2000, 1000, 3000],
            borderWidth: 2,
            borderDash: [10, 10]
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx4 = document.getElementById('myChart4');
console.log(ctx);
new Chart(ctx4, {
    type: 'line',
    data: {
        labels: ['00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'],
        datasets: [{
            label: 'Enviados',
            data: [1200, 1222, 1333, 1543, 2231, 4154, 3212, 5432, 3212],
            borderWidth: 2
        },
        {
            label: 'Recebidos',
            data: [1212, 1964, 3243, 5654, 2213, 3977, 3121, 2144, 3431],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});