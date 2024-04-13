'use client'
// components/AuthLogin.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, CircularProgress, TextField, Typography, Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

const AuthLogin = ({ subtext, subtitle }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/admin/sign-in", formData);
      if (response.data.token) {
        // Login successful, navigate to /en
        router.push("/en");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Login" description="Login to your account">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <form onSubmit={handleSubmit}>
              <TextField
                name="username"
                label="Username"
                fullWidth
                required
                value={formData.username}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                name="password"
                label="Password"
                fullWidth
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>
              {subtext}
              {subtitle}
            </form>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AuthLogin;
