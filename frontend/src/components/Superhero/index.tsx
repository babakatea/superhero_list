import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {HeroesData} from "../../interfaces";
import {getHero} from "../../services/heroes";
import '../styles.css';

const Superhero: React.FC = () => {
    const navigate = useNavigate();
    const [hero, setHero] = useState<HeroesData>(null);
    const heroId = window.location.pathname.split('/')[2];

    const getData = async (id: number) => {
        try {
            const thisHero = await getHero(id);
            setHero(thisHero);
        } catch (e: any) {
            if (e.response.status === 401) {
                navigate('/login', {replace: true});
            } else {
                throw new Error(e.response.data.message);
            }
        }
    }

    useEffect(() => {
        if (!hero) {
            getData(+heroId);
        }
    });

    return(
        <div className={'hero-description-container'}>
            <Button
                variant="contained"
                size={'small'}
                onClick={() => navigate('/home', {replace: true})}
            >
                Back
            </Button>
            <div className={'hero-description'}>
                <div>
                    <p><b>Name: </b> {hero?.name} </p>
                    <p><b>Short description: </b> {hero?.shortDescription}</p>
                    <p><b>Power: </b> {hero?.power}</p>
                    <p><b>Description: </b> {hero?.description}</p>
                </div>
                <div className={`${hero?.name}-pic`} />
            </div>
        </div>
    )
}

export {Superhero};