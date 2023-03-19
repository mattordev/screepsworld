/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
  run: function (creep) {
    // const structure = Game.spawns["Spawn1"];
    const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s) =>
        (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity,
    });
    const closestTarget = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

    // Flip flop logic
    if (creep.memory.working == true && creep.store.energy == 0) {
      creep.memory.working = false;
    } else if (creep.memory.working == false && creep.store.energy == creep.store.getCapacity()) {
      creep.memory.working = true;
    }

    // Harvesting logic
    if (creep.memory.working == true) {
      // Might be worth adding a check here to move creep to an idle area if there's no enery storage cap left
      if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.say("depositing");
        if (structure != undefined) {
          creep.moveTo(structure);
        }
      }
    } else {
      if (creep.harvest(closestTarget) == ERR_NOT_IN_RANGE) {
        creep.say("harvesting");
        creep.moveTo(closestTarget);
      }
    }
  },
};
