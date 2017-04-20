(function() {

  var _ = require('lodash');
  var handlebars = require('handlebars');

  
  var items = {
    mirror: {
      name: "a mirror",
      use: function (player, world, params) {
        return "I see a scary reflection of myself";
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

  function prepareRooms(rooms) {
    _.each(
      rooms,
      function(r) {
        r.exits = mapExits(r.exits);
        r.description = handlebars.compile(r.description);
      }
    );
    return rooms;
  }

  module.exports.world =  {
    map: prepareRooms(rooms),
    items: items,
    players: {}
  };

  
})();

