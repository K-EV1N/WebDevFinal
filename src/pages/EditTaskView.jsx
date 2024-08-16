import { Link } from "react-router-dom";
import EditTaskViewCSS from '../styles/EditTaskView.module.css'

function EditTaskView({ task, employees, handleSubmit}) {
    if (!task) {
        return (
          <section>
            <h2>Task not found!</h2>
          </section>
        );
      }

      return (
        <div className={EditTaskViewCSS['container']}>
        <h3 className={EditTaskViewCSS['editTask']}>Edit task information: </h3>
        <form onSubmit={handleSubmit} id="edittaskform">
            <label className={EditTaskViewCSS['taskDescription']}> Description: 
              <input className={EditTaskViewCSS['input']} name="taskContent" placeholder="Enter task name" defaultValue={task.content} required/> 
            </label>  
            <p className={EditTaskViewCSS['priorityLevel']}> Priority level:
              <label className={EditTaskViewCSS['priorityLevel']}>
                <input type="radio" name="taskPriority" value="Low" required/> Low
              </label>
              <label className={EditTaskViewCSS['priorityLevel']}>
                <input type="radio" name="taskPriority" value="Medium" /> Medium
              </label>
              <label className={EditTaskViewCSS['priorityLevel']}>
                <input type="radio" name="taskPriority" value="High" /> High
              </label>
            </p>
            <label className={EditTaskViewCSS['statusText']}> Completion status:
              <select className={EditTaskViewCSS['select']} name="completed" defaultValue={task.isComplete} required>
                <option value="false">In Progress</option>
                <option value="true">Completed</option>
              </select>
            </label>
            <br/>
            <label className={EditTaskViewCSS['assignEmployee']}> Assign employee:
              <select className={EditTaskViewCSS['select']}name="employeeId" defaultValue="null" required>
                <option value="null">None</option>
                {employees.map(emp => {
                  let name = emp.firstname + " " + emp.lastname;
                  return <option key={emp.id} value={emp.id}>{name}</option>;
                })}
              </select>
            </label>
            <button className={EditTaskViewCSS['saveTaskButton']}>Save Task</button>
          </form>
          <Link to="/AllTasksView"><button className={EditTaskViewCSS['backButton']}>Back to all tasks</button></Link>
        </div>

      );
}

export default EditTaskView;