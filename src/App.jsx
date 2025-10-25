
import Home from "./pages/Home.jsx"
import CreateTask from "./pages/CreateTask.jsx";
import {useState,useEffect,useContext,createContext } from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import ViewPage from "./pages/ViewPage.jsx";
const taskContext=createContext()
function App() { 
   
   const [formData,setFormData]=useState({title:"",desc:"",date:null,priority:"",priorityVal:"",completed:false}) 
   //formstate is used to track whether we should show or hide create new task btn 
   const[task,setTask]=useState(localStorage.getItem("Task")?JSON.parse(localStorage.getItem("Task")):[])
   useEffect(()=>{
     localStorage.setItem("Task",JSON.stringify(task))
     console.log(task)
   },[task])
   useEffect(()=>{
    console.log(formData)
   },[formData])
  return (

    <taskContext.Provider value={{task,setTask,formData,setFormData}}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      {/*id parameter is optional*/}
      <Route path='/form/:id?' element={<CreateTask></CreateTask>}></Route>
      <Route path='/view/:id' element={<ViewPage></ViewPage>}></Route>
    </Routes>
   </BrowserRouter>
    
    
    </taskContext.Provider>
   

  );
}

export default App;
export {taskContext}
