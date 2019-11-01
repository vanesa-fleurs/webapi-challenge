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


router.post('/', validateProjectPOST, async (req,res) => {
    const newProject = req.body;
    try{
        const project = await Project.insert(newProject)
        if(project){
            res.status(201).json(project)
        }
    }
    catch(error){
        res.status(500).json({ message: `There was an error creating that new project`});
    }
})




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

async function validateProjectPOST(req, res, next) {
    const { name } = req.body;
    const { description } = req.body;

    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "Missing Project data." });
    } 
    else if(!name){
        return res.status(400).json({error: `need a NAME for a new project!`});
    }
    
    else if(!description){
        return res.status(400).json({error: `need a DESCRIPTION for a new project!`});
    }

    else if(typeof name !== "string"){
        return res.status(400).json({error: `need STRING for name`});
    }
    else if(typeof description !== "string"){
        return res.status(400).json({error: `need STRING for description`});
    }
    req.body = {name, description}
    next();
}
module.exports = router;