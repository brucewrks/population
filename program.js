
const server = require('./client/server');
const World = require('./lib/World');

let world = new World();
server.addDataPoint('world', world);
server.listen(1337, () => console.log('Server listening at http://localhost:1337'));
