const express = require('express');

const PM =require('./projectModel.js');

const AM = require('./actionModel.js');

const router = express.Router();


//endpoints 
//*************************************GET   *************************************
router.get('/:id', validateProjectId, (req,res) => {
    res.status(200).json(req.project);
})



//*************************************POST  *************************************


//*************************************PUT  *************************************



//custom middleware

function validateProjectId(req,res,next) {
    const { id } = req.params;
    PM.get(id)
        .then(project => {
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