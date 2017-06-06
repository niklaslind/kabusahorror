var _ = require('lodash');
const chai = require('chai');
const describe = require('mocha').describe;
const it = require('mocha').it;
const gameLogic = require('../scripts/gameLogic');
const world = require('../scripts/world').world;


describe('Hildas place', function () {


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

  //console.log(gameLogic);
  var player = getPlayer('Tester', world);
  var params = [];
  var icecream = world.items.glass;
  var skull = world.items.skalle;  
  var taFunction = gameLogic.roomLogic.Hildas.ta;
  
  it('When loaded the world, we need access to Hilda functions, an ice cream, skull', function() {
    chai.expect(taFunction).to.not.be.undefined;
    chai.expect(icecream).to.not.be.undefined;
    chai.expect(skull).to.not.be.undefined;    
  });
  
  it('When taking an ice cream and have NO skull then Hilda should refuse', function() {
    var result = taFunction(player, world, params, icecream);
    chai.expect(result.success).to.equal(false);    
  });

  
  it('When taking an ice cream and have a skull then Hilda should give ice cream', function() {
    world.map.Hildas.items.push(skull);
    var result = taFunction(player, world, params, icecream);
    chai.expect(result.success).to.equal(true);    
  });


  
});
