module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define('Feedback', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true, 
    },
    name: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(250),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    subject: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Feedback;
};
