var socket;
var currentPage = 0;

function initLecturer() {
    socket = new WebSocket(url);
    console.log("Connecting...")

    socket.onopen = function(e) {
        console.log("Connection established")
        var msg = { "type": "connect",
            "lectureId": lectureId,
            "role": "lecturer",
            "token": token}
        socket.send(JSON.stringify(msg))
    }

    socket.onmessage = function(e) {
        console.log(e.data);
    }

    socket.onerror = function(e) {

    }

    socket.onclose = function(e) {
        console.log("Connection closed.");
    }

    window.onkeydown = onKey;
}

function onKey(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    switch(key) {
        case 37: // Left
            currentPage--;
            if(currentPage < 0) currentPage = 0;
            var msg = {
                "type": "pageChange",
                "page": currentPage
            };
            socket.send(JSON.stringify(msg));
            break;
        case 39: // Right
            currentPage++;
            var msg = {
                "type": "pageChange",
                "page": currentPage
            };
            socket.send(JSON.stringify(msg));
            break;
    }
}