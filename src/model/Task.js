module.exports = (sequelize, DataTypes) => {
   return sequelize.define('Task', {
        taskTitle: {
          type: DataTypes.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
              notEmpty: {msg: 'Vous devez obligatoirement indiquer un titre pour cette tâche'},
              notNull : {msg: 'ce champs ne peut pas être null'}
          }
        }
      },
      {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
      }
      )    
}


