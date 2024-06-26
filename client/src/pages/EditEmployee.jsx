import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { serverUrl } from "../../constants";
import { useLocation } from "react-router-dom";

export const EditEmployee = () => {
  const location = useLocation();
  const empId = location.state?.id;
  console.log("Locatin", location.state?.id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState();

  if (empId) {
    useEffect(() => { 
      fetch(`${serverUrl}/employee/${empId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const employee = data.data;
          setName(employee.name);
          setEmail(employee.email);
          setPhone(employee.phone);
          setDesignation(employee.designation);
          setImage(employee.picture);
          setCourses(employee.course);
          setGender(employee.gender);
        });
    }, []);
  }

  async function handleForm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("designation", designation);
    formData.append("image", image);
    formData.append("gender", gender);
    courses.forEach((course) => {
      formData.append("course", course);
    });

    const token = window.localStorage.getItem("token");
    fetch(`${serverUrl}/employee/edit/${empId}`, {
      method: "PATCH",
      body: formData, // Pass formData directly as the body
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 403) {
          window.localStorage.removeItem("token");
          console.log(data.message);
          window.location.href = "/";
        }
        alert(data.message);
      })
      .catch((error) => {
        console.log("Error in adding employee", error);
      });
  }

  return (
    <form
      className="flex justify-center items-center h-vh bg-[#f0f0f0]"
      onSubmit={handleForm}
    >
          <div className="flex flex-col border-4 p-4 m-20 bg-white">
            <p className="font-bold text-2xl ml-28 mb-5">Add New Employee</p>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Phone"
          value={phone}
          label="Phone No"
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="flex flex-col">
          <label className="font-[500]">Designation</label>
          <select
            id="designation"
            className="border-2 rounded-3xl h-11 w-[466.4px] p-2 text-black mt-2"
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sale">Sale</option>
          </select>
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="gender" className="font-[500]">
            Gender
          </label>
          <div className="flex">
            <input
              type="radio"
              value="Male"
              name="gender"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            <label className="ml-2 mr-4">Male</label>
            <input
              type="radio"
              value="Female"
              name="gender"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            <label className="ml-2 mr-4">Female</label>
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <label className="font-[500] mb-2">Courses</label>
          <div className="flex flex-row gap-4">
            <div>
              <input
                type="checkbox"
                checked={courses.includes("MCA")}
                value="MCA"
                onChange={(e) => handleCheckboxChange(e)}
              />{" "}
              MCA
            </div>
            <div>
              <input
                type="checkbox"
                value="BCA"
                checked={courses.includes("BCA")}
                onChange={(e) => handleCheckboxChange(e)}
              />{" "}
              BCA
            </div>
            <div>
              <input
                type="checkbox"
                value="BSC"
                checked={courses.includes("BSC")}
                onChange={(e) => handleCheckboxChange(e)}
              />{" "}
              BSC
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <label className="font-[500] mb-2">Image Upload</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button
          type="submit"
            className="border-2 rounded-3xl h-11 w-[466.4px] p-3  mt-10 text-white bg-blue-500
           hover:bg-blue-700 cursor-pointer "
        >
          Add Employee
        </button>
      </div>
    </form>
  );

  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setCourses((prevCourses) => [...prevCourses, value]);
    } else {
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course !== value)
      );
    }
  }
};
