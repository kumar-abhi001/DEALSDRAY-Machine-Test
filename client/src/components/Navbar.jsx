import { Link, Outlet } from "react-router-dom";

export const Navbar = ({ name = "Abhishek" }) => {
    return (
      <div className="">
        <div className="flex sticky inset-0 justify-between items-center bg-[#333] text-white p-5">
          <div>
            <Link to="/admin/dashboard" className="text-2xl">
              Admin Panel
            </Link>
          </div>
          <div className="">
            <Link to="/admin/dashboard"  className="ml-5">
              Home
            </Link>
                    <Link to="/admin/dashboard/emplist" className="ml-5">Employee List</Link>
                    <Link to="/admin/dashboard/addemployee" className="ml-5">Add Employee</Link>
            <span className="ml-5">{name}-</span>
            <a href="/" className="ml-1" onClick={() => {
              window.localStorage.removeItem("token");
            }}>Logout</a>
          </div>
        </div>
        <Outlet />
      </div>
    );
}