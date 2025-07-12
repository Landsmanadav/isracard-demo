import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export default function AddItemModal({
  open,
  title,
  fields,
  selectOptions = {},
  onSave,
  onClose,
  loading = false,
}) {
  const [form, setForm] = useState(() =>
    fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }, {}))
  );

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {fields.map((field) =>
            field.type === "select" ? (
              <TextField
                key={field.name}
                label={field.label}
                select
                value={form[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                fullWidth
                required={field.required}
              >
                {(selectOptions[field.name] || []).map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                key={field.name}
                label={field.label}
                value={form[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                type={field.type}
                required={field.required}
                fullWidth
              />
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
