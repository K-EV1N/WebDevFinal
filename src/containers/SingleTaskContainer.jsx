import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import SingleTaskView from

function SingleTaskContainer() {
    let {taskId} = useParams();
    taskId = parseInt(taskId);

    const task = useSelector(state => 
        state.tasks.find(task => task.id === taskId)
    );
    return <SingleTaskView task={task}/>
}
export default SingleTaskContainer;
