import "./styles/main.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import BooksPage from "./pages/BooksPage";
import MembersPage from "./pages/MembersPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { LibraryProvider } from "./context/LibraryContext";

export default function App() {
  return (
    <LibraryProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </LibraryProvider>
  );
}
