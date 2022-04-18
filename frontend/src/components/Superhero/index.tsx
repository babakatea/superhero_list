import React, {useEffect, useState} from "react";
import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
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
            {hero ? (
                <div className={'hero-description'}>
                    <Card sx={{ maxWidth: 500, height: 400 }}>
                        <div className={`${hero.name}-pic`}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {hero?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {hero?.shortDescription}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 500, height: 400 }}>
                        <CardContent>
                            <Typography gutterBottom variant="body1" color="text.primary">
                                {hero?.power}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {hero?.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className={'page-not-found'}>
                    <p>This page isn't available</p>
                    <p>The link you followed may be broken, or the page may have been removed.</p>
                </div>

            )}

        </div>
    )
}

export {Superhero};