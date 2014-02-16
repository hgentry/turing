window.onload = function() {
addState(0);


statebox = document.getElementById("statearea");
statebox.onchange=stateboxUpdate(statebox);
statebox.addEventListener('input',function(){stateboxUpdate(statebox);});

tapebox = document.getElementById("tape");
tapebox.onchange=tapeboxUpdate(statebox);
tapebox.addEventListener('input',function(){tapeboxUpdate(tapebox);});

stateboxUpdate(statebox);
tapeboxUpdate(tapebox);



drawMachine();
}
