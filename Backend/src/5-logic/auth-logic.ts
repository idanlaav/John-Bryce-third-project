import { UnauthorizedError, ValidationError } from "../4-models/errors-model";
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import Role from "../4-models/role-model";
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";

async function register(user: UserModel): Promise<string> {
    const errors = user.validateRegister();
    if (errors) {
        throw new ValidationError(errors);
    }
    user.username = user.username.toLowerCase();
    if(await isUsernameExist(user.username)) {
        throw new ValidationError(`This username: "${user.username}" already exists.`)
    }
    const sql = `INSERT INTO users VALUES(DEFAULT,?, ?, ?, ?, DEFAULT)`;
    user.password = cyber.hash(user.password)
    const values = [user.firstName, user.lastName, user.username, user.password];
    const result: OkPacket = await dal.execute(sql, values);
    user.id = result.insertId;
    user.role = Role.User;
    const token = cyber.getNewToken(user);
    delete user.password
    return token;
}

async function login(credential: CredentialsModel): Promise<string> {
    const errors = credential.logInValidation();
    if (errors) {
        throw new ValidationError(errors);
    }
    credential.username = credential.username.toLowerCase();    
    credential.password = cyber.hash(credential.password)
    const sql = `SELECT UserID as id, Username as username, Password as password, Role as role 
                 FROM users 
                 WHERE Username LIKE ?
                 AND Password LIKE ?;`;
    const values = [credential.username, credential.password];
    const result = await dal.execute(sql,values);
    if(result[0] === undefined) {
        throw new UnauthorizedError("Incorrect username or password")
    }    
    const token = cyber.getNewToken(result);
    delete credential.password
    return token;
}

async function isUsernameExist(username: string): Promise<boolean> {
    const sql = `SELECT COUNT(Username) as count 
                 FROM users 
                 WHERE Username = ?`;
    const values = [username];
    const result = await dal.execute(sql, values);
    const count = result[0].count;
    return count > 0
}

async function getAllUsers(): Promise<string> {
    const sql = `SELECT UserID as id,FirstName as firstName, LastName as lastName,
                 Username as username, Password as password, Role as role 
                 FROM users;`;
    const users = await dal.execute(sql);
    return users;
}

export default {
    register,
    login,
    getAllUsers
}