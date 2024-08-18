
import './App.css'
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import SingleEmployeeView from './pages/SingleEmployeeView'
import AddEmployee from './pages/AddEmployee'
import AllEmployeesContainer from './containers/AllEmployeesContainer'
import { fetchEmployees } from './store/EmployeeRedux';
import AllTasksView from './pages/AllTasksView';
import NewTaskView from './pages/NewTaskView';
import NewTaskContainer from './containers/NewTaskContainer';
import EditTaskContainer from './containers/EditTaskContainer';
import EditEmployeeContainer from './containers/EditEmployeeContainer';
import EditEmployeeView from './pages/EditEmployeeView';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/AllEmployeesView" element={<AllEmployeesContainer/>}/>
        <Route path="/AddEmployee" element={<AddEmployee/>}/>
        <Route path="/SingleEmployeeView/:id" element={<SingleEmployeeView/>}/>
        <Route path="/AllTasksView" element={<AllTasksView/>}/>
        <Route path="/NewTaskView" element={<NewTaskContainer/>}/>
        <Route path="/EditTaskView/:taskId" element={<EditTaskContainer/>}/>
        <Route path="/EditEmployeeView/:employeeId" element={<EditEmployeeContainer/>}/>
      </Routes>
    </Router>
    </>
  )
    
    
}

export default App