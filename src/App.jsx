
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import HomeCSS from '../src/styles/home.module.css'
import SingleEmployeeView from './pages/SingleEmployeeView'
import SingleEmployeeViewCSS from '../src/styles/SingleEmployeeView.module.css'
import AllEmployeeView from './pages/AllEmployeeView'
import AllEmployeeViewCSS from '../src/styles/AllEmployeeView.module.css'


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
        <Route path="/SingleEmployeeView" element={<SingleEmployeeView employee={employeeData}/>}/>
      </Routes>
    </Router>
    </>
  )
    
    
}

export default App
