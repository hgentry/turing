var ruleset = {};

var currentState = 0;

var tape = "";

var head = 0;

var going = null;

function drawMachine() {
	if(currentState == -1) {line0 = "ACCEPT"; stop();}
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
	stop();
	going = setInterval(function(){step();drawMachine();}, 50);
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
		dir = nextStep[1];
		if(dir == "a" || dir == "A") currentState = -1;
		else if(dir == "r" || dir == "R") currentState = -2;
		else currentState = nextStep[1];
		
		//Update the head position based on the direction field
		if(nextStep[2] == "R" || nextStep[2] == "r") head += 1;
		if(nextStep[2] == "L" || nextStep[2] == "l") head -= 1;
}

function reset()
{
	currentState = document.getElementById("statearea").value;
	tape = document.getElementById("tape").value;
	head = 0;
}

function clearRules()
{
	ruleset = {};
}

function readMachineCode(codeString)
{
	currentState = codeString.substring(0, codeString.indexOf('\n'));
	codeString = codeString.substring(codeString.indexOf('\n')+1);
	tape = codeString.substring(0, codeString.indexOf('\n'));
	codeString = codeString.substring(codeString.indexOf('\n')+1);
	while(codeString.length > 2)
	{

			var curTrans = [];
			curTrans.push(codeString.substring(0,codeString.indexOf(',')));
			codeString = codeString.substring(codeString.indexOf(',')+1);
			
			curTrans.push(codeString.substring(0,codeString.indexOf(',')));
			codeString = codeString.substring(codeString.indexOf(',')+1);
			
			curTrans.push(codeString.substring(0,codeString.indexOf(',')));
			codeString = codeString.substring(codeString.indexOf(',')+1);
			
			curTrans.push(codeString.substring(0,codeString.indexOf(',')));
			codeString = codeString.substring(codeString.indexOf(',')+1);
			
			curTrans.push(codeString.substring(0,codeString.indexOf(',')));
			codeString = codeString.substring(codeString.indexOf(',')+2);
			
			ruleset[curTrans[0] + "_" + curTrans[1]] = [curTrans[2], curTrans[3], curTrans[4]];
	
			
	}
}

function outputMachineCode()
{
	var ret = currentState + "\n" + tape + "\n";
	for(var k in ruleset)
	{
		if(k.indexOf("_") > 0)
		{
			ret += k.substring(0, k.indexOf("_")) + ",";
			ret += k.substring(k.indexOf("_") + 1) + ",";
			ret += ruleset[k][0] + ",";
			ret += ruleset[k][1] + ",";
			ret += ruleset[k][2] + ",\n";
		}
	}
	return ret;
}
