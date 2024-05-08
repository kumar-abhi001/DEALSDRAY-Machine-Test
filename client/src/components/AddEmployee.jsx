import { useState } from "react";
import { Input } from "./Input";

export const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState(null);

  async function handleForm(e) {
    e.preventDefault();
      const formData = {
          "name": name,
          "email": email,
          "phone": phone,
          "address": address,
          "designation": designation,
            "gender": gender,
          "courses": courses,
            "image": image
    };
    console.log(formData);
    const res = await fetch("http://localhost:8000/api/employee", {
      method: "POST",
      body: formData,
    });
      
      const data = await res.json();
      alert(data.message);
    console.log(data);
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
        <Input
          type="text"
          placeholder="Address"
          value={address}
          label="Address"
          onChange={(e) => setAddress(e.target.value)}
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
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            <label className="ml-2 mr-4">Male</label>
            <input
              type="radio"
              value="Female"
              name="gender"
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
                value="MCA"
                onChange={(e) => handleCheckboxChange(e)}
              />{" "}
              MCA
            </div>
            <div>
              <input
                type="checkbox"
                value="BCA"
                onChange={(e) => handleCheckboxChange(e)}
              />{" "}
              BCA
            </div>
            <div>
              <input
                type="checkbox"
                value="BSC"
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
