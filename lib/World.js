const Human = require('./Human');
const Object = require('./Object');

function World() {
  this.humans = [];
  this.objects = [];

  this.xsize = 800;
  this.ysize = 800;

  for (let i = 0; i < 100; i++) {
    let xpos = Math.floor(Math.random() * this.xsize);
    let ypos = Math.floor(Math.random() * this.ysize);
    this.humans.push(new Human(xpos, ypos, this));
  }

  for (let i = 0; i < 10; i++) {
    let xpos = Math.floor(Math.random() * this.xsize);
    let ypos = Math.floor(Math.random() * this.ysize);
    this.objects.push(new Object(xpos, ypos, this));
  }

  this.refreshObjects = () => {
    this.objects = [];
    for (let i = 0; i < Math.floor((Math.random() * 40) + 8); i++) {
      let xpos = Math.floor(Math.random() * this.xsize);
      let ypos = Math.floor(Math.random() * this.ysize);
      this.objects.push(new Object(xpos, ypos, this));
    }
  }

  // Cleanup dead objects
  this.cleanupTheDead = () => {
    this.humans = this.humans.filter((human) => {
      return human.alive;
    });
  };

  // If population grows to large, we'll cause a catastrophy.
  this.armageddon = () => {
    if (this.humans.length > 2000) {
      this.humans.splice(200);
    }
  }

  setInterval(this.armageddon, 1000);
  setInterval(this.cleanupTheDead, 5000);
  setInterval(this.refreshObjects, 15000);
}

module.exports = World;
