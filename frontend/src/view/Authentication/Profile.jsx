import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const { data } = await API.get("/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(data);
            } catch (err) {
                console.error(err);
                alert("Session expired, please log in again.");
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) return <h2>Loading...</h2>;

    return (
        <div className="profile-container">
            <h1>Hi, {user.fullName}!</h1>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;
