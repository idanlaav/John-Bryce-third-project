import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import vacationsService from "../../../../Services/VacationsService";
import config from "../../../../Utils/Config";
import "./VacationAdminCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationAdminCard(props: VacationCardProps): JSX.Element {

    const navigate = useNavigate();

    async function deleteVacation() {
        try {
            await vacationsService.deleteVacation(props.vacation.id)
            alert("Vacation has been deleted.")
            navigate("/vacations")
        }
        catch (err: any) {
            alert(err.message)
        }
    }
    
    props.vacation.followersCount = props.vacation.followersCount

    return (
        <div className="VacationAdminCard Box">
            <div>
                <div className="locationCss">
                 {props.vacation.location}
                </div>
                <div>
                    <img src={config.vacationImagesUrl + props.vacation.imageName} alt="" />
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
                <h3>
                    <NavLink to={"/vacations/edit/" + props.vacation.id}>Edit</NavLink>
                    <span> | </span>
                    <NavLink to="#" onClick={deleteVacation}>Delete</NavLink>
                </h3>
            </div>
        </div>
    );
}

export default VacationAdminCard;
