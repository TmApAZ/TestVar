import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Divider, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    Typography,
    Card,
    CardContent,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

// ==============================|| ENHANCED USER CREATION FORM ||============================== //

const validationSchema = yup.object({
    name: yup.string().required('Full name is required'),
    p_no: yup
        .string()
        .matches(/^\d+$/, 'Enter a valid mobile number')
        .required('Mobile number is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    position: yup.string().required('Position is required'),
    image: yup.mixed().required('Image is required'),
});

const EnhancedUserForm = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setUploadedImage(file);
            formik.setFieldValue('image', file);

            // Generate a preview URL for the image
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    const formik = useFormik({
        initialValues: { email: '', password: '', name: '', p_no: '', position: '', image: null },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                marginTop: '-120px',
                p: 2,
            }}
        >
            <Card sx={{ maxWidth: 600, width: '100%'}}>
                <CardContent>
                    <Typography variant="h5" component="h2" textAlign="center" gutterBottom sx={{ mb:2 }}>
                        Admin Creation Form
                    </Typography>
                    <Divider sx={{ mb:2 }}/>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            
                        <Grid item xs={12}>
                                <div
                                    {...getRootProps()}
                                    style={{
                                        border: '2px dashed #388E3C',
                                        borderRadius: '50%',
                                        width: '150px',
                                        height: '150px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '0 auto',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Uploaded"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                filter: 'opacity(0.8)',
                                            }}
                                        />
                                    ) : (
                                        <Typography>Upload Image</Typography>
                                    )}
                                </div>
                                {formik.touched.image && formik.errors.image && (
                                    <Typography color="error" variant="body2" textAlign="center">
                                        {formik.errors.image}
                                    </Typography>
                                )}
                            </Grid>
                            
                    <Divider sx={{ mb:2 }}/>
                    
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    type="text"
                                    name="name"
                                    label="Full Name"
                                    variant="outlined"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="p_no"
                                    type="number"
                                    name="p_no"
                                    label="Mobile Number"
                                    variant="outlined"
                                    value={formik.values.p_no}
                                    onChange={formik.handleChange}
                                    error={formik.touched.p_no && Boolean(formik.errors.p_no)}
                                    helperText={formik.touched.p_no && formik.errors.p_no}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={formik.values.email}
                                    onChange={(event) => {
                                        const emailUsername = event.target.value.replace(/@.*/, '');
                                        formik.setFieldValue('email', emailUsername);
                                    }}
                                    onBlur={(event) => {
                                        const emailUsername = event.target.value.replace(/@.*/, '');
                                        formik.setFieldValue('email', `${emailUsername}@testvar.com`);
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">@testvar.com</InputAdornment>
                                        ),
                                    }}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        backgroundColor: '#388E3C',
                                        '&:hover': { backgroundColor: '#388E3C' },
                                        textTransform: 'none',
                                    }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EnhancedUserForm;
