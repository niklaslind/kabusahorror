var _ = require('lodash');

function canSee(player, world) {
  var r = _.map(player.currentLocation.items, 'name');
  _.map(player.currentLocation.players, (p) => {
    if (player != p)  {
      const msg = p.isDancing ? " dansar "+p.isDancing : "";
      r.push(p.name + msg );      
    }

  });
  if (_.isEmpty(r)) r.push('inget särskilt');
  return r;
}

module.exports = {
  

  hjälp: function(player, world, params) {
    return 'Försök med någpt av detta: '+
      '\ntitta \ngå <destination> \nta <item> (exaempel: ta en glass) \nsläpp <item> \ninventory \nanvänd <item>\nundersök <item>\ndansa som en <någonting>\nsluta dansa';
  },

  undersök: function(player, world, params) {
    if (_.isEmpty(params)) return "Undersök vaddå?";
    var itemName = params.join(' ');
    var targetItem = {name: itemName};
    var item = _.find(player.inventory , targetItem);
    if (!item) item = _.find(player.currentLocation.items, targetItem);    
    if (!item) return "Jag hittar ingen "+itemName;
    if (item.examine)
      return item.examine(player, world, params);
    else
      return "Det verkar vara "+itemName;
  },
  
  titta: function(player, world, params) {
    var location = player.currentLocation;
    return location.description(player) +
      '\n... kan se:\n  ' + canSee(player, world).join('\n  ') +
      '\n... kan gå ' + _.keys(player.currentLocation.exits).join(', ');
  },

  gå: function(player, world, params) {
    if (_.isEmpty(params)) return "Gå vart?";
    var newLocation = _.get( player.currentLocation.exits, params[0]);
    if (!newLocation) return "Jag kan inte gå "+params[0];
    _.remove(player.currentLocation.players, (p) => { return player == p; }); //remove the player from current room
    player.currentLocation = newLocation;
    player.currentLocation.players.push(player);
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
      player.isDancing = msg;
      if (player.currentLocation.dansa)
        msg = msg + '\n' + player.currentLocation.dansa(player, world, params);
      return player.name + " börjar dansa "  + msg;
    } else {
      return "Dansa som en vaddå?";
    }
  },

  sluta: function (player, world, params) {
    if (_.get(params, 0, "") == 'dansa') {
      const msg = player.name+" slutade dansa "+player.isDancing;
      delete player.isDancing;
      return msg;
    } else {
      return 'Sluta med vaddå?';      
    }
  }

};
