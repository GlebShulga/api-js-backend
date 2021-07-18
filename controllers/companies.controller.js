/* eslint-disable camelcase */
const config = require('../config/auth.config');
const db = require('../models');

const Company = db.company;
const { Op } = db.Sequelize;

module.exports = {
  get,
  update,
  updatePhotos,
  deleteOne,
  create,
  findAll,
  findOne,
  findStatus,
};

const company = {
  id: config.company_id,
  contactId: config.contact_id,
  name: 'ООО Фирма «Перспективные захоронения»',
  shortName: 'Перспективные захоронения',
  businessEntity: 'ООО',
  contract: {
    no: '12345',
    issue_date: '2015-03-12T00:00:00Z',
  },
  type: ['agent', 'contractor'],
  status: 'active',
  createdAt: '2020-11-21T08:03:00Z',
  updatedAt: '2020-11-23T09:30:00Z',
};

function create(req, res) {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  const newCompany = {
    name: req.body.name,
    shortName: req.body.shortName,
    businessEntity: req.body.businessEntity,
    address: req.body.address,
    contract_no: req.body.contract_no,
    contract_issue_date: req.body.contract_issue_date,
    type: req.body.type,
    status: req.body?.status || 'active',
    contactId: req.body.contactId,
  };
  Company.create(newCompany)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Company.',
      });
    });
}

function findAll(req, res) {
  const { name } = req.query;
  const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Company.findAndCountAll({
    where: condition,
    raw: true,
    // Sorting by name
    order: [['shortName', 'ASC']],
    // Parameters to implement pagination
    limit: 5,
    offset: 0,
  })
    .then((data) => {
      const companies = data.rows.reduce((acc, rec, index) => {
        const modifiedCompanydata = [
          ...acc,
          {
            ...rec,
            contract: {
              no: rec.contract_no,
              issue_date: rec.contract_issue_date,
            },
          },
        ];
        delete modifiedCompanydata[index].contract_no;
        delete modifiedCompanydata[index].contract_issue_date;
        return modifiedCompanydata;
      }, []);
      res.send(companies);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Companies.',
      });
    });
}

function findStatus(req, res) {
  const { status } = req.params;
  const condition = status;

  Company.findAll({
    where: {
      status: {
        [Op.eq]: condition,
      },
    },
    raw: true,
  })
    .then((data) => {
      const companies = data.reduce((acc, rec, index) => {
        const modifiedCompanydata = [
          ...acc,
          {
            ...rec,
            contract: {
              no: rec.contract_no,
              issue_date: rec.contract_issue_date,
            },
          },
        ];
        delete modifiedCompanydata[index].contract_no;
        delete modifiedCompanydata[index].contract_issue_date;
        return modifiedCompanydata;
      }, []);
      res.send(companies);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message
          || 'Some error occurred while filtering Companies by status.',
      });
    });
}

function findOne(req, res) {
  const { id } = req.params;

  Company.findOne({
    where: { id },
    raw: true,
  })
    .then((data) => {
      const companyData = {
        ...data,
        contract: {
          no: data.contract_no,
          issue_date: data.contract_issue_date,
        },
      };
      delete companyData.contract_no;
      delete companyData.contract_issue_date;
      res.send(companyData);
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving Company with id=${id}`,
      });
    });
}

function deleteOne(req, res) {
  const { id } = req.params;

  Company.destroy({
    where: { id },
  })
    .then(() => {
      res.send({
        message: 'The company was deleted successfully',
      });
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Company with id=${id}`,
      });
    });
}

function get(req, res) {
  const URL = _getCurrentURL(req);
  company.photos = [
    {
      name: '0b8fc462dcabf7610a91.png',
      filepath: `${URL}0b8fc462dcabf7610a91.png`,
      thumbpath: `${URL}0b8fc462dcabf7610a91_160x160.png`,
    },
  ];
  return res.status(200).json(company);
}

function update(req, res) {
  const { id } = req.params;

  Company.update(req.body, {
    where: { id },
  })
    .then(() => {
      res.send({
        message: 'Company data was updated successfully.',
      });
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Company with id=${id}`,
      });
    });
}

function updatePhotos(req, res) {
  const requestBody = req.body;

  const URL = _getCurrentURL(req);
  company.photos = [
    {
      name: '0b8fc462dcabf7610a91.png',
      filepath: `${URL}0b8fc462dcabf7610a91.png`,
      thumbpath: `${URL}0b8fc462dcabf7610a91_160x160.png`,
    },
  ];

  const updatedCompany = { ...company };
  Object.keys(requestBody).forEach((key) => {
    updatedCompany[key] = requestBody[key];
  });
  updatedCompany.updatedAt = new Date();

  return res.status(200).json(updatedCompany);
}

function _getCurrentURL(req) {
  const { port } = config;
  return `${req.protocol}://${req.hostname}${
    port === '80' || port === '443' ? '' : `:${port}`
  }/`;
}
