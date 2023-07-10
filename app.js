const express = require('express')
const sequelize = require('./src/db/sequelize')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())

sequelize.InitDB();

app.get('/', (req, res) => { res.send('Hello Express ')})
require('./src/routes/createList')(app)
require('./src/routes/createTask')(app)
require('./src/routes/updateTask')(app)
require('./src/routes/updateList')(app)

app.listen(port, () => console.log(`L'application a bien démarré sur http://localhost:${port}`))
