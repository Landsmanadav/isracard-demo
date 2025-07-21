import { Outlet } from "react-router-dom";
import CursorFollower from "../components/Shared/CursorFollower";
import SeaweedCanvasBg from "../components/Shared/SeaweedCanvasBg";
import { useRef } from "react";
import { useLibraryStore } from "../../context/LibraryContext";

export default function Layout() {
  const { cursor, animation } = useLibraryStore();
  return (
    <div className="layout">
      <div style={{ visibility: animation ? "unset" : "hidden" }}>
        <SeaweedCanvasBg />
      </div>
      <div style={{ visibility: cursor ? "unset" : "hidden" }}>
        <CursorFollower />
      </div>
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
