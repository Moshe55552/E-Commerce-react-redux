import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../userSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        dispatch(loginSuccess(userData));

        // Redirect based on user role
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/customer");
        }
      } else {
        setError("User data not found in Firestore.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError(`Failed to log in: ${err.message}`);
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Card sx={{ width: "100%", backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
            <Box mt={2} sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                New User? <Link to="/register">Register</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
