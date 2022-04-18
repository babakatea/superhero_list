import api from "../configs/api";

export const logout = async () => {
    try {
        await api.post('/logout');
    } catch (e: any) {
        throw new Error(e.response.data.message);
    }
}