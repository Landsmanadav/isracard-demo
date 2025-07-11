import React from "react";
import "./LibraryTable.scss";

export default function LibraryTable({ rows, columns, onEdit, customButtons }) {
  return (
    <table className="library-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.field}>{col.headerName}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col.field}>
                {col.valueGetter ? col.valueGetter(row) : row[col.field]}
              </td>
            ))}
            <td>
              {customButtons ? (
                customButtons(row)
              ) : (
                <button className="edit-btn" onClick={() => onEdit(row)}>
                  Edit
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
