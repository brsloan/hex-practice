(function() {
  var answersCorrect = 0;
  var answersIncorrect = 0;
  var conversionProblem;

  PrepNewProblem();
  AttachEventHandlers();

  function PrepNewProblem() {
    var maxValueBox = document.getElementById('maxValue'),
     userAnswer = document.getElementById('userAnswer'),
     problemText = document.getElementById('problem'),
     indicator = document.getElementById('indicator'),
     maxValue = maxValueBox.value,
     problemType = GetProblemType();

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

  function GetProblemType() {
      var probTypes = document.getElementsByName('probType');
      for (var i = 0, len = probTypes.length; i < len; i++) {
          if (probTypes[i].checked == true) return probTypes[i].value;
      }
  }

  function AttachEventHandlers(){
    var probTypes = document.getElementsByName('probType');
    var submit = document.getElementById('submit');
    var maxValueBox = document.getElementById('maxValue');

    submit.onclick = function () {
        SubmitAnswer();
        PrepNewProblem();
        return false;
    };

    for(i=0, len = probTypes.length; i<len; i++)
    {
    	probTypes[i].onclick = PrepNewProblem;
    }

    maxValueBox.onchange = PrepNewProblem;
  }

  function SubmitAnswer(){
    var userAnswer = document.getElementById('userAnswer');
    var answerIsCorrect = conversionProblem.checkAnswer(userAnswer.value);
    ShowAnswerResult(answerIsCorrect);
  }

  function ShowAnswerResult(answerIsCorrect) {
      if (answerIsCorrect) {
          IndicateCorrectAnswer();
      } else {
          IndicateIncorrectAnswer();
      }
      UpdatePercentCorrect();
  }

  function IndicateCorrectAnswer(){
    var indicator = document.getElementById('indicator');
    var numCorrectDisplay = document.getElementById('numCorrectDisplay');
    indicator.innerHTML = "Correct!";
    indicator.className = "correct";
    answersCorrect++;
    numCorrectDisplay.innerHTML = answersCorrect;
  }

  function IndicateIncorrectAnswer(){
    var indicator = document.getElementById('indicator');
    var numIncorrectDisplay = document.getElementById('numIncorrectDisplay');
    var userAnswer = document.getElementById('userAnswer').value;
    indicator.innerHTML = "Incorrect. " + conversionProblem.getProblem() + " = " + conversionProblem.getSolution() + ", not \"" + userAnswer + "\"";
    indicator.className = "incorrect";
    answersIncorrect++;
    numIncorrectDisplay.innerHTML = answersIncorrect;
  }

  function UpdatePercentCorrect(){
    var percentDisplay = document.getElementById('percentCorrect');
    var percentCorrect = Math.round((answersCorrect / (answersCorrect + answersIncorrect)) * 100);
  	percentDisplay.innerHTML = percentCorrect  + "%";
  	document.body.style.backgroundColor = getColor(percentCorrect/100);
  }

  function getColor(value){
      //value from 0 to 1
      var hue=((value)*120).toString(10);
      return ["hsl(",hue,",95%,80%)"].join("");
  }
})();
