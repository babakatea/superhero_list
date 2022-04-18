import api from "../configs/api";

export const getHeroes = async () => {
    return await api.get('/heroes');
}

export const getHero = async (id: number) => {
    const response = await api.get(`/heroes/${id}`);
}