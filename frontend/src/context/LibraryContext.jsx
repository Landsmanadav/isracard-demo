import { createContext, useContext, useState, useCallback } from "react";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  // דוגמת שליפה מהסרבר
  const fetchBooks = useCallback(async () => {
    const res = await fetch("/api/books");
    setBooks(await res.json());
  }, []);
  const fetchMembers = useCallback(async () => {
    const res = await fetch("/api/members");
    setMembers(await res.json());
  }, []);
  return (
    <LibraryContext.Provider
      value={{ books, members, fetchBooks, fetchMembers }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibraryStore() {
  return useContext(LibraryContext);
}
