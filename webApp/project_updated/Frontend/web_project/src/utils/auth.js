// utils/auth.js
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

export const setAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
};

export const setRefreshToken = (refreshToken) => {
    localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
}

export const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
};

export const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken');
};

export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const isTokenExpired = () => {
    const token = getAccessToken();
    if (!token) return true;

    const decodedToken = decodeToken(token);
    if (!decodedToken) return true;

    // Check if the token will expire in the next 5 minutes
    return decodedToken.exp * 1000 < Date.now() + 5 * 60 * 1000;
    //return decodedToken.exp * 1000 < Date.now();
};

export const isLoggedIn = () => {
    return !!getAccessToken() && !isTokenExpired();
};

export const getUserInfo = () => {
    const token = getAccessToken();
    if (!token) return null;
    return decodeToken(token);
};

const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${process.env.SERVER_API}/api/refreshtoken`, {
            refreshToken: getRefreshToken()
        });

        const newAccessToken = response.data.accessToken;

        if (newAccessToken) {
            setAccessToken(newAccessToken);
            console.log("Access token refreshed successfully");
            return true;
        } else {
            console.log("No new access token received");
            return false;
        }
    } catch (error) {
        console.error("Error refreshing token:", error.response?.data?.message || error.response?.status || error.message);
        return false;
    }
};

export const authCheckPassed = async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken) {
        if (!isTokenExpired()) {
            return true;
        }

        if (refreshToken) {
            const refreshSuccessful = await refreshAccessToken();
            if (!refreshSuccessful) {
                removeAccessToken();
                removeRefreshToken();
            }
            return refreshSuccessful;
        } else {
            removeAccessToken();
            return false;
        }
    } else if (refreshToken) {
        const refreshSuccessful = await refreshAccessToken();
        if (!refreshSuccessful) {
            removeRefreshToken();
        }
        return refreshSuccessful;
    }

    return false;
};