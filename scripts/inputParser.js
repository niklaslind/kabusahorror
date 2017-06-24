var _ = require('lodash');
var vocabulary = require('./vocabulary');

function unknownCommand() {
  return "Ursäkta, jag förstod inte vad du sa? Skriv 'hjälp' för att få hjälp.";
}


  function setArrayToLowerCase(inputArray){
    return inputArray.map(function(x){ return x.toLowerCase() })
  }
  
  
module.exports = {
  
  unknownCommand: unknownCommand(),
  
  process: function(inputArray, player, world) {
    
    inputArray =  setArrayToLowerCase(inputArray); 
    
    var cmd = _.get(vocabulary, _.first(inputArray), unknownCommand);
    var params =  _.tail(inputArray);
    var response = cmd( player, world, params);    
    return response;
  }


  
}
