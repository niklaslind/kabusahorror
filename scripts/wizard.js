module.exports = function(robot) {
  
  var _ = require('lodash');
  var handlebars = require('handlebars');

  var vocabulary = require('./vocabulary');
  
  function unknownCommand() {
    return "Sorry, I didn't understand that?";
  }


  var items = {
    mirror: {
      name: "a mirror",
      use: function (player, world, params) {
        return "I see a scary reflection of myself"
      }
    }
  };

  var rooms = {
    beach: {
      description: "{{name}} is standing on a beautiful beach.",
      exits: {
        east: 'stream'
      },
      items: [items.mirror]
    },
    stream: {
      description: "{{name}} is standing by a small stream leading out into the ocean.",
      exits: {
        west: 'beach'
      },
      items: []
    }
  };

  function mapExit(exitName) { return _.get(rooms, exitName);}

  function mapExits(exits) { return _.mapValues( exits, mapExit );}

  function mapRooms(rooms) {
    _.each(
      rooms,
      function(r) {
        r.exits = mapExits(r.exits);
        r.description = handlebars.compile(r.description);
      }
  );
  }

  mapRooms(rooms);

  var world =  {
    map: rooms,
    items: items,
    players: {}
  }

  function getPlayer(playerName, world) {
    if(! _.has(world.players, playerName)) {
      world.players[playerName] = {
        name: playerName,
        currentLocation: rooms.beach,
        inventory: []
      }
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

