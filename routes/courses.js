const express = require('express');
const router = express.Router(); // routes deal with `router` object, not `app` object

// Data -- follow the routes
const courses = [
  { id: 1, name: 'Physics' },
  { id: 2, name: 'Mathematics' },
  { id: 3, name: 'Chemistry' },
  { id: 4, name: 'Biology' },
];

function inputValidate(input) {
  const schema = Joi.object({
    name: Joi.string().min(2).required()
  });
  const { error } = schema.validate(input);
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  };
}

// APIs for courses
// POST - Create
router.post('/', (req, res) => {
  // if the value is invalid
  const schema = Joi.object({
    name: Joi.string().min(2).required()
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  };

  // if the value is valid
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
});

// GET - Read
router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  // if id is not found
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The given ID is not found in the courses catalog.');
    return;
  }

  // if id is found, return the course
  res.send(course);
});

// PUT - Update
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;
