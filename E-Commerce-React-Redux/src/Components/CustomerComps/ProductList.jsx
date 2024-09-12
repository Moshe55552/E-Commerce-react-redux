import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Slider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../cartSlice"; // Updated import
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxCost, setMaxCost] = useState(100); // Initial max cost
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoriesCollection = collection(db, "categories");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoryList = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCategories(categoryList);

        const allProducts = [];
        for (const category of categoryList) {
          const productsSubcollection = collection(
            db,
            "categories",
            category.id,
            "products"
          );
          const productsSnapshot = await getDocs(productsSubcollection);
          const productList = productsSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            categoryId: category.id, // Include categoryId here
          }));
          allProducts.push(...productList);
        }

        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [maxCost, searchText, selectedCategory, products]);

  const handleAddToCart = (product) => {
    console.log("Adding product to cart:", product);
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    console.log("Removing product from cart:", product);
    const currentQuantity = getProductQuantityInCart(product.id);
    if (currentQuantity > 0) {
      dispatch(
        updateQuantity({ itemId: product.id, quantity: currentQuantity - 1 })
      );
    }
  };

  const getProductQuantityInCart = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchText) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.categoryId === selectedCategory
      );
    }

    filtered = filtered.filter((product) => product.price <= maxCost);

    setFilteredProducts(filtered);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by title"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography>Max Cost: ${maxCost}</Typography>
        <Slider
          value={maxCost}
          onChange={(e, newValue) => setMaxCost(newValue)}
          min={0}
          max={1000}
          step={10}
          valueLabelDisplay="auto"
        />
      </Box>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Card key={product.id} sx={{ mb: 2, display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={product.pictureLink}
              alt={product.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>Price: ${product.price}</Typography>
              <Typography>Available: {product.qty}</Typography>
              <Typography>Sold: {product.sold || 0}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  <AddCircleOutline />
                </IconButton>
                <Typography>{getProductQuantityInCart(product.id)}</Typography>
                <IconButton
                  color="primary"
                  onClick={() => handleRemoveFromCart(product)}
                  disabled={getProductQuantityInCart(product.id) === 0}
                >
                  <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No products available</Typography>
      )}
    </Box>
  );
};

export default ProductList;
