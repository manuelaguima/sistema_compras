// apaga produto 
const resExcluirProduto = document.getElementById('res-excluir-produto');
const apagProduto = document.getElementById('apagProduto');

const cadastrarLote = document.getElementById('cadastrarLote')
const resLote = document.getElementById('resLote')

cadastrarLote.addEventListener('click', (e) => {
  e.preventDefault();
  const valores = [];

  fetch('https://dummyjson.com/products')
    .then(resp => resp.json())
    .then(dadosDummy => {
      console.log(dadosDummy.products);

      dadosDummy.products.forEach(dad => {
        const val = {
          titulo: dad.title,
          descricao: dad.description,
          categoria: dad.category,
          preco: Number(dad.price), // garante que seja número
          percentualDesconto: dad.discountPercentage,
          estoque: dad.stock,
          marca: dad.brand,
          imagem: dad.thumbnail
        };
        valores.push(val);
      });

      console.log('Dados a enviar para o backend:', valores);

      fetch(`http://localhost:3000/produto/lote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
      })
        .then(resp => resp.json())
        .then(dados => {
          console.log('Retorno dos dados salvos:', dados);

          // Gera o HTML da tabela com os dados
          resLote.innerHTML = `
            <table class="tabela-produtos">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Desconto (%)</th>
                  <th>Estoque</th>
                  <th>Marca</th>
                  <th>Imagem</th>
                </tr>
              </thead>
              <tbody>
                ${dados.map(prod => `
                  <tr>
                    <td>${prod.id}</td>
                    <td>${prod.titulo}</td>
                    <td>${prod.descricao}</td>
                    <td>${prod.categoria}</td>
                    <td>R$ ${Number(prod.preco).toFixed(2)}</td>
                    <td>${prod.percentualDesconto}%</td>
                    <td>${prod.estoque}</td>
                    <td>${prod.marca}</td>
                    <td><img src="${prod.imagem}" alt="${prod.titulo}" height="40" /></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `;
        })
        .catch(err => {
          console.error('Erro ao gravar os dados', err);
          resLote.innerHTML = '<p style="color: red;">Erro ao salvar os produtos.</p>';
        });
    })
    .catch(err => {
      console.error('Erro ao carregar os dados do DummyJSON', err);
      resLote.innerHTML = '<p style="color: red;">Erro ao buscar produtos da API Dummy.</p>';
    });
});


apagProduto.addEventListener('click', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('excluir-produto-id').value.trim());

  resExcluirProduto.innerHTML = '';

  if (!id) {
    resExcluirProduto.style.color = '#ff6b6b';
    resExcluirProduto.textContent = 'Digite um código válido.';
    return;
  }

  fetch(`http://localhost:3000/produto/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((resp) => {
      if (resp.status === 204) {
        resExcluirProduto.style.color = '#90ee90';
        resExcluirProduto.textContent = 'Produto excluído com sucesso!';
      } else {
        resExcluirProduto.style.color = '#ff6b6b';
        resExcluirProduto.textContent = 'Produto não encontrado!';
      }
    })
    .catch((err) => {
      console.error('Erro ao apagar o produto!', err);
      resExcluirProduto.style.color = '#ff6b6b';
      resExcluirProduto.textContent = 'Erro ao excluir o produto. Tente novamente.';
    });
});


// atualizar produto 
const resAtualizarProduto = document.getElementById('res-atualizar-produto');
const atualProduto = document.getElementById('atualProduto');

atualProduto.addEventListener('click', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('atualizar-produto-id').value.trim());
  const nome = document.getElementById('atualizar-produto-nome').value.trim();

  resAtualizarProduto.innerHTML = '';

  if (!id || !nome) {
    resAtualizarProduto.style.color = '#ff6b6b';
    resAtualizarProduto.textContent = 'Preencha o código e o nome do produto.';
    return;
  }

  fetch(`http://localhost:3000/produto/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome }),
  })
    .then(resp => {
      if (!resp.ok) throw new Error();
      return resp.json();
    })
    .then(dados => {
      resAtualizarProduto.style.color = '#90ee90';
      resAtualizarProduto.innerHTML = `Produto atualizado: <strong>${dados.nome}</strong>`;
    })
    .catch(err => {
      console.error('Erro ao atualizar o produto!', err);
      resAtualizarProduto.style.color = '#ff6b6b';
      resAtualizarProduto.textContent = 'Erro ao atualizar. Verifique o código.';
    });
});


// cadastra produto
const resCadastroProduto = document.getElementById('res-cadastro-produto');
const cadProduto = document.getElementById('cadProduto');

cadProduto.addEventListener('click', (e) => {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value
  const descricao = document.getElementById('descricao').value
  const categoria = document.getElementById('categoria').value
  const preco = Number(document.getElementById('preco').value)
  const percentualDesconto = Number(document.getElementById('percentualDesconto').value)
  const estoque = Number(document.getElementById('estoque').value)
  const marca = document.getElementById('marca').value
  const imagem = document.getElementById('imagem').value

  resCadastroProduto.innerHTML = '';

  const produto = {
    titulo,
    descricao,
    categoria,
    preco,
    percentualDesconto,
    estoque,
    marca,
    imagem
  }

  fetch(`http://localhost:3000/produto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  })
    .then((resp) => {
      if (!resp.ok) throw new Error();
      return resp.json();
    })
    .then((dados) => {
      resCadastroProduto.style.color = '#90ee90';
      resCadastroProduto.innerHTML = `Produto cadastrado com sucesso! Nome: <strong>${dados.titulo}</strong>`;
    })
    .catch((err) => {
      console.error('Erro ao cadastrar o produto!', err);
      resCadastroProduto.style.color = '#ff6b6b';
      resCadastroProduto.textContent = 'Erro ao cadastrar. Tente novamente.';
    });
});


// listar produto 
const resListaProduto = document.getElementById('res-lista-produto');
const lisProduto = document.getElementById('lisProduto');

lisProduto.addEventListener('click', () => {
  resListaProduto.innerHTML = '';
  resListaProduto.style.color = '#000';

  fetch('http://localhost:3000/produto')
    .then(resp => {
      if (!resp.ok) throw new Error();
      return resp.json();
    })
    .then(dados => {
      if (dados.length === 0) {
        resListaProduto.textContent = 'Nenhum produto encontrado.';
        return;
      }

      const ul = document.createElement('ul');
      ul.style.listStyle = 'none';
      ul.style.padding = 0;

      dados.forEach(item => {
        const li = document.createElement('li');
        li.style.marginBottom = '15px';
        li.innerHTML = `
          <strong>Código:</strong> ${item} <br>
          <hr style="margin-top:10px;">
        `;
        ul.appendChild(li);
      });

      resListaProduto.appendChild(ul);
    })
    .catch(err => {
      console.error('Erro ao listar os produtos!', err);
      resListaProduto.style.color = 'red';
      resListaProduto.textContent = 'Erro ao listar os produtos. Tente novamente.';
    });
});

fetch('http://localhost:3000/produto')
.then(resp => {
  if (!resp.ok) throw new Error();
  return resp.json();
})
.then(dados => {
  if (dados.length === 0) {
    resListaProduto.textContent = 'Nenhum produto encontrado.';
    return;
  }

  let tabela = `
    <table class="tabela-produtos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th>Desconto (%)</th>
          <th>Estoque</th>
          <th>Marca</th>
          <th>Imagem</th>
        </tr>
      </thead>
      <tbody>
  `;

  dados.forEach(p => {
    tabela += `
      <tr>
        <td>${p.id}</td>
        <td>${p.titulo}</td>
        <td>${p.descricao}</td>
        <td>${p.categoria}</td>
        <td>R$ ${p.preco}</td>
        <td>${p.percentualDesconto}%</td>
        <td>${p.estoque}</td>
        <td>${p.marca}</td>
        <td><img src="${p.imagem}" alt="${p.titulo}" height="40" /></td>
      </tr>
    `;
  });

  tabela += `</tbody></table>`;
  resListaProduto.innerHTML = tabela;
})
.catch(err => {
  console.error('Erro ao listar os produtos!', err);
  resListaProduto.style.color = 'red';
  resListaProduto.textContent = 'Erro ao listar os produtos. Tente novamente.';
});
