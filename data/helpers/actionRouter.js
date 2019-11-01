const router = require('express').Router();
const Action = require('./actionModel.js')
const Project = require('./projectModel.js')









/*              Custom Middleware               */
async function validateProjectID(req,res, next) {
    const { id } = req.params;
    try {
        const project = await Project.get(id)
        if(project) {
            req.project = project
            next();
        }
        else {
            res.status(404).json({ message: "Invalid Project ID." });
        }
    }
    catch(error) {
        res.status(500).json({ message: "There was an error validating that Project." });
    }
}

async function validateActionID(req,res,next) {
    const { actionID } = req.params;
    try{
        const action = await Action.get(actionID)
        if(action){
            req.action = action
            next();
        }
        else{
            res.status(404).json({error: `Action with id of ${actionID} does not exist for the queried project`});
        }
    }
    catch(error){
        res.status(500).json({ message: "There was an error validating that Action." });
    }
}

function validateActionPost(req,res,next) {
    const {project_id} = req.body;
    const {description} = req.body;
    const {notes} = req.body;

    //conditions concerning the body
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "Missing Action data." });
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
    //more conditions
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
    req.body = { project_id, description, notes }
    next();
}
module.exports = router