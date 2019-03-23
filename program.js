
const server = require('lib/server');
const world = require('lib/World');

let world = new World();
server.addDataPoint('world', world);
server.listen(1337, () => console.log('Server listening on port 1337'));
