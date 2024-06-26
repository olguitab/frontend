// Profile.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

function Profile() {
    const { token } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>No user data found.</div>;
    }

    return (
        <div className="Profile">
            <h1>Profile</h1>
            <p><strong>Id:</strong> {userData.id}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.mail}</p>
        </div>
    );
}

export default Profile;
