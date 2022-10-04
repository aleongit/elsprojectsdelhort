'use strict'
//model Project
//representa model de la base de dades

//mongo i esquema
let mongoose = require('mongoose');
//let Schema = mongoose.Schema; _________ no cal

//esquema col·lecció projecte
let ProjectSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: [String],
    image: String
});

//exportem model
//a mongo es genera col·leció si no existeix (pluralitzant l'entitat) 
//el nom definit aquí és l'entitat, i es pluralitza com a col·leció

module.exports = mongoose.model('Project', ProjectSchema);



