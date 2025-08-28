let chartUsuarios = null
let chartProdutos = null

document.getElementById('gerarGraficoUsuario').addEventListener('click', () => {
  const idIni = Number(document.getElementById('idIniUser').value)
  const idFim = Number(document.getElementById('idFimUser').value)

  fetch('https://dummyjson.com/users')
    .then(resp => {
      if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`)
      return resp.json()
    })
    .then(data => {
      const users = data.users  
      const slice = users.slice(idIni, idFim + 1).slice(0, 10)
      const labels = slice.map(u => `${u.firstName} ${u.lastName}`)
      const values = slice.map(u => u.age)
      renderChart('graficoUsuarios', chartUsuarios, labels, values, 'Idade')
      chartUsuarios = window.lastChart
    })
    .catch(err => console.error('Erro ao buscar usuários:', err))
})

document.getElementById('gerarGraficoProduto').addEventListener('click', () => {
  const idIni = Number(document.getElementById('idIniProd').value)
  const idFim = Number(document.getElementById('idFimProd').value)

  fetch('https://dummyjson.com/products')
    .then(resp => {
      if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`)
      return resp.json()
    })
    .then(data => {
      const products = data.products 
      const slice = products.slice(idIni, idFim + 1).slice(0, 10)
      const labels = slice.map(p => p.title)
      const values = slice.map(p => p.stock)
      renderChart('graficoProdutos', chartProdutos, labels, values, 'Estoque')
      chartProdutos = window.lastChart
    })
    .catch(err => console.error('Erro ao buscar produtos:', err))
})

function renderChart(canvasId, oldChart, labels, data, yLabel) {
  const ctx = document.getElementById(canvasId)
  if (oldChart) oldChart.destroy()
  window.lastChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: yLabel,
        data,
        backgroundColor: 'rgba(120, 120, 120, 0.6)',
        borderColor: 'rgba(80, 80, 80, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  })
}
