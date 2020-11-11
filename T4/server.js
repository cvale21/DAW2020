var http = require('http')
var fs = require('fs')

myDateTime = function () {
    var date = (new Date()).toISOString()
    return date.substring(0,16)
}

var servidor = http.createServer(function (req,res){
    console.log(req.method + " " + req.url + " " + myDateTime())

    if(req.url.match(/\/$/)){
        fs.readFile('./site/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        res.end()
    })
    }else if(req.url.match(/\/arqs\/[0-9]{1,3}$/)){
        var num = req.url.split("/")[2] 

        if(parseInt(num) < 123 ){
            fs.readFile('./site/arq' + num + '.html', function(err,data) {
              res.writeHead(200, {'Content-Type': 'text/html'})
              res.write(data)
              res.end()
            })
        }else {
            console.log('ERRO: Ficheiro Inexistente!')
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.write('<p>O Ficheiro não existe no servidor!</p>')
            res.end()
        }
    }else {
        console.log('ERRO: Ficheiro não esperado!')
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.write('<p>URL não corresponde ao esperado.</p>')
        res.end()
    }
})

servidor.listen(7777)
console.log("Servidor à escuta na porta 7777...")
