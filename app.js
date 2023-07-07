const express = require('express')
const morgan = require('morgan')

const app = express()

const port = 3000

app.listen(port, () => console.log(`L'application a bien démarré sur le port ${port}`))

app.get('/', (req, res) => { const message = "Hello Express" })