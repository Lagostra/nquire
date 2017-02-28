var socket;

function init() {
    socket = new WebSocket(url);
    console.log("Connecting...")

    socket.onopen = function(e) {
        console.log("Connection established");
        var msg = { "type": "connect",
            "lectureId": lectureId,
            "role": "lecturer",
            "token": token};
        socket.send(msg)
    }

    socket.onmessage = function(e) {
        console.log(e.data);

        setTimeout(function() {socket.send("Test")}, 5000);
    }

    socket.onerror = function(e) {

    }

    socket.onclose = function(e) {
        console.log("Connection closed.");
    }
}