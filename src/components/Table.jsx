import { useContext, useEffect, useState,useMemo } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { taskContext } from "../App";
import { filterContext } from "../pages/Home";
import {useNavigate} from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Table() {
  const navigate=useNavigate()
  const{searchInput,dueDate,priority}=useContext(filterContext)
  
  const trimmedSearchInput=useMemo(()=>{
      return searchInput.toLowerCase().trim()
  },[searchInput])

  const{task,setTask,formData,setFormData}=useContext(taskContext)
  const filteredData=useMemo(()=>{
    const today=new Date().toISOString().split("T")[0]
      let data=[...task]
         data=data.filter((item)=>{
                    return item.title?.toLowerCase().includes(trimmedSearchInput)
                 })
      if(dueDate){
        if(dueDate==="pending"){
          data=data.filter((item)=>!item.completed).filter((item)=>new Date(item.date)>=new Date())//taking completed:false
        }
        else if (dueDate === "completed") {
         data = data.filter(item => item.completed);//taking completed:true
        }
        else if(dueDate==="overDue"){
          data=data.filter((item)=>!item.completed).filter((item)=>new Date(item.date)<new Date())
        }
        else if(dueDate==="dueSoonFirst"){
          data=data.filter((item)=>!item.completed).filter((item)=>item.date>=today).sort((a,b)=>new Date(a.date)-new Date(b.date))
        }
        else if(dueDate==="dueLateFirst"){
          data=data.filter((item)=>!item.completed).filter((item)=>item.date>=today).sort((a,b)=>new Date(b.date)-new Date(a.date))
        }
      }
      if(priority){
         if(priority==="low"){
          data=data.sort((a,b)=>a.priorityVal-b.priorityVal)//taking completed:false
        }
        else if(priority==="high"){
          data=data.sort((a,b)=>b.priorityVal-a.priorityVal)
        }
      }
        return data
  },[trimmedSearchInput.length,task,dueDate,priority])//checks value change for primitive and reference change for non-primitive

   useEffect(()=>{
     console.log("filtereddata:",filteredData)
   },[filteredData])
  const [currentPage,setCurrentPage]=useState(0)
  const [pageWindowStart,setPageWindowStart]=useState(0)
  const startIndex=currentPage*5

  const pageData=useMemo(()=>{
    return (filteredData.slice(startIndex,startIndex+5))
  },[filteredData,currentPage])

  const pages=useMemo(()=>{
    return Array.from({length:(Math.ceil(filteredData.length/5))})
  },[filteredData])
  
  useEffect(()=>{
    setCurrentPage(0)
    setPageWindowStart(0)
   },[trimmedSearchInput.length,dueDate,priority])

  function editFunctionality(evt){ 
    navigate(`/form/${evt.currentTarget.id}?mode=edit&from=home`,{replace:true})
  }
  function deleteTask(evt){
    const deleteId=Number(evt.currentTarget.id)
    const data=task.filter((item)=>deleteId!==item.id)
    setTask([...data])
    if(currentPage>0 && pageData.length==1){
      setCurrentPage(currentPage-1)
      setPageWindowStart(Math.max(0,pageWindowStart-1))
    }
  }
  function goToViewPage(evt){
    navigate(`/view/${evt.currentTarget.id}`,{replace: true})
  }
  function handlePrev(){
    if(currentPage>0){
      const prev=currentPage-1
      setCurrentPage(prev)
      if(prev<pageWindowStart){
        setPageWindowStart(pageWindowStart-1)
      }
    }
  }
  function handleNext(){
    //window size:3
    if(currentPage<pages.length-1){
      const next=currentPage+1
      setCurrentPage(next)
      if(next>pageWindowStart+2){
        setPageWindowStart(pageWindowStart+1)
      }
    }
  }
  function handleComplete(evt){
    const completedDataId=Number(evt.currentTarget.id)
    const data=task.map((item)=>{
      if(completedDataId===item.id){
        return {...item,completed:!item.completed}
      }
      else{
        return item
      }
    })
     setTask(data)
  }
 
  return (
   <>
    <div className="max-w-[95%] mx-auto py-4 space-y-2 flex flex-col">
      <h1 className="text-lg sm:text-2xl text-gray-500 font-bold text-center">
        Tasks
      </h1>
      {/*overflow-x-auto makes Scrollable table*/}
      <div className="overflow-x-auto data-table">
        <table className="w-full border-2 border-slate-100 border-collapse  text-gray-600 font-semibold text-base">
        <thead className="bg-slate-100 ">
          <tr>
            <th className="text-center">Task Name(Click to view)</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Action</th>
            <th>View Page</th>
          </tr>
        </thead>
        <tbody>
          {
            //THE ARGUMENT FOR SLICE IS startIndex,lastIndex(exclusive
            pageData.length?pageData.map((item,i)=>{
            return(<tr key={i} className="border border-slate-200">
            <td className={`whitespace-normal flex gap-2 ml-4 ${item.completed?"line-through":""}`} >
              <input type="checkbox" id={item.id} checked={item.completed} onChange={handleComplete}/>
              <p>{item.title}</p>             
            </td>
            <td className="whitespace-nowrap text-center">{new Date(item.date).toLocaleDateString("en-IN")}</td>
            {
              <td className="text-center">
                <button style={{
                backgroundColor:item.priorityVal==="3"?"#DC2626":
                item.priorityVal==="2"?"#F97316":item.priorityVal==="1"?"#FCD34D":""
                }} className=" text-white text-xs xs:text-sm py-1 px-2.5 rounded-full">
                 {item.priority}
                </button>
              </td>
            }
            <td>
               <div className="w-full h-full flex flex-row justify-center">
                <FaRegEdit className="size-6 inline text-blue-400" id={item.id} onClick={editFunctionality}/>
                <MdDelete className="size-[26.5px] inline text-red-500" id={item.id} onClick={deleteTask}/>
              </div>
            </td>
            <td className="text-center"><button className="bg-blue-400 text-white  rounded-md py-1 px-3 w-fit" id={item.id} onClick={goToViewPage}>View</button></td>
          </tr>)
          }):(<tr><td colSpan="4" className="text-center">No tasks found</td></tr>)        
          }         
        </tbody>
      </table>
      </div>     
    </div>
    {/*Pagination*/}
    <div className="flex justify-center items-center text-lg xs:text-xl gap-2 p-3">
      {
      filteredData.length>10?
      <div className={`${currentPage===0?"bg-slate-200":"bg-slate-300"} py-2 pl-1.5 xs:pl-2 pr-3 xs:pr-4 flex items-center justify-center rounded-md`} onClick={handlePrev}>
        <IoIosArrowBack className="relative top-[1.6px]"/>
        <span className="leading-none">Prev</span>
      </div>
      :""
      }
      <div className="flex gap-2">
      {
      //FOR SLICE start index-inlusive
      //end index-exclusive
      pages.slice(pageWindowStart,pageWindowStart+3).map((page,i)=>{
        const pageNumberIndex=pageWindowStart+i
        return  <p key={i} onClick={()=>setCurrentPage(pageNumberIndex)} className={`size-9 xs:size-10 flex items-center justify-center rounded-md ${pageNumberIndex==currentPage?"bg-blue-300":"bg-slate-200"}`}>{pageNumberIndex+1}</p>
        
      })
      }
      </div>
      {filteredData.length>10?
      <div className={`${currentPage===(pages.length-1)?"bg-slate-200":"bg-slate-300"} py-2 pl-3 xs:pl-4 pr-1.5 xs:pr-2 flex items-center justify-center rounded-md`} onClick={handleNext}>
        <span className="leading-none">Next</span>
        <IoIosArrowForward className="relative top-[1.6px]"/>
      </div>:""
      }        
    </div>
    
  </> 
  );
}
export default Table;
