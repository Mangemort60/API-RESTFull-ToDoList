const express = require('express')
const sequelize = require('./src/db/sequelize')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(cors())

sequelize.InitDB();

app.get('/', (req, res) => { res.json('Hello Express ')})


require('./src/routes/createList')(app)
require('./src/routes/createTask')(app)
require('./src/routes/updateTask')(app)
require('./src/routes/updateList')(app)
require('./src/routes/deleteList')(app)
require('./src/routes/deleteTask')(app)
require('./src/routes/register')(app)
require('./src/routes/findUserList')(app)
require('./src/routes/login')(app)

app.listen(port, () => console.log(`L'application a bien démarré sur http://localhost:${port}`))
