import Sidebar from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="d-flex">
      <div className="bg-black text-white vh-100" style={{ width: "250px" }}>
        <Sidebar />
      </div>
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
