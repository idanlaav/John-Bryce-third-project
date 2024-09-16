import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const params = useParams()
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue, setError } = useForm<VacationModel>();
    const [stateVacation, setVacation] = useState<VacationModel>();
    useEffect(() => {
        const id: number = +params.prodId;
        vacationsService.getOneVacation(id)
        .then(vacationToEdit => {
            setVacation(vacationToEdit);
            setValue("description", vacationToEdit.description)
            setValue("location", vacationToEdit.location)
            setValue("price", vacationToEdit.price)
            setValue("fromDate", vacationToEdit.fromDate)
            setValue("untilDate", vacationToEdit.untilDate)
            setValue("imageName", vacationToEdit?.imageName)
        })
        .catch(err => alert(err.message))
    })
    
    async function send(vacation: VacationModel) {
        if (vacation.fromDate > vacation.untilDate || vacation.fromDate === vacation.untilDate) {
            return setError("untilDate", { type: "focus", message: "Until date must be after from date." }, { shouldFocus: true })
        }
        try {
            vacation.id = stateVacation.id
            const updatedVacation = await vacationsService.updateVacation(vacation);
            alert("Vacation Updated! id: " + updatedVacation.id)
            navigate("/Vacations");
        }
        catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <div>
            <div className="navLinkCss">
                <NavLink to="/vacations">Vacations</NavLink>
                <span>  |  </span>
                <NavLink to="/vacations/new">Add Vacation</NavLink>
                <span>  |  </span>
                <NavLink to="/followers-report">Followers Report</NavLink>
                <span>  |  </span>
                <NavLink to="/users">Website Users</NavLink>
            </div>
            <div className="EditVacation Box">
                <h2>Edit Vacation</h2>
                <form onSubmit={handleSubmit(send)}>
                    <label>Description:</label>
                    <input type="text" {...register("description")} minLength={5} maxLength={200} required  />

                    <label>Location:</label>
                    <input type="text" {...register("location")} minLength={2} maxLength={50} required />

                    <label>Price:</label>
                    <input type="number" step="0.01" {...register("price")} min={30} max={50000} required />

                    <label>From Date:</label>
                    <input type="date" {...register("fromDate")}  minLength={5} maxLength={10} required />

                    <label>Until Date:</label>
                    <input type="date" {...register("untilDate")}  minLength={5} maxLength={10} required />
                    <div>{formState.errors.untilDate?.message}</div>
                    
                    <label>Image:</label>
                    <div className="imageCss">
                    <input type="file" accept="image/*" {...register("image")} />
                    <img src={config.vacationImagesUrl + (stateVacation?.imageName || "loading.gif")} alt="" />
                    </div>


                    <button>Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditVacation;
