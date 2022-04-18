import React, {useEffect, useState} from "react";
import {getHeroes} from "../../services/heroes";
import {Button} from "@mui/material";
import {logout} from "../../services/logout";
import {useNavigate} from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<any>(null);

    const getData = async () => {
        try {
            const heroes = await getHeroes();
            setData(heroes);
        } catch (e: any) {
            if (e.response.status === 401) {
                navigate('/login', {replace: true});
            } else {
                throw new Error(e.response.data.message);
            }
        }
    }

    useEffect( () => {
       getData();
    }, []);

    // createdAt: "2022-03-09T21:22:53.536Z"
    // description: "Spider-Man has spider-like abilities including superhuman strength and the ability to cling to most surfaces. He is also extremely agile and has amazing reflexes. Spider-Man also has a “spider sense,” that warns him of impending danger. Spider-Man has supplemented his powers with technology."
    // id: 1
    // name: "Spider-Man"
    // power: "Superhuman strength, Spider web shooting"
    // shortDescription: "Spider-like abilities including superhuman strength and the ability to cling to most surfaces."
    // updatedAt: "2022-03-09T21:22:53.536Z"

    const handleLogout = async () => {
        await logout();
        navigate('/login', {replace: true});
    }


    return(
        <div style={{ height: 400, width: '100%' }}>
            <Button variant="contained" onClick={handleLogout}>Log Out</Button>
        </div>
    )
}

export {Home};