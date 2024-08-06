    import React, {useState} from 'react';
    import { Link } from 'react-router-dom';
    import SingleEmployeeViewCSS from '../styles/SingleEmployeeView.module.css'

    function SingleEmployeeView({employee}) {
        // const [employee, setEmployee] = useState({
        //     firstName: '',
        //     lastName: '',
        //     department: '',
        //     description: '',
        //     priorityLevel: '',
        //     completionLevel: '',
        //     tasks: ["Task 1", "Task 2"]
        // });

        const [tasks, setTasks] = useState(employee.tasks || []);
        const [newTask, setNewTask] = useState("");


        function handleInputChange(event) {
            setNewTask(event.target.value);
        }

        // Add Task
        function addTask() {
            if(newTask.trim() !== "") {
                setTasks(t => [...t, newTask]);
                setNewTask("");
            }   
            
        }

        // Delete Task
        function deleteTask(index) {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        }

        function handleKeyPress(event) {
            if(event.key === 'Enter') {
                addTask();
            }
        }


        return (
            <>
                <div className={SingleEmployeeViewCSS['box']}>
                    <h1>{employee.firstName} </h1>
                    <h1>{employee.lastName}</h1>

                        <input 
                            className={SingleEmployeeViewCSS['input']} 
                            type="text" 
                            placeholder="Enter a task" 
                            value={newTask} 
                            onChange={handleInputChange} 
                            onKeyDown={handleKeyPress}>
                        </input>


                    <button className={SingleEmployeeViewCSS['addButton']} onClick={addTask}>Add Task</button>
                    <Link to="/AllEmployeeView"><button className={SingleEmployeeViewCSS['backButton']}>Back</button></Link>

                    {tasks.length === 0 ? (
                        <p className={SingleEmployeeViewCSS['noTasksMessage']}>No tasks assigned to this employee.</p>
                    ) : (
                    
                    <ol className={SingleEmployeeViewCSS['taskList']}>
                        {tasks.map((task, index) => 
                            <li key={index}>
                                <span className={SingleEmployeeViewCSS['text']}>{task}</span>
                                <div className={SingleEmployeeViewCSS['buttonContainer']}>
                                    <button className={SingleEmployeeViewCSS['viewButton']}>View</button>
                                    <button className={SingleEmployeeViewCSS['deleteButton']} onClick={() => deleteTask(index)}>Delete</button>
                                </div>
                            </li>
                        )}
                    </ol>
                    )}
                </div>
            </>
        )
    }

    export default SingleEmployeeView