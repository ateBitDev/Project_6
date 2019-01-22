const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'))
// tells program to read pug files

app.set('view engine', 'pug');

const mainRoute = require('./routes');
const projectsRoute = require('./routes/projects');

app.use(mainRoute)
app.use('/project',projectsRoute)

app.use((req, res, next) =>
{
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
})

app.use((req,res,next) =>
{
  const err = new Error('Error with the server');
  err.status = 500;
  next(err);
});

app.use((err, req, res, next) => 
{
    res.locals.error = err;
    res.status(err.status);
    res.render('error')
})

console.log('Listening to Port: 3000')
app.listen(3000);