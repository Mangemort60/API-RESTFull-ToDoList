const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Task } = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/tasks/:id', (req, res) => {
        const taskId = req.params.id
        Task.update({taskTitle: req.body.taskTitle}, {where: {id: taskId}})
            .then(_ => { // on récupère la tâche avec son id, si elle n'existe pas on affiche une erreur, sinon on affiche un succès
                return Task.findByPk(taskId).then(task => {
                    if(task === null) {
                        const message = `La tâche séléctionné n'existe pas.`
                        return res.status(400).json({message})
                    }
                    const message = `Le titre de la tache ${task.taskTitle} a bien été modifié`
                    res.json({message, date: task})
                })
            })
            .catch(error => {
                if(error instanceof ValidationError){
                    return res.status(400).json({message: error.message, data: error})
                }
                if(error instanceof UniqueConstraintError){
                    return res.status(400).json({message: error.message, data:error})
                }
                const message = `La tache n'a pas pu être ajouté. Réessayez dans quelques instant`
                res.status(500).json({message, data:error})
            })
        
    })
}