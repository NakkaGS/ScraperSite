//Express
const express = require("express")
const app = express()

//Scraper Function
const action = require("./scraper/scraper.js")

//Cors - Cross-Origin Resource Sharing 
var cors = require('cors')

//Call the db.js and start the server
var dbconnection = require('./db')

//Routes
var articleRoute = require('./routes/articleRoute')

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});


//Create Route
app.use('/api/articles/' , articleRoute, cors())

//This is for the production part
if(process.env.NODE_ENV === 'production')
{
    //app.use('/' , express.static('frontend/build'))
    app.get('/', (req, res) => {
        res.sendStatus(200)
      })
}

//if it not in production
const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Node JS Server Started on Port ${port}`);
   });

module.exports = app


//It call the Scraper Logic every 1 minute
const nodeSchedule = require('node-schedule');
const job = nodeSchedule.scheduleJob('* * * * *', function(){
    console.log('Searching for new articles... ', new Date);
    action.scraper()
    
})