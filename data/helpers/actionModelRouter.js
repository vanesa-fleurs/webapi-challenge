const express = require('express');

const PM =require('./projectModel.js');

const AM = require('./actionModel.js');

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
//custom middleware




module.exports = router;