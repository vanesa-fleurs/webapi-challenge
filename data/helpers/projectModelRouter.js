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
            res.status(200).json(actions)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error in retrieving actions for project with ID: ${id}`});
        })
})



//*************************************POST  *************************************


//*************************************PUT  *************************************



//custom middleware

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



module.exports = router;