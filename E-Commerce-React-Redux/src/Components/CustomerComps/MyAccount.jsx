import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const MyAccount = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Typography variant="h6">No user data available.</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
        p={2}
      >
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography
              border={"1px solid lightgray"}
              variant="h5"
              gutterBottom
            >
              My Account
            </Typography>
            <Typography
              border={"1px solid lightgray"}
              variant="body1"
              gutterBottom
            >
              <strong>First Name:</strong> {user.firstName}
            </Typography>
            <Typography
              border={"1px solid lightgray"}
              variant="body1"
              gutterBottom
            >
              <strong>Last Name:</strong> {user.lastName}
            </Typography>
            <Typography
              border={"1px solid lightgray"}
              variant="body1"
              gutterBottom
            >
              <strong>Username:</strong> {user.username || "Not Provided"}
            </Typography>
            <Typography
              border={"1px solid lightgray"}
              variant="body1"
              gutterBottom
            >
              <strong>Password:</strong> ********
            </Typography>
            <Box border={"1px solid lightgray"} mb={2}>
              <Typography variant="body1" ml={1}>
                <strong>Allow Others to See My Orders:</strong>
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.allowOrders} // Updated field name
                    color="primary"
                    disabled
                  />
                }
                label={user.allowOrders ? "Yes" : "No"} // Updated field name
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default MyAccount;
