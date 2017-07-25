
(function() {

  const _ = require('lodash');
  var handlebars = require('handlebars');
  
  var tingshogarnaUpdate = {
    newDescription: handlebars.compile("En av de tre jordhögarna har öppnat sig. En underlig lukt kommer upp ur hålet."),
    newExits :{  
      "down": "Underjorden"
    }    
  };
  
  module.exports.gameLogic = {
    dansa: function (player, world, params) {
      if (_.size(world.dancers) < 4) 
        return "Wow, det ser bra ut! Men vi borde vara fler som dansar!";
      else {
        const tings = world.map['Tingshögarna'];
        tings.description = tingshogarnaUpdate.newDescription;
        tings.exits["down"] = world.map[tingshogarnaUpdate.newExits["down"]];
        return "Wow, ni dansar så jorden skakar!\nSeriöst, jorden skakar faktiskt...vad är det som händer? Bäst att titta efter.";
      }
    }
  };
  
})();



