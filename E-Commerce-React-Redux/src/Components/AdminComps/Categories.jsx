import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoriesCollection);
      const categoryList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        await addDoc(collection(db, "categories"), { name: newCategory });
        setNewCategory("");
        fetchCategories();
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleUpdateCategory = (id) => {
    if (editId === id) {
      handleSaveCategory(id, editedCategoryName);
    } else {
      setEditId(id);
      const category = categories.find((cat) => cat.id === id);
      setEditedCategoryName(category.name);
    }
  };

  const handleSaveCategory = async (id, newName) => {
    if (newName.trim()) {
      try {
        await updateDoc(doc(db, "categories", id), { name: newName });
        fetchCategories();
        setEditId(null);
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
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
          width: 400,
          padding: 3,
          border: "1px solid gray",
          backgroundColor: "lightgray",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Categories
          </Typography>
          <br />
          {categories.map((category) => (
            <Box key={category.id} display="flex" alignItems="center" mb={2}>
              {editId === category.id ? (
                <TextField
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                  onBlur={() =>
                    handleSaveCategory(category.id, editedCategoryName)
                  }
                  autoFocus
                />
              ) : (
                <Typography variant="body1" flexGrow={1}>
                  {category.name}
                </Typography>
              )}
              <button
                style={{
                  color: "black",
                  backgroundColor: "lightgray",
                  padding: "5px",
                  marginRight: "10px",
                }}
                onClick={() => handleUpdateCategory(category.id)}
              >
                {editId === category.id ? "Save" : "Update"}
              </button>
              <button
                style={{
                  color: "black",
                  backgroundColor: "lightgray",
                  padding: "5px",
                }}
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
            </Box>
          ))}
          <Box width="370px" display="flex" mt={2}>
            <TextField
              label="Add New Category"
              variant="filled"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              fullWidth
            />
            <Button
              onClick={handleAddCategory}
              variant="contained"
              color="success"
              sx={{ ml: 2 }}
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px 20px",
              }}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Categories;
