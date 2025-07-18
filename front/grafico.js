let graf = document.getElementById('graf')

graf.addEventListener('click', ()=>{
    const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['com gás', 'sem gás', 'suco'],
        datasets: [{
            label: '# of Votes',
            data: [20, 30, 15],
            borderWidth: 1
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
})
