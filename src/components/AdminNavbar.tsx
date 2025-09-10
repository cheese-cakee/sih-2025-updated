import { LogOut } from "lucide-react";

interface Props {
  onLogout: () => void;
}

const AdminNavbar = ({ onLogout }: Props) => {
  return (
    <div className="w-full bg-white shadow-md flex justify-between items-center px-6 py-3">
      <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        <LogOut size={18}/> Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
