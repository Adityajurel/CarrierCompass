
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-slate-900 px-8 py-4 text-white">

      <h1 className="text-2xl font-bold text-cyan-400">
        CareerCompass AI
      </h1>

      <div className="flex items-center gap-5">

        <Link
          to="/college-predictor"
          className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-400"
        >
          College Predictor
        </Link>

        <div>
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-slate-400">
            {user?.role}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;

