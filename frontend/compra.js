let resExcluir = document.getElementById('res-excluir')
let btnExcluir = document.getElementById('apagCompra')
let resAtualizar = document.getElementById('res-atualizar')

let resLista = document.getElementById('res-lista')
let lisCompra = document.getElementById('lisCompra')

let btnAtualizar = document.getElementById('atualCompra')

apagCompra.addEventListener('click', (e) => {
  e.preventDefault()

  const idCompra = document.getElementById('id-excluir').value

  fetch(`http://localhost:3000/compra/${idCompra}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resp => {
      if (resp.status === 204) {
        resExcluir.innerHTML = `Compra excluída com sucesso!`
      } else {
        resExcluir.innerHTML = `Erro ao excluir. Código: ${resp.status}`
        console.log(idCompra)
      }
    })
    .catch(err => {
      console.error('Erro ao excluir a compra!', err)
      resExcluir.innerHTML = `Erro na requisição. Veja o console para mais detalhes.`
    })
})

btnAtualizar.addEventListener('click', (e) => {
  e.preventDefault()

  let id = document.getElementById('atualizar-id').value
  let nome = document.getElementById('atualizar-nome').value

  const valores = {
    primeiroNome: nome
  }

  fetch(`http://localhost:3000/usuario/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(valores)
  })
    .then(resp => resp.json())
    .then(dados => {
      console.log(dados)
      resAtualizar.innerHTML += `Compra atualizada com sucesso`
    })
    .catch((err) => {
      console.error('Erro ao atualizar os dados', err)
    })
})


// cadastrar compra 
const resCadastro = document.getElementById('res-cadastro')
const cadFab = document.getElementById('cadFab')

cadFab.addEventListener('click', (e) => {
  e.preventDefault()

  const idUsuario = Number(document.getElementById('idUsuario').value)
  const idProduto = Number(document.getElementById('idProduto').value)
  const quantidade = Number(document.getElementById('quantidade').value)
  const dataCompra = document.getElementById('dataCompra').value
  const precoUnitario = Number(document.getElementById('precoUnitario').value)
  const descontoAplicado = Number(document.getElementById('descontoAplicado').value)
  const precoFinal = precoUnitario - (precoUnitario * (descontoAplicado / 100))
  const formaPagamento = document.getElementById('formaPagamento').value
  const statusCompra = document.getElementById('statusCompra').value

  resCadastro.innerHTML = ''

  const valores = {
    idUsuario,
    idProduto,
    quantidade,
    dataCompra,
    precoUnitario,
    descontoAplicado,
    precoFinal,
    formaPagamento,
    statusCompra
  }

  fetch(`http://localhost:3000/compra`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(valores),
  })
    .then(resp => {
      if (!resp.ok) throw new Error()
      return resp.json()
    })
    .then(dados => {
      resCadastro.innerHTML = `Compra cadastrada com sucesso!</br>`
    })
    .catch((err) => {
      console.error('Erro ao cadastrar a compra!', err)
      console.log(dataCompra)
    })
})


// listar compra 

lisCompra.addEventListener('click', (e) => {
  e.preventDefault()
  resLista.innerHTML = ''
  fetch('http://localhost:3000/compra')
    .then((resp) => {
      if (!resp.ok) throw new Error()
      return resp.json()
    })
    .then((dados) => {
      if (dados.length === 0) {
        resLista.innerHTML = 'Nenhuma compra encontrada.'
        return
      }

      const lista = document.createElement('ul')


      dados.forEach((item) => {
        const li = document.createElement('li')
        li.innerHTML = `
          <strong>Código:</strong> ${item.id} <br>
          <strong>Nome:</strong> ${item.quantidade}
          <hr>
        `
        lista.appendChild(li)
      })

      resLista.appendChild(lista)
    })
    .catch((err) => {
      console.error('Erro ao listar as compras!', err)
      resLista.innerHTML = 'Erro ao listar as compras. Tente novamente.'
    })
})

fetch('http://localhost:3000/compra')
  .then(resp => {
    if (!resp.ok) throw new Error()
    return resp.json()
  })
  .then(dados => {
    if (dados.length === 0) {
      resLista.innerHTML = 'Nenhuma compra encontrada.'
      return
    }

    let tabela = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
    `

    dados.forEach(c => {
      tabela += `
        <tr>
          <td>${c.idCompra}</td>
          <td>${c.nome}</td>
        </tr>
      `
    })

    tabela += `</tbody></table>`
    resLista.innerHTML = tabela
  })
  .catch(err => {
    console.error('Erro ao listar as compras!', err)
    resLista.innerHTML = 'Erro ao listar as compras. Tente novamente.'
  })
