import { useEffect, useState } from "react";
import LibraryTable from "../components/LibraryTable";
import { useLibraryStore } from "../context/LibraryContext";
import { Box, Button } from "@mui/material";
import "./BooksPage.scss";
import RowActions from "../components/RowActions";
import EditBookModal from "../components/EditBookModal";
import AddItemModal from "../components/AddItemModal";
export default function BooksPage() {
  const {
    members,
    books,
    loading,
    error,
    fetchBooks,
    fetchMembers,
    addBook,
    updateBook,
    deleteBook,
    unassignBook,
  } = useLibraryStore();

  const [editingBook, setEditingBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addBookOpen, setAddBookOpen] = useState(false);

  const availableMembers = members.filter((m) => !m.assignedBook);

  useEffect(() => {
    fetchBooks();
  }, []);

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
      // onEdit={() => handleEdit(row)}
      onDelete={() => handleDeleteBook(row.id)}
      onUnassign={() => handleUnassignBook(row.id)}
      assigned={!!row.assignedMember}
      loading={loading}
    />
  );

  function handleDeleteBook(id) {
    if (window.confirm("בטוח למחוק את הספר?")) {
      deleteBook(id);
    }
  }

  function handleUnassignBook(id) {
    if (window.confirm("האם אתה בטוח שברצונך לבטל את השיוך של הספר?")) {
      unassignBook(id);
    }
  }

  async function handleEdit(book) {
    await fetchMembers();
    setEditingBook(book);
    setModalOpen(true);
  }

  async function handleSave(data) {
    await updateBook(editingBook.id, data);
    setModalOpen(false);
    setEditingBook(null);
  }

  async function handleOpen() {
    await fetchMembers();
    setAddBookOpen(true);
  }
  async function handleAddBook(data) {
    await addBook({
      title: data.title,
      memberId: data.memberId || null,
    });
    setAddBookOpen(false);
    fetchBooks();
    // fetchMembers();
  }
  return (
    <Box className="books-container">
      <h2>Books Management</h2>
      <Button
        className="btn"
        variant="contained"
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        + Add Book
      </Button>
      <div className="table-responsive">
        <LibraryTable
          rows={books}
          columns={columns}
          customButtons={customButtons}
        />
      </div>
      {editingBook && (
        <EditBookModal
          open={modalOpen}
          book={editingBook}
          members={members}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
      {addBookOpen && (
        <AddItemModal
          open={addBookOpen}
          title="Add Book"
          fields={[
            {
              name: "title",
              label: "Book Title",
              type: "text",
              required: true,
            },
            { name: "memberId", label: "Assign Member", type: "select" },
          ]}
          selectOptions={{
            memberId: [
              { value: "", label: "-- No Member --" },
              ...availableMembers.map((m) => ({
                value: m.id,
                label: `${m.firstName} ${m.lastName}`,
              })),
            ],
          }}
          onSave={handleAddBook}
          onClose={() => setAddBookOpen(false)}
          loading={loading}
        />
      )}
    </Box>
  );
}
