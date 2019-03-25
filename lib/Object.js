const uuid = require('uuid/v4');

function Object(xpos, ypos, world) {
  this.id = uuid();
  this.xpos = xpos;
  this.ypos = ypos;

  this.provisions = [];

  let types = ['food', 'water', 'warmth'];
  let amount = Math.floor((Math.random() * 500) + 100);

  this.provisions.push({
    name:  types[Math.floor(Math.random() * types.length)],
    value: amount,
    original: amount
  });

  this.provision = () => {

    let humansToProvision = [];

    // Gather humans ( TODO only nearby )
    for (let human of world.humans) {

      if (!human) continue; // race condition

      if (Math.abs(human.xpos - this.xpos) > 2) continue;
      if (Math.abs(human.ypos - this.ypos) > 2) continue;

      humansToProvision.push(human);

    }

    for (let human of humansToProvision) {

      // Gather needs
      for (let need of human.needs) {

        // Gather provisions possible
        for (let provision of this.provisions) {

          // Determine if provision can be given
          if (provision.name === need.name) {

            // If we have enough to provide
            if (provision.value > 0) {

              let amount = provision.value / humansToProvision.length;
              need.value += amount;
              provision.value -= amount;

            }
          }
        }
      }
    }
  };

  this.refresh = () => {
    for (let provision of this.provisions) {
      provision.value += provision.original;
    }
  };

  setInterval(this.provision, 500);
  setInterval(this.refresh, Math.floor((Math.random() * 10000) + 1000));
}

module.exports = Object;
