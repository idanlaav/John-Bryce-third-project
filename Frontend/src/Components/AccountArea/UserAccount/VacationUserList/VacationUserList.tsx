import { useEffect, useState } from "react";
import { fetchVacationsAction } from "../../../../Redux/VacationsState";
import store from "../../../../Redux/Store";
import VacationModel from "../../../../Models/VacationModel";
import socketService from "../../../../Services/SocketService";
import vacationsService from "../../../../Services/VacationsService";
import VacationUserCard from "../VacationUserCard/VacationUserCard";
import Loading from "../../../SharedArea/Loading/Loading";
import "./VacationUserList.css";

function VacationUserList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    
    useEffect(() => {
        socketService.connect();
        vacationsService.getAllVacations()
            .then(vacations => {})
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
        <div className="VacationUserList">
            {vacations.length === 0 && <Loading />}
            <div className="cardList">
            {vacations.map(v => <VacationUserCard key={v.id} vacation={v} />)}
            </div>
        </div>
    );
}

export default VacationUserList;
