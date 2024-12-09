import React, { useEffect, useState } from "react";
import API from "../../api/api";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await API.get("/user");
                setUser(response.data);
            } catch (error) {
                console.error(error);
                alert("Error fetching profile");
            }
        };
        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>Profile</h2>
            <img src={user.profile_picture} alt="Profile" width="150" />
            <p>Full Name: {user.fullName}</p>
            <p>Email: {user.email}</p>
            <p>Mobile Number: {user.mobile_number}</p>
            <p>Grade: {user.grade}</p>
            <p>Address: {user.address}</p>
        </div>
    );
};

export default Profile;
