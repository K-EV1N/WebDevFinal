import React from 'react';
import { Link } from 'react-router-dom';
import AddEmployeeCSS from '../styles/AddEmployee.module.css'

function AddEmployee() {
    return (
        <>
            <div className={AddEmployeeCSS['container']}>
                <input className={AddEmployeeCSS['firstName']} placeholder='First Name'></input>
                <input className={AddEmployeeCSS['lastName']} placeholder='Last Name'></input>
                <input className={AddEmployeeCSS['department']} placeholder='Department'></input>
                <button className={AddEmployeeCSS['addEmployee']} >Add Employee</button>

            </div>

        </>
    )
}

export default AddEmployee