import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store/EmployeeRedux';
import AddEmployeeCSS from '../styles/AddEmployee.module.css'

function AddEmployee() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if(firstname && lastname && department) {
            const newEmployee = {
                firstname,
                lastname,
                department
            };

            dispatch(addEmployee(newEmployee));
            setFirstName('');
            setLastName('');
            setDepartment('');
        } else {
            alert('Please fill out all the fields.')
        }
    }
    return (
        <>
            <div className={AddEmployeeCSS['container']}>
                <h1 className={AddEmployeeCSS['header']}>Add Employee</h1>
                <input 
                    className={AddEmployeeCSS['firstName']} 
                    placeholder='First Name'
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                ></input>

                <input 
                    className={AddEmployeeCSS['lastName']} 
                    placeholder='Last Name'
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                ></input>

                <input 
                    className={AddEmployeeCSS['department']} 
                    placeholder='Department'
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                ></input>
                
                <button className={AddEmployeeCSS['addEmployee']} onClick={handleSubmit} >Add Employee</button>
                <Link to="/AllEmployeesView"><button className={AddEmployeeCSS['backButton']}>Back</button></Link>
            </div>

        </>
    )
}

export default AddEmployee