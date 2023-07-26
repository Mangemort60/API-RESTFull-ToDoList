const { ValidationError, UniqueConstraintError } = require('sequelize')
const { List, User } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/lists/:userID', auth, (req, res) => {
        const userID = req.params.userID
        User.findByPk(userID)
            .then(user => {
                if(!user){
                    const message = `L'utilisateur ${user} n'a pas été trouvé`
                    res.status(400).json({message})
                }
                const listData = { listTitle: req.body.listTitle, UserId: userID}
                return List.create(listData)
                .then( list => {
                    const message = `La liste ${req.body.listTitle} a bien été crée`
                    res.json({message, data: list})
                })
            })

            .catch(error => {
                const message = `La liste n'a pas pu être ajouté. Réessayez dans quelques instant`
                res.status(500).json({message, data:error})
            })

    })
}