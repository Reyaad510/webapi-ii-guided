
//this filed just used to listen to server
// We separate because of testing and keep things modular
// server exported from serverjs


const server = require('./server.js');

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
