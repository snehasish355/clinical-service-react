import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CollectClinicals() {
  const { patientId } = useParams();
  const [clinicalData, setClinicalData] = useState([]);
  const [entry, setEntry] = useState("");
  const [value, setValue] = useState("");

  const handleEntryChange = (event) => {
    console.log("Selected value:", event.target.value);
    setEntry(event.target.value); 
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    // Fetch patient details based on the 'paramValue'
    axios.get(`http://localhost:8090/api/patient/${patientId}`)
      .then((res) => {
        setClinicalData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }, [patientId]);

  
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      patientId: patientId,
      componentName: entry,
      componentValue: value,
    };

    // Make a POST request to save clinical data
    axios.post("http://localhost:8090/api/clinicals", data)
      .then((response) => {
        // Handle the response if needed
        if (response.status === 200) {
            // Show a success toast message
            toast.success("Added Successfully");
          } else {
            toast.error("An error occurred");
          }
      })
      .catch((error) => {
        // Handle errors if needed
        console.error("Error saving clinical data:", error);
        toast.error("An error occurred");
      });
  };


  return (
    <div>
      <h2>Patient Details</h2>
      First Name : {clinicalData.firstName} 
      Last Name : {clinicalData.lastName} 
      Age : {clinicalData.age} 
      <h2>Clinical Data</h2>
      <form>
        Clinical Entry:
        <select name="componentName" onChange={handleEntryChange} value={entry}>
          <option>Select One</option>
          <option value="bp">Blood Pressure (Sys/Dys)</option>
          <option value="hw">Height/Weight</option>
          <option value="heartRate">Heart Rate</option>
        </select>
        Value:
        <input type="text" name="componentValue" value={value} onChange={handleValueChange}/>
        <button onClick={handleSubmit}>Save</button>
      </form>
      <Link to={"/"}>Back</Link>
      <ToastContainer position="bottom" autoClose={3000} />
    </div>
  );
}

export default CollectClinicals;
