import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../../Models/UserModel";
import authService from "../../../../Services/AuthService";
import Loading from "../../../SharedArea/Loading/Loading";
import UserCard from "../UserCard/UserCard";
import "./UserList.css";

function UserList(): JSX.Element {

    const [users, setUsers] = useState<UserModel[]>([]);
    useEffect(() => {
        authService.getAllUsers()
            .then(users => {
                setUsers(users)
            })
            .catch(err => alert(err.message));
    }, [])

    return (
        <div className="UserList">
            <div className="navLinkCss">
                <NavLink to="/vacations">Vacations</NavLink>
                <span>  |  </span>
                <NavLink to="/vacations/new">Add Vacation</NavLink>
                <span>  |  </span>
                <NavLink to="/followers-report">Followers Report</NavLink>
                <span>  |  </span>
                <NavLink to="/users">Website Users</NavLink>
            </div>
            {users.length === 0 && <Loading />}
            {users.map(u => <UserCard key={u.id} user={u} />)}
        </div>
    );
}

export default UserList;
