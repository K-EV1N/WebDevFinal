
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import SingleEmployeeView from './pages/SingleEmployeeView'
import AllEmployeeView from './pages/AllEmployeeView'
import AddEmployee from './pages/AddEmployee'
import AllTasksView from './styles/AllTasksView'


function App() {

  const employeeData = {
    firstName: 'Eren',
    lastName: 'Yager',
    department: 'Survey Corps',
    description: 'Leader',
    priorityLevel: 'High',
    completionLevel: '75%',
    tasks: ["Go to work", "Train", "Fight"]
};

const initialEmployees = [
  { id: 1, name: 'Eren Yager', description: 'Leader', profile: '../src/assets/eren.jpg' },
  { id: 2, name: 'Mikasa Ackerman', description: 'Soldier', profile: '../src/assets/eren.jpg' },
  { id: 3, name: 'Armin Arlert', description: 'Strategist', profile: '../src/assets/eren.jpg' }
];


  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/AllEmployeeView" element={<AllEmployeeView initialEmployees={initialEmployees}/>}/>
        <Route path="/AddEmployee" element={<AddEmployee/>}/>
        <Route path="/SingleEmployeeView" element={<SingleEmployeeView employee={employeeData}/>}/>
        <Route path="/AllTasksView" element={<AllTasksView/>}/>
      </Routes>
    </Router>
    </>
  )
    
    
}

export default App
