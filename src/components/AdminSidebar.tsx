import { Users, Bus, MapPin, Ticket, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-3">
        <Link to="/admin/dashboard" className="flex items-center gap-2 hover:text-yellow-400">
          <BarChart size={20}/> Dashboard
        </Link>
        <Link to="/admin/users" className="flex items-center gap-2 hover:text-yellow-400">
          <Users size={20}/> Manage Users
        </Link>
        <Link to="/admin/buses" className="flex items-center gap-2 hover:text-yellow-400">
          <Bus size={20}/> Manage Buses
        </Link>
        <Link to="/admin/routes" className="flex items-center gap-2 hover:text-yellow-400">
          <MapPin size={20}/> Manage Routes
        </Link>
        <Link to="/admin/bookings" className="flex items-center gap-2 hover:text-yellow-400">
          <Ticket size={20}/> View Bookings
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
