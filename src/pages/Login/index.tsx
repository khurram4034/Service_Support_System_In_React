import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: false,
    password: false,
  });

  const { loading, login } = useAuth();

  const validateEmail = (email: any) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Basic validations
    if (!loginState.email || !validateEmail(loginState.email)) {
      setLoginErrors({ ...loginErrors, email: true });
    } else {
      setLoginErrors({ ...loginErrors, email: false });
    }

    if (!loginState.password) {
      setLoginErrors({ ...loginErrors, password: true });
    } else {
      setLoginErrors({ ...loginErrors, password: false });
    }

    // Proceed with login logic if validations pass
    if (loginState.email && loginState.password) {
      // Handle login logic here
      login({
        username: loginState.email,
        password: loginState.password,
      });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "32px" }}>
          Login
        </Typography>
        <Box sx={{ width: "300px" }}>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={loginState.email}
              onChange={(e) => {
                setLoginState((state) => ({ ...state, email: e.target.value }));
              }}
              helperText={loginErrors.email ? "Invalid email" : ""}
              error={loginErrors.email}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={loginState.password}
              onChange={(e) => {
                setLoginState((state) => ({
                  ...state,
                  password: e.target.value,
                }));
              }}
              fullWidth
              helperText={loginErrors.password ? "Invalid password" : ""}
              error={loginErrors.password}
              sx={{ marginBottom: "16px" }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              type="submit"
            >
              {loading && (
                <CircularProgress
                  size={24}
                  // sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12 }}
                />
              )}
              {!loading && "Login"}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
