import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
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
  async function fetchBooks() {
    dispatch({ type: "SET_LOADING" });
    try {
      const data = await api.fetchBooks();
      dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: data });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }

  async function addBook(data) {
    dispatch({ type: "SET_LOADING" });
    try {
      const book = await api.addBook(data);
      dispatch({ type: "ADD_BOOK_SUCCESS", payload: book });
      window.scrollTo(0, 0);
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }

  async function updateBook(id, data) {
    dispatch({ type: "SET_LOADING" });
    try {
      const updated = await api.updateBook(id, data);
      dispatch({ type: "UPDATE_BOOK_SUCCESS", payload: updated });
      window.scrollTo(0, 0);
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }

  async function deleteBook(id) {
    dispatch({ type: "SET_LOADING" });
    try {
      await api.deleteBook(id);
      dispatch({ type: "DELETE_BOOK_SUCCESS", payload: id });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }

  async function unassignBook(bookId) {
    dispatch({ type: "SET_LOADING" });
    try {
      const updatedBook = await api.unassignBook(bookId);
      dispatch({ type: "UPDATE_BOOK_SUCCESS", payload: updatedBook });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }

  // חברים
  async function fetchMembers() {
    dispatch({ type: "SET_LOADING" });
    try {
      const data = await api.fetchMembers();
      dispatch({ type: "FETCH_MEMBERS_SUCCESS", payload: data });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }

  async function addMember(data) {
    dispatch({ type: "SET_LOADING" });
    try {
      const member = await api.addMember(data);
      dispatch({ type: "ADD_MEMBER_SUCCESS", payload: member });
      window.scrollTo(0, 0);
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }

  async function updateMember(id, data) {
    dispatch({ type: "SET_LOADING" });
    try {
      const updated = await api.updateMember(id, data);
      dispatch({ type: "UPDATE_MEMBER_SUCCESS", payload: updated });
      window.scrollTo(0, 0);
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }

  async function deleteMember(id) {
    dispatch({ type: "SET_LOADING" });
    try {
      await api.deleteMember(id);
      dispatch({ type: "DELETE_MEMBER_SUCCESS", payload: id });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }

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
