import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  
  
  const handleEdit=(e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos =todos.filter(item=>{
          return item.id!== id;
        });
        setTodos(newTodos)
        saveToLS()
    
  }
  
  // const handleDelete=(e, id)=>{
  //   let newTodos =todos.filter(item=>{
  //     return item.id!== id;
  //   });
  //   setTodos(newTodos)
  // }
  const handleDelete = (e, id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete it?");
    if (isConfirmed) {
      let newTodos = todos.filter(item => {
        return item.id !== id;
      });
      setTodos(newTodos);
      saveToLS()
    }
  };
  



  
  
  const handleChange=(e)=>{
    setTodo(e.target.value)
    
  }
  
  const handleAdd=()=>{
    setTodos([...todos, {id: uuidv4(),todo, isComleted: false}])
    setTodo("")
    saveToLS()
    
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isComleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }
  



  return (
    <>
      <Navbar />
      <div className="mx-3 md:container  md:mx-auto my-5 rounded-xl p-5 bg-black opacity-65 text-white min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-xl">MyTask - Manage my task todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4 ">
          <h2 className="text-2xl font-bold"> Add Todo</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} className="w-full text-black rounded-full px-5 py-1" />
          <button onClick={handleAdd} disabled={todo.length<=3} className=" p-4 py-2 text-sm font-bold mx-2 rounded-full bg-slate-600 hover:bg-slate-800 disabled:bg-slate-600 text-white">
            Save
          </button>
          </div> 
        </div>
        <input className="my-4" id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} /> <label htmlFor="show">Show Finished</label>
        <hr className="my-2 mx-auto" />
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length ===0 && <div className=" m-5 "> No Todos To Display</div> }
          {todos.map(item=>{

         
            return  (showFinished || !item.isCompleted)  && <div key={item.id} className="todo flex  my-3 justify-between">
              <div className=" flex gap-5 ">

              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
            <div id="todosLine" className={item.isCompleted?"line-through ":"" } >{item.todo}</div>
              </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className=" p-2 py-1 text-sm font-bold rounded-md mx-1 bg-slate-600 hover:bg-slate-800 text-white">
              <FaEdit />
              </button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className=" p-2 py-1 text-sm font-bold rounded-md mx-1 bg-slate-600 hover:bg-slate-800 text-white">
              <AiFillDelete />
              </button>
            </div>
          </div>
           })}
        </div>
      </div>
    </>
  );
}

export default App;
