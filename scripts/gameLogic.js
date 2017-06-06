
(function() {
  
  var roomLogic = {
    
    "Hildas" : {
      ta: function (player, world, params, item) {
        if (item != world.items.glass)
          return {
            success: true
          };

        var hildasItems = world.map.Hildas.items;
        var skull = world.items.skalle;
        if ( hildasItems.includes(skull) ) {
          return {
            success: true,
            msg: "Ok, jag behöver döskallar för att göra mer glass."
          };
        } else {
          return {
            success: false,
            msg: "Har du en döskalle att byta med?"
          };
        }
      }
    }
  };

    


  module.exports =  {
    roomLogic: roomLogic
  };  
      
})();
