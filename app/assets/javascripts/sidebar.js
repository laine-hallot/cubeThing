function toggleNav() {

	isclosed = !isclosed;
	if (isclosed) {

		TimesHeight();
		document.getElementById("mySidenav").style.width = "250px";

	} else {

		document.getElementById("mySidenav").style.width = "0";

	}

}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

function TimesHeight() {
	var tiHeight = document.getElementById("AboveAll").scrollHeight;
	var siHeight = document.getElementById("mySidenav").scrollHeight;

	document.getElementById("Scroll").style.height = siHeight - tiHeight - 135 + "px";

}

function ao() {
	var overall = document.getElementsByClassName("overall")[0];
	if (data.data.length == 50) {
		overall.innerHTML = overall.innerHTML + "<table class=\"sta\"><tr><td class=\"gg\">ao" + 50 + ": </td><td class=\"gg\">Best: </td></tr></table>";
	} else if (data.data.length == 100) {
		overall.innerHTML = overall.innerHTML + "<table class=\"sta\"><tr><td class=\"gg\">ao" + 100 + ": </td><td class=\"gg\">Best: </td></tr></table>";
	}
}