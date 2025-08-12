let valores = []

let cadastrarLote = document.getElementById('cadastrarLote')
let resLote = document.getElementById('resLote')

let btnExcluir =  document.getElementById('apagUsuario')

let formUsuario = document.getElementById('formUsuario')
let resUsuario = document.getElementById('resUsuario')

let btnAtualizar = document.getElementById('atualUsuario')

btnExcluir.addEventListener('click',(e)=>{
    e.preventDefault()
    let excluirUsuario = Number(document.getElementById('excluir-usuario-id').value)
     fetch(`http://localhost:3000/usuario/${excluirUsuario}`,{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
        })
        .then(dados => {
            let res =  document.getElementById('res-excluir-usuario')
            res.innerHTML = 'Dados excluídos com sucesso!'
    })
})

cadastrarLote.addEventListener('click', (e)=>{
    e.preventDefault()
    valores = []
    fetch('https://dummyjson.com/users')
    .then(resp => resp.json())
    .then(dadosDummy => {
        console.log(dadosDummy.users)
        console.log('---- antes ----------')
        // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
        dadosDummy.users.forEach(dad => {
            const val = {
                primeiroNome: dad.firstName,
                sobrenome: dad.lastName,
                idade: dad.age,
                email: dad.email,
                telefone: dad.phone,
                endereco: dad.address.address,
                cidade: dad.address.city,
                estado: dad.address.state,
                dataNascimento: dad.birthDate
            }
            valores.push(val)

            

        })
        console.log(valores)
        console.log('-------------')

        fetch(`http://localhost:3000/usuario/lote`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(valores)
        })
        .then(resp => resp.json())
        .then(dados => {
            console.log('Retorno dos dados')
            console.log('======================')
            console.log(dados)

            // A tabela vai aqui depois

            // ------------------------------
            // formatação da tabela dinâmica
            resLote.innerHTML = ` `
            resLote.innerHTML += ` 
                <table class="container-tabela">
                ${gerarHeadTabela()}
                ${gerarBodyTabela(dados)}
                </table>
            `


        })
        .catch((err)=>{
            console.error('Erro ao gravar os dados', err)
        })


            

    })
    .catch((err)=>{
        console.error('Não foi possível carrgar os dados',err)
    })

})

formUsuario.addEventListener('click', (e)=>{
    e.preventDefault()

    // console.log(cadastrarUsuario)
    
    resUsuario.innerHTML = ` `
    resUsuario.innerHTML += ` ${gerarFormulario()}`
    
    let cadastrarUsuario = document.getElementById('cadastrarUsuario')
    console.log(cadastrarUsuario)

    cadastrarUsuario.addEventListener('click', (e)=>{
        e.preventDefault()

        let primeiroNome = document.getElementById('primeiroNome').value
        let sobrenome = document.getElementById('sobrenome').value
        let idade = document.getElementById('idade').value
        let email = document.getElementById('email').value
        let telefone = document.getElementById('telefone').value
        let endereco = document.getElementById('endereco').value
        let cidade = document.getElementById('cidade').value
        let estado = document.getElementById('estado').value
        let dataNascimento = document.getElementById('dataNascimento').value

        const valores = {
            primeiroNome: primeiroNome,
            sobrenome: sobrenome,
            idade: idade,
            email: email,
            telefone: telefone,
            endereco: endereco,
            cidade: cidade,
            estado: estado,
            dataNascimento: dataNascimento
        }


        fetch(`http://localhost:3000/usuario`, {
            method: 'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(valores)
        })
        .then(resp => resp.json())
        .then(dados => {
            console.log(dados)

            resUsuario.innerHTML += `Nome: ${dados.primeiroNome} | Sobrenome: ${dados.sobrenome} <br>`
            resUsuario.innerHTML += `Fone: ${dados.telefone} | Nascimento: ${dados.dataNascimento} <br>`
        })
        .catch((err)=>{
            console.error('Erro ao cadastrar os dados', err)
        })

        
    })

})

btnAtualizar.addEventListener('click', (e)=>{
    e.preventDefault()

    let id = document.getElementById('atualizar-usuario-id').value
    let nome = document.getElementById('atualizar-usuario-nome').value

    const valores = {
        primeiroNome: nome
    }

    fetch(`http://localhost:3000/usuario/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(valores)
        })
        .then(resp => resp.json())
        .then(dados => {
            console.log(dados)

            resUsuario.innerHTML += `Usuário atualizado com sucesso`
        })
        .catch((err)=>{
            console.error('Erro ao atualizar os dados', err)
        })
})


function gerarHeadTabela(){
    let cabecalho = `
    <thead>
        <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>Cidade</th>
            <th>Estado</th>
        </tr>
    </thead>    
    `
    return cabecalho
}

function gerarBodyTabela(valores){
    let corpoTabela = `<tbody>`
    
    valores.forEach(val =>{
        corpoTabela += `
        <tr>
            <td>${val.primeiroNome}</td>
            <td>${val.idade}</td>
            <td>${val.email}</td>
            <td>${val.cidade}</td>
            <td>${val.estado}</td>
        </tr>
        `
    })

    corpoTabela += `</tbody>` 
    
    return corpoTabela
}

function gerarFormulario(){
    let formulario = `
    
    <form>
        <label for="primeiroNome">Nome do Usuário:</label><br>
        <input type="text" id="primeiroNome" placeholder="nome"><br><br>

        <label for="sobrenome">Sobrenome do Usuário:</label><br>
        <input type="text" id="sobrenome" placeholder="sobrenome"><br><br>

        <label for="idade">Idade do Usuário:</label><br>
        <input type="text" id="idade" placeholder="idade"><br><br>

        <label for="email">Email do Usuário:</label><br>
        <input type="text" id="email" placeholder="email"><br><br>

        <label for="telefone">Telefone do Usuário:</label><br>
        <input type="text" id="telefone" placeholder="telefone"><br><br>

        <label for="endereco">Endereco do Usuário:</label><br>
        <input type="text" id="endereco" placeholder="endereço"><br><br>

        <label for="cidade">Cidade do Usuário:</label><br>
        <input type="text" id="cidade" placeholder="cidade"><br><br>

        <label for="estado">Estado:</label><br>
        <input type="text" id="estado" placeholder="estado"><br><br>

        <label for="dataNascimento">Data de Nascimento do Usuário:</label><br>
        <input type="date" id="dataNascimento" placeholder="Data de Nascimento"><br><br>

        <button id="cadastrarUsuario">Cadastrar</button><br><br>
    </form>
    
    `

    return formulario
}



/*

<table class="container-tabela">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>valor do Nome</td>
                            <td>valor do Idade</td>
                            <td>valor do Email</td>
                            <td>valor do Cidade</td>
                            <td>valor do Estado</td>
                        </tr>
                        <tr>
                            <td>valor do Nome</td>
                            <td>valor do Idade</td>
                            <td>valor do Email</td>
                            <td>valor do Cidade</td>
                            <td>valor do Estado</td>
                        </tr>
                    </tbody>
                </table>

*/

/*

            <form>
                <label for="primeiroNome">Nome do Usuário:</label><br>
                <input type="text" id="primeiroNome" placeholder="nome"><br><br>

                <label for="sobrenome">Sobrenome do Usuário:</label><br>
                <input type="text" id="sobrenome" placeholder="sobrenome"><br><br>

                <label for="idade">Idade do Usuário:</label><br>
                <input type="text" id="idade" placeholder="idade"><br><br>

                <label for="email">Email do Usuário:</label><br>
                <input type="text" id="email" placeholder="email"><br><br>

                <label for="telefone">Telefone do Usuário:</label><br>
                <input type="text" id="telefone" placeholder="telefone"><br><br>

                <label for="endereco">Endereco do Usuário:</label><br>
                <input type="text" id="endereco" placeholder="endereço"><br><br>

                <label for="cidade">Cidade do Usuário:</label><br>
                <input type="text" id="cidade" placeholder="cidade"><br><br>

                <label for="estado">Nome do Usuário:</label><br>
                <input type="text" id="estado" placeholder="estado"><br><br>

                <label for="dataNascimento">Data de Nascimento do Usuário:</label><br>
                <input type="date" id="dataNascimento" placeholder="Data de Nascimento"><br><br>

                <button id="cadastrarUsuario">Cadastrar</button><br><br>
            </form>

*/

