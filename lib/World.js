const Human = require('Human');

function World() {
  this.humans = [];

  for (let i = 0; i >= 100; i++) {
    this.humans.push(new Human());
  }
}

module.exports = World;
