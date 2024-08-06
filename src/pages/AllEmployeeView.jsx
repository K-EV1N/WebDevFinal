import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AllEmployeeViewCSS from '../styles/AllEmployeeView.module.css'

function AllEmployeeView({initialEmployees}) {
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
                    <img className={AllEmployeeViewCSS['profile']} src={employee.profile}></img>
                    <h1 className={AllEmployeeViewCSS['name']}>{employee.name}</h1>
                    <p className={AllEmployeeViewCSS['info']}>{employee.description}</p>
    
                    <Link to="/SingleEmployeeView"><button className={AllEmployeeViewCSS['viewButton']}>view</button></Link>
                    <button className={AllEmployeeViewCSS['deleteButton']} onClick={() => deleteEmployee(employee.id)}>delete</button>
                </div>
               ))
            )}
            
            
           
        </>
    )
}

export default AllEmployeeView