const router = require('express').Router();
const Project = require('./projectModel.js')


router.get('/:id', validateProjectID, (req,res) => {
    res.status(200).json(req.project);
})

router.get('/:id/actions', validateProjectID, async (req,res) => {
    const { id } = req.params;
    try{
        const pActions = await Project.getProjectActions(id)

        if(pActions.length == 0 ) {
            return res.status(401).json({error: `you do not have any actions at the moment for this project`})
        }
        else{
            res.status(200).json(pActions)
        }
    }
    catch(error) {
        res.status(500).json({error: `error in retrieving actions for project with ID: ${id}`});
    }
});




/*                  Custom MiddleWare               */

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
module.exports = router;