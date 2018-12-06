

window.onload = function() {
    
    let intervalId;

    const DOM = {
        bttn: document.getElementById("bttn"),
        today: document.getElementById("hoy"),
        avg: document.getElementById("avg"),
        log1: document.getElementById("log1"),
        log2: document.getElementById("log2"),
        log3: document.getElementById("log3"),
        log4: document.getElementById("log4"),
        content: document.getElementById("content")
    };

    DOM.bttn.onclick = () => {
        if (DOM.bttn.innerHTML === "START") {
            window.localStorage.timestampStartInMs = getCurrentDateTimeInMs();
            start();
        }
        else {
            stop();
        }
    };

    if (window.localStorage.timestampStartInMs === undefined) window.localStorage.timestampStartInMs = 0;
    if (window.localStorage[getDay(0)] === undefined) window.localStorage[getDay(0)] = 0;
    if (window.localStorage[getDay(1)] === undefined) window.localStorage[getDay(1)] = 1000 * 60 * 60 * 2;
    if (window.localStorage[getDay(2)] === undefined) window.localStorage[getDay(2)] = 1000 * 60 * 60 * 2;
    if (window.localStorage[getDay(3)] === undefined) window.localStorage[getDay(3)] = 1000 * 60 * 60 * 2;
    if (window.localStorage[getDay(4)] === undefined) window.localStorage[getDay(4)] = 1000 * 60 * 60 * 2;

    if (window.localStorage.timestampStartInMs != 0) start();
    DOM.today.innerHTML = msToHHMMSS(window.localStorage[getDay(0)]);
    showLog();
    showAvg();
    DOM.content.style.visibility = "visible";

    function start() {
        if (window.localStorage[getDay(0)] === undefined) {
            window.localStorage[getDay(0)] = 0;
            DOM.today.innerHTML = msToHHMMSS(window.localStorage[getDay(0)]);
            showLog();
            showAvg();
        }
        DOM.bttn.style.background = '#f44336';
        DOM.bttn.innerHTML = msToHHMMSS(Number(getCurrentDateTimeInMs()) - Number(window.localStorage.timestampStartInMs));
        DOM.today.innerHTML = msToHHMMSS(Number(window.localStorage[getDay(0)]) + Number(getCurrentDateTimeInMs()) - Number(window.localStorage.timestampStartInMs));
        intervalId = setInterval(function() {
            DOM.bttn.innerHTML = msToHHMMSS(Number(getCurrentDateTimeInMs()) - window.localStorage.timestampStartInMs);
            DOM.today.innerHTML = msToHHMMSS(Number(window.localStorage[getDay(0)]) + Number(getCurrentDateTimeInMs()) - Number(window.localStorage.timestampStartInMs));
        }, 1000);
    }

    function stop() {
        window.clearInterval(intervalId);
        if (window.localStorage[getDay(0)] === undefined) {
            window.localStorage[getDay(0)] = 0;
            window.localStorage[getDay(1)] = Number(window.localStorage[getDay(1)]) + Number(getCurrentDateTimeInMs()) - Number(window.localStorage.timestampStartInMs);
            DOM.today.innerHTML = msToHHMMSS(window.localStorage[getDay(0)]);
            showLog();
            showAvg();
        }
        else {
            window.localStorage[getDay(0)] = Number(window.localStorage[getDay(0)]) + Number(getCurrentDateTimeInMs()) - Number(window.localStorage.timestampStartInMs);
        }
        window.localStorage.timestampStartInMs = 0;
        DOM.bttn.style.background = '#74ad5a';
        DOM.bttn.innerHTML = "START";
    }

    function showLog() {
        DOM.log1.innerHTML = getDay(1) + " " + msToHHMMSS(window.localStorage[getDay(1)]);
        DOM.log2.innerHTML = getDay(2) + " " + msToHHMMSS(window.localStorage[getDay(2)]);
        DOM.log3.innerHTML = getDay(3) + " " + msToHHMMSS(window.localStorage[getDay(3)]);
        DOM.log4.innerHTML = getDay(4) + " " + msToHHMMSS(window.localStorage[getDay(4)]);
    }

    function showAvg() {
        let avg = 0;
        avg += Number(window.localStorage[getDay(1)]);
        avg += Number(window.localStorage[getDay(1)]);
        avg += Number(window.localStorage[getDay(1)]);
        avg += Number(window.localStorage[getDay(1)]);
        avg = avg / 4;
        DOM.avg.innerHTML = msToHHMMSS(avg);
    }

function msToHHMMSS(ms) {
    // Don't use parseInt. Use instead Math.floor. Avoid javascript issue: parseInt(0.0000000000000001) = 1 (!?)
    ms = Number(ms);
    let ss = Math.floor((ms / 1000) % 60, 10);
    let mm = Math.floor((ms / (1000 * 60)) % 60, 10);
    let hh = Math.floor((ms / (1000 * 60 * 60)) % 24, 10);
    if (mm < 10) mm = "0" + mm;
    if (ss < 10) ss = "0" + ss;
    if (hh < 10) hh = "0" + hh;
    return hh + ":" + mm + ":" + ss;
}

function getCurrentDateTimeInMs() {
    const now = new Date();
    return now.getTime();
}

function getDay(numDay) {
    let date = new Date();
    date.setDate(date.getDate() - numDay);
    let YY = date.getFullYear();
    let MM = date.getMonth() + 1;
    let DD = date.getDate();
    if (YY < 10) YY = "0" + YY;
    if (MM < 10) MM = "0" + MM;
    if (DD < 10) DD = "0" + DD;
    return YY + "-" + MM + "-" + DD;
}


};


