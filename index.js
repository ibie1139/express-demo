const express = require('express');
const app = express();

//method: app.get | app.post | app.put | app.delet
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3]);
});

// route parameters: one parameter
app.get('/api/courses/:id', (req, res) => { // 'id' is the param name
  res.send(req.params.id); // and 'req' object has 'params' property
});

// route parameters: multiple parameters
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params); // take a look at `req.params` object
});

// query string: one of route parameters
app.get('/api/articles/:year/:month', (req, res) => {
  res.send(req.query); // `req.query` is an object, too
});

// environment variables:
// Port 3000 or 5000 is just for local host; in production, the hosting environment is different
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connection on port ${port}`)); // port
