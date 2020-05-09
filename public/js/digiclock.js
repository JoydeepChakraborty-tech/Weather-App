function startTime() {
    var today = new Date();
    document.getElementById('today').innerHTML = today;
    var t = setTimeout(startTime, 500);
 }
