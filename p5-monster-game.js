// Required code modules
const Monster = require("./p5-monster.js");


/*** Game Class ***/
/* Constructor expects an object */
// IMPORTANT: When declaring a class within a module,
// the class is the ONLY export!
module.exports = class MonsterGame {
  constructor({
    monsterList = [],
    gameDelayInMilliseconds = 5000,
    minimumLifeDrain = 1,
    maximumLifeDrain = 30,
  }) {
    console.log("Initializing monsters...");
    this.gameDelayInMilliseconds = gameDelayInMilliseconds;
    this.minimumLifeDrain = minimumLifeDrain;
    this.maximumLifeDrain = maximumLifeDrain;
    this.createMonsters(monsterList);
    console.log("Monsters initialized, ready to play!");
  }

  // List monsters
  listMonsters = () => this.monsters.forEach((monster) => console.log(`Monster: ${Monster.monsterName}, 
                                                    Minimum Life: ${Monster.minimumLife}, 
                                                    Current Life: ${Monster.currentLife},
                                                    Status:
                                                    `));
    //console.log("You must write this method");

  // Create monsters from monster information
  createMonsters = (monsterList = []) => {
    this.monsters = monsterList.map((monster) => new Monster(monster));
  };

  // Update monster life value
  
  updateLife = (lifeChange = 0) => {
    this.monsters.forEach((monster) => monster.updateLife(lifeChange));
    this.currentLife += lifeChange;
    this.currentLife = this.currentLife < 0  ? 0 : this.currentLife;
    this.isAlive = this.currentLife < this.minmumLife; 
  }

  // Main game playing method, will exit when all monsters have died
  async playGame(GameDelay) {
    console.log("Starting game...");
    let monstersAreAlive = true;
    do {
      // Sleep game
      console.log(
        `Sleeping for ${this.gameDelayInMilliseconds} milliseconds...`
      );
      await sleep(this.gameDelayInMilliseconds);

      // Call each monster's random life drain method
      this.monsters.forEach((monster) => {
          if (monster.isAlive) {
            monster.randomLifeDrain(this.minimumLifeDrain, this.maximumLifeDrain)
          }
        }
      );

      // List monsters
      this.listMonsters();

      // Check if any monsters are alive and set Boolean
      monstersAreAlive =
        this.monsters.filter((monster) => monster.isAlive).length > 0;

      // See if any monsters are still alive
      if (!monstersAreAlive) {
        console.log('All monsters have died, game over!');
      }
    } while (monstersAreAlive);
  }
};

// Game loop

/*** Utility Functions ***/
// https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}