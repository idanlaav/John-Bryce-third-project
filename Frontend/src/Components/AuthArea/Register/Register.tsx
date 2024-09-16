import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import "./Register.css";

function Register(): JSX.Element {

    const navigate = useNavigate();
    const {register, handleSubmit, setError,formState} = useForm<UserModel>();
    const [users,setUsers] = useState<UserModel[]>([]);
    
    useEffect(()=>{
        authService.getAllUsers()
            .then(users => {
                setUsers(users)                
            })
            .catch(err => alert(err.message));
    }, []) 
    
    async function send(user: UserModel) {
        const allUsernameFounded = users.map(u=>u.username)
        for (let i = 0; i < users.length; i++) {
            if (user.username === allUsernameFounded[i]) {
                return setError("username", { type: "focus", message: "This Username Already Exist." }, { shouldFocus: true })
            }
        }
        try {
            await authService.register(user);
            alert("You have been successfully registered.")
            navigate("/home");
        }
        catch(err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="Register Box">
            <h2>Register</h2>
			<form onSubmit={handleSubmit(send)}>
                <label>First name: </label>
                <input type="text" {...register("firstName")} required minLength={2} maxLength={15} />
                <label>Last name: </label>
                <input type="text" {...register("lastName")} required minLength={2} maxLength={25} />
                <label>Username: </label>
                <input type="text" {...register("username")} required minLength={5} maxLength={20} />
                <label>Password: </label>
                <span>{formState.errors.username?.message}</span>
                <input type="password" {...register("password")} required minLength={6} maxLength={20}/>
                <button>Register</button>
                Already have an account ?<NavLink to="/login"> Sign In</NavLink>
            </form>
        </div>
    );

}

export default Register;


