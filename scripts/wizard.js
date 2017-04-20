module.exports = function(robot) {


  var _ = require('lodash');
  var handlebars = require('handlebars');


  function unknownCommand() {
    return "Sorry, I didn't understand that?";
  }

  var vocabulary = {

    look: function(player, world, params) {
      var location = player.currentLocation;
      return location.description(player) +
        '\nI can see '+_.map(player.currentLocation.items, 'name')  +
        '\nI can go ' + _.keys(player.currentLocation.exits);
    },

    go: function(player, world, params) {
      if (_.isEmpty(params)) return "Go where?"
      var newLocation = _.get( player.currentLocation.exits, params[0]);
      if (!newLocation) return "I can't go "+params[0]
      player.currentLocation = newLocation;
      return newLocation.description(player);
    },

    pick: function (player, world, params) {
      if (_.isEmpty(params)) return "Pick what?";
      var item = _.find(player.currentLocation.items, {name: params.join(' ')});
      if (!item) return "I can't pick "+params[0];
      player.inventory.push(item);
      _.pull(player.currentLocation.items, item);
      return "Ok!";
    },

    drop: function (player, world, params) {
      if (_.isEmpty(params)) return "Drop what?";
      var item = _.find(player.inventory, {name: params.join(' ')});
      if (!item) return "I'm not holding "+params.join(' ');
      player.currentLocation.items.push(item);
      _.pull(player.inventory, item);
      return "Ok!";
    },

    inventory: function (player, world, params) {
      return player.name+" is carrying "+_.map(player.inventory, 'name');
    },

    use: function (player, world, params) {
      if (_.isEmpty(params)) return "Use what?";
      var item = _.find(player.inventory, {name: params.join(' ')});
      if (!item) return "I'm not holding "+params.join(' ');
      return item.use(player, world, params);
    }

  };



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

