require("prototype.spawn")();

const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleRepairer = require("role.repairer");

module.exports.loop = function () {
  // Clear memory
  for (const name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      delete Memory.creeps[name];
    }
  }

  for (const creepIndex in Game.creeps) {
    const creep = Game.creeps[creepIndex];
    
    const role = require("role." + creep.memory.role.toLowerCase());
    role.run(creep);

    // Run the func based on a switch case

    /*switch (creep.memory.role) {
      case "Harvester":
        roleHarvester.run(creep);
        break;
      case "Upgrader":
        roleUpgrader.run(creep);
        break;
      case "Builder":
        roleBuilder.run(creep);
        break;
      case "Repairer":
        roleRepairer.run(creep);
        break;
    }*/
  }

  // Auto Spawning
  const minNumberOfHarvesters = 4;
  const minNumberOfUpgraders = 4;
  const minNumberOfBuilders = 2;
  const minNumberOfRepairers = 4;

  const numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "Harvester");
  const numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "Upgrader");
  const numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "Builder");
  const numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == "Repairer");

  for (const roomIndex in Game.rooms) {
    const room = Game.rooms[roomIndex];

    // Finds all the spawns in the room
    const spawnList = room.find(FIND_MY_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_SPAWN,
    });

    // Iterate through the spawns in the list and spawn a creep
    for (const spawnIndex in spawnList) {
      const spawn = spawnList[spawnIndex];
      const creepSpawnEnergy = spawn.room.energyCapacityAvailable;
      let newCreep = undefined;
      let name = "Worker";

      if (numberOfHarvesters < minNumberOfHarvesters) {
        name += "H" + Game.time;
        // Spawn a new harvester creep
        newCreep = spawn.spawnCustomCreep(creepSpawnEnergy, name, "Harvester");

        // Check to make sure that there's enough energy
        if (newCreep == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
          newCreep = spawn.spawnCustomCreep(spawn.room.energyAvailable, name, "Harvester");
        }
      } else if (numberOfUpgraders < minNumberOfUpgraders) {
        name += "U" + Game.time;
        // Spawn a new upgrader creep
        newCreep = spawn.spawnCustomCreep(creepSpawnEnergy, name, "Upgrader");
      } else if (numberOfBuilders < minNumberOfBuilders) {
        name += "B" + Game.time;
        // Spawn a new builder creep
        newCreep = spawn.spawnCustomCreep(creepSpawnEnergy, name, "Builder");
      } else if (numberOfRepairers < minNumberOfRepairers) {
        name += "R" + Game.time;
        // Spawn a new Repairer creep
        newCreep = spawn.spawnCustomCreep(creepSpawnEnergy, name, "Repairer");
      }

      if (!(newCreep < 0)) {
        console.log("Spawned new creep: " + name);
      }
    }
  }
};
