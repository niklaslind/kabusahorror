module.exports = function(robot) {
  
  var _ = require('lodash');
  var handlebars = require('handlebars');

  var vocabulary = require('./vocabulary');
  var world = require('./world').world;

  
  function unknownCommand() {
    return "Sorry, I didn't understand that?";
  }

  function getPlayer(playerName, world) {
    if(! _.has(world.players, playerName)) {
      world.players[playerName] = {
        name: playerName,
        currentLocation: world.map.beach,
        inventory: []
      };
    }
    return _.get(world.players, playerName);
  }

  
  robot.hear(/(.*)/i, function(result) {

    var input = result.match[0].split(" ");
    var player = getPlayer(result.message.user.name, world);
    var cmd = _.get(vocabulary, _.first(input), unknownCommand);
    var params =  _.tail(input);
    var response = cmd( player, world, params);

    result.send( response );

  });


};

