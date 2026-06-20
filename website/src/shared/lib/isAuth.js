import axios from "axios";
import api from "../lib/axios.js"

export const isAuthenticated = async () => {


    const backend =
        import.meta.env.VITE_BACKEND_URL;

    try {
        await api.get("/api/auth/me",
            {
                withCredentials: true
            }
        );
        return true;

    } catch (error) {
        return false;
    }
};