const { ValidationError, UniqueConstraintError } = require('sequelize')
const { List } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/lists', (req, res) => {
        List.create(req.body)
            .then( list => {
                const message = `La liste ${req.body.listTitle} a bien été crée`
                res.json({message, data: list})
            })
            .catch(error => {
                if(error instanceof ValidationError){
                    return res.status(400).json({message: error.message, data: error})
                }
                if(error instanceof UniqueConstraintError){
                    return res.status(400).json({message: error.message, data:error})
                }
                const message = `La liste n'a pas pu être ajouté. Réessayez dans quelques instant`
                res.status(500).json({message, data:error})
            })

    })
}