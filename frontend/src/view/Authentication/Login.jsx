import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Link, Grid } from "@mui/material";
import API from "../../api/api";
import FlashcardContet from "./flashCard";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/login", formData);
            console.log("Login response:", data); // Debugging
    
            localStorage.setItem("token", data.token);
    
            if (data.role === "student") {
                navigate("/dashboard");
            } else if (data.role === "admin") {
                navigate("/admin");
            } else {
                alert("Invalid user role");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Invalid credentials");
        }
    };
    
    

    return (
        <Grid container sx={{ height: "100vh" }}>
            {/* Left side: Login form */}
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
                        alignItems: "center",
                        padding: 4,
                    }}
                >
                    <Typography variant="h3" fontWeight={600} component="h1" color="#388E3C" textAlign="center" sx={{ marginBottom: "-67px" }}>
                        Welcome Back!
                    </Typography>
                    <Typography variant="h6" component="h1" color="#388E3C" textAlign="center" sx={{ mt: 5 }}>
                        Let’s continue your journey to smarter learning.
                    </Typography>
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
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        fontWeight={600}
                        sx={{
                            backgroundColor: "#388E3C",
                            "&:hover": {
                                backgroundColor: "#508D4E",
                            },
                        }}
                    >
                        Login
                    </Button>
                    <Typography variant="body2" textAlign="center">
                        Don't have an account?{" "}
                        <Link href="/register" underline="hover" color="success.main">
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Grid>

            {/* Right side: Black background */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    backgroundColor: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <FlashcardContet />
            </Grid>
        </Grid>
    );
};

export default Login;
