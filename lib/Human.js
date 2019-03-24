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
    value: 5
  });

  // Water need
  this.needs.push({
    name: 'water',
    value: 5
  });

  // warmth need
  this.needs.push({
    name: 'warmth',
    value: 5
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

    if (this.age > Math.floor((Math.random() * 25) + 15)) {
      this.alive = false;
    }
  };

  // Seek things that needed
  this.seekNeeds = () => {

    let needsCount = 0;
    let needsSomething = false;

    for (let need of this.needs) {
      needsCount += need.value;

      if (need.value < 20) {
        needsSomething = true;
      }
    }

    if (needsCount > 200 && !needsSomething) {
      this.moveAtRandom(); // We don't need to search for anything if we are satisfied.
      return setTimeout(this.seekNeeds, 10);
    }

    // Find objects near me
    nearbyObjects = [];

    nearbyObjects = world.objects.sort((a, b) => {
      return ( Math.abs(this.xpos - a.xpos) + Math.abs(this.ypos - b.ypos) ) - ( Math.abs(this.xpos - b.xpos) + Math.abs(this.ypos - b.ypos) );
    }).slice(0, 4);

    nearbyObjects = nearbyObjects.sort((a, b) => {
      let minVal = 9999999;
      let minName = '';

      let aTotal = 0;
      let bTotal = 0;

      for (let need of this.needs) {
        if (need.value < minVal) {
          minVal = need.value;
          minName = need.name;
          aTotal = need.value;
          bTotal = need.value;
        }
      }

      for (let provision of a.provisions) {
        if (provision.name === minName) {
          aTotal += provision.value;
        }
      }

      for (let provision of b.provisions) {
        if (provision.name === minName) {
          bTotal += provision.value;
        }
      }

      return bTotal - aTotal; // Objective score
    }).slice(0, 2);

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
      if (Math.abs(human.xpos - this.xpos) < 4 && Math.abs(human.ypos - this.xpos) < 4) {

        companionship.value += 10;

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
        if (thisNeeds < 50 || humanNeeds < 50) {
          continue;
        }

        if (this.age < 1 || human.age < 1) { // Need to be at least 1, dude. Jeez.
          continue;
        }

        companionship.value += 100;

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
        }, 500);
      }
    }
  };

  this.randomX = 1;
  this.randomY = 1;
  setInterval(() => {
    this.randomX = Math.random() >= 0.5 ? 1 : -1;
    this.randomY = Math.random() >= 0.5 ? 1 : -1;
  }, Math.floor((Math.random() * 15000) * 5000));

  this.moveAtRandom = () => {

    if (this.xpos > 775) {
      this.randomX = -1;
    }
    if (this.xpos < 25) {
      this.randomX = 1;
    }
    if (this.ypos > 775) {
      this.randomY = -1;
    }
    if (this.ypos < 25) {
      this.randomY = 1;
    }

    this.xpos = this.xpos + this.randomX;
    this.ypos = this.ypos + this.randomY;
  };

  // Needs analysis
  setInterval(() => {
    for (let i in this.needs) {
      if (this.needs[i].name !== 'companionship' || Math.floor(Math.random() * 10) === 7) {
        this.needs[i].value -= (this.needs[i].value * 0.05);
      }
    }
  }, 1500);

  // Age Interval
  setInterval(() => {
    this.age++;
  }, 10000);

  // Startup
  setInterval(this.moveAtRandom, 5000);
  setInterval(this.evaluateCompanionship, 1000);
  setInterval(this.evaluateNeeds, 5000);
  setTimeout(this.seekNeeds, 100);
}

module.exports = Human;
