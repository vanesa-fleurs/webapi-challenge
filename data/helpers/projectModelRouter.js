const express = require('express');

const PM =require('./projectModel.js');

const AM = require('./actionModel.js');

const router = express.Router();


//endpoints 
//*************************************GET   *************************************
router.get('/:id', validateProjectId, (req,res) => {
    res.status(200).json(req.project);
})

router.get('/:id/actions', validateProjectId, (req,res) => {
    const { id } = req.params;
    PM.getProjectActions(id)
        .then(actions => {
            console.log("actions within GET of /:id/actions", actions)
            if(actions.length == 0){
                return res.status(200).json({error: `you do not have any actions at the moment for this project`})
            }
            else {
                res.status(200).json(actions)
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error in retrieving actions for project with ID: ${id}`});
        })
})



//*************************************POST  *************************************

router.post('/', validateProjectPost, (req,res) => {
    const newProject = req.body;
    PM.insert(newProject)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log("err in POST lf /:id", err);
            res.status(500).json({error: `There was an error in adding a new project`});
        });
})

//*************************************PUT   *************************************

router.put('/:id', validateProjectId, (req,res) => {
    const { id } = req.params;
    const changes = req.body;

    if(!req.body){
        return res.status(400).json({error: `must provide a body to UPDATE project ${id}!`});  
    }

    PM.update(id, changes)
        .then(() => {
            PM.get(id)
                .then(project => {
                    res.status(200).json(project);
                })
                .catch(error => {
                    console.log("error in getting project", error)
                    res.status(500).json({error: `error in getting the project! `})
                });
        })
        .catch(error => {
            console.log("error in PUT of /:id", error);
            res.status(500).json({error: `error in updating project with ID: ${id}`})
        });

})

//CUSTOM MIDDLEWARE

function validateProjectId(req,res,next) {
    const { id } = req.params;
    PM.get(id)
        .then(project => {
            console.log("project within validateProjectId: ", project);
            if(project) {
                req.project = project
                next();
            }
            else{
                res.status(404).json({error: "Project with id does not exist"});
            }
        })
}

function validateProjectPost(req,res,next) {
    const { name } = req.body;
    const { description } = req.body;


    if(!req.body) {
        return res.status(400).json({error: `must provide a body to create a new project!`});
    }

    if(!name){
        return res.status(400).json({error: `must provide a NAME for a new project!`});
    }
    
    if(!description){
        return res.status(400).json({error: `must provide a DESCRIPTION for a new project!`});
    }

    if(typeof name !== "string"){
        return res.status(400).json({error: `must provide string for name`});
    }
    if(typeof description !== "string"){
        return res.status(400).json({error: `must provide string for description`});
    }
    req.body = {name, description}
    next();

}


module.exports = router;