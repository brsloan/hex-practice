
function IntProblem(probType, maxNumber) {
    this.problemType = probType; //"dec" and "hex" currently accepted
    this.decValue = Math.floor((Math.random() * maxNumber) + 1);
    this.hexValue = decValue.toString(16);

	//Assign problem/solution values for display
    switch (this.problemType) {
        case "dec":
            this.problem = this.decValue;
            this.solution = "0x" + this.hexValue.toUpperCase();
            break;
        case "hex":
            this.solution = this.decValue;
            this.problem = "0x" + this.hexValue.toUpperCase();
            break;
		//Maybe add binary/octal options later
        default:
            break;
    }

    this.Grade = function (answer) {
		//Convert this conditional operator to switch if adding binary/octal options
		var parsedAnswer = this.problemType == "dec" ? parseInt(answer, 16) : parseInt(answer, 10);
		
		if (parsedAnswer == this.decValue) return true;
        else return false;
    };

    return this;
}

var problemText = document.getElementById('problem');
var submit = document.getElementById('submit');
var userAnswer = document.getElementById('userAnswer');
var indicator = document.getElementById('indicator');
var numCorrectDisplay = document.getElementById('numCorrectDisplay');
var numIncorrectDisplay = document.getElementById('numIncorrectDisplay');
var percentDisplay = document.getElementById('percentCorrect');
var maxValueBox = document.getElementById('maxValue');
var probTypes = document.getElementsByName('probType');
var answersCorrect = 0;
var answersIncorrect = 0;

PrepNewProblem();

submit.onclick = function () {
    GradeAnswer();
    PrepNewProblem();
    return false;
};

for(i=0;i<probTypes.length; i++)
{
	probTypes[i].onclick = PrepNewProblem;
}

maxValueBox.onchange = PrepNewProblem;

function PrepNewProblem() {
    var problemType = GetProblemType();
    var maxValue = maxValueBox.value;
    userAnswer.value = "";
	if (parseInt(maxValue))
	{
		intProblem = IntProblem(problemType, maxValue);
		problemText.innerHTML = intProblem.problem;
	}
	else
	{
		indicator.innerHTML = "You must enter an integer for Max Value.";
		indicator.className = "incorrect";
	}
}

function GradeAnswer() {
    if (intProblem.Grade(userAnswer.value)) {
        indicator.innerHTML = "Correct!";
        indicator.className = "correct";
        answersCorrect++;
        numCorrectDisplay.innerHTML = answersCorrect;
    } else {
        indicator.innerHTML = "Incorrect. " + intProblem.problem + " = " + intProblem.solution + ", not \"" + userAnswer.value + "\"";
        indicator.className = "incorrect";
        answersIncorrect++;
        numIncorrectDisplay.innerHTML = answersIncorrect;
    }
	
	var percentCorrect = Math.round((answersCorrect / (answersCorrect + answersIncorrect)) * 100);
	percentDisplay.innerHTML = percentCorrect  + "%";
	document.body.style.backgroundColor = getColor(percentCorrect/100);
}

function GetProblemType() {
    
    for (var i = 0; i < probTypes.length; i++) {
        if (probTypes[i].checked == true) return probTypes[i].value;
    }
}

function getColor(value){
    //value from 0 to 1
    var hue=((value)*120).toString(10);
    return ["hsl(",hue,",95%,80%)"].join("");
}