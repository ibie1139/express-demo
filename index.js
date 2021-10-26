const express = require('express');
const Joi = require('joi'); // return: a class

const app = express();

app.use(express.json()); // express.json() - create a middleware, and use in the preprocessing pipeline via `app.use()`

// Data
const courses = [
  { id: 1, name: 'Physics' },
  { id: 2, name: 'Mathematics' },
  { id: 3, name: 'Chemistry' },
  { id: 4, name: 'Biology' },
];

// Note: this function will be used in PUT and DELETE
// The original one, with annotations, is kept in POST for review.
function inputValidate(input) {
  const schema = Joi.object({
    name: Joi.string().min(2).required()
  });
  const { error } = schema.validate(input); // use object destructuring here
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  };
}

// APIs for courses

// POST - Create
app.post('/api/courses', (req, res) => {
  // if the value is invalid
  const schema = Joi.object({ // schema: shape of the object
    name: Joi.string().min(2).required()
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  };
  // const schema = Joi.string().min(2).required(); -- syntax wrong

  // if the value is valid
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
});

// GET - Read
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  // if id is not found
  const course = courses.find(c => c.id === parseInt(req.params.id)); // not `courses.filter`, filter returns an array. Even an empty array, `!course` is false.
  if (!course) {
    res.status(404).send('The given ID is not found in the courses catalog.');
    return;
  }

  // if id is found, return the course
  res.send(course);
});

// PUT - Update
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // if id is not found
  if (!course) return res.status(404).send('The given ID is not found in the courses catalog.');

  // if input is not valid -- repeat logic -> refactor the code into a function
  inputValidate(req.body);

  // otherwise, update the corresponding course
  course.name = req.body.name;
  res.send(course);
});

// DELETE - Delete
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // if id is not found
  if (!course) return res.status(404).send('The given ID is not found in the courses catalog.');

  // if input is not valid -- repeat logic, put into a function
  inputValidate(req.body);

  // id is valid, delete the course
  const indexDeleted = courses.indexOf(course);
  courses.splice(indexDeleted, 1);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connection on port ${port}`)); // port
