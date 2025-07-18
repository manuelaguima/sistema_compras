//apaga a compra
const resExcluir = document.getElementById('res-excluir');
const apagCompra = document.getElementById('apagCompra');

apagCompra.addEventListener('click', (e) => {
  e.preventDefault();
  const id = Number(document.getElementById('excluir-id').value.trim());

  resExcluir.innerHTML = '';

  if (!id) {
    resExcluir.style.color = '#ff6b6b';
    resExcluir.textContent = 'Digite um código válido.';
    return;
  }

  fetch(`http://localhost:3000/compra/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 204) {
        resExcluir.style.color = '#90ee90';
        resExcluir.textContent = 'Compra excluída com sucesso!';
      } else {
        resExcluir.style.color = '#ff6b6b';
        resExcluir.textContent = 'Compra não encontrada!';
      }
    })
    .catch((err) => {
      console.error('Erro ao apagar as compras!', err);
      resExcluir.style.color = '#ff6b6b';
      resExcluir.textContent = 'Erro ao excluir. Tente novamente.';
    });
});


// atualizar a compra
const resAtualizar = document.getElementById('res-atualizar');
const atualCompra = document.getElementById('atualCompra');

atualCompra.addEventListener('click', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('atualizar-id').value.trim());
  const nome = document.getElementById('atualizar-nome').value.trim();

  resAtualizar.innerHTML = '';

  if (!id || !nome) {
    resAtualizar.style.color = '#ff6b6b';
    resAtualizar.textContent = 'Preencha o código e o nome da compra.';
    return;
  }

  fetch(`http://localhost:3000/compra/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome }),
  })
    .then((resp) => {
      if (!resp.ok) throw new Error();
      return resp.json();
    })
    .then((dados) => {
      resAtualizar.style.color = '#90ee90';
      resAtualizar.innerHTML = `Compra atualizada: <strong>${dados.nome}</strong>`;
    })
    .catch((err) => {
      console.error('Erro ao atualizar as compras!', err);
      resAtualizar.style.color = '#ff6b6b';
      resAtualizar.textContent = 'Erro ao atualizar. Verifique o código.';
    });
});


// cadastrar compra 
const resCadastro = document.getElementById('res-cadastro');
const cadFab = document.getElementById('cadFab');

cadFab.addEventListener('click', (e) => {
  e.preventDefault();

  const idUsuario = Number(document.getElementById('idUsuario').value)
  const idProduto = Number(document.getElementById('idProduto').value)
  const quantidade = Number(document.getElementById('quantidade').value)
  const dataCompra = document.getElementById('dataCompra').value
  const precoUnitario = Number(document.getElementById('precoUnitario').value)
  const descontoAplicado = Number(document.getElementById('descontoAplicado').value)
  const precoFinal = precoUnitario - (precoUnitario * (descontoAplicado/100))
  const formaPagamento = document.getElementById('formaPagamento').value
  const statusCompra = document.getElementById('statusCompra').value

  resCadastro.innerHTML = '';

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
      if (!resp.ok) throw new Error();
      return resp.json();
    })
    .then(dados => {
      resCadastro.style.color = '#90ee90';
      resCadastro.innerHTML = `Compra cadastrada com sucesso!</strong>`;
    })
    .catch((err) => {
      console.error('Erro ao cadastrar a compra!', err);
      resCadastro.style.color = '#ff6b6b';
      resCadastro.textContent = 'Erro ao cadastrar. Tente novamente.';
    });
});


// listar compra 
const resLista = document.getElementById('res-lista');
const lisCompra = document.getElementById('lisCompra');

lisCompra.addEventListener('click', () => {
  resLista.innerHTML = '';
  resLista.style.color = '#000';

  fetch('http://localhost:3000/compra')
    .then((resp) => {
      if (!resp.ok) throw new Error();
      return resp.json();
    })
    .then((dados) => {
      if (dados.length === 0) {
        resLista.textContent = 'Nenhuma compra encontrada.';
        return;
      }

      const lista = document.createElement('ul');
      lista.style.listStyleType = 'none';
      lista.style.padding = '0';

      dados.forEach((item) => {
        const li = document.createElement('li');
        li.style.marginBottom = '15px';
        li.innerHTML = `
          <strong>Código:</strong> ${item.idCompra} <br>
          <strong>Nome:</strong> ${item.nome}
          <hr style="margin-top:10px;">
        `;
        lista.appendChild(li);
      });

      resLista.appendChild(lista);
    })
    .catch((err) => {
      console.error('Erro ao listar as compras!', err);
      resLista.style.color = '#ff6b6b';
      resLista.textContent = 'Erro ao listar as compras. Tente novamente.';
    });
});

fetch('http://localhost:3000/compra')
    .then(resp => {
      if (!resp.ok) throw new Error();
      return resp.json();
    })
    .then(dados => {
      if (dados.length === 0) {
        resLista.textContent = 'Nenhuma compra encontrada.';
        return;
      }

      let tabela = `
        <table class="tabela-compras">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
      `;

      dados.forEach(c => {
        tabela += `
          <tr>
            <td>${c.idCompra}</td>
            <td>${c.nome}</td>
          </tr>
        `;
      });

      tabela += `</tbody></table>`;
      resLista.innerHTML = tabela;
    })
    .catch(err => {
      console.error('Erro ao listar as compras!', err);
      resLista.style.color = 'red';
      resLista.textContent = 'Erro ao listar as compras. Tente novamente.';
    });
