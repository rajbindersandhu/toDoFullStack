
export function ToDoList({todolist, setList}){
    function completeHandler(taskID){
        fetch(`http://localhost:3000/todo/${taskID}`,{
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if(res.status == 200){
                document.querySelector(`button#update-status-${taskID}`).innerHTML = "Done"
            }else{
                console.log(res.json());
            }
        }).catch(err => console.log(`ERROR: ${err}`));
    }
    return(
        <>
            {todolist.map((task) => {
                return(
                <div id="task-card" key={task._id}>
                    <h1>{task.title}</h1>
                    <h3>{task.description}</h3>
                    <button id={`update-status-${task._id}`} onClick={() => completeHandler(task._id)}>{task.completed=="true" ? "Done" : "Mark as Done"}</button>
                </div>
                )
            })}
        </>
    )
}