import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth, db } from "../firebase";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allowOrders, setAllowOrders] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        allowOrders,
      });

      console.log("Registered user:", user);
      navigate("/customer");
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error("Error registering user:", err.message);
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
        <Card sx={{ width: "100%", backgroundColor: "white" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              New User Register
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                type="email"
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allowOrders}
                    onChange={(e) => setAllowOrders(e.target.checked)}
                    color="primary"
                  />
                }
                label="Allow Others To See My Orders [OPTIONAL]"
                sx={{ mt: 2 }}
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
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
