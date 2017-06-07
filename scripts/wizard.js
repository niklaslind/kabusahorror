module.exports = function(robot) {
  
  var _ = require('lodash');
  var handlebars = require('handlebars');

  var vocabulary = require('./vocabulary');
  //var world = require('./world').world;
  var world = {};
  
  // *******************************************
  //  World.js functions temporarily moved here
  // *******************************************
  
  var _ = require('lodash');
  var handlebars = require('handlebars');
  var request = require('request');

  var request = require('request');
  
    
    var items = {
    mirror: {
      name: "en spegel",
      use: function (player, world, params) {
        return "Jag ser en läskig spegelbild av mig själv!";
      }
    },
    glass: {
      name: "en glass",
      use: function (player, world, params) {
        return "Mmm, det var gott!";
      }
    },
    skalle: {
      name: "en döskalle",
      use: function (player, world, params) {
        return "Ghaa!";
      }
    },
      hangglidare: {
      name: "en gammal hängglidare",
      use: function (player, world, params) {
        return "Oh nej, jag kraschar... BOFF!!!";
      }
    },
        spade: {
      name: "en spade",
      use: function (player, world, params) {
        var tingshogItems = world.map.Tingshogarna.items;
        tingshogItems.push(world.items.skalle);
        return "Wow! Jag hittade någonting!";
      }
    },
    vinflaska: {
      name: "en vinflaska",
      use: function (player, world, params) {
        return "Nej, jag borde inte dricka den här, just nu..";
      }
    }     
  };
  
    // Backup world to be used if global world can t be loaded from url
  //var roomsBackup = {
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
    
    var roomsBackup = {
   "KabusaHuset":{  
      "description":"{{name}} står i ett stort hus. En hund stirrar på dig..",
      "items":[  
         ""
      ],
      "exits":{  
         "north":"Kabusapromenaden",
         "west":"Tingshogarna"
      }
   },
   "Hildas":{  
      "description":"{{name}} står framför en affär, dom säljer glass här..",
      "items":[  
         "items.glass"
      ],
      "exits":{  
         "east":"Kabusagården",
         "north":"Tingshogarna",
         "south":"Stranden"
      }
   },
   "Stranden":{  
      "description":"{{name}} is standing on a beautiful beach",
      "items":[  
         "items.spegel"
      ],
      "exits":{  
         "north":"Hildas",
         "east":"Vakttornet",
         "west":"Nybroån"
      }
   },
   "Kabusagården":{  
      "description":"{{name}} står utanför Kabusagården",
      "items":[  
         ""
      ],
      "exits":{  
         "west":"Hildas",
         "south":"Vakttornet",
         "east":"Hammarsbackar"
      }
   },
   "Nybroån":{  
      "description":"{{name}} is standing by a small stream leading out into the ocean",
      "items":[  
         ""
      ],
      "exits":{  
         "west":"Fritidsbaren",
         "east":"Stranden"
      }
   },
   "Kabusapromenaden":{  
      "description":"{{name}} is standing on a large field",
      "items":[  
         ""
      ],
      "exits":{  
         "south":"KabusaHuset",
         "north":"Vingården"
      }
   },
   "Vingården":{  
      "description":"{{name}} står mellan ett par vinrankor",
      "items":[  
         "items.vinflaska"
      ],
      "exits":{  
         "south":"Kabusapromenaden"
      }
   },
   "Vakttornet":{  
      "description":"{{name}} står bredvid ett högt vakttorn",
      "items":[  
         ""
      ],
      "exits":{  
         "north":"Kabusagården",
         "west":"Stranden"
      }
   },
   "Fritidsbaren":{  
      "description":"{{name}} is standing by a bar",
      "items":[  
         "items.meatballs"
      ],
      "exits":{  
         "east":"Nybroån"
      }
   },
   "Tingshogarna":{  
      "description":"{{name}} står vid tre stora jordhögar. Något kanske är gömt här??",
      "items":[  
         "items.spade"
      ],
      "exits":{  
         "south":"Hildas",
         "east":"KabusaHuset"
      }
   },
   "Hammarsbackar":{  
      "description":"{{name}} står på en hög och blåsig kulle med en fantastisk utsikt över havet",
      "items":[  
         "Items.hangglidare"
      ],
      "exits":{  
         "east":"Alesstenar",
         "west":"Kabusagården"
      }
   },
   "Alesstenar":{  
      "description":"{{name}} står mitt bland några gamla och väldigt stora stenar. Ett får stirrar på dig..",
      "items":[  
         ""
      ],
      "exits":{  
         "west":"Hammarsbackar"
      }
   }
    
  };
  
  //
//  function randomComment(commentArray) {return commentArray[Math.floor(Math.random() * commentArray.length)]}
  
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
    
        //console.log("=======\n rooms:", rooms, "=======\n ");
        world =  {
          map: prepareRooms(rooms),
          items: items,
          players: {}
      };
      
      //console.log("Rooms loaded, world set up. world:", world);
   
  });
  


  // ***************************
  //  End world.js funcitons
  // ***************************
  

  //console.log("=======\n Modules loaded..", world, "=======\n ");

  
  function unknownCommand() {
    return "Ursäkta, jag förstod inte vad du sa? Skriv 'hjälp' för att få hjälp.";
  }

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

    var input = result.match[0].split(" ");
    var player = getPlayer(result.message.user.name, world);
    var cmd = _.get(vocabulary, _.first(input), unknownCommand);
    var params =  _.tail(input);
    var response = cmd( player, world, params);

    result.send( response );

  });


};

