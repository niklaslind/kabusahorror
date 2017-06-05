var _ = require('lodash');

module.exports = {

  help: function(player, world, params) {
    return 'Try some of these: '+
      '\nlook \ngo <destination> \npick <item> (example: pick a mirror) \ndrop <item> \ninventory \nuse <item>';
  },
  
  look: function(player, world, params) {
    var location = player.currentLocation;
    console.log("Look items: ", player.currentLocation);
    return location.description(player) +
      '\n... can see '+_.map(player.currentLocation.items, 'name')  +
      '\n... can go ' + _.keys(player.currentLocation.exits);
  },

  go: function(player, world, params) {
    if (_.isEmpty(params)) return "Go where?";
    var newLocation = _.get( player.currentLocation.exits, params[0]);
    if (!newLocation) return "I can't go "+params[0];
    player.currentLocation = newLocation;
    return newLocation.description(player);
  },

  pick: function (player, world, params) {
    if (_.isEmpty(params)) return "Pick what?";
    var item = _.find(player.currentLocation.items, {name: params.join(' ')});
    console.log("Item: ", item);

    if (!item) return "I can't pick "+params[0];
    if (item.name == 'an icecream') return "Hilda ger dig ju ingen glass gratis, vem tror du att du är??";    
    player.inventory.push(item);
    _.pull(player.currentLocation.items, item);
    return "Ok!";
  },

  drop: function (player, world, params) {
    if (_.isEmpty(params)) return "Drop what?";
    var item = _.find(player.inventory, {name: params.join(' ')});
    if (!item) return "I'm not holding "+params.join(' ');
    player.currentLocation.items.push(item);
    _.pull(player.inventory, item);
    return "Ok!";
  },

  inventory: function (player, world, params) {
    return player.name+" is carrying "+_.map(player.inventory, 'name');
  },

  use: function (player, world, params) {
    if (_.isEmpty(params)) return "Use what?";
    var item = _.find(player.inventory, {name: params.join(' ')});
    if (!item) return "I'm not holding "+params.join(' ');
    return item.use(player, world, params);
  }

};
