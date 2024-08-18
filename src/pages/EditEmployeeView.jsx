import { Link } from "react-router-dom";
import EditEmployeeViewCSS from '../styles/EditEmployeeView.module.css'

function EditEmployeeView({ employee, handleSubmit }) {
    if (!employee) {
        return (
            <section>
                <h2>Employee not found!</h2>
            </section>
        );
    }

    return (
        <div className={EditEmployeeViewCSS['container']}>
            <h3 className={EditEmployeeViewCSS['editEmployee']}>Edit employee information: </h3>
            <form onSubmit={handleSubmit} id="editemployeeform">
                <label className={EditEmployeeViewCSS['employeeName']}> First Name: 
                    <input className={EditEmployeeViewCSS['input']} name="firstname" placeholder="Enter first name" defaultValue={employee.firstname} required/> 
                </label>
                <label className={EditEmployeeViewCSS['employeeName']}> Last Name: 
                    <input className={EditEmployeeViewCSS['input']} name="lastname" placeholder="Enter last name" defaultValue={employee.lastname} required/> 
                </label>
                <label className={EditEmployeeViewCSS['employeeDepartment']}> Department:
                    <input className={EditEmployeeViewCSS['input']} name="department" placeholder="Enter department" defaultValue={employee.department} required/> 
                </label>
                <button className={EditEmployeeViewCSS['saveEmployeeButton']}>Save Employee</button>
            </form>
            <Link to="/AllEmployeesView"><button className={EditEmployeeViewCSS['backButton']}>Back to all employees</button></Link>
        </div>
    );
}

export default EditEmployeeView;