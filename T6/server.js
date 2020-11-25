var http = require('http')
var axios = require('axios')
var fs = require('fs')

var static = require('./static')

var {parse} = require('querystring')


// Funções Auxilidares
// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback) {
  if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
    let body = ''
    request.on('data', bloco => {
      body += bloco.toString()
    })
    request.on('end', () => {
      console.log(body)
      callback(parse(body))
    })
  }
}


function geraPostConfirm(tarefa, d) {

  return `
    <html>
    <head>
        <title>POST receipt: ${tarefa.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa ${tarefa.title} Inserida!</h1>
            </header>

            <div class="w3-container">
                <p><a href="/tasks/${tarefa.id}"> "Aceda aqui à sua página."</a></p>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por Cândido Vale :: DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}


function geraDeleteConfirm(id, d) {

  return `
    <html>
    <head>
        <title>DELETE receipt: ${id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa ${id} Removida!</h1>
            </header>
            
            <footer class="w3-container w3-teal">
                <address>Gerado por Cândido Vale :: DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

// Template para a página com a lista de Tarefas

function geraPagTasks(tarefas, d) {
  let pagHTML = `
      <html>
          <head>
              <title>Lista de Tarefas</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="favicon.png"/>
              <link rel="stylesheet" href="w3.css"/>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          </head>

          <style>
          .btn {
                background-color: DodgerBlue;
                border: none;
                color: white;
                padding: 6px 8px; 
                font-size: 16px; 
                cursor: pointer; 
          }
          
          .btn:hover {
            background-color: RoyalBlue;
          }
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #008080;

          }
          
          li {
            float: left;
          }
          
          li a {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-size:30px;
          }
          
          .active {
            background-color: #4CAF50;
          }
          </style>

          <body>    
                <ul>
                <li><a href="#">Lista de Tarefas</a></li>
                <li style="float:right"><a class="active" href="/tasks/registo">Inserir Tarefas</a></li>
                </ul>                       

              <div class="w3-container w3-blue-grey" style="text-align:center";>
                  <h2>Tarefas Por Concluir</h2>
              </div>

              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Título</th>
                      <th>Prioridade</th>
                      <th>Dono</th>
                      <th>Descrição</th>
                      <th>Data de Início</th>
                      <th>Data Limite</th>
                  </tr>
    `

  tarefas.forEach(t => {

    if (t.status == "Pendente") {
      pagHTML += `
    
            <tr>
                <td><a href=/tasks/${t.id}>${t.title}</td>
                <td>${t.priority}</td>
                <td>${t.owner}</td>
                <td>${t.description}</td>
                <td>${t.dateCreated}</td>
                <td>${t.dateDued}</td>
                <td>
                <a href="/tasks/${t.id}"> <button class="btn"><i class="fa fa-info-circle"></i></button></a>    
                <a href="/tasks/${t.id}/edit>" <button class="btn"><i class="fa fa-edit"></i></button></a> 
                <a href="/tasks/${t.id}/delete>" <button class="btn"><i class="fa fa-trash"></i></button></a> 
                </td>
                 
            </tr>
        
        `
    }
  })

  pagHTML += `
    
            </table>
            <div class="w3-container w3-light-green" style="text-align:center;">
              <h2>Tarefas Concluídas</h2>
            </div>

              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Título</th>
                      <th>Prioridade</th>
                      <th>Dono</th>
                      <th>Descrição</th>
                      <th>Data de Início</th>
                      <th>Data Limite</th>
                  </tr>
    `

  tarefas.forEach(t => {

    if (t.status == "Concluída") {
      pagHTML += `
    
            <tr>
                <td><a href=/tasks/${t.id}>${t.title}</td>
                <td>${t.priority}</td>
                <td>${t.owner}</td>
                <td>${t.description}</td>
                <td>${t.dateCreated}</td>
                <td>${t.dateDued}</td>
                <td>
                <a href="/tasks/${t.id}"> <button class="btn"><i class="fa fa-info-circle"></i></button></a>  
                <a href="/tasks/${t.id}/edit>" <button class="btn"><i class="fa fa-edit"></i></button></a> 
                <a href="/tasks/${t.id}/delete>" <button class="btn"><i class="fa fa-trash"></i></button></a> 
                </td>
            </tr>
        
        `
    }
  })

  pagHTML += `
          </table>
          <div class="w3-container w3-teal">
              <address style="text-align:center;">Gerado por Cândido Vale:PG42816 :: DAW2020 em ${d}</address>
          </div>
      </body>
      </html>
    `
  return pagHTML
}


// Template para a página de cada tarefa 
function geraPagTarefa(tarefa, d) {
  return `
    <html>
    <head>
        <title>Tarefa: ${tarefa.title}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="../w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa ${tarefa.title}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Título: </b> ${tarefa.title}</li>
                    <li><b>Prioridade: </b> ${tarefa.priority}</li>
                    <li><b>Dono: </b> ${tarefa.owner}</li>
                    <li><b>Descrição: </b> ${tarefa.description}</li>
                    <li><b>Data de Início: </b> ${tarefa.dateCreated}</li>
                    <li><b>Data de Fim: </b> ${tarefa.dateDued}</li>
                    <li><b>Status: </b> ${tarefa.status}</li>
                </ul>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por Cândido Vale :: DAW2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

// Template para o formulário de Tarefas
function geraFormTarefa(d) {
  return `
    <html>
        <head>
            <title>Registo de uma Tarefa</title>
            <link rel="icon" href="favicon.png"/>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>

        <body>

            <div class="w3-container w3-teal">
                <h2>Registar Tarefa</h2>
            </div>

            <form class="w3-container" action="/tasks" method="POST">
                <label class="w3-text-teal"><b>Título</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="title">
          
                <label class="w3-text-teal"><b>Prioridade</b></label>
                <select class="w3-select w3-border w3-light-grey" name="priority">
                <option value="" disabled selected>Selecione uma Prioridade</option>
                <option value="Reduzida">Reduzida</option>
                <option value="Normal">Normal</option>
                <option value="Alta">Alta</option>
                </select>

                <label class="w3-text-teal"><b>Dono</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="owner">

                <label class="w3-text-teal"><b>Descrição</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="description">

                <label class="w3-text-teal"><b>Data de Início</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" id="dateCreated" name="dateCreated"> 

                <label class="w3-text-teal"><b>Data Limite</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" id="dateDued" name="dateDued"> 

                <input type="hidden" name="status" value="Pendente" />
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por Cândido Vale :: DAW2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}


// Template para o formulário de edição de Tarefas
function geraEditTarefa(t, d) {
  return `
    <html>
        <head>
            <title>Edição de uma Tarefa</title>
            <link rel="icon" href="favicon.png"/>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>

        <body>

            <div class="w3-container w3-teal">
                <h2>Alterar Tarefa</h2>
            </div>

            <form class="w3-container" action="/tasks/edit" method="POST">

                <input type="hidden" name="id" value="${t.id}" />

                <label class="w3-text-teal"><b>Título</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="title" value="${t.title}">
          
                <label class="w3-text-teal"><b>Prioridade</b></label>
                <select class="w3-select w3-border w3-light-grey" name="priority">
                <option value="${t.priority}"</option>
                <option value="Reduzida">Reduzida</option>
                <option value="Normal">Normal</option>
                <option value="Alta">Alta</option>
                </select>

                <label class="w3-text-teal"><b>Dono</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="owner" value="${t.owner}">

                <label class="w3-text-teal"><b>Descrição</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="description" value="${t.description}">

                <label class="w3-text-teal"><b>Data de Início</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" id="dateCreated" name="dateCreated" value="${t.dateCreated}"> 

                <label class="w3-text-teal"><b>Data Limite</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" id="dateDued" name="dateDued" value="${t.dateDued}"> 

                <label class="w3-text-teal"><b>Status</b></label>
                <select class="w3-select w3-border w3-light-grey" name="status">
                <option value="${t.status}"</option>
                <option value="Concluída">Concluída</option>
                <option value="Pendente">Pendente</option>
                </select>
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por Cândido Vale :: DAW2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}


// Criação do servidor
var tasksServer = http.createServer(function(req, res) {
  // Logger: que pedido chegou e quando
  var d = new Date().toISOString().substr(0, 16)
  console.log(req.method + " " + req.url + " " + d)

  if (static.recursoEstatico(req)) {
    static.sirvoRecursoEstatico(req, res)
  } else {
    // Tratamento do pedido
    switch (req.method) {
      case "GET":
        // GET /tasks //
        if ((req.url == "/") || (req.url == "/tasks")) {
          axios.get("http://localhost:3000/tasks")
            .then(response => {
              var tasks = response.data

              res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
              })
              res.write(geraPagTasks(tasks, d))
              res.end()

            })
            .catch(function(erro) {
              res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
              })
              res.write("<p>Não foi possível obter a lista de tarefas...")
              res.end()
            })
        }
        // GET /tasks/:id --------------------------------------------------------------------
        else if (/\/tasks\/[0-9]+$/.test(req.url)) {
          var idTarefa = req.url
          axios.get("http://localhost:3000" + idTarefa)
            .then(response => {
              let t = response.data

              res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
              res.write(geraPagTarefa(t, d))
              res.end()
            })
            .catch(function(erro) {
              res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
              res.write("<p>Não foi possível obter a tarefa...")
              res.end()
            })
        }
        // GET /tasks/registo --------------------------------------------------------------------
        else if (req.url == "/tasks/registo") {
          res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
          res.write(geraFormTarefa(d))
          res.end()
        }
        //GET /tasks/:id/edit
        else if (/\/tasks\/[0-9]+\/edit/.test(req.url)) {

          var idTarefa = req.url.split("/")[2]

          axios.get("http://localhost:3000/tasks/" + idTarefa)
            .then(response => {
              let t = response.data

              res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
              })
              res.write(geraEditTarefa(t, d))
              res.end()
            })
            .catch(function(erro) {
              res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
              })
              res.write("<p>Não foi possível obter a tarefa...")
              res.end()
            })

        }
        //GET /tasks/:id/delete
        else if (/\/tasks\/[0-9]+\/delete/.test(req.url)) {

          var idTarefa = req.url.split("/")[2]

          axios.delete("http://localhost:3000/tasks/" + idTarefa)
            .then(response => {
              let t = response.data

              res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
              })
              res.write(geraDeleteConfirm(idTarefa, d))
              res.end()
            })
            .catch(function(erro) {
              res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
              })
              res.write("<p>Não foi possível obter a tarefa...")
              res.end()
            })

        } else {
          res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
          })
          res.write("<p>" + req.method + " " + req.url + " Não suportado neste serviço.</p>")
          res.end()
        }
        break

      case "POST":
        if (req.url == '/tasks') {

          recuperaInfo(req, resultado => {
            console.log('POST de Tarefa:' + JSON.stringify(resultado))
            axios.post('http://localhost:3000/tasks', resultado)
              .then(resp => {
                res.writeHead(200, {
                  'Content-Type': 'text/html;charset=utf-8'
                })
                res.write(geraPostConfirm(resp.data, d))
                res.end()
              })
              .catch(erro => {
                res.writeHead(200, {
                  'Content-Type': 'text/html;charset=utf-8'
                })
                res.write('<p>Erro no POST: ' + erro + '</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
              })
          })
        } else if (req.url == '/tasks/edit') {

          recuperaInfo(req, resultado => {
            console.log('PUT (Update) de Tarefa:' + JSON.stringify(resultado))
            axios.put('http://localhost:3000/tasks/' + resultado.id, resultado)
              .then(resp => {
                res.writeHead(200, {
                  'Content-Type': 'text/html;charset=utf-8'
                })
                res.write(geraPostConfirm(resp.data, d))
                res.end()
              })
              .catch(erro => {
                res.writeHead(200, {
                  'Content-Type': 'text/html;charset=utf-8'
                })
                res.write('<p>Erro no PUT: ' + erro + '</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
              })
          })
        } else {
          res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
          res.write('<p>Recebi um POST/PUT não suportado.</p>')
          res.write('<p><a href="/">Voltar</a></p>')
          res.end()
        }
        break
      default:
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        res.write("<p>" + req.method + " Não suportado neste serviço.</p>")
        res.end()
    }
  }
})

tasksServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')