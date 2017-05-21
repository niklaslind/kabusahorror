(function() {
  //
  //var _ = require('lodash');
  //var handlebars = require('handlebars');
  //var request = require('request');
  //
  //
  //
  //
  //  var items = {
  //  mirror: {
  //    name: "a mirror",
  //    use: function (player, world, params) {
  //      return "I see a scary reflection of myself";
  //    }
  //  }
  //};
  //
  //
  //  var roomsBackup = {
  //  beach: {
  //    description: "{{name}} is standing on a beautiful beach.",
  //    exits: {
  //      east: 'stream',
  //      north: 'kabusahouse'
  //    },
  //    items: [items.mirror]
  //  },
  //  kabusahouse: {
  //    description: "{{name}} is standing outside Kabusagården.",
  //    exits: {
  //      south: 'beach'
  //    },
  //    items: [items.mirror]
  //  },    
  //  stream: {
  //    description: "{{name}} is standing by a small stream leading out into the ocean.",
  //    exits: {
  //      west: 'beach'
  //    },
  //    items: []
  //  }
  //};
  //
  //
  //
  //  // Get global world
  ////var rooms = {};
  //
  ////var globalWorldUrl = 'http://localhost:8050/getDataAws';
  ////
  ////request(globalWorldUrl, function (error, response, body) {
  ////  if (error){
  ////    console.log("Error getting world data, using backup world for now: ", error);
  ////    rooms = roomsBackup;
  ////  } else {
  ////    console.log("External update succeded, Using global world");
  ////    rooms = JSON.parse(JSON.parse(response.body).data);
  ////  }
  ////    console.log("Rooms loaded:", rooms);
  ////    
  ////
  ////});
  //
  //
  //
  //  
  //
  //function mapExit(exitName) { return _.get(rooms, exitName);}
  //
  //function mapExits(exits) { return _.mapValues( exits, mapExit );}
  //
  //function prepareRooms(rooms) {
  //  _.each(
  //    rooms,
  //    function(r) {
  //      //console.log("======\n rooms:", r);
  //      r.exits = mapExits(r.exits);
  //      r.description = handlebars.compile(r.description);
  //    }
  //  );
  //  return rooms;
  //}
  //
  //
  //module.exports.world =  {
  //  map: prepareRooms(rooms),
  //  items: items,
  //  players: {}
  //};  
  //

    
})();

