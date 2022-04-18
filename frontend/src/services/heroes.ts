import api from "../configs/api";
import {HeroesData} from "../interfaces";

// GET, POST, DELETE requests for hero. Better to do this in a store.

export const getHeroes = async () => {
    return await api.get('/heroes');
};

export const getHero = async (id: number) => {
    // The request below is mocked
    // await api.get(`/heroes/${id}`);

    const {data} = await getHeroes();
    return data.filter(item => item.id === id)[0];
};

export const addNewHero = async (heroesData: HeroesData) => {
    // The request below is mocked
    // await api.post(`/heroes`, heroesData);

    heroesData.id = Math.floor(Math.random() * 100);
    return heroesData;
};

export const deleteHero = async (id: number) => {
    // The request below is mocked
    // await api.delete(`/heroes/${id}`);

    return id;
};