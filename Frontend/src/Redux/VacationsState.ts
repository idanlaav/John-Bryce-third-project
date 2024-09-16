import FollowerModel from "../Models/FollowerModel";
import VacationModel from "../Models/VacationModel";

export class VacationState {
    public vacations: VacationModel[] = [];
    public follower: FollowerModel[] = [];
}

export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

export function fetchVacationsAction(vacations: VacationModel[]): VacationsAction {
    const action: VacationsAction = {type: VacationsActionType.FetchVacations, payload: vacations };
    return action;
}

export function addVacationAction(vacations: VacationModel, vacationTwo?: VacationModel): VacationsAction {
    vacations.followersCount = vacationTwo?.followersCount
    const action: VacationsAction = {type: VacationsActionType.AddVacation, payload: vacations };
    return action;
}

export function updateVacationAction(vacations: VacationModel, vacationTwo?: VacationModel): VacationsAction {
    vacations.followersCount = vacationTwo?.followersCount
    const action: VacationsAction = {type: VacationsActionType.UpdateVacation, payload: vacations };
    return action;
}

export function deleteVacationAction(id: number): VacationsAction {
    const action: VacationsAction = {type: VacationsActionType.DeleteVacation, payload: id };
    return action;
}

export function vacationsReducer(currentState: VacationState = new VacationState(), action: VacationsAction): VacationState {
    const newState = {...currentState}

    switch(action.type) {
        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload;
            break
        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload)
            break

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(p => p.id === action.payload.id)
            if(indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload
            }
            break
        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(p => p.id === action.payload)
            if(indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1)
            }
            break
    }

    return newState

}