    import React, {useState, useEffect} from 'react';
    import { useParams, Link } from 'react-router-dom';
    import SingleEmployeeViewCSS from '../styles/SingleEmployeeView.module.css'

    function SingleEmployeeView({employees}) {
        const { id } = useParams();
        const [employee, setEmployee] = useState(null);
        const [tasks, setTasks] = useState([]);
        const [newTask, setNewTask] = useState("");

    useEffect(() => {
        console.log("SingleEmployeeView useEffect, id:", id, "employees:", employees);
        const employeeId = parseInt(id);
        const foundEmployee = employees.find(emp => emp.id === employeeId);
        if(foundEmployee) {
            console.log("Found employee:", foundEmployee);
            setEmployee(foundEmployee);
            setTasks(foundEmployee.tasks || []);
        } else {
            console.log("Employee not found");
        }
    }, [id, employees]);

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

        if(!employee) {
            return <p>Loading...</p>;
        }


        return (
            <>
                <div className={SingleEmployeeViewCSS['box']}>
                    <h1>{employee.name}</h1>
                    <p>{employee.description}</p>

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
                                    <Link to={`/SingleEmployeeView/${employee.id}`}></Link><button className={SingleEmployeeViewCSS['deleteButton']} onClick={() => deleteTask(index)}>Delete</button>
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