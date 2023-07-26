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
 
        }
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
      })
      
}

