const { List } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/lists/:id', auth,(req, res) => {
        const listID = req.params.id
        return List.findByPk(listID)
            .then(list => {
                if(list === null) {
                    const message = `Cette liste n'existe pas`
                    res.status(400).json({message})
                }
                list.destroy()
                const message = `La liste ${list.listTitle} a été supprimée avec succès`
                res.json({message, data: list})
            })
            .catch( error => {
                const message = `La suppression de la liste a échoué, veuillez réessayer ultérieurement`
                res.status(500).json({message, data: error})
            })
    })
}