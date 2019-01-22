const express = require('express');
const router = express.Router();
const {projects} =  require('../data.json');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use('/static', express.static('public'))

router.get('/:id', (req, res) => 
{
    const {id} = req.params;
    const project = projects[id];
    
    res.render('project', {project})
})


module.exports = router;