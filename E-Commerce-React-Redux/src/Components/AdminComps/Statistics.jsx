import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Statistics = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  // Fetch data from Firestore on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products sold (for pie chart)
        const pieSnapshot = await getDocs(collection(db, "productsSold"));
        const pieData = pieSnapshot.docs.map((doc) => {
          const data = doc.data();
          return { name: data.productName, value: data.sold }; // Transform data for PieChart
        });
        console.log("Pie Data:", pieData); // Log pie data
        setPieData(pieData);

        // Fetch sales per customer (for bar chart)
        const barSnapshot = await getDocs(collection(db, "salesPerCustomer"));
        const barData = barSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.customerName,
            product1: data.product1 || 0,
            product2: data.product2 || 0,
            product3: data.product3 || 0,
          }; // Ensure fields match expected BarChart format
        });
        console.log("Bar Data:", barData); // Log bar data
        setBarData(barData);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Statistics Dashboard
      </Typography>

      <Typography variant="h6">Products Sold</Typography>
      {pieData.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx={200}
            cy={200}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <Typography>No data available for products sold.</Typography>
      )}

      <FormControl sx={{ minWidth: 120, mt: 4 }}>
        <InputLabel>Customer</InputLabel>
        <Select value={selectedCustomer} onChange={handleChange}>
          {barData.map((data) => (
            <MenuItem key={data.name} value={data.name}>
              {data.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Product Quantities Per Customer
      </Typography>
      {barData.length > 0 ? (
        <BarChart width={600} height={300} data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="product1" fill="#8884d8" />
          <Bar dataKey="product2" fill="#82ca9d" />
          <Bar dataKey="product3" fill="#ffc658" />
        </BarChart>
      ) : (
        <Typography>No data available for sales per customer.</Typography>
      )}
    </Box>
  );
};

export default Statistics;
