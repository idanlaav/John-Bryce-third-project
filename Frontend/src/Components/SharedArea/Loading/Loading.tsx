import loadingSource from "../../../Assets/images/loading.gif";
import "./Loading.css";

function Loading(): JSX.Element {
    return (
        <div className="Loading">
            <img src={loadingSource} alt="" />
        </div>
    );
}

export default Loading;
