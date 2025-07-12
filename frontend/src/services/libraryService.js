const API = import.meta.env.VITE_API_URL || "/api";

// ספרים
export async function fetchBooks() {
  console.log(import.meta.env);
  const res = await fetch(`${API}/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return await res.json();
}

export async function addBook(data) {
  const res = await fetch(`${API}/books`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to add book");
  return await res.json();
}

export async function updateBook(id, data) {
  const res = await fetch(`${API}/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to update book");
  return await res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${API}/books/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete book");
  return id;
}

export async function unassignBook(id) {
  const res = await fetch(`${API}/books/${id}/unassign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to unassign book");
  return await res.json();
}

// חברים
export async function fetchMembers() {
  const res = await fetch(`${API}/members`);
  if (!res.ok) throw new Error("Failed to fetch members");
  return await res.json();
}

export async function addMember(data) {
  const res = await fetch(`${API}/members`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to add member");
  return await res.json();
}

export async function updateMember(id, data) {
  const res = await fetch(`${API}/members/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to update member");
  return await res.json();
}

export async function deleteMember(id) {
  const res = await fetch(`${API}/members/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete member");
  return id;
}
