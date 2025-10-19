import { useState,useContext,useEffect } from "react";
import { taskContext } from "../App";
import { useNavigate,useLocation} from "react-router-dom";
function TaskForm() {
  //useLocation returns the Location object which is the second argument of the navigation
  const navigate=useNavigate()
  const {mode,from,id}=useLocation().state
  const {task,setTask,formData,setFormData}=useContext(taskContext)
  useEffect(()=>{
     if(mode==="create"){
      setFormData({ title: "", desc: "", date: "",priority:"",priorityVal: "",completed:false })
     }
  },[])
  function addForm(evt){
    evt.preventDefault()
    if(mode==="create"){
      setTask([...task,formData])
      setFormData({ title: "", desc: "", date: "",priority:"",priorityVal: "",completed:false })
      navigate("/",{replace:true})
    }
    else if(from==="view"){
       const editedTask=task.map((item,i)=>{
         if(i==id){
          return formData
         }
         else{
          return item
         }
       })
       setTask(editedTask)
       setFormData({ title: "", desc: "", date: "",priority:"",priorityVal: "",completed:false})
       navigate("/view",{replace:true,state:{id:id}})
    }
    else{
       const editedTask=task.map((item,i)=>{
         if(i==id){
          return formData
         }
         else{
          return item
         }
       })
       setTask(editedTask)
       setFormData({ title: "", desc: "", date: "",priority:"",priorityVal: "",completed:false })
       navigate("/",{replace: true})
    }
  }
  function backToHome(){
    //create
    if(mode==="create"){
       setFormData({ title: "", desc: "", date: "",priority:"",priorityVal: "",completed:false })
       navigate("/",{replace:true})
    }
    //view to edit
    else if(from==="view"){
       setFormData({ title: "", desc: "", date: "",priority:"",priorityVal: "",completed:false})
       navigate("/view",{replace:true,state:{id:id}})
    }
    //table to edit
    else{
      setFormData({ title: "", desc: "", date: "",priority:"",priorityVal: "",completed:false })
       navigate("/",{replace: true})
    }
  }           
  return (
    <>
    {
      mode==="create"?(<div className="px-5 py-7 text-lg sm:text-2xl text-gray-500 bg-slate-100 font-bold">Create New Task</div>):(<div className="px-5 py-7 text-lg sm:text-2xl text-gray-500 bg-slate-100 font-bold">
      Edit Task</div>)
    } 
      <form className="w-[97%] xs:w-[90%] mx-auto" onSubmit={addForm}>
        <div className="mt-10  text-gray-600 bg-slate-100 font-semibold py-10 px-5 rounded-md flex flex-col gap-5">
          <input
            type="text"
            value={formData.title}
            onChange={(evt)=>setFormData({...formData,title:evt.target.value})}
            placeholder="Task Title"
            id="task-title"
            className="px-2 h-11 border-2 border-gray-300 rounded-lg flex-grow focus:outline-none"
            required
          ></input>
          <textarea
            value={formData.desc}
            onChange={(evt)=>setFormData({...formData,desc:evt.target.value})}
            placeholder="Description"
            id="task-description"
            className="px-2 py-2 h-40 border-2 border-gray-300 rounded-lg flex-grow focus:outline-none resize-none"
            required
          ></textarea>
          <div>
            <label htmlFor="duedate" className="font-semibold">
              Due Date:{" "}
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(evt)=>setFormData({...formData,date:evt.target.value})}
              id="duedate"
              className="px-3 rounded-md"
              required
            ></input>
          </div>
          <div className="flex gap-1 sm:gap-2 items-start flex-wrap">
            <p className="whitespace-nowrap">Priority Status:</p>
            <div className="flex flex-col xs-sm:flex-row gap-4">
              <div className="flex gap-1.5">
                <input id="high" type="radio" value="3" name="priority" checked={formData.priorityVal==="3"} required onClick={(evt)=>setFormData({...formData,priority:"High",priorityVal:evt.target.value})}/>
                <label htmlFor="high" className="bg-red-600 text-sm sm:text-base text-white py-1 px-3.5 rounded-full">
                 High
                </label>
              </div>
              <div className="flex gap-1.5">
                <input id="medium" type="radio" value="2" name="priority" checked={formData.priorityVal==="2"} required onClick={(evt)=>setFormData({...formData,priority:"Medium",priorityVal:evt.target.value})}/>
                <label htmlFor="medium" className="bg-orange-500 text-sm sm:text-base text-white py-1 px-3.5 rounded-full">
                Medium
                </label>
              </div>
              <div className="flex gap-1.5">
                <input id="low" type="radio" value="1" name="priority" checked={formData.priorityVal==="1"} required onClick={(evt)=>setFormData({...formData,priority:"Low",priorityVal:evt.target.value})}/>
                <label htmlFor="low" className="bg-yellow-300 text-sm sm:text-base text-white py-1 px-3.5 rounded-full">
                 Low
                </label>
              </div>             
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-16 justify-center">
          {
            mode==="create"?(<button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded-md" >
            Save Task
          </button>):(<button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded-md">
            Save Changes
          </button>)
          }        
          <button type="button" className="bg-slate-400 text-white py-1 px-4 rounded-md" onClick={backToHome}>Cancel</button>
        </div>
      </form>
    </>
  );
}
export default TaskForm;
