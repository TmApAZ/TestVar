import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Link, Grid, MenuItem, Divider } from "@mui/material";
import { useDropzone } from "react-dropzone";
import API from "../../api/api";
import Flashcard from './flashCard2'

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        mobile_number: "",
        grade: "",
        address: "",
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setProfilePicture(file);
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxFiles: 1,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        if (profilePicture) {
            data.append("profile_picture", profilePicture);
        }

        try {
            await API.post("/register", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("User registered successfully!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Error registering user");
        }
    };

    return (
        <Grid container sx={{ height: "100vh", marginTop:'-50px'}}>
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    backgroundColor: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 4,
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: "100%",
                        maxWidth: 400,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        padding: 4,
                    }}
                >
                    <Typography variant="h3" fontWeight={600} color="#388E3C" textAlign="center">
                        Create an Account
                    </Typography>
                    <div
                        {...getRootProps()}
                        style={{
                            border: "2px dashed #388E3C",
                            borderRadius: "8px",
                            padding: "20px",
                            textAlign: "center",
                            cursor: "pointer",
                        }}
                    >
                        <input {...getInputProps()} />
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Uploaded Preview"
                                style={{
                                    width: "100%",
                                    maxHeight: "150px",
                                    objectFit: "cover",
                                    marginBottom: "10px",
                                }}
                            />
                        ) : (
                            <Typography>Drag & drop an image, or click to select one</Typography>
                        )}
                    </div>
                    <Divider />
                    <TextField
                        label="Full Name"
                        type="text"
                        name="fullName"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Mobile Number"
                        type="text"
                        name="mobile_number"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        label="Grade"
                        name="grade"
                        value={formData.grade}
                        fullWidth
                        onChange={handleChange}
                    >
                        {["Grade 1", "Grade 2", "University"].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Address"
                        type="text"
                        name="address"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ backgroundColor: "#388E3C", "&:hover": { backgroundColor: "#508D4E" } }}
                    >
                        Register
                    </Button>
                    <Typography variant="body2" textAlign="center">
                        Already have an account?{" "}
                        <Link href="/login" underline="hover" color="success.main">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    backgroundColor: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 4,
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: "100%",
                        maxWidth: 400,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        padding: 4,
                    }}
                >
                    <Flashcard/>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;
