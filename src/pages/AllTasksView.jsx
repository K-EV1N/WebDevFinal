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
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Enter new task"
                    className={AllTasksViewCSS['taskInput']}
                />
                <button onClick={handleAddTask} className={AllTasksViewCSS['addButton']}>Add Task</button>
                {errors && <p className={AllTasksViewCSS['error']}>{errors}</p>}
            </div>

            {tasks.length === 0 ? (
                <p className={AllTasksViewCSS['noTasksMessage']}>No tasks available</p>
            ) : (
                <ul className={AllTasksViewCSS['taskList']}>
                    {tasks.map((task) => (  
                        <li className={AllTasksViewCSS['taskName']} key={task.id}>
                            {task.description}
                            <div className={AllTasksViewCSS['priority']}>Priority: {task.priority}</div>
                            <div className={AllTasksViewCSS['status']}>Status: {task.isComplete ? 'Complete' : 'Not Complete'}</div>
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
                        <h2>Task Details</h2>
                        <p><strong>Description:</strong> {currentTask.description}</p>
                        <p><strong>Assigned To:</strong> {currentTask.employee ? `${currentTask.employee.firstname} ${currentTask.employee.lastname}` : 'Unassigned'} </p>
                        <p><strong>Priority:</strong> {currentTask.priority}</p>
                        <p><strong>Status:</strong> {currentTask.isComplete ? 'Complete' : 'Not Complete'}</p>
                        <button onClick={closeModal} className={AllTasksViewCSS['closeButton']}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllTasksView;