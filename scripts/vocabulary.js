var _ = require('lodash');

module.exports = {
  

  hjälp: function(player, world, params) {
    return 'Försök med någpt av detta: '+
      '\ntitta \ngo <destination> \nta <item> (exaempel: ta en glass) \nsläpp <item> \ninventory \nanvänd <item>';
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
    var commentArray = ["Hilda ger dig ju ingen glass gratis, vem tror du att du är??", "Den här glassen kostar pengar", "Har du en döskalle att byta med?"];
    if (item.name == 'en glass' && Math.random() > 0.4) return commentArray[Math.floor(Math.random() * commentArray.length)];    
    //if (item.name == 'en glass' && decider > 0) return player.randomComment(["Hilda ger dig ju ingen glass gratis, vem tror du att du är??", "Den här glassen kostar pengar", "Har du en döskalle att byta med?"]);    
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
