const {User} = require('../db/sequelize')
const bcrypt = require ('bcrypt')
const {ValidationError, UniqueConstraintError} = require('sequelize')


module.exports = (app) => {
    app.post('/api/register', (req, res) => {
        const userPassword = req.body.password
        bcrypt.hash(userPassword, 10)
            .then(hash => {
               return User.create({username: req.body.username, password: hash} )
            })
            .then((user) => {
                const message = 'Utilisateur crée avec succès'
                res.json({message, data:user})
            })
            .catch(error => {
                if(error instanceof ValidationError ){
                    return res.status(400).json({message: error.message, data: error})
                }
                if(error instanceof UniqueConstraintError){
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = 'Une erreur s\'est produite lors de la création de l\'utilisateur.';
                res.status(500).json({ message, data: error });
            })

    })
}