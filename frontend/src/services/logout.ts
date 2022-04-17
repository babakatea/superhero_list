import api from "../configs/api";

export const logout = async () => {
    try {
        await api.post('/logout');
        localStorage.removeItem('token');

        return Promise.resolve();
    } catch (e: any) {
        throw new Error(e.response.data.message);
    }
}