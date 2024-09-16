import { addFollowerAction, deleteFollowingAction, fetchFollowingAction } from "../Redux/FollowingState";
import axios from "axios";
import store from "../Redux/Store";
import config from "../Utils/Config";
import FollowerModel from "../Models/FollowerModel";

class FollowingService {

    public async getAllFollowing(): Promise<FollowerModel[]> {
        let following = store.getState().followingState.following;
        if(following.length >= 0) {
            const response = await axios.get<FollowerModel[]>(config.followingUsersUrl)
            following = response.data;
            store.dispatch(fetchFollowingAction(following))
        }
        return following;
    }

    public async addFollower(follower: FollowerModel): Promise<FollowerModel> {        
        const formData = new FormData();
        formData.append("userId", follower.userId.toString());
        formData.append("vacationId", follower.vacationId.toString());
        const response = await axios.post<FollowerModel>(config.followingUsersUrl, formData);
        const addFollower = response.data;
        store.dispatch(addFollowerAction(addFollower))
        return addFollower
    }

    public async deleteFollowingFromVacation(id: number): Promise<void> {
        await axios.delete(config.followingUsersUrl + id);
        store.dispatch(deleteFollowingAction(id))
    }

}

const followingService = new FollowingService();

export default followingService;


