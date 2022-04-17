import React from "react";
import { Route, Routes, Navigate, useNavigate} from "react-router-dom";
import {Home} from "../components/Home";
import {Login} from "../components/Login";
import {Superhero} from "../components/Superhero";
import {Button} from "@mui/material";
import {login} from "../services/login";
import {logout} from "../services/logout";
import '../components/styles.css';

const Routing: React.FC = () => {
   const token = localStorage.getItem('token');
   const navigate = useNavigate();

   const handleLogin = async () => {
       await login();
       navigate('/home', {replace: true});
   }

    const handleLogout = async () => {
       await logout();
       navigate('/login', {replace: true});
    }

    const ProtectedRoute = ({ token, children } : {token: string | null, children: any}) => {
        if (!token) {
            return <Navigate to={'/login'} replace />;
        }
        return children;
    };

   const LogButtons = (
           token ?
               <Button variant="contained" onClick={handleLogout}>Log Out</Button> :
               <Button variant="contained" onClick={handleLogin} className={'login-button'}>Log In</Button>
   );

    return(
            <>
                {LogButtons}

                <Routes>
                    <Route index element={
                        <ProtectedRoute token={token}>
                            <Home />
                        </ProtectedRoute>
                    }/>
                    <Route path='/home' element={
                        <ProtectedRoute token={token}>
                            <Home />
                        </ProtectedRoute>
                    }/>
                    <Route path='/:id' element={
                        <ProtectedRoute token={token}>
                            <Superhero />
                        </ProtectedRoute>
                    } />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </>
    )
}

export {Routing};