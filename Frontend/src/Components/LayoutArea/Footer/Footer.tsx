import { useEffect, useState } from "react";
import TotalVacations from "../../VacationsArea/TotalVacations/TotalVacations";
import "./Footer.css"

function Footer(): JSX.Element {
    
    const [hasToken, setHasToken] = useState(false)
    useEffect(() => {
        setHasToken(false)
        const token = localStorage.getItem('token')
        if (token) setHasToken(true)
    })

    return (
        <div className="Footer">
            {hasToken &&
            <div className="Footer">
            <TotalVacations />
            </div>
            }
            <h5>All Rights Reserved &copy; To Idan Laav</h5>
        </div>
    );
}

export default Footer;