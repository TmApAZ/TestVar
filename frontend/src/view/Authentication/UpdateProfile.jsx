import React, { useState } from "react";
import API from "../../api/api";

const UpdateProfile = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        mobile_number: "",
        grade: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put("/auth/user", formData);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Update failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Profile</h2>
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
            <input type="text" name="mobile_number" placeholder="Mobile Number" onChange={handleChange} />
            <input type="text" name="grade" placeholder="Grade" onChange={handleChange} />
            <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateProfile;
