import React, {useEffect, useState} from "react";
import {getHeroes} from "../../services/heroes";
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

    const removeHero = async (id: number) => {
        // await removeHero(id); // Here the request should delete item
        const updatedData = heroesData.filter((item) => item.id !== id); // mock the delete request
        setHeroesData(updatedData);
    }

    const addHero = async (data: HeroesData) => {
        // await addHero(data); // Here the request should add new hero
        setHeroesData([...heroesData, data]); // mock the add request with random id
    }

    const handleLogout = async () => {
        await logout();
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