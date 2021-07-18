const express = require('express');
const multer = require('multer');
const config = require('../config/auth.config');

const fileHandler = multer({ dest: config.uploads_dir });
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const companiesController = require('../controllers/companies.controller');

const filesParamsValidator = require('../middleware/validators/files.params.validator');
const filesController = require('../controllers/files.controller');

/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*   schemas:
*     Company:
*       type: object
*       required:
*         - name
*         - shortName
*         - businessEntity
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the company
*         name:
*           type: string
*           description: The official name of the company
*         shortName:
*           type: string
*           description: The name of the company
*         businessEntity:
*           type: string
*           description: The business entity type
*         address:
*           type: string
*           description: The address of the company
*         contract_no:
*           type: integer
*           description: The Number of the contract with the company
*         contract_issue_date:
*           type: string
*           format: date-time
*           description: Start date of contract with the company
*         type:
*           type: array
*           items:
*             type: integer
*           description: Array with roles of the company
*         status:
*           type: string
*           description: Is company active
*         createdAt:
*           type: string
*           format: date-time
*           description: The auto-generated company card creation date
*         updatedAt:
*           type: string
*           format: date-time
*           description: The auto-generated company card update date
*         contactId:
*           type: integer
*           description: The auto-generated id of the company
*       example:
*         id: 1
*         name: "ООО Фирма «Перспективные захоронения»"
*         shortName: "Перспективные захоронения"
*         businessEntity: "ООО"
*         address: "Зюзюкинская ул. 23"
*         contract_no: 12345
*         contract_issue_date: "2015-03-12T00:00:00.000Z"
*         type: ["agent","contractor"]
*         status: "active"
*         createdAt: "2021-07-13T23:44:23.978Z"
*         updatedAt: "2021-07-13T23:44:23.978Z"
*         contactId: 1
*   parameters:
*     pathParam:
*       in: path
*       name: id
*       schema:
*         type: string
*       required: true
*       description: The company id
*/

/**
* @swagger
* tags:
*   name: Companies
*   description: The companies managing API
*/

/**
* @swagger
* /companies:
*   get:
*     summary: Return the list of all companies sorted by short name
*     tags: [Companies]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: The list of the companies
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Company'
*/

router.get('/', auth, companiesController.findAll);

/**
* @swagger
* /companies:
*   post:
*     summary: Create a new company
*     tags: [Companies]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*               $ref: '#/components/schemas/Company'
*     responses:
*       200:
*         description: The company was successfully created
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Company'
*       500:
*         description: Some error occurred while creating the Company
*/

router.post('/', auth, companiesController.create);

/**
* @swagger
* /companies/{id}:
*   get:
*     summary: Get the company by id
*     tags: [Companies]
*     security:
*       - bearerAuth: []
*     parameters:
*       - $ref: '#/components/parameters/pathParam'
*     responses:
*       200:
*         description: The company description by id
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Company'
*       500:
*         description: Error retrieving Company with current id
*/

router.get(
  '/:id',
  auth,
  companiesController.findOne,
);

/**
* @swagger
* /companies/{id}:
*  patch:
*    summary: Patch the company by the id
*    tags: [Companies]
*    security:
*      - bearerAuth: []
*    parameters:
*      - $ref: '#/components/parameters/pathParam'
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*              $ref: '#/components/schemas/Company'
*    responses:
*      200:
*        description: Company was updated successfully
*      500:
*        description: Failed to update company with current ID
*/

router.patch(
  '/:id',
  auth,
  companiesController.update,
);

/**
* @swagger
* /companies/{id}:
*   delete:
*     summary: Remove the company by id
*     tags: [Companies]
*     security:
*       - bearerAuth: []
*     parameters:
*       - $ref: '#/components/parameters/pathParam'
*     responses:
*       200:
*         description: Company was deleted successfully
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Company'
*       500:
*         description: Could not delete Company with current id
*/

router.delete('/:id', auth, companiesController.deleteOne);

/**
* @swagger
* /companies/status/{status}:
*   get:
*     summary: Get the companies by current status
*     tags: [Companies]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: status
*         schema:
*           type: string
*         required: true
*         description: The companies status
*     responses:
*       200:
*         description: The companies filtered by status
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Company'
*       500:
*         description: Some error occurred while filtering Companies by status
*/

router.get('/status/:status', auth, companiesController.findStatus);

router.post(
  '/:id/image',
  auth,
  fileHandler.fields([{ name: 'file', maxCount: 1 }]),
  filesParamsValidator.addCompanyImage,
  filesController.saveImage,
);

router.delete(
  '/:id/image/:image_name',
  auth,
  filesParamsValidator.removeCompanyImage,
  filesController.removeImage,
);

module.exports = router;
