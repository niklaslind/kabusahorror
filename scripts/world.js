(function() {
  
  var _ = require('lodash');
  var handlebars = require('handlebars');
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
  
  
    var rooms = {
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
    
  
   
  
  function mapExit(exitName) { return _.get(rooms, exitName);}
  
  function mapExits(exits) { return _.mapValues( exits, mapExit );}
  
  function prepareRooms(rooms) {
   _.each(
     rooms,
     function(r) {
       //console.log("======\n rooms:", r);
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

