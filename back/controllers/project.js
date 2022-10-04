"use strict";
//controlador Project
//conté funcions de les rutes

//importar model
let Project = require("../models/project");

//per file
let fs = require("fs");
let path = require("path");

//constants
const FILE_TIPUS = ["png", "jpg", "jpeg", "gif"];

let controller = {
  home: (req, res) => {
    return res.status(200).send({
      message: "Pàgina Home",
    });
  },

  test: (req, res) => {
    return res.status(200).send({
      message: "Pàgina Test",
    });
  },

  saveProject: (req, res) => {
    let project = new Project();
    let params = req.body;

    //propietat model = argument post
    project.name = params.name;
    project.description = params.description;
    (project.category = params.category),
      (project.year = params.year),
      (project.langs = params.langs),
      (project.image = "NOIMG.png");

    //promesa
    project
      .save()
      .then((projectGuardat) => {
        if (!projectGuardat) {
          return res
            .status(404)
            .send({ message: "* FATAL ERROR * document no desat" });
        }
        return res.status(200).send({ project: projectGuardat });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: "* FATAL ERROR * al desar document" });
      });

    /*
        return res.status(200).send({
            params: params,
            message: 'Save Project'
        });
        */
  },

  getProject: (req, res) => {
    let projectID = req.params.id;
    console.log(projectID);

    if (projectID == null)
      return res
        .status(500)
        .send({ message: "* FATAL ERROR * no has especificat cap projecte" });
    else {
      //promesa
      Project.findById(projectID)
        .then((project) => {
          if (!project)
            return res
              .status(404)
              .send({ message: "* FATAL ERROR * projecte no existeix" });
          return res.status(200).send({ project });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .send({ message: "* FATAL ERROR * al retornar dades" });
        });
    }
  },

  getProjects: (req, res) => {
    //promesa
    Project.find({})
      .sort("year")
      .exec()
      .then((projects) => {
        if (!projects)
          return res
            .status(404)
            .send({ message: "* FATAL ERROR * no hi ha projects" });
        return res.status(200).send({ projects });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({ message: "* FATAL ERROR * al retornar dades" });
      });
  },

  updateProject: (req, res) => {
    //id arriba per URL
    let projectID = req.params.id;
    //dades objecte arriben per body
    let update = req.body;

    console.log(projectID);
    console.log(update);

    //si entra a callback, s'ha executat
    //new:true -> retorna l'objecte nou, no l'antic
    //promesa
    Project.findByIdAndUpdate(projectID, update, { new: true })
      .then((projectUpdated) => {
        if (!projectUpdated)
          return res
            .status(404)
            .send({ message: "* FATAL ERROR * no existeix el projecte" });
        return res.status(200).send({ project: projectUpdated });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({ message: "* FATAL ERROR * al actualizar les dades" });
      });
  },

  deleteProject: (req, res) => {
    //id arriba per URL
    let projectID = req.params.id;
    console.log(projectID);

    //promesa
    Project.findByIdAndDelete(projectID)
      .then((projectRemoved) => {
        if (!projectRemoved)
          return res
            .status(404)
            .send({ message: "* FATAL ERROR * no existeix el projecte" });
        return res.status(200).send({ project: projectRemoved });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({ message: "* FATAL ERROR * projecte no esborrat" });
      });
  },

  uploadImage: (req, res) => {
    let projectID = req.params.id;
    let fileName = "* FATAL ERROR * imatge no pujada";

    if (req.files) {
      console.log(req.files);

      //nom arxiu pujat
      let filePath = req.files.image.path;
      //let fileSplit = filePath.split('/'); //problema si windows \
      let fileSplit = filePath.split(/[\/\\]/); //regexp de les 2 barres
      let fileName = fileSplit[1];
      console.log(fileName);

      //Comprova l’extensió que sigui png, jpg, jpeg o giff
      //type: 'image/png'
      let ext = req.files.image.type.split("/")[1];
      console.log(ext);

      //si s'inclou en tipus admesos
      if (FILE_TIPUS.includes(ext)) {
        //update db
        //promesa
        Project.findByIdAndUpdate(projectID, { image: fileName }, { new: true })
          .then((projectUpdated) => {
            if (!projectUpdated)
              return res
                .status(404)
                .send({ message: "* FATAL ERROR * no existeix el projecte" });
            return res.status(200).send({ project: projectUpdated });
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(500)
              .send({ message: "* FATAL ERROR * al actualizar la imatge" });
          });

        //tipus no admès
      } else {
        fs.unlink(filePath, (err) => {
          return res.status(200).send({
            message: "* FATAL ERROR * extensió no admesa",
          });
        });
      }
      //error req.files
    } else {
      return res.status(500).send({
        message: fileName,
      });
    }
  },
  getImage: (req, res) => {
    let file = req.params.image;
    let path_file = "";
    if (file === "NOIMG.png") {
      path_file = "./img/" + file;
    } else {
      path_file = "./uploads/" + file;
    }

    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(200).send({
          message: "* FATAL ERROR * No hi ha imatge",
        });
      }
    });
  },
};

//exportar controlador
module.exports = controller;
