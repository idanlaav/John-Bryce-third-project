import UserModel from "../../../../../Models/UserModel";
import "./UserCardDetails.css";

interface userCardProps {
	user: UserModel;
}

function UserCardDetails(props: userCardProps): JSX.Element {
    return (
        <div className="UserCardDetails">
            <div className="Box">
                <p>First name - {props.user.firstName}</p>
                <br />
                <p>Last name - {props.user.lastName}</p>
                <br />
                <p>Username - {props.user.username}</p>
                <br />
                <p>Role - {props.user.role}</p>
            </div>
        </div>
    );
}

export default UserCardDetails;

