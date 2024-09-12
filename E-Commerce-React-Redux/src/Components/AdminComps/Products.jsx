import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import DynamicTable from "../DynamicTable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    pictureLink: "",
    customers: [], // Array of objects containing {name, qty, date}
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    // Fetching products from all categories
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productList = productsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setProducts(productList);
  };

  const fetchCategories = async () => {
    const categoriesCollection = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoryList = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    setCategories(categoryList);
  };

  const handleAddNewProduct = async () => {
    if (newProduct.name && newProduct.category) {
      // Find the category document
      const categoryDoc = categories.find(
        (cat) => cat.name === newProduct.category
      );

      if (categoryDoc) {
        // Reference to the products subcollection in the selected category
        const productsSubcollection = collection(
          db,
          "categories",
          categoryDoc.id,
          "products"
        );

        // Add new product to the selected category's subcollection
        const docRef = await addDoc(productsSubcollection, newProduct);
        setProducts([...products, { ...newProduct, id: docRef.id }]);
        setNewProduct({
          name: "",
          category: "",
          description: "",
          price: "",
          pictureLink: "",
          customers: [],
        });
        setShowForm(false); // Hide form after saving
      }
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

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
          width: 800,
          padding: 3,
          border: "1px solid gray",
          backgroundColor: "lightgray",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Products
          </Typography>
          {showForm && (
            <Box display="flex" justifyContent="space-between">
              <Box flex={1} mr={2}>
                <TextField
                  id="filled-basic"
                  label="Title"
                  variant="filled"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="filled-basic"
                  label="Description"
                  variant="filled"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={10} // Set the height to 400px approximately
                  sx={{ mb: 2 }}
                />
              </Box>
              <Box flex={1}>
                <TextField
                  id="filled-basic"
                  label="Price"
                  variant="filled"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  id="filled-basic"
                  label="Link to Picture"
                  variant="filled"
                  name="pictureLink"
                  value={newProduct.pictureLink}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Bought By:
                </Typography>
                <DynamicTable
                  columns={["Name", "Qty", "Date"]}
                  data={newProduct.customers}
                />
              </Box>
            </Box>
          )}
          {showForm && (
            <Button
              onClick={handleAddNewProduct}
              variant="contained"
              color="success"
              sx={{ mt: 3, mr: "700px" }}
            >
              Save
            </Button>
          )}
        </CardContent>
      </Card>
      <Button
        onClick={() => setShowForm(true)}
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Add New
      </Button>
    </Box>
  );
};

export default Products;
