import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState, useMemo } from "react";

export default function EditBookModal({
  open,
  book,
  members,
  onSave,
  onClose,
  loading = false,
}) {
  const [title, setTitle] = useState(book.title);
  const [memberId, setMemberId] = useState(book.assignedMember?.id ?? "");
  const availableMembers = useMemo(
    () =>
      members.filter(
        (m) => !m.assignedBook || m.id === book.assignedMember?.id
      ),
    [members, book.assignedMember]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, memberId: memberId || null });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Book</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
          <TextField
            label="Assign to Member"
            select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            fullWidth
          >
            <MenuItem value="">-- No Member --</MenuItem>
            {availableMembers.map((member) => (
              <MenuItem key={member.id} value={member.id}>
                {member.firstName} {member.lastName}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
