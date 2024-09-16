import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FollowerModel from "../../../../Models/FollowerModel";
import VacationModel from "../../../../Models/VacationModel";
import followingService from "../../../../Services/FollowingService";
import config from "../../../../Utils/Config";
import "./VacationUserCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationUserCard(props: VacationCardProps): JSX.Element {

    const [text, setText] = useState<string>("+ Follow");
    const [style, setStyle] = useState("btn");
    const { register, handleSubmit } = useForm<FollowerModel>();
    const [followingUsers, setFollowingUsers] = useState<FollowerModel[]>([]);

    // const [state, setState] = useState({
    //     text: "+ Follow",
    //     style: "btn",
    //     followingUsers: []
    // })

    const myUserId = localStorage.getItem("id")

    useEffect(() => {
        if (props.vacation.isFollowing === 1) {
            setText("Following")
            setStyle("btnClick")
        }
    }, []) 

    async function send(follower: FollowerModel) {
        try {
            await followingService.getAllFollowing()
            .then(async followingUsers => {
                await setFollowingUsers(followingUsers)
                if (text === '+ Follow') {

                    await setText("Following")
                    await setStyle("btnClick")
                    await followingService.addFollower(follower);
                    await alert("You started to follow after this vacation.")
                    
                }
                else if (text === 'Following') {
                    
                    await setText('+ Follow')
                    await setStyle("btn")    
                    const currentUserId = localStorage.getItem("id")
                    for (let index = 0; index < followingUsers.length; index++) {
                        if(follower.userId.toString() === currentUserId.toString() && props.vacation.id.toString() === follower.vacationId.toString()) {
                            const followerId = await followingUsers.filter(f=> f.userId.toString() === currentUserId && f.vacationId === props.vacation.id)
                            const id = followerId.map(f=>f.followerId)
                            await followingService.deleteFollowingFromVacation(id[0])
                            await alert("You stopped to follow after that vacation.")
                            break
                        }
                    }
                }
            })
            .catch(err => alert(err.message));
        }
        catch (err: any) {
            alert(err.message)
        }
    }
    
    if (props.vacation.followersCount === undefined) {
        props.vacation.followersCount = 0
    }

    return (
        <div className="VacationUserCard Box">
            <div>
                <form onSubmit={handleSubmit(send)}>
                    <input type="number" hidden {...register("userId")} value={myUserId}></input>
                    <input type="number" hidden {...register("vacationId")} value={props.vacation.id}></input>
                    <div className="locationCss">
                        {props.vacation.location}
                    </div>
                    <div className="container">
                        <img src={config.vacationImagesUrl + props.vacation.imageName} alt="" />
                        <button className={style}>{text}</button>
                    </div>
                    <div className="descriptionCss">
                        {props.vacation.description}
                    </div>
                    <div className="datesCss">
                    <strong>Vacation Date:</strong> {props.vacation.fromDate} - {props.vacation.untilDate}
                    </div>
                    <div className="priceCss">
                    <strong>Price:</strong> {props.vacation.price}$
                    </div>
                    <pre>Followers: {props.vacation.followersCount}</pre>
                </form>
            </div>
        </div>
    );

}

export default VacationUserCard;