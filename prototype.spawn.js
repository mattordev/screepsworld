/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototype.spawn');
 * mod.thing == 'a thing'; // true
 */

module.exports = function () {
  StructureSpawn.prototype.spawnCustomCreep = function (energy, creepName, roleName) {
    if (roleName == undefined) {
      console.log("Something went wrong!");
      console.log("Name: " + creepName);
      console.log("Role: " + roleName);
      return;
    }

    const numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "Harvester");
    const numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "Upgrader");
    const numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "Builder");
    const numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == "Repairer");

    const numberOfParts = Math.floor(energy / 200);
    const body = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(MOVE);
    }

    return this.spawnCreep(body, creepName, { memory: { role: roleName, working: false } });
  };
};
