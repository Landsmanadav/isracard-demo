import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link, useLocation } from "react-router-dom";
import { useLibraryStore } from "../context/LibraryContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function Header() {
  const { cursor, animation, lang, toggleCursor, toggleAnimation, toggleLang } =
    useLibraryStore();
  const location = useLocation();
  const isRoot = location.pathname === "/";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Drawer state
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => setOpen((prev) => !prev);

  // Items for drawer
  const menuItems = [
    !isRoot && { text: "Main", to: "/" },
    { text: "Books", to: "/books" },
    { text: "Members", to: "/members" },
  ].filter(Boolean);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#222222", color: "#fff" }}
      >
        <Toolbar>
          {/* Logo + Language toggle */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Library System
            {isRoot && (
              <Button
                onClick={toggleLang}
                color="secondary"
                size="small"
                sx={{ ml: 1, fontSize: "1rem" }}
              >
                {lang ? "IT" : "EN"}
              </Button>
            )}
          </Typography>

          {/* Desktop: Show toggles & buttons */}
          {!isMobile ? (
            <>
              {isRoot && (
                <>
                  <Button
                    onClick={toggleCursor}
                    color="inherit"
                    size="small"
                    sx={{ mr: 1, minWidth: 0 }}
                  >
                    {cursor ? "HIDE CURSOR" : "SHOW CURSOR"}
                  </Button>
                  <Button
                    onClick={toggleAnimation}
                    color="inherit"
                    size="small"
                    sx={{ mr: 2, minWidth: 0 }}
                  >
                    {animation ? "HIDE ANIMATION" : "SHOW ANIMATION"}
                  </Button>
                </>
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
            </>
          ) : (
            // Mobile: Hamburger menu
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={open}
                onClose={handleDrawerToggle}
                PaperProps={{
                  sx: { backgroundColor: "#222222", color: "#fff" },
                }}
              >
                <List sx={{ minWidth: 180 }}>
                  {/* ניווט */}
                  {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                      <ListItemButton
                        component={Link}
                        to={item.to}
                        onClick={handleDrawerToggle}
                      >
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {isRoot && (
                    <>
                      <Divider sx={{ my: 1, background: "#444" }} />
                      {/* הטוגלים בתוך הדרואר */}
                      <ListItem disablePadding>
                        <ListItemButton onClick={toggleCursor}>
                          <ListItemText
                            primary={cursor ? "HIDE CURSOR" : "SHOW CURSOR"}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton onClick={toggleAnimation}>
                          <ListItemText
                            primary={
                              animation ? "HIDE ANIMATION" : "SHOW ANIMATION"
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                </List>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
