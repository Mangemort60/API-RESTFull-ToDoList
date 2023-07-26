module.exports = (models) => {
    const { List, Task, User } = models;

    // Définissez vos associations ici
    List.hasMany(Task, {
      onDelete: 'CASCADE',
      foreignKey: 'ListId'
    });
  
    Task.belongsTo(List);
  
    User.hasMany(List, {
      onDelete: 'CASCADE',
      foreignKey: 'UserId'
    });
  
    List.belongsTo(User);
  };