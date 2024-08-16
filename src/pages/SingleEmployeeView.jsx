    import React, {useState, useEffect} from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { useSelector, useDispatch } from 'react-redux';
    import {deleteTask, fetchTasks} from '../store/TaskRedux'
    import SingleEmployeeViewCSS from '../styles/SingleEmployeeView.module.css'
   


    function SingleEmployeeView() {
        const { id } = useParams();
        const dispatch = useDispatch();
        const [employee, setEmployee] = useState(null);
        const allTasks = useSelector(state => state.tasks);
        const [tasks, setTasks] = useState([]);
        

        useEffect(() => {
            const fetchEmployeeData = async () => {
                const employeeId = parseInt(id);
                const response = await fetch(`http://localhost:5001/api/employees/${employeeId}`);
                const data = await response.json();
                setEmployee(data);
            };
            fetchEmployeeData();
            dispatch(fetchTasks());
        }, [id, dispatch]);

        useEffect(() => {
            const employeeTasks = allTasks.filter(task => task.employeeId === parseInt(id));
            setTasks(employeeTasks);
        }, [allTasks, id]);

    
        // Add Task
        function addTask() {
            if(newTask.trim() !== "") {
                setTasks(t => [...t, {description: newTask.trim() }]);
                setNewTask("");
            }   
            
        }

        // Delete Task
        const handleDeleteTask = (taskId) => {
            dispatch(deleteTask(taskId));
        };


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
            return <p>No Employees assigned to this task</p>;
        }


        return (
            <>
                <div className={SingleEmployeeViewCSS['box']}>
                    <h1 className={SingleEmployeeViewCSS['firstName']}>{employee.firstname}</h1>
                    <h1 className={SingleEmployeeViewCSS['lastName']}>{employee.lastname}</h1>
                    <p className={SingleEmployeeViewCSS['department']}>{employee.department || 'N/A'}</p>



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
                                    <Link to={`/SingleEmployeeView/${employee.id}`}></Link><button className={SingleEmployeeViewCSS['deleteButton']} onClick={() => handleDeleteTask(task.id)}>Delete</button>
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