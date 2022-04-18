import api from "../configs/api";
import {HeroesData} from "../interfaces";

export const getHeroes = async () => {
    return await api.get('/heroes');
}

export const getHero = async (id: number) => {
    return await api.get(`/heroes/${id}`);
}

export const addHero = async (data: HeroesData) => {
    await api.post(`/heroes`, data);
}

export const removeHero = async (id: number) => {
    await api.delete(`/heroes/${id}`);
}