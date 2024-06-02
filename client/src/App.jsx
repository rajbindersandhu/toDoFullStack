import { useState, useEffect } from 'react'
import { CreateToDo } from './components/CreateToDo'
import { ToDoList } from './components/ToDoList'

import './App.css'

function App() {
  const [todolist, setList] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3000/todo")
    .then(res => res.json())
    .then(data => setList(data))

  },[]);
  return (
    <div>
      <CreateToDo setList={setList} />
      <ToDoList todolist={todolist} setList={setList}/>
    </div>
  )
}

export default App
