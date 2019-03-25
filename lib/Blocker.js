const uuid = require('uuid/v4');

function Blocker(xpos, ypos, world) {
  this.id = uuid();
  this.xpos = xpos;
  this.ypos = ypos;

  this.size = Math.floor((Math.random() * 10) + 2);

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

      human.xpos += overlap;
    }

    for (let human of humansToBlockY) {
      let overlap = (this.size / 2) - Math.abs(human.ypos - this.ypos);

      if (human.ypos < this.ypos) {
        overlap *= -1;
      }

      human.ypos += overlap;
    }
  };

  setInterval(this.block, 5);
}

module.exports = Blocker;
