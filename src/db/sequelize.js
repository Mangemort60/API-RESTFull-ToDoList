const { Sequelize, DataTypes } = require('sequelize')
const ListModel = require('../model/List')
const TaskModel = require('../model/Task')


// connection à la base de donnée
const sequelize = new Sequelize('todolist', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
})

// instance de List 
const List = ListModel(sequelize, DataTypes)
// instance de Task 
const Task = TaskModel(sequelize, DataTypes)
// associations
List.hasMany(Task)
Task.belongsTo(List)

// synchronisation 
const InitDB = () => {
    return sequelize.sync()
        .then(_ => {
            console.log('INIT DB');
            console.log('Les tables List et Task ont bien été crées');
        })
    
}


// test de la connection
sequelize.authenticate()
    .then(_ => console.log('la connexion à la base de données a bien été établie'))
    .catch(error => console.log(`Impossible de se connecter à la base de donnée ${error}`))

module.exports = {
    InitDB, List, Task
}