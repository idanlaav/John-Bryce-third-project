import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import socketLogic from "./socket-logic";
import FollowModal from "../4-models/follow-model";

async function getFollowingUsers(): Promise<FollowModal[]> {
    const sql = `SELECT FollowerID AS followerId,
                 UserID as userId,
                 VacationID as vacationId
                 FROM followers ORDER BY UserID`;
    const following = await dal.execute(sql);
    return following;
}

async function getOneFollowById(id: number): Promise<FollowModal> {
    const sql = `SELECT FollowerID AS followerId,
                 UserID as userId,
                 VacationID as vacationId
                 FROM followers
                 WHERE FollowerID = ?`;
    const values = [id];
    const followers = await dal.execute(sql, values);
    const follower = followers[0];
    if (!follower) {
        throw new ResourceNotFoundError(id)
    }
    return follower;
}

async function addFollower(follower: FollowModal): Promise<FollowModal> {
    const errors = follower.validatePost();
    if (errors) {
        throw new ValidationError(errors)
    }
    const sql = `INSERT INTO followers VALUES(DEFAULT, ?, ?)`;
    const values = [follower.userId, follower.vacationId];
    const result: OkPacket = await dal.execute(sql, values);
    follower.followerId = result.insertId;
    const addedFollow = await getOneFollowById(follower.followerId);
    socketLogic.reportAddFollow(addedFollow);
    return addedFollow;
}

// this function do that and return that
async function deleteFollowFromVacation(id: number): Promise<void> {
    const sql = `DELETE FROM followers WHERE FollowerID = ?`
    const values = [id];
    const result = await dal.execute(sql, values);
    // update socket to client 
    socketLogic.reportDeleteFollow(id);
    if(result.affectedRows === 0) {
        throw new ResourceNotFoundError(id)
    }
}

export default {
    getFollowingUsers,
    deleteFollowFromVacation,
    addFollower
}