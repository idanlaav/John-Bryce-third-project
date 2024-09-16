import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchVacationsAction } from "../../../../Redux/VacationsState";
import VacationAdminCard from "../VacationAdminCard/VacationAdminCard";
import vacationsService from "../../../../Services/VacationsService";
import socketService from "../../../../Services/SocketService";
import VacationModel from "../../../../Models/VacationModel";
import Loading from "../../../SharedArea/Loading/Loading";
import store from "../../../../Redux/Store";
import "./VacationAdminList.css";

function VacationAdminList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        socketService.connect();
        vacationsService.getAllVacations()
            .then(vacations => {setVacations(vacations)})
            .catch(err => alert(err.message));

        const unsubscribe = store.subscribe(() => {
        const dup = [...store.getState().vacationsState.vacations]
        vacationsService.getAllVacations()
            .then(vacations => {})
            .catch(err => alert(err.message));
                setVacations(dup);
            })
            
        return () => {
            socketService.disconnect();
            unsubscribe();
            store.dispatch(fetchVacationsAction([]));
        }
    },[])    

    return (
        <div className="VacationAdminList">
            <div className="navLinkCss">
                <NavLink to="/vacations">Vacations</NavLink>
                <span>  |  </span>
                <NavLink to="/vacations/new">Add Vacation</NavLink>
                <span>  |  </span>
                <NavLink to="/followers-report">Followers Report</NavLink>
                <span>  |  </span>
                <NavLink to="/users">Website Users</NavLink>
            </div>
            {vacations.length === 0 && <Loading />}
            <div className="cardList">
            {vacations.map(v => <VacationAdminCard key={v.id} vacation={v} />)}
            </div>
        </div>
    );
}

export default VacationAdminList;
