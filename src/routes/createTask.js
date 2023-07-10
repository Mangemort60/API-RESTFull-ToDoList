const { Task } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/tasks/:id', (req, res) => {
        const listId = req.params.id
        const taskData = {taskTitle: req.body.taskTitle, ListId: listId}
        console.log(taskData)
        Task.create(taskData)
        .then( task => {
            const message = `La tâche ${task.taskTitle} a bien été crée`
            res.json({message, data: task})
    
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

// on a besoin de l'ID de la list qui va contenir la tâche