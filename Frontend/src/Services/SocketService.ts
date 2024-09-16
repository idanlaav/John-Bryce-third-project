import { addVacationAction, deleteVacationAction, updateVacationAction } from "../Redux/VacationsState";
import { addFollowerAction, deleteFollowingAction } from "../Redux/FollowingState";
import { io, Socket } from "socket.io-client"
import FollowerModel from "../Models/FollowerModel";
import VacationModel from "../Models/VacationModel";
import store from "../Redux/Store";

class SocketService {

    private socket: Socket;

    public connect(): void {
        this.socket = io("https://vacations-update-idan-laav.herokuapp.com")
        this.listen();
    }

    private listen(): void {
        this.socket.on("admin-added-vacation", (vacation: VacationModel) => {
            const index = store.getState().vacationsState.vacations.findIndex(v => v.id === vacation.id);
            const vacationCheckFollowing = store.getState().vacationsState.vacations[index]
            store.dispatch(addVacationAction(vacation, vacationCheckFollowing));
        });

        this.socket.on("admin-updated-vacation", (vacation: VacationModel) => {
            const index = store.getState().vacationsState.vacations.findIndex(v => v.id === vacation.id);
            const vacationCheckFollowing = store.getState().vacationsState.vacations[index]
            store.dispatch(updateVacationAction(vacation, vacationCheckFollowing));
        });

        this.socket.on("admin-deleted-vacation", (id: number) => {
            store.dispatch(deleteVacationAction(id));
        });

        this.socket.on("user-started-following", (follower: FollowerModel) => {
            const index = store.getState().vacationsState.vacations.findIndex(v => v.id === follower.vacationId);
            const vacation = store.getState().vacationsState.vacations[index]
            vacation.followersCount++
            store.dispatch(addFollowerAction(follower));
        });
        this.socket.on("user-stop-following", (id: number) => {
            const findCurrentFollowing = store.getState().followingState.following.find(f=>f.followerId === id)            
            const index = store.getState().vacationsState.vacations.findIndex(v => v.id === findCurrentFollowing.vacationId);
            const vacation = store.getState().vacationsState.vacations[index]
            vacation.followersCount--
            store.dispatch(deleteFollowingAction(id));
        });
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

const socketService = new SocketService()

export default socketService