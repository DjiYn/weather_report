import React from 'react';
import { useNavigate } from "react-router-dom";

const SubmitButton = (props) => {
    const navigate = useNavigate();


    const handleClick = () => {
        navigate("/search", { state: { search: props.text } });
    }

    return (
        <div>
            <button onClick={handleClick} className="btn btn-outline-success" type="submit">Search</button>
        </div>
    );
}

export default SubmitButton;