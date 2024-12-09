import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Group as GroupIcon } from "@mui/icons-material";
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AutoAwesomeMotionTwoToneIcon from '@mui/icons-material/AutoAwesomeMotionTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data);
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "mobile_number", headerName: "Mobile Number", width: 180 },
    { field: "grade", headerName: "Grade", width: 100, renderCell: (params) => params.value || "-" },
    { field: "address", headerName: "Address", width: 200, renderCell: (params) => params.value || "-" },
    { field: "role", headerName: "Role", width: 150 },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    mobile_number: user.mobile_number,
    grade: user.grade,
    address: user.address,
    role: user.role,
  }));

  return (
    <Container>

      {error && (
        <Typography
          color="error"
          sx={{
            textAlign: "center",
            marginBottom: 2,
            fontWeight: "medium",
            fontSize: "1.2rem",
          }}
        >
          {error}
        </Typography>
      )}

      {/* Total Users Card */}
      <Grid container spacing={2} justifyContent="center" marginBottom={2}>
  {/* Total Users Card */}
  <Grid item xs={12} sm={6} md={4}>
    <Card elevation={5} sx={{ display: "flex", alignItems: "left", padding: 2 }}>
      <CardHeader
        avatar={<PeopleAltTwoToneIcon sx={{ fontSize: 40, color: "primary.main" }} />}
        title={<Typography variant="h6">Total Users</Typography>}
        sx={{ flexShrink: 0 }}
      />
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="h4" color="secondary">
          {totalUsers}
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  {/* Active Users Card */}
  <Grid item xs={12} sm={6} md={4}>
    <Card elevation={5} sx={{ display: "flex", alignItems: "left", padding: 2 }}>
      <CardHeader
        avatar={<AutoAwesomeMotionTwoToneIcon sx={{ fontSize: 40, color: "success.main" }} />}
        title={<Typography variant="h6">Total Cards</Typography>}
        sx={{ flexShrink: 0 }}
      />
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="h4" color="success.main">
            50K
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  {/* Pending Registrations Card */}
  <Grid item xs={12} sm={6} md={4}>
    <Card elevation={5} sx={{ display: "flex", alignItems: "left", padding: 2 }}>
      <CardHeader
        avatar={<VisibilityTwoToneIcon sx={{ fontSize: 40, color: "warning.main" }} />}
        title={<Typography variant="h6">Page views</Typography>}
        sx={{ flexShrink: 0 }}
      />
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="h4" color="warning.main">
            100K
        </Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>



      <Typography variant="h6" gutterBottom sx={{ textAlign: "left", fontWeight: "bold" }}>
        All Users
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
            getRowId={(row) => row.id}
          />
        </Box>
      )}
    </Container>
  );
};

export default AllUsers;
