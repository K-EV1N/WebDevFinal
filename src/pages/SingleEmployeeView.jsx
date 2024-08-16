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

    
        // Add Task
        function addTask() {
            if(newTask.trim() !== "") {
                setTasks(t => [...t, {description: newTask.trim() }]);
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
        const [currentTask, setCurrentTask] = useState(null);

        const openModal = (task) => {
            setCurrentTask(task);
            setModal(true);
        }

        const closeModal = () => {
            setModal(false);
            setCurrentTask(null);
        }

        if(!employee) {
            return <p>Loading...</p>;
        }


        return (
            <>
                <div className={SingleEmployeeViewCSS['box']}>
                    <h1 className={SingleEmployeeViewCSS['firstName']}>{employee.firstname}</h1>
                    <h1 className={SingleEmployeeViewCSS['lastName']}>{employee.lastname}</h1>
                    <p className={SingleEmployeeViewCSS['department']}>{employee.department}</p>



                    <Link to="/NewTaskView"><button className={SingleEmployeeViewCSS['addButton']} onClick={addTask}>Add Task</button></Link>
                    <Link to="/AllEmployeesView"><button className={SingleEmployeeViewCSS['backButton']}>Back</button></Link>

                    {tasks.length === 0 ? (
                        <p className={SingleEmployeeViewCSS['noTasksMessage']}>No tasks assigned to this employee.</p>
                    ) : (
                    
                    <ol className={SingleEmployeeViewCSS['taskList']}>
                        {tasks.map((task, index) => 
                            <li key={index}>
                                <span className={SingleEmployeeViewCSS['text']}>{task.description}</span>
                                <div className={SingleEmployeeViewCSS['buttonContainer']}>
                                    <button className={SingleEmployeeViewCSS['viewButton']} onClick={() => openModal(task)}>View</button>
                                    <Link to={`/SingleEmployeeView/${employee.id}`}></Link><button className={SingleEmployeeViewCSS['deleteButton']} onClick={() => deleteTask(index)}>Delete</button>
                                </div>
                            </li>
                        )}
                    </ol>
                    )}
                </div>
                {modal && currentTask && (
                    <div className={SingleEmployeeViewCSS['modal']}>
                        <div className={SingleEmployeeViewCSS['modalContent']}>
                            <h2 className={SingleEmployeeViewCSS['taskDetails']}>Task Details</h2>
                            <p className={SingleEmployeeViewCSS['currentTask']}>Task: <b>{currentTask.description}</b></p>
                            <p className={SingleEmployeeViewCSS['assignment']}>Assigned to: <b>{employee.firstname} {employee.lastname}</b></p>
                            <p className={SingleEmployeeViewCSS['priority']}>
                                Priority: <span 
                                    style={{
                                        color: 
                                            currentTask.priority === 'Low' ? 'green' :
                                            currentTask.priority === 'Medium' ? 'orange' :
                                            currentTask.priority === 'High' ? 'red' : 'black'
                                    }}
                                >
                                    <b>{currentTask.priority}</b>
                                </span>
                            </p>
                            <p className={SingleEmployeeViewCSS['status']}>Status: <span style={{color: currentTask.isComplete ? 'green' : 'red'}}><b>{currentTask.isComplete ? 'Complete' : 'Incomplete'}</b></span></p>
                            <button className={SingleEmployeeViewCSS['closeModal']} onClick={closeModal}>Close</button>

                        </div>
                    </div>
                )}
                
            </>
        )
    }

    export default SingleEmployeeView