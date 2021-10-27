const express = require('express');
const Joi = require('joi');

const courses = require('./routes/courses');
const home = require('./routes/home');
const logger = require('./middleware/logger');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // in () now are the default values, optional syntax

app.use(express.json()); // built-in middleware 1
app.use(express.urlencoded({ extended: true })); // built-in middleware 2
app.use(express.static('public')); // built-in middleware 3 - present static files in 'public' folder

app.use(logger); // custom middleware

// Process variously based on the environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // 1st way to check environment using 'process' object
if (app.get('env') === 'development') { // 2nd way to check environment setting with `app.get()`
  console.log('Development environment in settings.');
} else if (app.get('env') === 'production') {
  console.log('Production environment. Be careful.');
}

// APIs for courses
app.use('/', home);
app.use('/api/courses', courses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connection on port ${port}`));
