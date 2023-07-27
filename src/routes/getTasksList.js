const {Task, List} = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/lists/tasks/:id',  (req, res) => {
        const listId = req.params.id
        console.log(listId)
        List.findByPk(listId)
            .then(list => {
                if(!list) {
                    const message = `La liste n'a pas été trouvée`
                    res.status(400).json({message})
                }
                return Task.findAll({where : {ListId : listId}})
            })
            .then(task => {
                const message = `Tâche(s) trouvée(s)`
                res.json({message, data: task})
            })
    })
}