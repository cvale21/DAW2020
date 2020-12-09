var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var fs = require('fs')

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()

//set logger
app.use(logger('dev'))

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//parse aplication/json
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) =>{
    var d = new Date().toISOString().substr(0,16);
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileList(files, d))
    res.end()
})

app.get('/files/upload', (req, res) =>{
    var d = new Date().toISOString().substr(0,16);
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname', (req, res) => {
    res.download(__dirname + '/public/fileStore/' + req.params.fname)
})

app.post('/files', upload.array('myFile'), (req, res) =>{
    //multiple files: uploa.array(...) => files -> é um array
    //req.file is the myFile file

    var descr
    var d = new Date().toISOString().substr(0,16);

    if(req.files.length > 0){

        for (i = 0; i < req.files.length; i++) {

            let oldPath = __dirname + '/' + req.files[i].path
            let newPath = __dirname + '/public/fileStore/' + req.files[i].originalname

            fs.rename(oldPath, newPath, function(err){
                if(err) throw err
            })

            if(req.files.length > 1){
                descr = req.body.desc[i]
            }else{
                descr = req.body.desc
            }

            var files = jsonfile.readFileSync('./dbFiles.json')

            files.push(
                    {
                        date: d,
                        name: req.files[i].originalname,
                        size: req.files[i].size,
                        mimetype: req.files[i].mimetype,
                        desc: descr
                    }
            )
            jsonfile.writeFileSync('./dbFiles.json', files)

            res.redirect('/')

        }
    }else{
        res.send('Por Favor Selecione um Ficheiro...')
    }
})

app.listen(7700, () => console.log('Server Listening on Port 7700...'))