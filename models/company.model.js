module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define('companies', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    shortName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    businessEntity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
    },
    contract_no: {
      type: Sequelize.INTEGER,
    },
    contract_issue_date: {
      type: Sequelize.DATE,
    },
    type: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    status: {
      type: Sequelize.STRING,
    },
  });

  return Company;
};
