import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";

function Logout(): JSX.Element {
    
    const navigate = useNavigate();
    useEffect(() => {
        try{
            authService.logout();
            alert("You have been successfully logged-out.")
            navigate("/login")
        }
        catch(err: any){
            alert(err.message)
        }
    });
    return null;

}

export default Logout;
