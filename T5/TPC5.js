var http = require('http')
var axios = require('axios');

http.createServer(function(req,res){

    console.log(req.method + '' + req.url)
    
    if(req.method == 'GET'){

        if(req.url == '/'){
            res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
            res.write("<h1>Escola de Música</h1>")
            res.write("<ul>")
            res.write("<li> <a href='/alunos'> Lista de Alunos</li>")
            res.write("<li> <a href='/cursos'> Lista de Cursos</li>")
            res.write("<li> <a href='/instrumentos'> Lista de Instrumentos</li>")
            res.write("</ul>")
            res.end()

        }else if(req.url == '/alunos'){

            axios.get('http://localhost:3000/alunos')
            .then(resp => {
                alunos = resp.data;

                res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
                res.write("<h2>Lista de Alunos</h2>")
                
                res.write("<ul>")
                
                alunos.forEach(a => {
                    res.write('<li> <a href=/alunos/' + a.id + '>' + a.id + " - " + a.nome + '</a></li>')
                });

                res.write("</ul>")
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

            }).catch(function(error){

                console.log("Erro na obtenção da lista de Alunos: " + error);

            });

        }else if(req.url.match(/\/alunos\/A|AE\-[0-9]+$/)){

            var id = req.url.split("/")[2];
        
            axios.get('http://localhost:3000/alunos/' + id)
            .then(resp => {
                
                aluno = resp.data;

                res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
                res.write("<h2>Detalhes do Aluno" + aluno.id + "</h2>")
                
                res.write("<ul>")    
                res.write('<li> Nº de Aluno: ' + aluno.id + '</li>')
                res.write('<li> Nome: ' + aluno.nome + '</li>')
                res.write('<li> Data de Nacimento: ' + aluno.dataNasc + '</li>')
                res.write('<li> Curso: ' + aluno.curso + '</li>')
                res.write('<li> Ano: ' + aluno.anoCurso + '</li>')
                res.write('<li> Instrumento: ' + aluno.instrumento + '</li>')
                res.write("</ul>")
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

            }).catch(function(error){

                console.log("Erro na obtenção nos dados do Aluno: " + error);

                res.writeHead(404, {'Content-Type': "text/html; charset=utf-8"})
                res.write("<h2> Página do Aluno " + req.url.split("/")[2] + " Indisponivel! </h2>")
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

            });    
        
        }else if(req.url == '/cursos'){

            axios.get('http://localhost:3000/cursos')
            .then(resp => {
                cursos = resp.data;

                res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
                res.write("<h2>Lista de Cursos</h2>")
                res.write("<ul>")
                
                cursos.forEach(c => {
                    res.write('<li> <a href=/cursos/' + c.id + '>' + c.id + " - " + c.designacao + '</a></li>')
                });

                res.write("</ul>")
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

            }).catch(function(error){

                console.log("Erro na obtenção da lista de Cursos: " + error);

            });

        }else if(req.url.match(/\/cursos\/C[B|S][0-9]+$/)){

            var id_curso = req.url.split("/")[2];
        
            axios.get('http://localhost:3000/cursos/' + id_curso)
            .then(resp => {
                
                curso = resp.data;

                res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
                res.write("<h2>Detalhes do Curso" + curso.id + "</h2>")
                
                res.write("<ul>")    
                res.write('<li> ID do Curso: ' + curso.id + '</li>')
                res.write('<li> Nome: ' + curso.designacao + '</li>')
                res.write('<li> Duração: ' + curso.duracao + '</li>')
                res.write('<li> ID Instrumento: ' + curso.instrumento.id + '</li>')
                res.write('<li> Nome do Instrumento: ' + curso.instrumento['#text'] + '</li>')
                res.write("</ul>")
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

            }).catch(function(error){

                console.log("Erro na obtenção nos dados do Curso: " + error);

                res.writeHead(404, {'Content-Type': "text/html; charset=utf-8"})
                res.write("<h2> Página do Curso " + req.url.split("/")[2] + " Indisponível! </h2>")
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

            });    

        //Instrumentos//
        }else if(req.url == '/instrumentos'){

            axios.get('http://localhost:3000/instrumentos')
            .then(resp => {
                instrumentos = resp.data;

                res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
                res.write("<h2>Lista de Instrumentos</h2>")
                res.write("<ul>")
                
                instrumentos.forEach(i => {
                    res.write('<li> <a href=/instrumentos/' + i.id + '>' + i.id + " - " + i["#text"] + '</a></li>')
                });

                res.write("</ul>")
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

            }).catch(function(error){

                console.log("Erro na obtenção da lista de Instrumentos: " + error);

            });

        }else if(req.url.match(/\/instrumentos\/I[0-9]+$/)){

            var id_instrumento = req.url.split("/")[2];
        
            axios.get('http://localhost:3000/instrumentos/' + id_instrumento)
            .then(resp => {
                
                instrumento = resp.data;

                res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
                res.write("<h2>Detalhes do Instrumento" + instrumento.id + "</h2>")
                
                res.write("<ul>")    
                res.write('<li> ID do Instrumento: ' + instrumento.id + '</li>')
                res.write('<li> Nome do Instrumento: ' + instrumento['#text'] + '</li>')
                res.write("</ul>")
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

            }).catch(function(error){

                console.log("Erro na obtenção nos dados do Instrumento: " + error);

                res.writeHead(404, {'Content-Type': "text/html; charset=utf-8"})
                res.write("<h2> Página do Instrumento " + req.url.split("/")[2] + " Indisponivel! </h2>")
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()

            });

        }else{

            res.writeHead(200, {'Content-Type': "text/html; charset=utf-8"})
            res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
            res.end()

        }

    }else{
        res.writeHead(200, {'Content-Type': "text/html"})
        res.write("<p>Pedido não suportado: " + req.method + "" + req.url + "</p>")
        res.end()
    }
}).listen(4000)
console.log("Listening on Port 4000...")