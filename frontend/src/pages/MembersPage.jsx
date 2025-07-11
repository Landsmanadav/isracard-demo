import { useLibraryStore } from "../context/LibraryContext";
import LibraryTable from "../components/LibraryTable";
import { useCallback, useEffect } from "react";

export default function MembersPage() {
  const { members, fetchMembers } = useLibraryStore();

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = useCallback((row) => {
    console.log("Edit", row);
  }, []);

  const handleDelete = useCallback((row) => {
    console.log("Delete", row);
  }, []);

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
  ];

  // התאמה אישית לכפתורים
  const customButtons = (row) => (
    <>
      <div style={{ display: "flex", gap: "6px" }}>
        <button className="btn" onClick={() => handleEdit(row)}>
          Edit
        </button>
        <button className="btn delete-btn" onClick={() => handleDelete(row)}>
          Delete
        </button>
      </div>
    </>
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 0" }}>
      <h2>Members</h2>
      <LibraryTable
        rows={members}
        columns={columns}
        onEdit={handleEdit}
        customButtons={customButtons}
      />
    </div>
  );
}
