var _ = require('lodash');
const chai = require('chai');
const describe = require('mocha').describe;
const it = require('mocha').it;
const inputParser = require('../scripts/inputParser');

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



var worldLoader = require('../scripts/worldLoader');
var world = worldLoader.initLocalWorld();  
var player = getPlayer('Tester', world);
var icecream = world.items.glass;  
var skull = world.items.skalle;  
var hildasItems = world.map.Hildas.items;
var playerItems = player.inventory;


describe('Hildas place', function () {


  //function getPlayer(playerName, world) {
  //  if(! _.has(world.players, playerName)) {
  //    world.players[playerName] = {
  //      name: playerName,
  //      currentLocation: world.map.Hildas,
  //      inventory: []
  //    };
  //  }
  //  return _.get(world.players, playerName);
  //}
  
  //var world= require('../scripts/worldLoader').setupWorld();  
  //var player = getPlayer('Tester', world);
  //var icecream = world.items.glass;  
  //var skull = world.items.skalle;  
  //var hildasItems = world.map.Hildas.items;
  //var playerItems = player.inventory;

  it('Given NO skull present, when player says "ta en glass" then Hilda should refuse', function() {
    var msg = inputParser.process(['ta', 'en', 'glass'], player, world);
    chai.expect(playerItems.includes(icecream)).to.be.false;
    chai.expect(hildasItems.includes(icecream)).to.be.true;        
  });

  it('Given a skull present, when player says "ta en glass" then Hilda should agree', function() {
    hildasItems.push(skull);
    var msg = inputParser.process(['ta', 'en', 'glass'], player, world);
    chai.expect(playerItems.includes(icecream)).to.be.true;
    chai.expect(hildasItems.includes(icecream)).to.be.false;        
  });
  

  
});


describe('Upper and lower cases', function () {

  it('Input of an existing command with mixed lower and upper cases (e.g. TitTa) should not generate an undefined response', function() {
    var msgLowerCase = inputParser.process(['titta'], player, world);
    var msgUpperCase = inputParser.process(['TitTa'], player, world);    
    chai.expect(msgLowerCase).not.equal(inputParser.unknownCommand);
    chai.expect(msgUpperCase).not.equal(inputParser.unknownCommand);

  });  
  
  it('Input of an existing object with mixed lower and upper cases (e.g. ta en DöskaLle) should remove en döskalle from the current room', function() {

    var msgUpperCaseItem = inputParser.process(['ta', 'en', 'döskalLe'], player, world);    
    chai.expect(playerItems.includes(skull)).to.be.true;
    
  }); 

  
});


describe('worldLoader', function() {

  it('Should map a list of item-strings to a list of items', function() {
    var items = world.items;
    var testItems = ["items.skalle", "items.spade"];

    var testResult = worldLoader.internalTestable.mapItems(testItems, items);

    chai.expect(testResult[0]).equal(items.skalle);
    chai.expect(testResult[1]).equal(items.spade);    

  });

  it('Should parse rooms and map list of item-strings to list of items', function() {

    var items = world.items;
    var testRooms = {
      'testRoom1': {
        "items": ["items.skalle", "items.spade"]
      },
      'testRoom2': {
        "items": ["items.glass"]
      }      
    };

    var testResult = worldLoader.internalTestable.parseRoomItems(testRooms, items);

    chai.expect(testResult.testRoom1.items[0]).equal(items.skalle);    
    
  });

});




