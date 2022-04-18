import React from "react";
import '../styles.css';
import {Button} from "@mui/material";
import {login} from "../../services/login";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login();
        navigate('/home', {replace: true});
    }

    return (
        <div className={'login-screen'}>
            <div className={'login-paper'}>
                <p>Welcome!</p>
                <Button variant="contained" onClick={handleLogin} className={'login-button'}>Log In</Button>
            </div>
        </div>
    );
}

export {Login};