    import React, {useState, useEffect} from 'react';
    import { useParams, Link } from 'react-router-dom';
    import SingleEmployeeViewCSS from '../styles/SingleEmployeeView.module.css'
    import { useSelector } from 'react-redux';

    function SingleEmployeeView() {
        const { id } = useParams();
        const employees = useSelector(state => state.employees); 
        const [employee, setEmployee] = useState(null);
        const [tasks, setTasks] = useState([]);
        const [newTask, setNewTask] = useState("");
        

    useEffect(() => {
        const employeeId = parseInt(id);
        const foundEmployee = employees.find(emp => emp.id === employeeId);
        if(foundEmployee) {
            setEmployee(foundEmployee);
            setTasks(foundEmployee.tasks || []);
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

        const[modal, setModal] = useState(false);
        const [currentTask, setCurrentTask] = useState("");

        const openModal = (task) => {
            setCurrentTask(task);
            setModal(true);
        }

        const closeModal = () => {
            setModal(false);
            setCurrentTask("");
        }

        if(!employee) {
            return <p>Loading...</p>;
        }


        return (
            <>
                <div className={SingleEmployeeViewCSS['box']}>
                    <h1>{employee.firstname}</h1>
                    <h1>{employee.lastname}</h1>
                    <p>{employee.department}</p>

                    <input 
                        className={SingleEmployeeViewCSS['input']} 
                        type="text" 
                        placeholder="Enter a task" 
                        value={newTask} 
                        onChange={handleInputChange} 
                        onKeyDown={handleKeyPress}>
                    </input>


                    <button className={SingleEmployeeViewCSS['addButton']} onClick={addTask}>Add Task</button>
                    <Link to="/AllEmployeesView"><button className={SingleEmployeeViewCSS['backButton']}>Back</button></Link>

                    {tasks.length === 0 ? (
                        <p className={SingleEmployeeViewCSS['noTasksMessage']}>No tasks assigned to this employee.</p>
                    ) : (
                    
                    <ol className={SingleEmployeeViewCSS['taskList']}>
                        {tasks.map((task, index) => 
                            <li key={index}>
                                <span className={SingleEmployeeViewCSS['text']}>{task.description}</span>
                                <div className={SingleEmployeeViewCSS['buttonContainer']}>
                                    <button className={SingleEmployeeViewCSS['viewButton']} onClick={() => openModal(task.description)}>View</button>
                                    <Link to={`/SingleEmployeeView/${employee.id}`}></Link><button className={SingleEmployeeViewCSS['deleteButton']} onClick={() => deleteTask(index)}>Delete</button>
                                </div>
                            </li>
                        )}
                    </ol>
                    )}
                </div>
                {modal && (
                    <div className={SingleEmployeeViewCSS['modal']}>
                        <div className={SingleEmployeeViewCSS['modalContent']}>
                            <h2>Task Details</h2>
                            <p>{currentTask}</p>
                            <button onClick={closeModal}>Close</button>

                        </div>
                    </div>
                )}
                
            </>
        )
    }

    export default SingleEmployeeView