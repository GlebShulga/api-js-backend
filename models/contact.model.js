module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define('contacts', {
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    patronymic: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.BIGINT,
    },
    email: {
      type: Sequelize.STRING,
      validate: { isEmail: true },
    },
  });

  return Contact;
};
