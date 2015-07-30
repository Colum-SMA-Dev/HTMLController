'use strict';

var debug = require('debug')('html-controller');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var socketIo = require('socket.io');
var socketIoClient = require('socket.io-client');
var http = require('http');
var express = require('express');
var cors = require('cors');

module.exports = createApplication;

function createApplication () {
    return new HTMLController();
}

util.inherits(HTMLController, EventEmitter);

function HTMLController () {

}

HTMLController.prototype.listen = function(port, hubUrl, hubPassword) {
    var self = this;

    // establish connection with hub
    var hub = socketIoClient(hubUrl);
    hub.on('connect', function() {
        debug('connection to hub established');
        hub.emit('auth', {password: hubPassword}, function(err) {
            if (err) {
                throw new Error('Authentication with hub failed: ' + err);
            }

            self.hub = hub;
            debug('auth successful with hub');

            // listen for client connections

            var app = express(),
                server = http.Server(app),
                io = socketIo(server);
            
            io.set('origins', '*:*');
            io.on('connection', function(socket) {
                debug('client connected');
                
                self.emit('connection', socket);

                // pass certain messages from client directly to hub
                [
                    'loadScene',
                    'listScenes'
                ].forEach(function (messageName) {
                    socket.on(messageName, function() {
                        var args = Array.prototype.slice.call(arguments, 0);
                        args.unshift(messageName);
                        hub.emit.apply(hub, args);
                    });
                });
            });

            server.listen(port);
        });
    });

    hub.on('connect_error', function(err) {
        throw new Error('Connection to hub failed: ' + err);
    });

    hub.on('connect_timeout', function() {
        throw new Error('Connection to hub timed out');
    });
};
