import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import FollowModal from "../4-models/follow-model";
import VacationModal from "../4-models/vacation-model";

let socketServer: SocketServer;

function init(httpServer: HttpServer): void {
        socketServer = new SocketServer(httpServer, { cors: { origin: "*" } });
        socketServer.sockets.on("connection", (socket: Socket) => {
            console.log("Client has been connected...");
        });
}

function reportAddVacation(vacation: VacationModal): void {
    socketServer.sockets.emit("admin-added-vacation", vacation);
}
function reportUpdateVacation(vacation: VacationModal): void {
    socketServer.sockets.emit("admin-updated-vacation", vacation);
}
function reportDeleteVacation(id: number): void {
    socketServer.sockets.emit("admin-deleted-vacation", id);
}
function reportAddFollow(follow: FollowModal): void {
    socketServer.sockets.emit("user-started-following", follow);
}
function reportDeleteFollow(id: number): void {
    socketServer.sockets.emit("user-stop-following", id);
}

export default {
    init,
    reportAddVacation,
    reportUpdateVacation,
    reportDeleteVacation,
    reportAddFollow,
    reportDeleteFollow
};