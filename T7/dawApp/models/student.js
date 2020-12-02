var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    numero: String,
    nome: String,
    git: String,
    tpc: [Number]
});

//Vai exportar o resultado da compilação do schema para o modelo
module.exports = mongoose.model('student', studentSchema) //Coleção tem de ser singular do q está no Mongo