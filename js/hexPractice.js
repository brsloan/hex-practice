(function() {
  var answersCorrect = 0;
  var answersIncorrect = 0;
  var conversionProblem;

  prepNewProblem();
  attachEventHandlers();

  function prepNewProblem() {
    var maxValueBox = document.getElementById('maxValue'),
     userAnswer = document.getElementById('userAnswer'),
     problemText = document.getElementById('problem'),
     indicator = document.getElementById('indicator'),
     maxValue = maxValueBox.value,
     problemType = getProblemType();

    if (parseInt(maxValue))
  	{
      userAnswer.value = "";
  		conversionProblem = problemType == 'hex' ? ConversionProblemGenerator.getHexProblem(maxValue) : ConversionProblemGenerator.getDecProblem(maxValue);
  		problemText.innerHTML = conversionProblem.getProblem();
  	}
  	else
  	{
  		indicator.innerHTML = "You must enter an integer for Max Value.";
  		indicator.className = "incorrect";
  	}
  }

  function getProblemType() {
      var probTypes = document.getElementsByName('probType');
      for (var i = 0, len = probTypes.length; i < len; i++) {
          if (probTypes[i].checked == true) return probTypes[i].value;
      }
  }

  function attachEventHandlers(){
    var probTypes = document.getElementsByName('probType'),
      submit = document.getElementById('submit'),
      maxValueBox = document.getElementById('maxValue');

    submit.onclick = function () {
        submitAnswer();
        prepNewProblem();
        return false;
    };

    for(i=0, len = probTypes.length; i<len; i++)
    {
    	probTypes[i].onclick = PrepNewProblem;
    }

    maxValueBox.onchange = PrepNewProblem;
  }

  function submitAnswer(){
    var userAnswer = document.getElementById('userAnswer'),
      answerIsCorrect = conversionProblem.checkAnswer(userAnswer.value);
    showAnswerResult(answerIsCorrect);
  }

  function showAnswerResult(answerIsCorrect) {
      if (answerIsCorrect) {
          indicateCorrectAnswer();
      } else {
          indicateIncorrectAnswer();
      }
      updatePercentCorrect();
  }

  function indicateCorrectAnswer(){
    var indicator = document.getElementById('indicator');
    var numCorrectDisplay = document.getElementById('numCorrectDisplay');
    indicator.innerHTML = "Correct!";
    indicator.className = "correct";
    answersCorrect++;
    numCorrectDisplay.innerHTML = answersCorrect;
  }

  function indicateIncorrectAnswer(){
    var indicator = document.getElementById('indicator');
    var numIncorrectDisplay = document.getElementById('numIncorrectDisplay');
    var userAnswer = document.getElementById('userAnswer').value;
    indicator.innerHTML = "Incorrect. " + conversionProblem.getProblem() + " = " + conversionProblem.getSolution() + ", not \"" + userAnswer + "\"";
    indicator.className = "incorrect";
    answersIncorrect++;
    numIncorrectDisplay.innerHTML = answersIncorrect;
  }

  function updatePercentCorrect(){
    var percentDisplay = document.getElementById('percentCorrect');
    var percentCorrect = Math.round((answersCorrect / (answersCorrect + answersIncorrect)) * 100);
  	percentDisplay.innerHTML = percentCorrect  + "%";
  	document.body.style.backgroundColor = getColor(percentCorrect/100);
  }

  function getColor(value){
      //value from 0 to 1
      var hue = ((value)*120).toString(10);
      return ["hsl(",hue,",95%,80%)"].join("");
  }
})();
