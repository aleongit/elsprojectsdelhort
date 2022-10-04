'use strict'
//rutes de Project

//express
let express = require('express');
let router = express.Router();

//controller
let ProjectController = require('../controllers/project');

//per upload fitxers
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart( { uploadDir: './uploads'});


//rutes cap a mètodes controlador
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject); //put per update
router.delete('/project/:id', ProjectController.deleteProject); //delete per borrar
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImage);

//exportar rutes
module.exports = router;