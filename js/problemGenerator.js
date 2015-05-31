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
		conversionProblem = new ConversionProblem(problemType, maxValue);
		problemText.innerHTML = conversionProblem.problem;
	}
	else
	{
		indicator.innerHTML = "You must enter an integer for Max Value.";
		indicator.className = "incorrect";
	}
}

function GetProblemType() {
    var probTypes = document.getElementsByName('probType');
    for (var i = 0; i < probTypes.length; i++) {
        if (probTypes[i].checked == true) return probTypes[i].value;
    }
}

function ConversionProblem(probType, maxNumber) {
    this.problemType = probType; //"dec" and "hex" currently accepted
    this.decValue = Math.floor((Math.random() * maxNumber) + 1);
    this.hexValue = this.decValue.toString(16);

    switch (this.problemType) {
        case "dec":
            this.problem = this.decValue;
            this.solution = "0x" + this.hexValue.toUpperCase();
            this.ParseAnswer = function(answer) {
              return parseInt(answer, 16);
            }
            break;
        case "hex":
            this.problem = "0x" + this.hexValue.toUpperCase();
            this.solution = this.decValue;
            this.ParseAnswer = function(answer){
              return parseInt(answer, 10);
            }
            break;
        default: //Maybe add binary/octal options later
            throw new Error('ConversionProblem(): You must provide a problem type of "hex" or "dec".');
            break;
    }

    this.CheckAnswer = function(answer) {
		    var parsedAnswer = this.ParseAnswer(answer);

	      if (parsedAnswer == this.decValue)
          return true;
        else
          return false;
    };
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

  for(i=0;i<probTypes.length; i++)
  {
  	probTypes[i].onclick = PrepNewProblem;
  }

  maxValueBox.onchange = PrepNewProblem;
}

function SubmitAnswer(){
  var userAnswer = document.getElementById('userAnswer');
  var answerIsCorrect = conversionProblem.CheckAnswer(userAnswer.value);
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
  indicator.innerHTML = "Incorrect. " + conversionProblem.problem + " = " + conversionProblem.solution + ", not \"" + userAnswer + "\"";
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
