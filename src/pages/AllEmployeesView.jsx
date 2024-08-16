import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee } from '../store/EmployeeRedux';
import AllEmployeesViewCSS from '../styles/AllEmployeesView.module.css'

function AllEmployeesView() {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees);

    const handleDeleteEmployee = (id) => {
        dispatch(deleteEmployee(id));
    }

    return (
        <>
            <div className={AllEmployeesViewCSS['outerContainer']}>
                <div className={AllEmployeesViewCSS['buttonContainer']}>
                    <Link to="/"><button className={AllEmployeesViewCSS['backButton']}>Back</button></Link>
                    <Link to="/AddEmployee"><button className={AllEmployeesViewCSS['AddEmployee']}>Add Employee</button></Link>
                </div>

                    {employees.length === 0 ? (
                        <p className={AllEmployeesViewCSS['noEmployeeMessage']}>No Employees</p>
                    ) : (
                        <div className={AllEmployeesViewCSS['employeeContainer']}>
                            {employees.map(employee => (
                                <div key={employee.id} className={AllEmployeesViewCSS['box']}>
                                    <img className={AllEmployeesViewCSS['profile']} src={'/src/assets/laroi.jpeg'} alt="Profile"></img>
                                    <h1 className={AllEmployeesViewCSS['firstName']}>{employee.firstname}</h1>
                                    <h1 className={AllEmployeesViewCSS['lastName']}>{employee.lastname}</h1>
                                    <p className={AllEmployeesViewCSS['info']}>{employee.department || "N/A"}</p>

                                    <Link to={`/SingleEmployeeView/${employee.id}`}><button className={AllEmployeesViewCSS['viewButton']}>View</button></Link>
                                    <button className={AllEmployeesViewCSS['deleteButton']} onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
        </>
    )
}

export default AllEmployeesView