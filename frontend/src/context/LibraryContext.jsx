import { createContext, useContext, useReducer, useCallback } from "react";
import * as api from "../services/libraryService";

const LibraryContext = createContext();

const initialState = {
  books: [],
  members: [],
  loading: false,
  error: null,
};

function libraryReducer(state, action) {
  switch (action.type) {
    // ספרים
    case "FETCH_BOOKS_SUCCESS":
      return { ...state, books: action.payload, loading: false, error: null };
    case "ADD_BOOK_SUCCESS":
      return {
        ...state,
        books: [...state.books, action.payload],
        loading: false,
        error: null,
      };
    case "UPDATE_BOOK_SUCCESS":
      return {
        ...state,
        books: state.books.map((b) =>
          b.id === action.payload.id ? action.payload : b
        ),
        loading: false,
        error: null,
      };
    case "DELETE_BOOK_SUCCESS":
      return {
        ...state,
        books: state.books.filter((b) => b.id !== action.payload),
        loading: false,
        error: null,
      };

    // חברים
    case "FETCH_MEMBERS_SUCCESS":
      return { ...state, members: action.payload, loading: false, error: null };
    case "ADD_MEMBER_SUCCESS":
      return {
        ...state,
        members: [...state.members, action.payload],
        loading: false,
        error: null,
      };
    case "UPDATE_MEMBER_SUCCESS":
      return {
        ...state,
        members: state.members.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
        loading: false,
        error: null,
      };
    case "DELETE_MEMBER_SUCCESS":
      return {
        ...state,
        members: state.members.filter((m) => m.id !== action.payload),
        loading: false,
        error: null,
      };

    // מצב כללי
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function LibraryProvider({ children }) {
  const [state, dispatch] = useReducer(libraryReducer, initialState);

  // ספרים
  const fetchBooks = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const data = await api.fetchBooks();
      dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: data });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }, []);

  const addBook = useCallback(async (data) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const book = await api.addBook(data);
      dispatch({ type: "ADD_BOOK_SUCCESS", payload: book });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }, []);

  const updateBook = useCallback(async (id, data) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const updated = await api.updateBook(id, data);
      dispatch({ type: "UPDATE_BOOK_SUCCESS", payload: updated });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }, []);

  const deleteBook = useCallback(async (id) => {
    dispatch({ type: "SET_LOADING" });
    try {
      await api.deleteBook(id);
      dispatch({ type: "DELETE_BOOK_SUCCESS", payload: id });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }, []);

  const unassignBook = useCallback(async (bookId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const updatedBook = await api.unassignBook(bookId);
      dispatch({ type: "UPDATE_BOOK_SUCCESS", payload: updatedBook });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }, []);

  // חברים
  const fetchMembers = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const data = await api.fetchMembers();
      dispatch({ type: "FETCH_MEMBERS_SUCCESS", payload: data });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }, []);

  const addMember = useCallback(async (data) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const member = await api.addMember(data);
      dispatch({ type: "ADD_MEMBER_SUCCESS", payload: member });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }, []);

  const updateMember = useCallback(async (id, data) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const updated = await api.updateMember(id, data);
      dispatch({ type: "UPDATE_MEMBER_SUCCESS", payload: updated });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }, []);

  const deleteMember = useCallback(async (id) => {
    dispatch({ type: "SET_LOADING" });
    try {
      await api.deleteMember(id);
      dispatch({ type: "DELETE_MEMBER_SUCCESS", payload: id });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }, []);

  return (
    <LibraryContext.Provider
      value={{
        books: state.books,
        members: state.members,
        loading: state.loading,
        error: state.error,
        fetchBooks,
        addBook,
        updateBook,
        deleteBook,
        unassignBook,
        fetchMembers,
        addMember,
        updateMember,
        deleteMember,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibraryStore() {
  return useContext(LibraryContext);
}
