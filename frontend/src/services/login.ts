import api from "../configs/api";

export const login = async () => {
    const authData =  { name: "Test", password: "1234" };

    try {
        await api.post('/login', authData);
    } catch (e: any) {
        throw new Error(e.response.data.message);
    }
}