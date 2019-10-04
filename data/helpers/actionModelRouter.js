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
    res.status(200).json(req.project.actions);
})



//*************************************POST  *************************************




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




module.exports = router;