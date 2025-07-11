import "./RowActions.scss";

export default function RowActions({
  onEdit,
  onDelete,
  onUnassign,
  assigned,
  editLabel = "Edit",
  deleteLabel = "Delete",
  unassignLabel = "Unassign",
  loading = false,
}) {
  return (
    <div className="actions-row">
      <button className="edit-btn btn" onClick={onEdit} disabled={loading}>
        {editLabel}
      </button>
      {!assigned && (
        <button
          className="delete-btn btn"
          onClick={onDelete}
          disabled={loading}
        >
          {deleteLabel}
        </button>
      )}
      {assigned && (
        <button
          className="unassign-btn btn"
          onClick={onUnassign}
          disabled={loading}
        >
          {unassignLabel}
        </button>
      )}
    </div>
  );
}
