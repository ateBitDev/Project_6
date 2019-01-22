const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'))
// tells program to read pug files
app.set('view engine', 'pug');
//runs index route
const mainRoute = require('./routes');
//runs poject route
const projectsRoute = require('./routes/projects');

app.use(mainRoute)
app.use('/project',projectsRoute)
//creates error object for errors that trigger from a non existist route
app.use((req, res, next) =>
{
    const err = new Error('Not Found');
    err.status = 404;
    console.log(err.message);
    console.log(err.status);
    console.log(err.stack);
    next(err)
})
//creats an error code for serverside issues such as missing data 
app.use((req,res,next) =>
{
  const err = new Error('Error with the server');
  err.status = 500;
  console.log(err.message);
  console.log(err.status);
  console.log(err.stack);
  next(err);
});
//renders the errors from error.pug temp
app.use((err, req, res, next) => 
{
    res.locals.error = err;
    res.status(err.status);
    res.render('error')
})
//tells what port to type in browser
console.log('Listening to Port: 3000')
app.listen(3000);