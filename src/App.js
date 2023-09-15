import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import CollectClinicals from './components/CollectClinicals';
import AddPatient from './components/AddPatient';
import Analyze from './components/Analyze';
import ChartGenerator from './components/ChartGenerator';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path ='/' Component={Home}/>
        <Route exact path ='/patient/:patientId' Component={CollectClinicals}/>
        <Route exact path ='/addPatient' Component={AddPatient}/>
        <Route exact path ='/analyze/:patientId' Component={Analyze}/>
        <Route exact path ='/chart/:componentName/:patientId' Component={ChartGenerator}/>
      </Routes>
    </div>
  );
}

export default App;
