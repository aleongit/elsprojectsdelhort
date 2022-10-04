'use strict'

//mòdul express (server web)
let express = require('express');

//mòdul parsejar json
let parser = require('body-parser');

//server web
let app = express();

//carregar rutes
let ProjectRoutes = require('./routes/project');

//codificació de tot el què arriba
app.use( parser.urlencoded( {extended:false}));
app.use( parser.json() );

//cors
// a app.js CORS just abans de les rutes
// Configurar capçaleres i cors
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Headers' , 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method' );
    res.header('Access-Control-Allow-Methods' , 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE' );
    next();
    });

//rutes
app.use('/api', ProjectRoutes);

//rutes a routes + controller !! _________________________________________________
//ruta home 'get'
//http://10.42.1.50:3700/
/*
app.get('/', (req,res) => {
    res.status(200).send('<h1>Sóc el 1r projecte node.js by aleon</h1>');
})
*/
//ruta hola 'get'
//http://10.42.1.50:3700/hola
/*
app.get('/hola', (req,res) => {
    res.status(200).send( {
        missatge: 'Hola món i que maco és el món des de node.js'
    })
})
*/
//ruta 'post'
//http://10.42.1.50:3700/holapost
/*
app.post('/holapost/:paramtest', (req,res) => {

    //param deprecated
    //console.log("Paràmetre 1: ", req.param('p1'), "Paràmetre 2: ", req.param('p2') );

    //per body
    //per postman cal enviar per post / body / x-www-formurlencoded
    console.log(req.body)
    console.log("Paràmetre 1: ", req.body.p1, "Paràmetre 2: ", req.body.p2);

    //per query (per URL)
    console.log("Paràmetre url/?p3= : ", req.query.p3 );

    //per paràmetres definits a URL /holapost/:paramtest
    console.log("Paràmetre/paramtest/: ", req.params.paramtest );
    

    res.status(200).send( {
        missatge: 'Ruta per POST!'
    })
})
*/

//exportar app
module.exports = app;

