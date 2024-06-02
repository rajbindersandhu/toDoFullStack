
export function CreateToDo({setList}){
    function addToDB(){
        const title = document.getElementById("title").value;
        const desc = document.getElementById("desc").value;
        const payload = {
            "title": title,
            "description": desc,
            "completed": false
        }

        fetch("http://localhost:3000/todo/task",{
            method:"POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if(res.status == 200){
                setList((preList) => [...preList, payload]);
                document.getElementById("title").value="";
                document.getElementById("desc").value="";
            }else{
                console.log(res.json());
            }
        })
    }

    return (
        <div id="input-card">
            <input id="title"/>
            <br />
            <input id="desc"/>
            <br />
            <button onClick={addToDB}>Add to List</button>
        </div>
    )
}