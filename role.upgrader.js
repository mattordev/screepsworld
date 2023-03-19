/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

const roleHarvester = require("./role.harvester");

module.exports = {
  run: function (creep) {
    const controller = creep.room.controller;
    const closestTarget = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

    // Flip flop logic
    if (creep.memory.working == true && creep.store.energy == 0) {
      creep.memory.working = false;
    } else if (creep.memory.working == false && creep.store.energy == creep.store.getCapacity()) {
      creep.memory.working = true;
    }

    // upgrading logic
    if (creep.memory.working == true) {
      if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.say("upgrading");
        creep.moveTo(controller);
      }
    } else {
      if (creep.harvest(closestTarget) == ERR_NOT_IN_RANGE) {
        creep.say("harvesting");
        creep.moveTo(closestTarget);
      }
    }
  },
};
