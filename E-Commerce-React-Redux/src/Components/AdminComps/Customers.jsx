import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import DynamicTable from "../DynamicTable";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const customersCollection = collection(db, "customers");
    const customerSnapshot = await getDocs(customersCollection);
    const customerList = customerSnapshot.docs.map((doc) => ({
      fullName: doc.data().fullName,
      joinedAt: doc.data().joinedAt,
      productsBought: doc.data().productsBought,
    }));
    setCustomers(customerList);
  };

  const columns = [
    <strong>Full Name</strong>,
    <strong>Joined At</strong>,
    <strong>Products Bought</strong>,
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="300px"
      p={2}
    >
      <Card
        sx={{
          width: 400,
          padding: 3,
          border: "1px solid gray",
          backgroundColor: "lightgray",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Customers
          </Typography>
          <DynamicTable columns={columns} data={customers} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Customers;
