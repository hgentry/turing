var states = 0;


function addState(n)
{
	var div = document.createElement("div");
	var statebox = document.createElement("div");
	div.setAttribute('class','statebox');
	statebox.setAttribute('id',"statebox-"+n+"-data");
	div.setAttribute('id','statebox-'+n);

	var transTable = document.createElement("table");
	transTable.innerHTML = "<tr><td> Char </td> <td> -> </td> <td>Char</td> <td>State</td> <td>Dir</td></tr>";
	statebox.appendChild(transTable);
	transTable.setAttribute('id', 'transTable-' +n);
	transTable.setAttribute('class', 'transTable');
	
	div.innerHTML = "State "+ n;
	var del = document.createElement("button");
	del.setAttribute('class','delstate-button');
	del.innerHTML = "Delete";
	del.onclick=function(){deleteStateboxElement(div);};
	
	var addTransitionButton = document.createElement("button");
	addTransitionButton.setAttribute('class','addtransition-button');
	addTransitionButton.innerHTML = "Add Transition";
	addTransitionButton.onclick = function(){addTransition(n)};
	
	
	
	
	document.getElementById("stateboxes").appendChild(div);
	div.appendChild(del);
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
	tr.insertCell(0).appendChild(charSeen);
	
	tr.insertCell(1);
	
	var charNext = document.createElement('textarea');
	charNext.setAttribute('class','dataArea');
	tr.insertCell(2).appendChild(charNext);
	
	var stateNext = document.createElement('textarea');
	stateNext.setAttribute('class','dataArea');
	tr.insertCell(3).appendChild(stateNext);
	
	var dirNext = document.createElement('textarea');
	dirNext.setAttribute('class','dataArea');
	tr.insertCell(4).appendChild(dirNext);
	
	var del = document.createElement("button");
	del.setAttribute('class','delstate-button');
	del.innerHTML = "Delete";
	del.onclick=function(){deleteTransitionElement(tr);};
	tr.insertCell(5).appendChild(del);
	
	transTable.appendChild(tr);
	
}

function deleteStateboxElement(tr)
{
	tr.parentNode.removeChild(tr);
}

function deleteTransitionElement(tr)
{
	tr.parentNode.removeChild(tr);
}

window.onload=function(){addState(0);};