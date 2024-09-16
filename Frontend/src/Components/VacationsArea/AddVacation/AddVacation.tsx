import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState, setError } = useForm<VacationModel>();

    async function send(vacation: VacationModel) {
        if (vacation.fromDate > vacation.untilDate || vacation.fromDate === vacation.untilDate) {
            return setError("untilDate", { type: "focus", message: "Until date must be after from date." }, { shouldFocus: true })
        }
        try {
            const addedVacation = await vacationsService.addVacation(vacation);
            alert("Vacation added! id: " + addedVacation.id)
            navigate("/vacations");
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    let checkFromDate = new Date();

    return (
        <div >
            <div className="navLinkCss">
                <NavLink to="/vacations">Vacations</NavLink>
                <span>  |  </span>
                <NavLink to="/vacations/new">Add Vacation</NavLink>
                <span>  |  </span>
                <NavLink to="/followers-report">Followers Report</NavLink>
                <span>  |  </span>
                <NavLink to="/users">Website Users</NavLink>
            </div>
            <div className="AddVacation Box">
                <h2>Add Vacation</h2>
                <form onSubmit={handleSubmit(send)}>
                    <label>Description:</label>
                    <input type="text" {...register("description")} minLength={5} maxLength={200} required />

                    <label>Location:</label>
                    <input type="text" {...register("location")} minLength={2} maxLength={50} required />

                    <label>Price:</label>
                    <input type="number" step="0.01" {...register("price")} min={30} max={50000} required />

                    <label>From Date:</label>
                    <input type="date" min={checkFromDate.toLocaleDateString('en-ca')} {...register("fromDate")} minLength={5} maxLength={10} required />

                    <label>Until Date:</label>
                    <input type="date"  {...register("untilDate")} minLength={5} maxLength={10} required />
                    <div>{formState.errors.untilDate?.message}</div>

                    <label>Image:</label>
                    <input type="file" accept="image/*" {...register("image")} required />

                    <button>Add</button>
                </form>
            </div>
        </div>
    );

}

export default AddVacation;
