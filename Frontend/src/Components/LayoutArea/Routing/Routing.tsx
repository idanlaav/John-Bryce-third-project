import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import VacationAdminList from "../../AccountArea/AdminAccount/VacationAdminList/VacationAdminList";
import VacationUserList from "../../AccountArea/UserAccount/VacationUserList/VacationUserList";
import FollowersReport from "../../ReportArea/FollowersReport/FollowersReport";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import Register from "../../AuthArea/Register/Register";
import UserList from "../../AccountArea/UserAccount/UserDetails/UserListDetails/UserListDetails";
import PageNotFound from "../PageNotFound/PageNotFound";
import Logout from "../../AuthArea/Logout/Logout";
import UserModel from "../../../Models/UserModel";
import Login from "../../AuthArea/Login/Login";
import store from "../../../Redux/Store";

function Routing(): JSX.Element {

    const [role, setRole] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(null);
        setUser(store.getState().authState.user);
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });
        return () => unsubscribe();
    });

    useEffect(() => {
        setRole(false);
        const myRole = localStorage.getItem('role');
        if (myRole === 'Admin') setRole(true);
    });

    useEffect(() => {
        setHasToken(false);
        const token = localStorage.getItem('token');
        if (token) setHasToken(true);
    });

    return (
        <div className="Routing">
            {!user &&
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="" element={<Navigate to="/login" />} />
                    <Route path="/vacations" element={<Navigate to="/login" />} />
                    <Route path="/home" element={<Navigate to="/login" />} />
                    <Route path="/logout" element={<Navigate to="/login" />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            }
            {hasToken && !role &&
                <Routes>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/home" element={<VacationUserList />} />
                    <Route path="/vacations" element={<VacationUserList />} />
                    <Route path="/login" element={<Navigate to="/home" />} />
                    <Route path="/register" element={<Navigate to="/home" />} />
                    <Route path="/vacations/new" element={<Navigate to="/home" />} />
                    <Route path="/vacations/edit/:prodId" element={<Navigate to="/home" />} />
                    <Route path="/users" element={<Navigate to="/home" />} />
                    <Route path="" element={<Navigate to="/home" />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            }
            {role &&
                <Routes>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/followers-report" element={<FollowersReport />} />
                    <Route path="/home" element={<VacationAdminList />} />
                    <Route path="/vacations" element={<VacationAdminList />} />
                    <Route path="/vacations/new" element={<AddVacation />} />
                    <Route path="/vacations/edit/:prodId" element={<EditVacation />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/login" element={<Navigate to="/home" />} />
                    <Route path="/register" element={<Navigate to="/home" />} />
                    <Route path="" element={<Navigate to="/home" />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            }
        </div>
    );

}

export default Routing;
