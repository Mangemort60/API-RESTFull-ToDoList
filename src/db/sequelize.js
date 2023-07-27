const { Sequelize, DataTypes } = require('sequelize')
const ListModel = require('../model/List')
const TaskModel = require('../model/Task')
const UserModel = require('../model/User')

let sequelize;

if(process.env.NODE_ENV === 'production') {
     sequelize = new Sequelize('tk41p2vnvkae33k2', 'p6g40bvjfe36rqa3', 'yevjuvhkwdt6om8p', {
        host: 'f80b6byii2vwv8cx.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
        dialect: 'mariadb',
        dialectOptions: {
        timezone: 'Etc/GMT-2',
        },
        logging: false
})
} else {
    sequelize = new Sequelize('todolist', 'root', '', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
        timezone: 'Etc/GMT-2',
        },
        logging: false
})
}


// instance des models
const List = ListModel(sequelize, DataTypes)
const Task = TaskModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
// associations
List.hasMany(Task,{
    onDelete: 'CASCADE',
    foreignKey: 'ListId'
})
Task.belongsTo(List)
User.hasMany(List, {
    onDelete: 'CASCADE',
    foreignKey: 'UserId'
})
List.belongsTo(User)

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
    InitDB, List, Task, User
}