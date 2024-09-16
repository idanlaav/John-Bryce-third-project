import FollowerModel from "../Models/FollowerModel";

export class FollowingState {
    public following: FollowerModel[] = [];
    public followerId: string = null;
}

export enum FollowingActionType {
    FetchFollowing = "FetchFollowing",
    AddFollower = "AddFollower",
    DeleteFollowing = "DeleteFollowing",
}

export interface FollowingAction {
    type: FollowingActionType;
    payload: any;
}

export function fetchFollowingAction(Following: FollowerModel[]): FollowingAction {
    const action: FollowingAction = { type: FollowingActionType.FetchFollowing, payload: Following };
    return action;
}

export function addFollowerAction(follower: FollowerModel): FollowingAction {
    const action: FollowingAction = {type: FollowingActionType.AddFollower, payload: follower };
    return action;
}

export function deleteFollowingAction(id: number): FollowingAction {
    const action: FollowingAction = { type: FollowingActionType.DeleteFollowing, payload: id };
    return action;
}

export function followingReducer(currentState: FollowingState = new FollowingState(), action: FollowingAction): FollowingState {
    const newState = { ...currentState }

    switch (action.type) {
        case FollowingActionType.FetchFollowing:
            newState.following = action.payload;
            break
        case FollowingActionType.AddFollower:
                newState.following.push(action.payload)
                break
        case FollowingActionType.DeleteFollowing:
            const id = action.payload.id;            
            newState.followerId = id
            const indexToDelete = newState.following.findIndex(f => f.followerId === id)
            if (indexToDelete >= 0) {
                newState.following.splice(indexToDelete, 1)
            }
            break
    }

    return newState

}