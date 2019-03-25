const uuid = require('uuid/v4');

function Blocker(xpos, ypos, world) {
  this.id = uuid();
  this.xpos = xpos;
  this.ypos = ypos;

  this.size = Math.floor((Math.random() * 30) + 10);

  this.block = () => {
    let humansToBlockX = [];
    let humansToBlockY = [];

    // Gather humans to block
    for (let human of world.humans) {
      if (Math.abs(human.xpos - this.xpos) < (this.size / 2) && Math.abs(human.ypos - this.ypos) < (this.size / 2)) {
        humansToBlockX.push(human);
        humansToBlockY.push(human);
      }
    }

    for (let human of humansToBlockX) {
      let overlap = (this.size / 2) - Math.abs(human.xpos - this.xpos);

      if (human.ypos < this.ypos) {
        overlap *= -1;
      }

      human.xpos -= (overlap * 2);

      if (human.ypos < this.ypos) {
        human.ypos -= 2;
      } else {
        human.ypos += 2;
      }
    }

    for (let human of humansToBlockY) {
      let overlap = (this.size / 2) - Math.abs(human.ypos - this.ypos);

      if (human.ypos < this.ypos) {
        overlap *= -1;
      }

      human.ypos -= (overlap * 2);

      if (human.xpos < this.xpos) {
        human.xpos -= 2;
      } else {
        human.xpos += 2;
      }
    }
  };

  setInterval(this.block, 5);
}

module.exports = Blocker;
