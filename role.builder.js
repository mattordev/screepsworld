/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

const roleUpgrader = require("role.upgrader");

module.exports = {
  run: function (creep) {
    const structure = Game.spawns["Mystics Lands"];
    const closestTarget = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    const contructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

    // Flip flop logic
    if (creep.memory.working == true && creep.store.energy == 0) {
      creep.memory.working = false;
    } else if (creep.memory.working == false && creep.store.energy == creep.store.getCapacity()) {
      creep.memory.working = true;
    }

    // building logic
    if (creep.memory.working == true) {
      if (contructionSite != undefined) {
        if (creep.build(contructionSite) == ERR_NOT_IN_RANGE) {
          creep.say("building");
          creep.moveTo(contructionSite);
        }
      } else {
        creep.say("upgrading");
        // If there's nothing to build, start upgrading
        roleUpgrader.run(creep);
      }
    } else {
      if (creep.harvest(closestTarget) == ERR_NOT_IN_RANGE) {
        creep.say("harvesting");
        creep.moveTo(closestTarget);
      }
    }
  },
};
