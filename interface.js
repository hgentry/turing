var states = 0;

function addState(n)
{
	var div = document.createElement("div");
	var statebox = document.createElement("div");
	div.setAttribute('class','statebox');
	statebox.setAttribute('id',statebox-"+n"+"-data");
	div.setAttribute('id','statebox-'+n);
	div.style.width = "100px";
	div.style.height = "100px";

	div.innerHTML = "State "+ n +"<br>";
	
	statebox.innerHTML = "Stuff here";
	
	document.getElementById("stateboxes").appendChild(div);
	div.appendChild(statebox);
}

function addTransition(n) {
	
}