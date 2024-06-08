'use client'

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import Cookies from "js-cookie";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://b-circles.co/">
        B-Circles
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

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
        // Save token in cookies
        Cookies.set("token", response.data.token, { expires: 7 }); // Token expires in 7 days
        // Login successful, navigate to /en
        router.push("/en");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("/images/backgrounds/login-bg.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image src="/images/logos/asm_logo.png" alt="Company Logo" width={200} height={100}  />
            <Box sx={{ mt: 3 }}>
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
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>
              <Grid container 
                sx={{ mt: 1 }}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}