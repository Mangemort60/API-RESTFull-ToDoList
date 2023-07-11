const { List, User } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/user/lists/:id', auth,(req, res) => {
        const userId = req.params.id
        console.log(userId);
        User.findByPk(userId)
            .then( user => {
                if(!user) {
                    const message = `L'utilisateur n'a pas été trouvé`
                    res.status(400).json({message})
                }
                return List.findAll({where:{ UserId: userId}})
            })
            .then( list => {
                const message = `liste(s) trouvée(s)`
                res.json({message, data: list})
            })

    })
}