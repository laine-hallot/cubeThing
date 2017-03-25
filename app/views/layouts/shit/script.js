//sidebar
var isclosed = false;
var milSec = 0;
var sec = 0;
function toggleNav() {

	isclosed = !isclosed;
	if (isclosed) {

		document.getElementById("mySidenav").style.width = "250px";
		timerUp();
	} else {

		document.getElementById("mySidenav").style.width = "0";
	}

}

function spacePress(e){
		if(e.keyCode==97){
			timer();
		}

}

function timer() {
    t = setInterval(add, 10);
}


function add(time) {
		milSec++;
		if(milSec==100){
			 sec++;
			 milSec =0;
		}
		document.getElementById("jtime").innerHTML = sec+":"+milSec;
		console.log(sec+":"+milSec);
}
window.addEventListener("onkeydown", spacePress, false);
//timer();
