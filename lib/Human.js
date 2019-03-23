const uuid = require('uuid/v4');

function Human(xpos, ypos, world) {
  this.id = uuid();
  this.age = 0;
  this.needs = [];
  this.alive = true;
  this.gender = Math.floor((Math.random() * 2) + 1); // Either 1 or 2

  this.xpos = xpos;
  this.ypos = ypos;

  // Food need
  this.needs.push({
    name: 'food',
    value: 1
  });

  // Water need
  this.needs.push({
    name: 'water',
    value: 1
  });

  // Companionship need
  this.needs.push({
    name: 'companionship',
    value: 100
  });

  // Needs evaluation
  this.evaluateNeeds = () => {
    for (let i in this.needs) {
      if (this.needs[i].value < 1) {
        this.alive = false;
      }
    }
  };

  // Seek things that needed
  this.seekNeeds = () => {
    // Find objects near me
    nearbyObjects = [];

    nearbyObjects = world.objects.sort((a, b) => {
      let aTotal = 0;
      let bTotal = 0;

      for (let need of this.needs) {
        aTotal += need.value;
        bTotal += need.value;
      }

      for (let provision of a.provisions) {
        aTotal += provision.value;
      }

      for (let provision of b.provisions) {
        bTotal += provision.value;
      }

      return aTotal - bTotal; // Objective score
    }).slice(0, 10);

    nearbyObjects = nearbyObjects.sort((a, b) => {
      return ( Math.abs(this.xpos - a.xpos) + Math.abs(this.ypos - b.ypos) ) - ( Math.abs(this.xpos - b.xpos) + Math.abs(this.ypos - b.ypos) );
    }).slice(0, 3);

    let target = nearbyObjects[Math.floor(Math.random() * nearbyObjects.length)];
    let targetSteps = Math.floor((Math.random() * 100) + 25);
    let takenSteps = 0;

    let takeAStep = () => {
      if (takenSteps >= targetSteps) {
        return setTimeout(this.seekNeeds, 10);
      }

      targetX = (this.xpos > target.xpos) ? -2 : 2;
      targetY = (this.ypos > target.ypos) ? -2 : 2;
      this.xpos += targetX;
      this.ypos += targetY;

      takenSteps++;
      setTimeout(takeAStep, 10);
    }

    takeAStep(); // Move on young one
  };

  // Evaluate if human feels companionship
  this.evaluateCompanionship = () => {
    let companionship;
    for (let need of this.needs) {
      if (need.name === 'companionship') {
        companionship = need;
        break;
      }
    }

    for (let human of world.humans) {
      if (Math.abs(human.xpos - this.xpos) < 2 && Math.abs(human.ypos - this.xpos) < 2) {

        let thisNeeds = 0;
        for (let need of this.needs) {
          if (need.name !== 'companionship') {
            thisNeeds += need.value;
          }
        }

        let humanNeeds = 0;
        for (let need of human.needs) {
          if (need.name !== 'companionship') {
            humanNeeds += need.value;
          }
        }

        // Need to be doing alright for themselves
        if (thisNeeds < 10 || humanNeeds < 10) {
          continue;
        }

        if (this.age < 1 || human.age < 1) { // Need to be at least 1, dude. Jeez.
          continue;
        }

        companionship.value += 50;

        let xpos = (human.xpos + this.xpos) / 2;
        let ypos = (human.ypos + this.ypos) / 2;

        for (let need of this.needs) {
          need.value /= 2;
          need.value += 10;
        }

        for (let need of human.needs) {
          need.value /= 2;
          need.value += 2;
        }

        setTimeout(() => {
          world.humans.push(new Human(xpos, ypos, world));
        }, 1000);
      }
    }
  };

  this.moveAtRandom = () => {
    let xMove = Math.floor((Math.random() * 5)) * (Math.floor(Math.random()) ? -1 : 1);
    let yMove = Math.floor((Math.random() * 5)) * (Math.floor(Math.random()) ? -1 : 1);

    this.xpos = this.xpos + xMove;
    this.ypos = this.ypos + yMove;
  };

  // Needs analysis
  setInterval(() => {
    for (let i in this.needs) {
      if (this.needs[i].name !== 'companionship' || Math.floor(Math.random() * 10) === 7) {
        this.needs[i].value--;
      }
    }
  }, 1500);

  // Age Interval
  setInterval(() => {
    this.age++;
  }, 10000);

  // Startup
  setInterval(this.moveAtRandom, 5000);
  setInterval(this.evaluateCompanionship, 2000);
  setInterval(this.evaluateNeeds, 5000);
  setTimeout(this.seekNeeds, 1000);
}

module.exports = Human;
