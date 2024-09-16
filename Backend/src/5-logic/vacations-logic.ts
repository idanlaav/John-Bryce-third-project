import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import { v4 as uuid } from "uuid";
import { OkPacket } from "mysql";
import fs from "fs"
import dal from "../2-utils/dal";
import socketLogic from "./socket-logic";
import VacationModal from "../4-models/vacation-model";

async function getAllVacations(userId: number): Promise<VacationModal[]> {
    const sql = `SELECT DISTINCT V.VacationID AS id,
    V.Description AS description,
    V.Location AS location,
    V.FromDate AS fromDate,
    V.UntilDate AS untilDate,
    V.Price AS price,
    V.ImageName AS imageName,
    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ${userId}) AS isFollowing, 
    COUNT(F.userId) AS followersCount
    FROM vacations as V LEFT JOIN followers as F
    ON V.vacationId = F.vacationId
    GROUP BY id
    ORDER BY isFollowing DESC, followersCount DESC;`;
    const vacations = await dal.execute(sql);
    return vacations;
}

async function getOneVacationById(id: number): Promise<VacationModal> {
    const sql = `SELECT VacationID AS id,
                 Description AS description,
                 Location AS location,
                 Price AS price,
                 FromDate AS fromDate,
                 UntilDate AS untilDate,
                 ImageName AS imageName
                 FROM vacations
                 WHERE VacationID = ${id}`;
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    if (!vacation) {
        throw new ResourceNotFoundError(id)
    }
    return vacation;
}

async function addVacation(vacation: VacationModal): Promise<VacationModal> {
    const errors = vacation.validatePost();
    if (errors) {
        throw new ValidationError(errors)
    }
    if (await isLocationExist(vacation.location)) {
        throw new ValidationError(`This location: "'${vacation.location}'" already exists.`)
    }
    if (vacation.image) {
        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex);
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    }
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";
    const values = [vacation.description, vacation.location, vacation.fromDate, vacation.untilDate, vacation.price, vacation.imageName];
    const result: OkPacket = await dal.execute(sql, values);
    vacation.id = result.insertId;
    const addedVacation = await getOneVacationById(vacation.id);
    socketLogic.reportAddVacation(addedVacation);
    return addedVacation;
}

async function updateFullVacationDetails(vacation: VacationModal): Promise<VacationModal> {
    const errors = vacation.validatePut();
    if (errors) {
        throw new ValidationError(errors)
    }
    if (vacation.image) {
        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex);
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    }
    const sql = `UPDATE vacations SET
                 Description = ?,
                 Location = ?,
                 FromDate = ?,
                 UntilDate = ?,
                 Price = ?,
                 ImageName = ?
                 WHERE VacationID = ?`;
    const values = [vacation.description, vacation.location, vacation.fromDate, vacation.untilDate, vacation.price, vacation.imageName, vacation.id];
    const result: OkPacket = await dal.execute(sql, values);
    socketLogic.reportUpdateVacation(vacation);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(vacation.id)
    }
    return vacation;
}

async function updatePartialVacationDetails(vacation: VacationModal): Promise<VacationModal> {
    const errors = vacation.validatePatch();
    if (errors) {
        throw new ValidationError(errors)
    }
    if (await isLocationExist(vacation.location)) {
        throw new ValidationError(`This location: "'${vacation.location}'" already exists.`)
    }
    const dbVacation = await getOneVacationById(vacation.id);
    if (vacation.image) {
        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex);
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    }
    for (const prop in dbVacation) {
        if (vacation[prop] !== undefined) {
            dbVacation[prop] = vacation[prop];
        }
    }
    const updatedVacation = await updateFullVacationDetails(new VacationModal(dbVacation));
    socketLogic.reportUpdateVacation(vacation);
    return updatedVacation;
}

async function deleteVacation(id: number): Promise<void> {
    const vacation = await getOneVacationById(id)
    fs.unlink("./src/1-assets/images/" + vacation.imageName, () => {})
    const sql = `DELETE FROM vacations WHERE VacationID =  ?`;
    const values = [id];
    const result = await dal.execute(sql, values);
    socketLogic.reportDeleteVacation(id);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(id)
    }
}

async function isLocationExist(location: string): Promise<boolean> {
    const sql = `SELECT COUNT(location) as count 
                 FROM vacations 
                 WHERE Location = ?`;
    const values = [location];
    const result = await dal.execute(sql, values);
    const count = result[0].count;
    return count > 0
}

export default {
    getAllVacations,
    getOneVacationById,
    addVacation,
    updateFullVacationDetails,
    updatePartialVacationDetails,
    deleteVacation,
}