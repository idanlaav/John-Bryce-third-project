"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var socketServer;
function init(httpServer) {
    socketServer = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
    socketServer.sockets.on("connection", function (socket) {
        console.log("Client has been connected...");
    });
}
function reportAddVacation(vacation) {
    socketServer.sockets.emit("admin-added-vacation", vacation);
}
function reportUpdateVacation(vacation) {
    socketServer.sockets.emit("admin-updated-vacation", vacation);
}
function reportDeleteVacation(id) {
    socketServer.sockets.emit("admin-deleted-vacation", id);
}
function reportAddFollow(follow) {
    socketServer.sockets.emit("user-started-following", follow);
}
function reportDeleteFollow(id) {
    socketServer.sockets.emit("user-stop-following", id);
}
exports.default = {
    init: init,
    reportAddVacation: reportAddVacation,
    reportUpdateVacation: reportUpdateVacation,
    reportDeleteVacation: reportDeleteVacation,
    reportAddFollow: reportAddFollow,
    reportDeleteFollow: reportDeleteFollow
};
