import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Analyze(){

    const { patientId } = useParams();
    const [analysisData, setAnalysisData] = useState([]);

    useEffect(() => {
        // Fetch patient details based on the 'paramValue'
        axios.get(`http://localhost:8090/api/analysis/${patientId}`)
          .then((res) => {
            console.log("Selected value:", res.data);
            setAnalysisData(res.data);
          })
          .catch((error) => {
            console.error("Error fetching patient data:", error);
          });
      }, [patientId]);

        return(<div>
           <h2>Patient Details</h2>
            First Name : {analysisData.firstName} 
            Last Name : {analysisData.lastName} 
            Age : {analysisData.age} 
            <h2>Clinical Data</h2>
            {analysisData.clinicalDataList?.map((entry) => (<TableCreator key={entry.id} item={entry} />
      ))}
        </div>)
    }

    function TableCreator(props) {
        var entry = props.item;
        return (
            <table align="center">
                <tr><td><b>{entry.componentName}</b></td></tr>
                <tr>
                    
                    <td>{entry.componentValue}</td>
                    <td>{entry.measuredDateTime}</td>
                </tr>
            </table>
        );
      }


export default Analyze;