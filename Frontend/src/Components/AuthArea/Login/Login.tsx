import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const navigate = useNavigate();
    const {register ,handleSubmit} = useForm<CredentialsModel>();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            await notifyService.success("You have been successfully logged-in.")
            navigate("/vacations");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }
    
    return (
        <div className="Login Box">   
            <h2>Login</h2>
    		<form onSubmit={handleSubmit(send)}>
                <label>Username: </label>
                    <input type="text" {...register("username")} />
                <label>Password: </label>
                    <input type="password" {...register("password")} />
                <button>Login</button>
                New to Vacation-Trip ? <NavLink to="/register">Register</NavLink>
            </form>
        </div>
    );

}


export default Login;



