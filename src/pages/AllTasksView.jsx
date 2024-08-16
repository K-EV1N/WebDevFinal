import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, addTask } from '../store/TaskRedux';
import { Link } from 'react-router-dom';
import AllTasksViewCSS from '../styles/AllTasksView.module.css';

function AllTasksView() {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);
    const [newTask, setNewTask] = useState("");
    const [errors, setErrors] = useState("");

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
        validateTask(e.target.value);
    };

    const validateTask = (task) => {
        if (task.trim() === "") {
            setErrors("Task cannot be empty.");
        } else {
            setErrors("");
        }
    };

    const handleAddTask = () => {
        if (!errors && newTask.trim() !== "") {
            dispatch(addTask({ title: newTask }));
            setNewTask("");
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const handleViewClick = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    return (
        <div className={AllTasksViewCSS['container']}>
            <h1>All Tasks</h1>

            <div className={AllTasksViewCSS['addTaskContainer']}>
                <Link to="/NewTaskView"><button onClick={handleAddTask} className={AllTasksViewCSS['addButton']}>Add Task</button></Link>
                {errors && <p className={AllTasksViewCSS['error']}>{errors}</p>}
            </div>

            {tasks.length === 0 ? (
                <p className={AllTasksViewCSS['noTasksMessage']}>No tasks available</p>
            ) : (
                <ul className={AllTasksViewCSS['taskList']}>
                    {tasks.map((task) => (  
                        <li className={AllTasksViewCSS['taskName']} key={task.id}>
                            {task.description}
                            <div className={AllTasksViewCSS['priority']}>Priority: <span style={{color: task.priority === 'Low' ? 'green' : task.priority === 'Medium' ? 'orange' : task.priority === 'High' ? 'red' : 'black'}}>{task.priority}</span></div>
                            <div className={AllTasksViewCSS['status']}>Status: <span style={{color: task.isComplete ? 'green' : 'red'}}>{task.isComplete ? 'Complete' : 'Not Complete'}</span></div>
                            <button className={AllTasksViewCSS['viewButton']} onClick={() => handleViewClick(task)}>View</button>
                            <button className={AllTasksViewCSS['deleteButton']} onClick={() => handleDelete(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            <Link to="/"><button className={AllTasksViewCSS['backButton']}>Back</button></Link>

            {isModalOpen && currentTask && (
                <div className={AllTasksViewCSS['modalOverlay']}>
                    <div className={AllTasksViewCSS['modal']}>
                        <h2 className={AllTasksViewCSS['modalTaskDetail']}>Task Details</h2>
                        <p className={AllTasksViewCSS['modalDescription']}>Description: <b>{currentTask.description}</b></p>
                        <p className={AllTasksViewCSS['modalAssign']}>Assigned To: <Link to={`/SingleEmployeeView/${currentTask.employeeId}`}><b>{currentTask.employee ? `${currentTask.employee.firstname} ${currentTask.employee.lastname}` : 'Unassigned'}</b></Link></p>
                        <p className={AllTasksViewCSS['modalPriority']}>Priority: <b>
                            <span style={{ 
                                color: currentTask.priority === 'Low' ? 'green' : 
                                    currentTask.priority === 'Medium' ? 'orange' : 
                                    currentTask.priority === 'High' ? 'red' : 'black' 
                            }}>
                                {currentTask.priority}
                            </span>
                        </b>
                        </p>
                        <p className={AllTasksViewCSS['modalStatus']}>Status: <span style={{color: currentTask.isComplete ? 'green' : 'red'}}><b>{currentTask.isComplete ? 'Complete' : 'Not Complete'}</b></span></p>
                        <button className={AllTasksViewCSS['closeButton']} onClick={closeModal}>Close</button>
                        <Link to={`/EditTaskView/${currentTask.id}`}><button className={AllTasksViewCSS['editButton']}>Edit</button></Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllTasksView;