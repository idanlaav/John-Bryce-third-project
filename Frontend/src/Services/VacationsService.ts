import { addVacationAction, deleteVacationAction, fetchVacationsAction, updateVacationAction } from "../Redux/VacationsState";
import axios from "axios";
import store from "../Redux/Store";
import config from "../Utils/Config";
import VacationModel from "../Models/VacationModel";

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = store.getState().vacationsState.vacations;
        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(config.vacationUrl)
            vacations = response.data;
            store.dispatch(fetchVacationsAction(vacations))
        }
        return vacations;
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        const vacations = await this.getAllVacations();
        const vacation = vacations.find(p => p.id === id)
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("location", vacation.location);
        formData.append("price", vacation.price.toString());
        formData.append("fromDate", vacation.fromDate);
        formData.append("untilDate", vacation.untilDate);
        formData.append("image", vacation.image.item(0));
        const response = await axios.post<VacationModel>(config.vacationUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        const addVacation = response.data;
        store.dispatch(addVacationAction(addVacation))
        return addVacation
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("location", vacation.location);
        formData.append("price", vacation.price.toString());
        formData.append("fromDate", vacation.fromDate);
        formData.append("untilDate", vacation.untilDate);
        formData.append("imageName", vacation.imageName);
        formData.append("image", vacation.image.item(0));
        const response = await axios.put<VacationModel>(config.vacationUrl + vacation.id, formData);
        const updatedVacation = response.data;
        store.dispatch(updateVacationAction(updatedVacation))
        return updatedVacation
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(config.vacationUrl + id);
        store.dispatch(deleteVacationAction(id))
    }

}

const vacationsService = new VacationsService();

export default vacationsService;


