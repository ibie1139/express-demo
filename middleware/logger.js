function log(req, res, next) {
  console.log('The server is loading...');
  next(); // without this, the process stuck at this function in the request processing pipeline
}

module.exports = log;
