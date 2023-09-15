import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddPatient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };

    axios.post("http://localhost:8090/api/addPatient", data)
      .then((response) => {
        if (response.status === 200) {
          // Show a success toast message
          toast.success("Added Successfully");
        } else {
          toast.error("An error occurred");
        }
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error adding patient:", error);
        toast.error("An error occurred");
      });
  };

  return (
    <div>
      <h2>Create Patient</h2>
      <form>
        First Name: <input type="text" name="firstname" value={firstName} onChange={handleFirstNameChange} />
        Last Name: <input type="text" name="lastname" value={lastName} onChange={handleLastNameChange} />
        Age: <input type="text" name="age" value={age} onChange={handleAgeChange} />
        <button onClick={handleSubmit}>Confirm</button>
      </form>
      <Link to={'/'}>Back</Link>

      <ToastContainer position="bottom" autoClose={3000} />
    </div>
  );
}

export default AddPatient;
