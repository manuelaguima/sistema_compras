// cadastrar usuario
const formCadastro = document.getElementById('formCadastroUsuario');
const resCadastro = document.getElementById('res-cadastro-usuario');

formCadastro.addEventListener('submit', (e) => {
  e.preventDefault();

  const primeiroNome = document.getElementById('usuario-nome').value
  const sobrenome = document.getElementById('usuario-sobrenome').value
  const idade = Number(document.getElementById('usuario-idade').value)
  const email = document.getElementById('usuario-email').value
  const telefone = document.getElementById('usuario-telefone').value
  const endereco = document.getElementById('usuario-endereco').value
  const cidade = document.getElementById('usuario-cidade').value
  const estado = document.getElementById('usuario-estado').value
  const dataNasc = document.getElementById('usuario-nascimento').value

  const dados = {
    primeiroNome,
    sobrenome,
    idade,
    email,
    telefone,
    endereco,
    estado,
    cidade,
    dataNasc
  };

  fetch('http://localhost:3000/usuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(resp => resp.json())
    .then(usuario => {
      resCadastro.innerHTML = `<span class="success">Usuário ${usuario.primeiroNome} cadastrado com sucesso! Código de Usuário  ${usuario.id} </span>`;
    })
    .catch(err => {
      console.error('Erro ao cadastrar usuário:', err);
      resCadastro.innerHTML = `<span class="error">Erro: ${err.message}</span>`;
    });
});

//excluir usuario
const formExcluir = document.getElementById('formExcluirUsuario');
const resExcluir = document.getElementById('res-excluir-usuario');

formExcluir.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('excluir-usuario-id').value);

  if (!id) {
    resExcluir.innerHTML = '<span class="error">Informe o código do usuário.</span>';
    return;
  }

  fetch(`http://localhost:3000/usuario/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(resp => {
      if (resp.status === 204) {
        resExcluir.innerHTML = `<span class="success">Usuário ${usuario.primeiroNome} exluído com sucesso!</span>`
      } else {
        resExcluir.innerHTML = '<span class="error">Usuário não encontrado.</span>';
      }
    })
    .catch(err => {
      console.error('Erro ao excluir usuário:', err);
      resExcluir.innerHTML = `<span class="error">Erro: ${err.message}</span>`;
    });
});

//atualizar usuario
const formAtualizar = document.getElementById('formAtualizarUsuario');
const resAtualizar = document.getElementById('res-atualizar-usuario');

formAtualizar.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('atualizar-usuario-id').value);
  const nome = document.getElementById('atualizar-usuario-nome').value.trim();

  if (!id || !nome) {
    resAtualizar.innerHTML = '<span class="error">Preencha o código e o novo nome.</span>';
    return;
  }

  fetch(`http://localhost:3000/usuario/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  })
    .then(resp => {
      if (!resp.ok) throw new Error('Usuário não encontrado ou erro na atualização.');
      return resp.json();
    })
    .then(usuario => {
      resAtualizar.innerHTML = `<span class="success">Usuário atualizado: <strong> ${usuario.primeiroNome}</strong></span>`;
      formAtualizar.reset();
    })
    .catch(err => {
      console.error('Erro ao atualizar usuário:', err);
      resAtualizar.innerHTML = `<span class="error">Erro: ${err.message}</span>`;
    });
});

// listar usuario
const btnListar = document.getElementById('lisUsuario');
const resLista = document.getElementById('res-lista-usuario');

btnListar.addEventListener('click', () => {
  resLista.innerHTML = '';

  fetch('http://localhost:3000/usuario')
    .then(resp => {
      if (!resp.ok) throw new Error('Erro ao buscar usuários.');
      return resp.json();
    })
    .then(dados => {
      if (!dados.length) {
        resLista.innerHTML = '<p>Nenhum usuário encontrado.</p>';
        return;
      }

      const ul = document.createElement('ul');
      ul.style.listStyle = 'none';
      ul.style.padding = '0';

      dados.forEach(usuario => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>Código:</strong> ${usuario.id}<br>
          <strong>Nome:</strong> ${usuario.nome}<br>
          <strong>Email:</strong> ${usuario.email || ''}<br>
          <strong>Telefone:</strong> ${usuario.telefone || ''}<br>
          <strong>Cidade:</strong> ${usuario.cidade || ''}<br>
          <hr>
        `;
        ul.appendChild(li);
      });

      resLista.appendChild(ul);
    })
    .catch(err => {
      console.error('Erro ao listar usuários:', err);
      resLista.innerHTML = `<span class="error">Erro: ${err.message}</span>`;
    });
});

btnListar.addEventListener('click', () => {
  resLista.innerHTML = '';

  fetch('http://localhost:3000/usuario')
    .then(resp => {
      if (!resp.ok) throw new Error('Erro ao buscar usuários.');
      return resp.json();
    })
    .then(dados => {
      if (!dados.length) {
        resLista.innerHTML = '<p>Nenhum usuário encontrado.</p>';
        return;
      }

      let tabela = `
        <table class="tabela-usuarios">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Aniversário</th>
            </tr>
          </thead>
          <tbody>
      `;

      dados.forEach(dad => {
        tabela += `
          <tr>
            <td>${dad.id_usuario || dad.id}</td>
            <td>${dad.primeiroNome} ${dad.sobrenome}</td>
            <td>${dad.idade}</td>
            <td>${dad.email}</td>
            <td>${dad.telefone}</td>
            <td>${dad.endereco}</td>
            <td>${dad.cidade}</td>
            <td>${dad.estado}</td>
            <td>${dad.dataNasc}</td>
          </tr>
        `;
      });

      tabela += `</tbody></table>`;
      resLista.innerHTML = tabela;
    })
    .catch(err => {
      console.error('Erro ao listar usuários:', err);
      resLista.innerHTML = `<span class="error">Erro: ${err.message}</span>`;
    });
});
