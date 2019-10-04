const express = require('express');

const AM = require('./actionModel.js');


const PM =require('./projectModel.js');


const router = express.Router();

//endpoints

// router.get('/', (req,res) => {
//     AM.get(req.query)
//     .then(projects => {
//         res.status(200).json(projects)
//     })
//     .catch(error => {
//         console.log("error in GET for PM", error);
//         res.status(500).json({error: `error getting project list`});
//     })
// })


//endpoints 
//*************************************GET   *************************************
router.get('/:id', validateProjectId, (req,res) => {
    if(req.project.actions.length == 0){
    return res.status(200).json({error: `you do not have any actions at the moment for this project`})
    }
    else{
        res.status(200).json(req.project.actions);
    }
})



//*************************************POST == insert  *************************************
router.post('/:id', validateProjectId, validateActionPost, (req,res) => {
    const {id} = req.params;
    const newAction = req.body;
    AM.insert(newAction)
        .then(nAction => {
            res.status(201).json(nAction);
        })
        .catch(error => {
            console.log("err in ACTION POST lf /:id", err);
            res.status(500).json({error: `There was an error in adding a new action to the project with ID ${id}`});
        });
})


//*************************************PUT   *************************************



//*************************************DELETE   *************************************



////*************************************CUSTOM MIDDLEWARE*************************************
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

function validateActionPost(req,res,next) {
    const {project_id} = req.body;
    const {description} = req.body;
    const {notes} = req.body;

    //conditions concerning the body
    if(!req.body) {
        return res.status(400).json({error: `must provide a body to create a new action!`});
    }
    if(!project_id){
        return res.status(400).json({error: `must provide a PROJECT_ID for a new project!`});
    }
    if(!description){
        return res.status(400).json({error: `must provide a DESCRIPTION for a new project!`});
    }
    if(!notes){
        return res.status(400).json({error: `must provide NOTES for a new project!`});
    }
    //further conditions
    if(description.length > 128){
        return res.status(400).json({error: `DESCRIPTION cannot be more than 128 characters. Shorten the description, please.`});
    }

    if(typeof description !== "string"){
        return res.status(400).json({error: `must provide string for name`});
    }
    if(typeof notes !== "string"){
        return res.status(400).json({error: `must provide string for description`});
    }
    if(typeof project_id !== "number"){
        return res.status(400).json({error: `must provide boolean for project_id`});
    }

    //fin//
    req.body = { project_id, description, notes }
    next();

}


module.exports = router;