(function() {

  
  var _ = require('lodash');
  var handlebars = require('handlebars');
  var request = require('request');
  
  
  
  function prepareRooms(rooms) {
    
    function mapExit(exitName) { return _.get(rooms, exitName);}
    
    function mapExits(exits) { return _.mapValues( exits, mapExit );}
    
    _.each(
      rooms,
      function(r) {
        r.exits = mapExits(r.exits);
        r.description = handlebars.compile(r.description);
      }
    );
    return rooms;
  }
  

  function addGameLogic(world, gameLogic) {
    _.each(gameLogic, (logic, key) => {
      var target = _.get(world, key);
      if (!target)
        console.log("Could not add gameLogic, could not find key:",key);
      else
        _.set(world, key, _.assign(target, logic));
    });
  }

  
  function getLocalWorld() {
    return require('./world').world;
  }

  function setupWorld() {
    var inputWorld = getLocalWorld();
    var world = {
      map: prepareRooms(inputWorld.map),
      items: inputWorld.items,
      players: {}
    };

    addGameLogic(world, inputWorld.gameLogic);

    return world;
  };

  
  function getRemoteWorld() {
    // Get global world from api, then create world object.
    //var globalWorldUrl = 'http://localhost:8050/getDataAws';
    var globalWorldUrl = 'http://worldmaker.herokuapp.com/getDataAws';
    
    request(globalWorldUrl, function (error, response, body) {
      if (error){
        //console.log("Error getting world data, using backup world for now: ", error);
        rooms = roomsBackup;
      } else {
        console.log("External update succeded, Using global world");
        
        //rooms = JSON.parse(JSON.parse(response.body).data);
        rooms = JSON.parse(JSON.parse(response.body).data);

        // Items needs to be parsed separately, ToDo: Fix this.
        for (key in rooms){                
          if (rooms[key].items[0].length > 0) {
            var curObj = rooms[key].items[0].split(".")[1];          
            rooms[key].items = [items[curObj]];        
          }

        }
      }
      
      world =  {
        map: prepareRooms(rooms),
        items: items,
        players: {}
      };
      
    });
  }


  module.exports = {
    setupWorld: setupWorld
  };
  
})();
