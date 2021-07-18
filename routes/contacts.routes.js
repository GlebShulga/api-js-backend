const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth.middleware');
const contactsController = require('../controllers/contacts.controller');

/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*   schemas:
*     Contact:
*       type: object
*       required:
*         - firstname
*         - lastname
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the contact
*         firstname:
*           type: string
*           description: The first name of the contact
*         lastname:
*           type: string
*           description: The last name of the contact
*         patronymic:
*           type: string
*           description: The patronymic of the contact
*         phone:
*           type: integer
*           description: The phone of the contact
*         email:
*           type: string
*           format: email
*           description: The email of the contact
*         createdAt:
*           type: string
*           format: date-time
*           description: The auto-generated contact card creation date
*         updatedAt:
*           type: string
*           format: date-time
*           description: The auto-generated contact card update date
*       example:
*         id: 1
*         lastname: 'Григорьев'
*         firstname: 'Сергей'
*         patronymic: 'Петрович'
*         phone: '79162165588'
*         email: 'grigoriev@funeral.com'
*         createdAt: '2020-11-21T08:03:26.589Z'
*         updatedAt: '2020-11-23T09:30:00Z'
*   parameters:
*     pathParam:
*       in: path
*       name: id
*       schema:
*         type: string
*       required: true
*       description: The contact id
*/

/**
* @swagger
* tags:
*   name: Contacts
*   description: The contacts managing API
*/

/**
* @swagger
* /contacts:
*   get:
*     summary: Return the list of all contacts
*     tags: [Contacts]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: The list of the contacts
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Contacts'
*/

router.get('/', auth, contactsController.findAll);

/**
* @swagger
* /contacts:
*   post:
*     summary: Create a new contact
*     tags: [Contacts]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*               $ref: '#/components/schemas/Contact'
*     responses:
*       200:
*         description: The contact was successfully created
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Contact'
*       500:
*         description: Some error occurred while creating the contact
*/

router.post('/', auth, contactsController.create);

/**
* @swagger
* /contacts/{id}:
*   get:
*     summary: Get the contact by id
*     tags: [Contacts]
*     security:
*       - bearerAuth: []
*     parameters:
*       - $ref: '#/components/parameters/pathParam'
*     responses:
*       200:
*         description: The contact data by id
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Contact'
*       500:
*         description: Error retrieving contact with current id
*/

router.get(
  '/:id',
  auth,
  contactsController.findOne,
);

/**
* @swagger
* /contacts/{id}:
*  patch:
*    summary: Patch the contact by the id
*    tags: [Contacts]
*    security:
*      - bearerAuth: []
*    parameters:
*      - $ref: '#/components/parameters/pathParam'
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*              $ref: '#/components/schemas/Contact'
*    responses:
*      200:
*        description: Contact was updated successfully
*      500:
*        description: Failed to update contact with current ID
*/

router.patch(
  '/:id',
  auth,
  contactsController.update,
);

/**
* @swagger
* /contacts/{id}:
*   delete:
*     summary: Remove the contact by id
*     tags: [Contacts]
*     security:
*       - bearerAuth: []
*     parameters:
*       - $ref: '#/components/parameters/pathParam'
*     responses:
*       200:
*         description: Contact was deleted successfully
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Contact'
*       500:
*         description: Could not delete Contact with current id
*/

router.delete('/:id', auth, contactsController.deleteOne);

module.exports = router;
