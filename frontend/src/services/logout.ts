import api from "../configs/api";

export const logout = async () => {
    await api.post('/logout');
}