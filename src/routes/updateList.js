const { ValidationError, UniqueConstraintError } = require('sequelize')
const { List } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/lists/:id', auth,(req, res) => {
        const listId = req.params.id
        List.update({listTitle: req.body.listTitle}, {where: {id: listId}})
            .then(_ => { // on récupère la liste avec son id, si elle n'existe pas on affiche une erreur, sinon on affiche un succès
                return List.findByPk(listId).then(list => {
                    if(list === null) {
                        const message = `La liste séléctionné n'existe pas.`
                        return res.status(400).json({message})
                    }
                    const message = `Le titre de la liste ${list.listTitle} a bien été modifié`
                    res.json({message, date: list})
                })
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