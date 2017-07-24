(function() {

  //  var kabesTomb = require('./kabesTomb');
  const _ = require('lodash');
  var handlebars = require('handlebars');
  
  var items = {
    runsten: {
      name: "en runsten",
      use: function (player, world, params) {
        return "Verkar inte kunna använda den till något vettigt.";
      },
      examine: function (player, world, params) {
        return "Ristningen är fornskånsk runskrift. Det är inte många i världen som kan läsa den men som tur är så är jag en av dem. Inskriptionen lyder:\n Kabe ristade denna sten. När grisen, bävern, gåsen och ankan dansar på mina gravhögar skall jag avslöja min hemlighet.";
      }      
    },
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
        "west":"Tingshögarna"
      }
    },
    "Hildas":{  
      "description":"{{name}} står framför en affär, dom säljer glass här..",
      "items":[  
        items.glass
      ],
      "exits":{  
        "east":"Kabusagården",
        "north":"Tingshögarna",
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
        items.runsten
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
    "Tingshögarna":{  
      "description":"{{name}} står vid tre stora jordhögar. Något kanske är gömt här??",
      "items":[  
        items.spade
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
    },
    "Underjorden":{  
      "description":"Det är helt kolsvart och luktar förfärligt här nere.",
      "items":[  
        ""
      ],
      "exits":{  
        "up":"Tingshögarna"
      }
    }    
    
  };

  var tingshogarnaUpdate = {
    newDescription: handlebars.compile("En av de tre jordhögarna har öppnat sig. En underlig lukt kommer upp ur hålet."),
    newExits :{  
      "down": "Underjorden"
    }    
  };
  
  var gameLogic = {
        
    "map.Tingshögarna" : {
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
    },
    
    "map.Hildas" : {
      
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
  
  module.exports.world =  {
    map: rooms,
    items: items,
    gameLogic: gameLogic
  };  
  
  
  
})();

