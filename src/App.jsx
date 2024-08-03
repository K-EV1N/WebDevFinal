
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import HomeCSS from '../src/styles/home.module.css'
import SingleEmployeeView from './pages/SingleEmployeeView'
import SingleEmployeeViewCSS from '../src/styles/SingleEmployeeView.module.css'


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


  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/SingleEmployeeView" element={<SingleEmployeeView employee={employeeData}/>}/>
      </Routes>
    </Router>
    </>
  )
    
    
}

export default App
