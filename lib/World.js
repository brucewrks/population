const Human = require('./Human');
const Object = require('./Object');

function World() {
  this.humans = [];
  this.objects = [];

  this.xsize = 1000;
  this.ysize = 1000;

  for (let i = 0; i < 100; i++) {
    let xpos = Math.floor(Math.random() * 400);
    let ypos = Math.floor(Math.random() * 400);
    this.humans.push(new Human(xpos, ypos, this));
  }

  for (let i = 0; i < 10; i++) {
    let xpos = Math.floor(Math.random() * 400);
    let ypos = Math.floor(Math.random() * 400);
    this.objects.push(new Object(xpos, ypos, this));
  }

  this.refreshObjects = () => {
    this.objects = [];
    for (let i = 0; i < Math.floor((Math.random() * 15) + 2); i++) {
      let xpos = Math.floor(Math.random() * 400);
      let ypos = Math.floor(Math.random() * 400);
      this.objects.push(new Object(xpos, ypos, this));
    }
  }

  // Cleanup dead objects
  this.cleanupTheDead = () => {
    this.humans = this.humans.filter((human) => {
      return human.alive;
    });
  };

  setInterval(this.cleanupTheDead, 5000);
  setInterval(this.refreshObjects, 15000);
}

module.exports = World;
