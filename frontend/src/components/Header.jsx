import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { useLibraryStore } from "../context/LibraryContext";

export default function Header() {
  const { cursor, animation, lang, toggleCursor, toggleAnimation, toggleLang } =
    useLibraryStore();
  function handleCursorClick() {
    toggleCursor();
  }
  function handleAnimationClick() {
    toggleAnimation();
  }

  function handleLangToggle() {
    toggleLang();
  }

  const location = useLocation();
  const isRoot = location.pathname === "/";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#222222",
          color: "#ffffff",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Library System
            {isRoot && (
              <Button onClick={() => handleLangToggle()} color="secondary">
                {lang ? "IT" : "EN"}
              </Button>
            )}
          </Typography>
          {isRoot && (
            <Typography sx={{ flexGrow: 1 }}>
              <Button onClick={() => handleCursorClick()} color="inherit">
                {cursor ? "HIDE CURSOR" : "SHOW CURSOR"}
              </Button>
              <Button onClick={() => handleAnimationClick()} color="inherit">
                {animation ? "HIDE ANIMATION" : "SHOW ANIMATION"}
              </Button>
            </Typography>
          )}

          {!isRoot && (
            <Button color="inherit" component={Link} to="/">
              Main
            </Button>
          )}
          <Button color="inherit" component={Link} to="/books">
            Books
          </Button>
          <Button color="inherit" component={Link} to="/members">
            Members
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
