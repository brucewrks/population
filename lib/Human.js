const uuid = require('uuid/v5');

function Human(xpos, ypox, world) {
  this.id = '';
  this.age = 0;
  this.needs = [];
  this.alive = true;
  this.gender = Math.floor(Math.rand() * 2) + 1); // Either 1 or 2

  this.id = uuid();

  this.xpos = xpos;
  this.ypos = ypos;

  // Food need
  this.needs.push({
    name: 'food',
    value: 10
  });

  // Water need
  this.needs.push({
    name: 'water',
    value: 10
  });

  // Companionship need
  this.needs.push({
    name: 'companionship',
    value: 10
  });

  this.evaluateNeeds = () => {
    for (let i in this.needs) {
      if (this.value < 1) {
        this.alive = false;
      }
    }
  };

  // Seek things that needed
  this.seekNeeds = () => {
    setTimeout(this.seekNeeds, 1);
  };

  // Needs analysis
  setInterval(() => {
    for (let i in this.needs) {
      this.needs[i].value--;
    }
  }, 1000);

  setInterval(this.evaluateNeeds, 5000);

  this.seekNeeds();


  console.log('Initialized Human');
}

module.exports = Human;
