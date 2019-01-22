const express = require('express');
const router = express.Router();
const {projects} =  require('../data.json');
//sends to about route and uses index.pug temp
router.get('/', (req, res) =>
{
    console.log('accessing index route');
    res.render('index', {projects});
})
//sends to about route and uses about.pug temp
router.get('/about', (req, res) =>
{
    console.log('accessing about route');
    res.render('about');
});

module.exports = router;