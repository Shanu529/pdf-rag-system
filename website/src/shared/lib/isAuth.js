import axios from "axios";




export const isAuthenticated = async () => {


    const backend =
        import.meta.env.VITE_BACKEND_URL;

    try {
        await axios.get(`${backend}/api/auth/me`,
            {
                withCredentials: true
            }
        );
        return true;

    } catch (error) {
        return false;
    }
};