import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AllEmployeesViewCSS from '../styles/AllEmployeesView.module.css'

function AllEmployeesView({initialEmployees}) {
    const [employees, setEmployees] = useState(initialEmployees);

    const deleteEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    }

    return (
        <>
            {employees.length === 0 ? (
                <p className={AllEmployeesViewCSS['noEmployeeMessage']}>No Employees</p>
            ) : (
                employees.map(employee => (
                    <div key={employee.id} className={AllEmployeesViewCSS['box']}>
                    <img className={AllEmployeesViewCSS['profile']} src={"https://via.placeholder.com/150"} alt={employee.name}></img>
                    <h1 className={AllEmployeesViewCSS['firstName']}>{employee.firstname}</h1>
                    <h1 className={AllEmployeesViewCSS['lastName']}>{employee.lastname}</h1>
                    <p className={AllEmployeesViewCSS['info']}>{employee.department}</p>
                    
                    <Link to={`/SingleEmployeeView/${employee.id}`}><button className={AllEmployeesViewCSS['viewButton']}>View</button></Link>
                    <button className={AllEmployeesViewCSS['deleteButton']} onClick={() => deleteEmployee(employee.id)}>Delete</button>
                </div>
               ))
            )}
            <Link to="/AddEmployee"><button className={AllEmployeesViewCSS['AddEmployee']}>Add Employee</button></Link>
            <Link to="/"><button className={AllEmployeesViewCSS['backButton']}>Back</button></Link>
            
        </>
    )
}

export default AllEmployeesView