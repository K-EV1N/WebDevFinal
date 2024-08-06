import React from 'react';
import { Link } from 'react-router-dom';
import AddEmployeeCSS from '../styles/AddEmployee.module.css'

function AddEmployee() {
    return (
        <>
            <div className={AddEmployeeCSS['container']}>
                <input placeholder='First Name'></input>
                <input placeholder='Last Name'></input>
                <input placeholder='Department'></input>
                <button>Add Employee</button>

            </div>

        </>
    )
}

export default AddEmployee