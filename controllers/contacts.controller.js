const db = require('../models');

const Contact = db.contact;
const { Op } = db.Sequelize;

module.exports = {
  update,
  create,
  findAll,
  findOne,
  deleteOne,
};

// const contact = {
// id: config.contact_id,
// lastname: 'Григорьев',
// firstname: 'Сергей',
// patronymic: 'Петрович',
// phone: '79162165588',
// email: 'grigoriev@funeral.com',
//   createdAt: '2020-11-21T08:03:26.589Z',
//   updatedAt: '2020-11-23T09:30:00Z',
// };

function create(req, res) {
  // Validate request
  if (!req.body.lastname || !req.body.firstname) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  // Create a Contact
  const contact = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    patronymic: req.body.patronymic,
    phone: req.body.phone,
    email: req.body.email,
  };

  // Save Contact in the database
  Contact.create(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Contact.',
      });
    });
}

function findAll(req, res) {
  const { lastname } = req.query;
  const condition = lastname ? { lastname: { [Op.iLike]: `%${lastname}%` } } : null;

  Contact.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Contacts.',
      });
    });
}

function findOne(req, res) {
  const { id } = req.params;

  Contact.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving Contact with id=${id}`,
      });
    });
}

function deleteOne(req, res) {
  const { id } = req.params;

  Contact.destroy({
    where: { id },
  })
    .then(() => {
      res.send({
        message: 'Contact was deleted successfully!',
      });
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Contact with id=${id}`,
      });
    });
}

function update(req, res) {
  const { id } = req.params;

  Contact.update(req.body, {
    where: { id },
  })
    .then(() => {
      res.send({
        message: 'Contact was updated successfully.',
      });
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Contact with id=${id}`,
      });
    });
}
