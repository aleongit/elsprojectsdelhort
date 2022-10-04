'use strict'

//connexió mongo
let mongoose = require('mongoose');
let BD = 'portfolio';

//importem app
// '.' = arrel
let app = require('./app');

//port web
let port = 3700;

//connexió mongo amb promesa
//també es fa amb await
//https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
//https://mongoosejs.com/docs/connections.html

mongoose.connect(`mongodb://localhost:27017/${BD}`)
    .then( () => {
        console.log(`Connexió a Mongo bd ${BD} OK!`);

        //creació server
        app.listen( port, () => {
            console.log("Web Server Ready, escoltant al port " + port)
        })
    })
    .catch ( err => console.log(err) )