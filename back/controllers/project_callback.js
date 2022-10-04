'use strict'
//controlador Project
//conté funcions de les rutes

//importar model
let Project = require('../models/project');

//per borrar file
let fs = require('fs');

//constants
const FILE_TIPUS = ['png', 'jpg', 'jpeg' ,'gif'];

let controller = {

    home: (req, res) => {
        return res.status(200).send({
            message: 'Pàgina Home'
        })
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Pàgina Test'
        });
    },

    saveProject: (req, res) => {

        let project = new Project();
        let params = req.body;

        //propietat model = argument post
        project.name = params.name;
        project.description = params.description;
        project.category = params.category,
        project.year = params.year,
        project.langs = params.langs,
        project.image = "null";

        //callback
        project.save( (err, projectGuardat) => {

            if (err) return res.status(500).send( { message: '* FATAL ERROR * al desar document'});

            if (!projectGuardat) return res.status(404).send( { message: '* FATAL ERROR * document no desat'});

            return res.status(200).send( { project: projectGuardat});
        });
        /*
        return res.status(200).send({
            params: params,
            message: 'Save Project'
        });
        */
    },

    getProject: (req,res) => {
        let projectID = req.params.id;
        console.log(projectID);

        if (projectID == null) return res.status(500).send( { message: '* FATAL ERROR * no has especificat cap projecte'} );

        else {
            //callback
            Project.findById( projectID, (err,project) => {

                if (err) {
                    console.log(err);
                    return res.status(500).send( { message: '* FATAL ERROR * al retornar dades' } );   
                }

                if (!project) return res.status(404).send( { message: '* FATAL ERROR * projecte no existeix'});

                return res.status(200).send({
                    project
                });
            });
        }
    },

    getProjects: (req,res) => {
        
        //Project.find( {} ).exec( (err,projects) => {
        //Project.find( {year:2022} ).exec( (err,projects) => {

        //callback
        Project.find( {} ).sort('year').exec( (err,projects) => {

            if (err) {
                console.log(err);
                return res.status(500).send( { message: '* FATAL ERROR * al retornar dades' } );   
            }

            if (!projects) return res.status(404).send( { message: '* FATAL ERROR * no hi ha projects'});

            return res.status(200).send({
                projects //array
            });
        });
    },

    updateProject: (req,res) => {
        
        //id arriba per URL
        let projectID = req.params.id;
        //dades objecte arriben per body
        let update = req.body;

        console.log(projectID);
        console.log(update);

        //si entra a callback, s'ha executat
        //new:true -> retorna l'objecte nou, no l'antic
        //callback
        Project.findByIdAndUpdate( projectID, update, {new:true}, (err, projectUpdated) => {

            if (err) {
                console.log(err);
                return res.status(500).send( { message: '* FATAL ERROR * al actualizar les dades' } );   
            }

            if (!projectUpdated) return res.status(404).send( { message: '* FATAL ERROR * no existeix el projecte'});

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: (req,res) => {
        
        //id arriba per URL
        let projectID = req.params.id;
        console.log(projectID);

        //callback
        Project.findByIdAndDelete( projectID, (err, projectRemoved) => {

            if (err) {
                console.log(err);
                return res.status(500).send( { message: '* FATAL ERROR * projecte no esborrat' } );   
            }

            if (!projectRemoved) return res.status(404).send( { message: '* FATAL ERROR * no existeix el projecte'});

            return res.status(200).send({
                project: projectRemoved
            });
        });
    },

    uploadImage: (req, res) => {
        let projectID = req.params.id;
        let fileName = '* FATAL ERROR * imatge no pujada';

        if (req.files) {
            
            console.log(req.files);
            
            //nom arxiu pujat
            let filePath = req.files.imatge.path;
            let fileSplit = filePath.split('/');
            let fileName = fileSplit[1];
            console.log(fileName);

            //Comprova l’extensió que sigui png, jpg, jpeg o giff
            //type: 'image/png'
            let ext = req.files.imatge.type.split('/')[1];
            console.log(ext);

            //si s'inclou en tipus admesos
            if ( FILE_TIPUS.includes(ext) ) {

                //update db
                //callback
                Project.findByIdAndUpdate( projectID, {image: fileName}, {new:true}, (err, projectUpdated) => {
                    
                    if (err) {
                        console.log(err);
                        return res.status(500).send( { message: '* FATAL ERROR * al actualizar la imatge' } );   
                    }
        
                    if (!projectUpdated) return res.status(404).send( { message: '* FATAL ERROR * no existeix el projecte'});
        
                    return res.status(200).send({
                        project: projectUpdated
                    });

                });
            //tipus no admès
            } else {

                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                        message: '* FATAL ERROR * extensió no admesa'});
                });
            }
        //error req.files
        } else {
            return res.status(500).send( {
                message: fileName
            });
        }
    }

}

//exportar controlador
module.exports = controller;

