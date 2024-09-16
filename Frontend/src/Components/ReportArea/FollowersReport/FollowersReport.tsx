import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { NavLink } from 'react-router-dom';
import { fetchFollowingAction } from '../../../Redux/FollowingState';
import FollowerModel from '../../../Models/FollowerModel';
import VacationModel from '../../../Models/VacationModel';
import store from '../../../Redux/Store';
import followingService from '../../../Services/FollowingService';
import vacationsService from '../../../Services/VacationsService';
import TotalFollowers from '../../FollowersArea/TotalFollowers/TotalFollowers';
import "./FollowersReport.css";

function FollowersReport(this: any): JSX.Element {

    let allVacations = [];
    const vacationsLabels = []
    const randomColor = []
    const randomColor2 = []
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [followers, setFollowers] = useState<FollowerModel[]>([]);

    useEffect(() => {
        vacationsService.getAllVacations()
            .then(vacations => {setVacations(vacations)})
            .catch(err => alert(err.message));
    },[])

    for (let v = 0; v < vacations.length; v++) {
        allVacations.push({ 'key': vacations[v].id, value: 0 });
    }
    
    useEffect(() => {
        store.dispatch(fetchFollowingAction([]))
        followingService.getAllFollowing()
            .then(followers => {setFollowers(followers);})
            .catch(err => alert(err.message));
    },[])


    for (let i = 0; i < vacations.length; i++) {
        vacationsLabels.push(vacations[i].location.toString())
        randomColor.push('#' + Math.floor(Math.random() * (256 * 256 * 256)).toString(16).padStart(6, '0'));
        randomColor2.push('#' + Math.floor(Math.random() * (256 * 256 * 256)).toString(16).padStart(6, '0'));
    }

    for (let a = 0; a < allVacations.length; a++) {
        for (let i = 0; i < followers.length; i++) {
            if (followers[i].vacationId === allVacations[a].key) {
                allVacations[a].value++
            }
        }
    }

    const dataValues = allVacations.map(d => d.value)

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: vacationsLabels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: randomColor,
                borderColor: randomColor2,
                borderWidth: 0.5,
            },
        ],
    };

    return (
        <div>
            <div className="FollowersReport">
                <div className="navLinkCss">
                    <NavLink to="/vacations">Vacations</NavLink>
                    <span>  |  </span>
                    <NavLink to="/vacations/new">Add Vacation</NavLink>
                    <span>  |  </span>
                    <NavLink to="/followers-report">Followers Report</NavLink>
                    <span>  |  </span>
                    <NavLink to="/users">Website Users</NavLink>
                </div>
                <div className="TotalFollowers">
                    <TotalFollowers />
                </div>
                <div className='canvasDiv'>
                <Pie className="FollowersReportData" data={data} />
                </div>
            </div>
        </div>
    )

}

export default FollowersReport;





