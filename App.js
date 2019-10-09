// Import express
var express = require('express')
//Import Body Parser
var bodyParser = require('body-parser');
var cors = require('cors');
// Initialize the server express
var app = express();

//conectar BD
//var urlBD = 'mongodb://localhost/test';
var urlBD = "mongodb+srv://db_user_platzivideos:dOC3Caall5Qno08j@cluster0-b69q1.mongodb.net/platzivideos_db?retryWrites=true";

//mongo "mongodb+srv://cluster0-b69q1.mongodb.net/admin"  --username db_user_platzivideos

//opciones conexion
var opts = {useNewUrlParser : true, connectTimeoutMS:20000};
//importo driver
var mongoose = require('mongoose');
//Pruebo conexion
mongoose.connect(urlBD,opts).then
(
    () => {
            console.log("Conectado!!");
          }, //se conecto
    err => { 
            console.log("ERROR:" + err); 
           } //manejo error
);

// Import router
var apiRoutes = require("./api-routes")


// Todo lo que recibe la app se tratara como json
app.use(bodyParser.urlencoded(
{
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express in Aplicaciones Interactivas'));

// Use Api routes in the App
app.use('/apiAgenda', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});
