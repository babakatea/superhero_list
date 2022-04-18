import React, {useEffect, useState} from "react";
import {addNewHero, deleteHero, getHeroes} from "../../services/heroes";
import {Button} from "@mui/material";
import {logout} from "../../services/logout";
import {useNavigate} from "react-router-dom";
import {HeroesTable} from "./HeroesTable";
import {HeroesData} from "../../interfaces";
import '../styles.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [heroesData, setHeroesData] = useState<HeroesData[]>([]);

    const getData = async () => {
        try {
            const {data} = await getHeroes();
            setHeroesData(data);
        } catch (e) {
            if (e.response.status === 401) {
                navigate('/login', {replace: true});
            } else {
                throw new Error(e.response.data.message);
            }
        }
    }

    useEffect( () => {
        if (!heroesData.length) {
            getData();
        }
    });

    const addHero = async (data: HeroesData) => {
        data = await addNewHero(data);
        setHeroesData([...heroesData, data]);
    }

    const removeHero = async (id: number) => {
        const removedId = await deleteHero(id);
        if (removedId) {
            setHeroesData(heroesData.filter((item) => item.id !== id));
        }
    }

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            alert('Unable to log out')
        }
        navigate('/login', {replace: true});
    }

    return(
        <>
            <Button className={'logout-button'} variant="contained" onClick={handleLogout}>Log Out</Button>
            <HeroesTable data={heroesData} removeHero={(id: number) => removeHero(id)} addHero={(data: HeroesData) => addHero(data)} />
        </>
    )
}

export {Home};