import NewTaskView from "../pages/NewTaskView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addTask } from "../store/TaskRedux";
import { fetchEmployees } from "../store/EmployeeRedux";

function NewTaskContainer() {
    const employees = useSelector((state) => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmployees());
      }, [dispatch]);

    const handleSubmit = (e) => {
        // Prevent server submission
        e.preventDefault();

        // Get data from form
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if(!formJson.taskContent || !formJson.taskPriority) {
            alert("Please fill out all the fields before adding a new task");
            return;
        }

        // Create the task object and dispatch the `addTask` thunk
        const newTask = {
          description: formJson.taskContent,
          priority: formJson.taskPriority,
          employeeId: JSON.parse(formJson.employeeId)
        };

        dispatch(addTask(newTask));
        
        // Reset the form so another task can be added
        e.currentTarget.reset();

        alert("Task added successfully!");
      }

    return (
        <NewTaskView handleSubmit={handleSubmit} employees={employees}/>
    );

}

export default NewTaskContainer;