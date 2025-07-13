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
import NotFoundPage from "./pages/NotFoundPage";
import { LibraryProvider } from "./context/LibraryContext";
import Layout from "../src/hero/layout/Layout";
import Intro from "../src/hero/components/Intro/Intro";
import { Toolbar } from "@mui/material";
export default function App() {
  return (
    <LibraryProvider>
      <Router>
        <Header />
        {/* <Toolbar /> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Intro />} />
          </Route>
          <Route path="/books" element={<BooksPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </LibraryProvider>
  );
}
