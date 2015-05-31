var ConversionProblemGenerator = (function(){
  function HexProblem(maxNumber){
    this.generatedNumber = new RandomNumber(maxNumber);
    this.getProblem = function() {
      return "0x" + this.generatedNumber.hexValue.toUpperCase();
    }
    this.getSolution = function() {
      return this.generatedNumber.decValue;
    }
    this.checkAnswer = function(answer){
      var parsedAnswer = parseInt(answer, 10);
      return this.generatedNumber.checkIfEqual(parsedAnswer);
    }
  }

  function DecProblem(maxNumber){
    this.generatedNumber = new RandomNumber(maxNumber);
    this.getProblem = function() {
      return this.generatedNumber.decValue;
    }
    this.getSolution = function() {
      return "0x" + this.generatedNumber.hexValue.toUpperCase();
    }
    this.checkAnswer = function(answer){
      var parsedAnswer = parseInt(answer, 16);
      return this.generatedNumber.checkIfEqual(parsedAnswer);
    }
  }

  function RandomNumber(maxNumber) {
      this.decValue = Math.floor((Math.random() * maxNumber) + 1);
      this.hexValue = this.decValue.toString(16);
      this.checkIfEqual = function(intToCheck) {
        if (intToCheck == this.decValue)
          return true;
        else
          return false;
      }
  }

  return {
    getDecProblem: function(maxNumber){
      return new DecProblem(maxNumber);
    },
    getHexProblem: function(maxNumber){
      return new HexProblem(maxNumber);
    }
  };

})();
