import { useEffect, useState } from "react";
import LibraryTable from "../components/LibraryTable";
import { useLibraryStore } from "../context/LibraryContext";
import { Box } from "@mui/material";
import RowActions from "../components/RowActions";
import EditMemberModal from "../components/EditMemberModal";
import "./MembersPage.scss";

export default function MembersPage() {
  const {
    members,
    books,
    loading,
    error,
    fetchMembers,
    fetchBooks,
    deleteMember,
    unassignBook,
    updateMember,
  } = useLibraryStore();

  const [editingMember, setEditingMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

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
      fetchBooks();
    }
  }

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
    </Box>
  );
}
