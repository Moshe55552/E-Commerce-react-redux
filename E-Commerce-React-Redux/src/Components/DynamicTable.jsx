// src/components/DynamicTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DynamicTable = ({ columns, data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid gray",
        borderRadius: "4px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                sx={{
                  border: "1px solid gray",
                  fontWeight: "bold", // Optional: make column names bold
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  sx={{
                    border: "1px solid gray",
                  }}
                >
                  {row[column] || "-"}{" "}
                  {/* Update this line based on your data */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
