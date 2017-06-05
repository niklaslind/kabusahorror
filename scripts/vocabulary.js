var _ = require('lodash');

module.exports = {
  

  hjälp: function(player, world, params) {
    return 'Försök med någpt av detta: '+
      '\ntitta \ngå <destination> \nta <item> (exaempel: ta en glass) \nsläpp <item> \ninventory \nanvänd <item>';
  },
  
  titta: function(player, world, params) {
    var location = player.currentLocation;
    //console.log("Look items: ", player.currentLocation);
    return location.description(player) +
      '\n... kan se '+_.map(player.currentLocation.items, 'name')  +
      '\n... kan gå ' + _.keys(player.currentLocation.exits);
  },

  gå: function(player, world, params) {
    if (_.isEmpty(params)) return "Gå vart?";
    var newLocation = _.get( player.currentLocation.exits, params[0]);
    if (!newLocation) return "Jag kan inte gå "+params[0];
    player.currentLocation = newLocation;
    return newLocation.description(player);
  },

  ta: function (player, world, params) {
    if (_.isEmpty(params)) return "Ta upp vaddå?";
    var item = _.find(player.currentLocation.items, {name: params.join(' ')});
    console.log("Item: ", item);

    if (!item) return "Jag kan inte ta upp "+params[0];
    

    // Special rule for Hildas ice cream, ToDo: add this to ice cream item    
    if (item.name == 'en glass'){
      var commentArray = ["Hilda ger dig ju ingen glass gratis, vem tror du att du är??", "Den här glassen kostar pengar", "Har du en döskalle att byta med?"];      
      var objExists = player.currentLocation.items.filter(function ( objExists ) {return objExists.name === 'en döskalle';});        
      if (objExists.length < 1) {return commentArray[Math.floor(Math.random() * commentArray.length)]}
    }

    
    player.inventory.push(item);
    _.pull(player.currentLocation.items, item);
    return "Ok!";
  },

  släpp: function (player, world, params) {
    if (_.isEmpty(params)) return "Släpp vaddå?";
    var item = _.find(player.inventory, {name: params.join(' ')});
    if (!item) return "Jag har ingen "+params.join(' ');
    player.currentLocation.items.push(item);
    _.pull(player.inventory, item);
    return "Ok!";
  },

  inventory: function (player, world, params) {
    return player.name+" bär på "+_.map(player.inventory, 'name');
  },

  använd: function (player, world, params) {
    if (_.isEmpty(params)) return "Använd vaddå?";
    var item = _.find(player.inventory, {name: params.join(' ')});
    if (!item) return "Jag har ingen "+params.join(' ');
    return item.use(player, world, params);
  }

};
