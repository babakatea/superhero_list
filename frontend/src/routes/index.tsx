import React from "react";
import { Route, Routes} from "react-router-dom";
import {Home} from "../components/Home";
import {Login} from "../components/Login";
import {Superhero} from "../components/Superhero";
import '../components/styles.css';

const Routing: React.FC = () => {
    return(
            <>
                <Routes>
                    <Route index element={<Home />}/>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/hero/:id' element={<Superhero />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </>
    )
}

export {Routing};