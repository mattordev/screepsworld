/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

const roleBuilder = require("role.builder");

module.exports = {
  run: function (creep) {
    // Find any structure that is close, isn't at its max hits and IS NOT a wall
    const closestTargetStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL,
    });
    const closestTargetEnergy = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

    // Flip flop logic
    if (creep.memory.working == true && creep.store.energy == 0) {
      creep.memory.working = false;
    } else if (creep.memory.working == false && creep.store.energy == creep.store.getCapacity()) {
      creep.memory.working = true;
    }

    // Repairer logic
    if (creep.memory.working == true) {
      if (closestTargetStructure != undefined) {
        if (creep.repair(closestTargetStructure) == ERR_NOT_IN_RANGE) {
          creep.say("repairing");
          creep.moveTo(closestTargetStructure);
        }
      } else {
        // If there's nothing to repair, start upgrading
        creep.say("building");
        roleBuilder.run(creep);
      }
    } else {
      if (creep.harvest(closestTargetEnergy) == ERR_NOT_IN_RANGE) {
        creep.say("harvesting");
        creep.moveTo(closestTargetEnergy);
      }
    }
  },
};
