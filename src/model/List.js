module.exports = (sequelize, DataTypes) => {
   return sequelize.define('List', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        listTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Vous devez obligatoirement indiquer un titre pour cette liste'},
                notNull : {msg: 'ce champs ne peut pas être null'}
            }

        }
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
      })
      
}

