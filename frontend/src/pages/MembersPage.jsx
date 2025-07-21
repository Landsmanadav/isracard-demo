import { useEffect, useState } from "react";
import LibraryTable from "../components/LibraryTable";
import { useLibraryStore } from "../context/LibraryContext";
import { Box, Button } from "@mui/material";
import RowActions from "../components/RowActions";
import EditMemberModal from "../components/EditMemberModal";
import AddItemModal from "../components/AddItemModal";
import "./MembersPage.scss";

export default function MembersPage() {
  const {
    members,
    books,
    loading,
    error,
    fetchMembers,
    fetchBooks,
    addMember,
    deleteMember,
    unassignBook,
    updateMember,
  } = useLibraryStore();

  const [editingMember, setEditingMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  const availableBooks = books.filter((b) => !b.assignedMember);

  useEffect(() => {
    fetchMembers();
    // fetchBooks();
  }, []);

  async function handleEditMember(row) {
    await fetchBooks();
    setEditingMember(row);
    setModalOpen(true);
  }

  async function handleSaveMember(data) {
    await updateMember(editingMember.id, data);
    setModalOpen(false);
    setEditingMember(null);
    fetchMembers();
  }

  function handleDeleteMember(id) {
    if (window.confirm("בטוח למחוק את החבר?")) {
      deleteMember(id);
    }
  }

  async function handleUnassignBook(bookId) {
    if (window.confirm("האם אתה בטוח שברצונך לבטל את השיוך של הספר?")) {
      await unassignBook(bookId);
      fetchMembers();
      // fetchBooks();
    }
  }

  async function handleOpenAddMember() {
    await fetchBooks();
    setAddMemberOpen(true);
  }

  async function handleAddMember(data) {
    await addMember({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      bookId: data.bookId || null,
    });
    setAddMemberOpen(false);
    fetchMembers();
    fetchBooks();
  }

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
    {
      field: "assignedBook",
      headerName: "Assigned Book",
      valueGetter: (row) => row.assignedBook?.title || "None",
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
      onEdit={() => handleEditMember(row)}
      onDelete={() => handleDeleteMember(row.id)}
      onUnassign={() => handleUnassignBook(row.assignedBook?.id)}
      assigned={!!row.assignedBook}
      loading={loading}
    />
  );

  return (
    <Box className="members-container">
      <h2>Members Management</h2>
      <Button
        className="btn"
        variant="contained"
        onClick={handleOpenAddMember}
        sx={{ mb: 2 }}
      >
        + Add Member
      </Button>
      <div className="table-responsive">
        <LibraryTable
          rows={members}
          columns={columns}
          onEdit={handleEditMember}
          customButtons={customButtons}
        />
      </div>
      {editingMember && (
        <EditMemberModal
          open={modalOpen}
          member={editingMember}
          books={books}
          onSave={handleSaveMember}
          onClose={() => setModalOpen(false)}
          loading={loading}
        />
      )}
      {addMemberOpen && (
        <AddItemModal
          open={addMemberOpen}
          title="Add Member"
          fields={[
            {
              name: "firstName",
              label: "First Name",
              type: "text",
              required: true,
            },
            {
              name: "lastName",
              label: "Last Name",
              type: "text",
              required: true,
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
            },
            { name: "bookId", label: "Assign Book", type: "select" },
          ]}
          selectOptions={{
            bookId: [
              { value: "", label: "-- No Book --" },
              ...availableBooks.map((b) => ({
                value: b.id,
                label: b.title,
              })),
            ],
          }}
          onSave={handleAddMember}
          onClose={() => setAddMemberOpen(false)}
          loading={loading}
        />
      )}
    </Box>
  );
}
