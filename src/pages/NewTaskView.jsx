import { Link } from "react-router-dom";
import NewTaskViewCSS from "../styles/NewTaskView.module.css"

function NewTaskView({handleSubmit, employees}) {
    let selectPriority = (
        <p className={NewTaskViewCSS['priorityLevel']}>Priority Level:
            <label className={NewTaskViewCSS['priorityOption']}>
                <input type="radio" name="taskPriority" value="Low" /> Low
            </label>
            <label className={NewTaskViewCSS['priorityOption']}>
                <input type="radio" name="taskPriority" value="Medium" /> Medium
            </label>
            <label className={NewTaskViewCSS['priorityOption']}>
                <input type="radio" name="taskPriority" value="High" /> High
            </label>
        </p>
    );

    let selectEmployee = (
        <label className={NewTaskViewCSS['assignEmployee']}> Assign Employee: <select className={NewTaskViewCSS['select']} name="employeeId" defaultValue="null">
                <option value="null">None</option>
                {employees.map(emp => {
                    let name = emp.firstname + " " + emp.lastname;
                    return <option key={emp.id} value={emp.id}>{name}</option>;
                })}
            </select>
        </label>
    );

    return (
        <section className={NewTaskViewCSS['container']}>
            <h2 className={NewTaskViewCSS['newTask']}>Add a New Task</h2>
            <form onSubmit={handleSubmit} id="newtaskform">
                <label className={NewTaskViewCSS['taskDescription']}>
                    Description: <input className={NewTaskViewCSS['taskInput']} name="taskContent"/>
                </label>
                {selectPriority}
                {selectEmployee}
                <button className={NewTaskViewCSS['saveTaskButton']}>Add Task</button>
            </form>
            <br/>
            <Link to={'/AllTasksView'}><button className={NewTaskViewCSS['backButton']}>Back to all tasks</button></Link>
        </section>
    )
}

export default NewTaskView