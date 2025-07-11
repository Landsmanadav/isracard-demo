// src/services/libraryService.js

// ספרים
export async function fetchBooks() {
  const res = await fetch("/api/books");
  if (!res.ok) throw new Error("Failed to fetch books");
  return await res.json();
}

export async function addBook(data) {
  const res = await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to add book");
  return await res.json();
}

export async function updateBook(id, data) {
  const res = await fetch(`/api/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to update book");
  return await res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete book");
  return id;
}
export async function unassignBook(id) {
  const res = await fetch(`/api/books/${id}/unassign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to unassign book");
  return await res.json();
}
// חברים
export async function fetchMembers() {
  const res = await fetch("/api/members");
  if (!res.ok) throw new Error("Failed to fetch members");
  return await res.json();
}

export async function addMember(data) {
  const res = await fetch("/api/members", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to add member");
  return await res.json();
}

export async function updateMember(id, data) {
  const res = await fetch(`/api/members/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to update member");
  return await res.json();
}

export async function deleteMember(id) {
  const res = await fetch(`/api/members/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete member");
  return id;
}
