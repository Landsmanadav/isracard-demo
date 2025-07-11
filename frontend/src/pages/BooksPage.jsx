import { useEffect } from "react";
import LibraryTable from "../components/LibraryTable";
import { useLibraryStore } from "../context/LibraryContext";
import { Box } from "@mui/material";

export default function BooksPage() {
  const { books, fetchBooks } = useLibraryStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // הגדרת עמודות לטבלה
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Book Title" },
    {
      field: "assignedMember",
      headerName: "Assigned Member",
      valueGetter: (row) => row.assignedMember?.fullName || "Available",
    },
    {
      field: "createdAt",
      headerName: "Created",
      valueGetter: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "",
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      valueGetter: (row) =>
        row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "",
    },
  ];

  // כפתורים מיוחדים לכל שורה
  const customButtons = (row) => (
    <div style={{ display: "flex", gap: "6px" }}>
      <button className="edit-btn btn" onClick={() => console.log("Edit", row)}>
        Edit
      </button>
      {!row.assignedMember && (
        <button
          className="delete-btn btn"
          onClick={() => console.log("Delete", row)}
        >
          Delete
        </button>
      )}
      {row.assignedMember && (
        <button
          className="unassign-btn btn"
          onClick={() => console.log("Unassign", row)}
        >
          Unassign
        </button>
      )}
    </div>
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", py: 4 }}>
      <h2>Books Management</h2>
      <LibraryTable
        rows={books}
        columns={columns}
        onEdit={(row) => console.log("Edit", row)}
        customButtons={customButtons}
      />
    </Box>
  );
}
