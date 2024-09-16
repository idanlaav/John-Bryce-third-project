import { useEffect, useState } from "react";
import FollowerModel from "../../../Models/FollowerModel";
import followingService from "../../../Services/FollowingService";

function TotalFollowers(): JSX.Element {

    const [followers,setFollowers] = useState<FollowerModel[]>([]);
        useEffect(()=>{
        followingService.getAllFollowing()
            .then(followers => {
                setFollowers(followers)
            })
            .catch(err => alert(err.message));
    }, []) 
    
    const count = followers.length

    return (
        <div className="VacationList">
			<span>Total Followers: {count}</span>
        </div>
    );
}

export default TotalFollowers;
