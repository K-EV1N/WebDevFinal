import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AllEmployeeViewCSS from '../styles/AllEmployeeView.module.css'

function AllEmployeeView({initialEmployees}) {
    console.log("AllEmployeeView rendered with:", initialEmployees);
    const [employees, setEmployees] = useState(initialEmployees);

    const deleteEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    }

    return (
        <>
            
            {employees.length === 0 ? (
                <p className={AllEmployeeViewCSS['noEmployeeMessage']}>No Employees</p>
            ) : (
                employees.map(employee => (
                    <div key={employee.id} className={AllEmployeeViewCSS['box']}>
                    <img className={AllEmployeeViewCSS['profile']} src={employee.profile} alt={employee.name}></img>
                    <h1 className={AllEmployeeViewCSS['firstName']}>{employee.firstname}</h1>
                    <h1 className={AllEmployeeViewCSS['lastName']}>{employee.lastname}</h1>
                    <p className={AllEmployeeViewCSS['info']}>{employee.department}</p>
                    
                    <Link to={`/SingleEmployeeView/${employee.id}`}><button className={AllEmployeeViewCSS['viewButton']}>View</button></Link>
                    <button className={AllEmployeeViewCSS['deleteButton']} onClick={() => deleteEmployee(employee.id)}>Delete</button>
                </div>
               ))
            )}
            <Link to="/AddEmployee"><button className={AllEmployeeViewCSS['AddEmployee']}>Add Employee</button></Link>
            <Link to="/"><button className={AllEmployeeViewCSS['backButton']}>Back</button></Link>
            
        </>
    )
}

export default AllEmployeeView