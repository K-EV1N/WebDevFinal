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

    return (
        <div className={AllTasksViewCSS['container']}>
            <h1>All Tasks</h1>
            {tasks.length === 0 ? (
                <p className={AllTasksViewCSS['noTasksMessage']}>No tasks available</p>
            ) : (
                <ul className={AllTasksViewCSS['taskList']}>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {task.description}
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

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
            <Link to="/"><button className={AllTasksViewCSS['backButton']}>Back</button></Link>
        </div>
    );
}

export default AllTasksView;