module.exports = function(robot) {
  
  var _ = require('lodash');
  var inputParser = require('./inputParser');
  var world = require('worldLoader').setupWorld();  

  function getPlayer(playerName, world) {
    if(! _.has(world.players, playerName)) {
      world.players[playerName] = {
        name: playerName,
        currentLocation: world.map.Hildas,
        inventory: []
      };
    }
    return _.get(world.players, playerName);
  }

  
  robot.hear(/(.*)/i, function(result) {

    var inputArray = result.match[0].split(" ");
    var player = getPlayer(result.message.user.name, world);
    var response = inputParser.process(inputArray, player, world);
    result.send( response );

  });


};

