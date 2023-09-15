import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8090/api/patients").then((res) => {
        setPatientData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Patients :</h2>

      <table align="center">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {patientData.map((patient) => (<RowCreator key={patient.id} item={patient} /> ))}
        </tbody>
      </table>
      <Link to={"/addPatient"}><font size="5">Register Patient</font></Link>
    </div>
  );
}

function RowCreator(props) {
  var patient = props.item;
  return (
    <tr>
      <td>{patient.id}</td>
      <td>{patient.firstName}</td>
      <td>{patient.lastName}</td>
      <td>{patient.age}</td>
      <td>
        <Link to={"patient/" + patient.id}>Add Details</Link>
      </td>
      <td>
        <Link to={"analyze/" + patient.id}>Analyze</Link>
      </td>
    </tr>
  );
}

export default Home;
