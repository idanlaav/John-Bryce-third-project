import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import "./TotalVacations.css";

function TotalVacations(): JSX.Element {

    const [count,setCount] = useState<number>();

    useEffect(() => {
        setCount(store.getState().vacationsState.vacations.length);
        const unsubscribe = store.subscribe(()=>{
           setCount(store.getState().vacationsState.vacations.length);
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <div className="TotalVacations">
			<span>Total Vacations: {count}</span>
        </div> 
    );
}

export default TotalVacations;
