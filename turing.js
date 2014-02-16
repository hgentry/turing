var ruleset = {};

var currentState = 0;

var tape = "";

var head = 0;

var going = null;

function drawMachine() {
	if(currentState == -1) line0 = "ACCEPT";
	else if(currentState < -1) {line0 = "REJECT"; stop();}
	else line0 = "STATE " + currentState +" HEAD " + head;
	
	i = 0;
	line1 = "";
	while(i < head) { line1 += "&nbsp;"; i+=1;}
	line1 += "H";
	line2 = tape;
	
	anim = document.getElementById("machineAnim");
	anim.innerHTML = line0 +"<br>" + line1 + "<br>" + line2 + "<br>";
}

function play() {
	going = setInterval(function(){step();drawMachine();}, 1000);
}

function stop() {
	clearInterval(going);
}

function step() {
		//Safety with strings
		while(tape.length <= head + 1) tape += " ";
		
		//Read and grab the rule
		currentChar = tape.charAt(head);
		nextStep = ruleset[currentState + "_" +currentChar];
		
		if(nextStep == null || head < 0)
		{
			currentState = -2;
			return;
		}
		
		//Update the current character under the head
		//Pierce the heavens with your drill
		tape = tape.substring(0, head) + nextStep[0] + tape.substring(head + 1);
		
		//Use the rule to update the current state
		//Who the hell do you think I am
		currentState = nextStep[1];
		
		//Update the head position based on the direction field
		if(nextStep[2] == "R") head += 1;
		if(nextStep[2] == "L") head -= 1;
		
		console.log(tape);
		console.log(currentState);
		console.log(head);
}

function reset()
{
	currentState = 0;
	tape = document.getElementById("tape").value;
	head = 0;
}
