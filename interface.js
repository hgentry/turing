var states = 0;


function addState(n)
{
	var div = document.createElement("div");
	var statebox = document.createElement("div");
	div.setAttribute('class','statebox');
	statebox.setAttribute('id',"statebox-"+n+"-data");
	div.setAttribute('id','statebox-'+n);

	var transTable = document.createElement("table");
	transTable.innerHTML = "<tr><td> Char </td> <td> -> </td> <td>Char</td> <td>State</td> <td>{L,R}</td></tr>";
	statebox.appendChild(transTable);
	transTable.setAttribute('id', 'transTable-' +n);
	transTable.setAttribute('class', 'transTable');
	
	div.innerHTML = "State "+ n;
	var del = document.createElement("button");
	del.setAttribute('class','delstate-button');
	del.innerHTML = "Delete";
	del.onclick=function(){removeState(n); deleteStateboxElement(div);};
	
	var addTransitionButton = document.createElement("button");
	addTransitionButton.setAttribute('class','addtransition-button');
	addTransitionButton.innerHTML = "Add Transition";
	addTransitionButton.onclick = function(){addTransition(n)};
	
	var addTransitionButtonTop = document.createElement("button");
	addTransitionButtonTop.setAttribute('class','addtransition-button-top');
	addTransitionButtonTop.innerHTML = "Add Transition";
	addTransitionButtonTop.onclick = function(){addTransition(n)};
	
	
	
	document.getElementById("stateboxes").appendChild(div);
	div.appendChild(del);
	div.appendChild(addTransitionButtonTop);
	
	div.appendChild(statebox);
	div.appendChild(addTransitionButton);
	
	addTransition(n);
	
	if(n == states) states += 1;
}

function addTransition(n) {
	var transTable = document.getElementById("transTable-"+n);
	var tr = transTable.insertRow(-1);
	
	var charSeen = document.createElement('textarea');
	charSeen.setAttribute('class','dataArea');
	charSeen.onchange=limitLength(charSeen);
	charSeen.addEventListener('input',function()
	{
		if(!((n + "_" + charSeen.value) in ruleset))
		{
			charSeen.disabled = true; 
			limitLength(charSeen); 
			addRule(charSeen);
		}
		else
		{
			charSeen.value = "";
		}
		
	});
	tr.insertCell(0).appendChild(charSeen);
	
	tr.insertCell(1);
	
	var charNext = document.createElement('textarea');
	charNext.onchange=limitLength(charNext);
	charNext.addEventListener('input',function(){limitLength(charNext); addRule(charNext);});
	charNext.setAttribute('class','dataArea');
	tr.insertCell(2).appendChild(charNext);
	
	var stateNext = document.createElement('textarea');
	stateNext.setAttribute('class','dataArea');
	stateNext.addEventListener('input',function(){addRule(stateNext);});
	tr.insertCell(3).appendChild(stateNext);
	
	var dirNext = document.createElement('textarea');
	dirNext.setAttribute('class','dataArea');
	dirNext.onchange=limitLength(dirNext);
	dirNext.addEventListener('input',function(){limitLength(dirNext); addRule(dirNext);});
	tr.insertCell(4).appendChild(dirNext);
	
	var del = document.createElement("button");
	del.setAttribute('class','delstate-button');
	del.innerHTML = "Delete";
	del.onclick=function(){ removeRule(del); deleteTransitionElement(tr);};
	tr.insertCell(5).appendChild(del);
	
	transTable.appendChild(tr);
	
}

function limitLength(textArea)
{
	if(textArea.value.length > 1)
	{
		textArea.value=textArea.value.substring(textArea.value.length-1,textArea.value.length);
	}
}

function addRule(ta)
{
	var cells = ta.parentNode.parentNode.childNodes;
	var statebox = ta.parentNode.parentNode.parentNode.parentNode.parentNode;
	var state = statebox.getAttribute('id').substring(statebox.getAttribute('id').indexOf('-')+1);
	
	
	var charSeen = cells[0].childNodes[0].value;
	var charNext = cells[2].childNodes[0].value;
	var stateNext = cells[3].childNodes[0].value;
	if(stateNext == "A" || stateNext =="a") stateNext = -1;
	if(stateNext == "R" || stateNext =="r") stateNext = -2;
	var dirNext = cells[4].childNodes[0].value;
	
	ruleset[state + "_" + charSeen] = [charNext, stateNext, dirNext];
	
	console.log(ruleset);
}

function removeRule(ta)
{
	var cells = ta.parentNode.parentNode.childNodes;
	var statebox = ta.parentNode.parentNode.parentNode.parentNode.parentNode;
	var state = statebox.getAttribute('id').substring(statebox.getAttribute('id').indexOf('-')+1);
	
	
	var charSeen = cells[0].childNodes[0].value.substring(0,1);
	
	ruleset.removeItem(state + "_" + charSeen);
	
	console.log(ruleset);
}

function removeState(n)
{
	for(var k in ruleset)
	{
		if(k.substring(0,k.indexOf("_")) == n + "")
		{
			ruleset.removeItem(k);
		}
	}
	console.log(ruleset);
}

function playButton()
{
	play();
	drawMachine();
}
function stepButton()
{
	step();
	drawMachine();
}

function stopButton()
{
	stop();
	drawMachine();
}

function resetButton()
{
	reset();
	drawMachine();
}

function stateButton()
{
	state = document.getElementById("statearea").value;
}

function deleteStateboxElement(tr)
{
	tr.parentNode.removeChild(tr);
}

function deleteTransitionElement(tr)
{
	tr.parentNode.removeChild(tr);
}

function stateboxUpdate(x)
{
	currentState = document.getElementById("statearea").value;
}

function tapeboxUpdate(x)
{
	tape = document.getElementById("tape").value;
}

function clearStateboxes()
{
	document.getElementById("stateboxes").innerHTML="";
	states = 0;
	addState(0);
}

function newButton()
{
	clearRules();
	clearStateboxes();
	reset();
	drawMachine();
}

function loadButton()
{
	newButton();
	var str = document.getElementById("savedata").value;
	readMachineCode(str);
	document.getElementById("statearea").value = currentState;
	document.getElementById("tape").value = tape;
	drawMachine();
}

function saveButton()
{
	reset();
	document.getElementById("savedata").value = outputMachineCode();
	drawMachine();
}
