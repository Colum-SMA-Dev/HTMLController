'use strict';

var socketIo = require('socket.io');
var socketIoClient = require('socket.io-client');

module.exports = createApplication;

function createApplication () {
    return new HTMLController();
}

function HTMLController () {

}

HTMLController.prototype.listen = function(port, hubUrl, hubPassword) {
    // establish connection with hub
    var hub = socketIoClient(hubUrl);
    hub.on('connect', function() {
        hub.emit('auth', {password: hubPassword}, function(err) {
            if (err) {
                throw new Error('Authentication with hub failed: ' + err);
            }

            // listen for client connections
            var io = socketIo(port);

            io.on('connection', function(socket) {

                function passMessageToHub (messageName) {
                    socket.on(messageName, function() {
                        var args = Array.prototype.slice.call(arguments, 0);
                        args.unshift(messageName);
                        hub.emit.apply(hub, args);
                    });
                }
                
                passMessageToHub('loadScene');
                passMessageToHub('listScenes');

                socket.on('capabilities', function(data) {

                });
            });
        });
    });

    hub.on('connect_error', function(err) {
        throw new Error('Connection to hub failed: ' + err);
    });

    hub.on('connect_timeout', function() {
        throw new Error('Connection to hub timed out');
    });
};
