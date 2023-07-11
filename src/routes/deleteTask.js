const { Task } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/tasks/:id', auth,(req, res) => {
        const taskID = req.params.id
        return Task.findByPk(taskID)
            .then(task => {
                if(task === null) {
                    const message = `Cette tache n'existe pas`
                    res.status(400).json({message})
                }
                task.destroy()
                const message = `La tache ${task.taskTitle} a été supprimée avec succès`
                res.json({message, data: task})
            })
            .catch( error => {
                const message = `La suppression de la tache a échoué, veuillez réessayer ultérieurement`
                res.status(500).json({message, data: error})
            })
    })
}