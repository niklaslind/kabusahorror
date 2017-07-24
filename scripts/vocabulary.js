var _ = require('lodash');

module.exports = {
  

  hjälp: function(player, world, params) {
    return 'Försök med någpt av detta: '+
      '\ntitta \ngå <destination> \nta <item> (exaempel: ta en glass) \nsläpp <item> \ninventory \nanvänd <item>';
  },
  
  titta: function(player, world, params) {
    var location = player.currentLocation;
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

    if (!item) return "Jag kan inte ta upp "+params[0];

    var result = 
          (player.currentLocation.ta) ?
          player.currentLocation.ta(player, world, params, item) :
          {
            success: true,
            msg: 'ok'
          };
    
    if (result.success) {
      player.inventory.push(item);
      _.pull(player.currentLocation.items, item);      
    }

    return result.msg;
    

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
  },

  dansa: function (player, world, params) {    
    if (!world.dancers) world.dancers = {};
    if ((_.get(params, 0, "") == "som") && (_.get(params, 1, "") != "") && (_.get(params, 2, "") != "")) {
      var msg = params.join(' ');
      world.dancers[player.name] = msg;
      if (player.currentLocation.dansa)
        msg = msg + '\n' + player.currentLocation.dansa(player, world, params);
      return player.name + " börjar dansa "  + msg;
    } else {
      return "Dansa som en vaddå?";
    }
  },

  sluta: function (player, world, params) {
    if (_.get(params, 0, "") == 'dansa') {
      if (!world.dancers) world.dancers = {};
      delete world.dancers[player.name];
      var dancers = _.map(world.dancers, 'name');
      if (_.isEmpty(dancers)) dancers = 'ingen';
      return player.name+" slutade dansa så nu dansar "+dancers;
    } else {
      return 'Sluta med vaddå?';      
    }
  }

};
