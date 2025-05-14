const bodyParser = require('body-parser')
const express = require('express')
const {sequelize, initDB} = require('./config/sequelize')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/template') // Dossier des fichiers .ejs



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.render('home')
})

require('./routes/pageInscription')(app)
require('./routes/login')(app)
require('./routes/signalisation')(app);
require('./routes/contenuSignalisation')(app);
require('./routes/gestion')(app);
require('./routes/votes')(app)


initDB()

app.listen(port,()=> console.log(`serveur lancé sur http://localhost:${port}`))

