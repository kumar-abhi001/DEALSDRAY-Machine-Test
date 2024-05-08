import React, { useEffect, useState } from "react";
import { serverUrl } from "../../constants";
import { useNavigate } from "react-router-dom";

export const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Change this value according to your requirement
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchEmployees();
  }, []); // Fetch all employees once when the component mounts

  const fetchEmployees = () => {
    fetch(`${serverUrl}/employees`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
          setEmployees(data.data);
          console.log(data.data);
        setTotalPages(Math.ceil(data.data.length / pageSize));
      })
      .catch((error) => console.log("Error in fetching employees", error));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the index range of employees for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const currentEmployees = employees.slice(startIndex, endIndex);
    
    const editEmployee = (e) => { 
        navigate("/admin/dashboard/editemployee", { state: { id: e.target.id } });
    }

    const deleteEmployee = (e) => { 
        console.log("Delete Employee", e.target.id);
        fetch(`${serverUrl}/employee/${e.target.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        }).then((response) => response.json())
            .then((data) => {
                alert(data.message);
                fetchEmployees();
        })
    }

  return (
    <div>
      <p className="font-bold text-2xl ml-28 mb-5">Employee List</p>
      <table className="border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Created Date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee._id}>
              <td className="border p-2">{employee._id}</td>
              <td className="border p-2">
                <img
                  src={employee.picture}
                  alt="Employee"
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.email}</td>
              <td className="border p-2">{employee.phone}</td>
              <td className="border p-2">{employee.designation}</td>
              <td className="border p-2">{employee.course}</td>
              <td className="border p-2">{employee.createdAt}</td>
              <td className="border p-2">
                <button id={employee._id} className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={editEmployee}>
                  Edit
                </button>
                <button id={employee._id} className="bg-red-500 text-white px-4 py-2 rounded" onClick={deleteEmployee}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`mx-2 px-4 py-2 border ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};
