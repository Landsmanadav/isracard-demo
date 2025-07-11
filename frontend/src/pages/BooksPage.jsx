import { useEffect } from "react";
import LibraryTable from "../components/LibraryTable";
import { useLibraryStore } from "../context/LibraryContext";
import { Box } from "@mui/material";
import "./BooksPage.scss"; // ודא שהקובץ קיים
import RowActions from "../components/RowActions";
export default function BooksPage() {
  const { books, loading, error, fetchBooks, addBook, updateBook, deleteBook } =
    useLibraryStore();
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

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
        row.createdAt ? new Date(row.createdAt).toLocaleString("he-IL") : "",
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      valueGetter: (row) =>
        row.updatedAt ? new Date(row.updatedAt).toLocaleString("he-IL") : "",
    },
  ];

  const customButtons = (row) => (
    <RowActions
      onEdit={() => console.log("Edit", row)}
      onDelete={() => handleDeleteBook(row.id)}
      onUnassign={() => console.log("Unassign", row)}
      assigned={!!row.assignedMember}
      loading={loading}
    />
  );
  function handleDeleteBook(id) {
    if (window.confirm("בטוח למחוק את הספר?")) {
      deleteBook(id);
    }
  }
  return (
    <Box className="books-container">
      <h2>Books Management</h2>
      <div className="table-responsive">
        <LibraryTable
          rows={books}
          columns={columns}
          onEdit={(row) => console.log("Edit", row)}
          customButtons={customButtons}
        />
      </div>
    </Box>
  );
}
