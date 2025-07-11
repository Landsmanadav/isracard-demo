import { useEffect } from "react";
import LibraryTable from "../components/LibraryTable";
import { useLibraryStore } from "../context/LibraryContext";
import { Box } from "@mui/material";
import "./MembersPage.scss";
import RowActions from "../components/RowActions";

export default function MembersPage() {
  const { members, loading, error, fetchMembers, deleteMember } =
    useLibraryStore();

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

  const customButtons = (row) => {
    return (
      <RowActions
        onEdit={() => console.log("Edit", row)}
        onDelete={() => handleDeleteMember(row.id)}
        onUnassign={() => console.log("Unassign", row)}
        assigned={!!row.assignedBook}
        loading={loading}
      />
    );
  };
  function handleDeleteMember(id) {
    if (window.confirm("בטוח למחוק את החבר?")) {
      deleteMember(id);
    }
  }

  return (
    <Box className="members-container">
      <h2>Members Management</h2>
      <div className="table-responsive">
        <LibraryTable
          rows={members}
          columns={columns}
          onEdit={(row) => console.log("Edit", row)}
          customButtons={customButtons}
        />
      </div>
    </Box>
  );
}
