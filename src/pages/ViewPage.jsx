import { useLocation,useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { taskContext } from "../App.jsx";
import { useContext } from "react";
import { GoArrowLeft } from "react-icons/go";
import { MdModeEdit } from "react-icons/md";


function ViewPage() {
  const navigate=useNavigate()
  const { id } = useLocation().state;
  const {task,setFormData}=useContext(taskContext);
  const viewData=task[id]
  function backToHome(){
    navigate('/',{replace: true})
  }
  function goToEdit(){ 
  const data=task[id]
  setFormData({...data})
  navigate('/form',{replace: true,state:{mode:"edit",from:"view",id:id}})
  }
  return (
    <div className="min-w-full  min-h-screen bg-slate-50 ">
      <Header create={false}></Header>
    <div className="mx-auto w-[90%] sm:w-[80%]">
      <div className="mt-12 flex justify-between items-center p-1">
         <div className="btn bg-slate-200 w-fit pr-3 flex flex-row gap-2 items-center rounded-full" onClick={backToHome}>
         <GoArrowLeft className="btn text-black size-8 py-1.5 rounded-full  bg-slate-300"/><p>Back to Tasks Lists</p>
         </div>
         <div className="btn bg-slate-200 py-0.5 px-3 xs:px-4 rounded-full flex gap-1 text-lg items-center" onClick={goToEdit}><MdModeEdit className="size-5 text-slate-500"/><p>Edit</p></div>
         
      </div>
      <div className="bg-slate-100  card text-gray-500  font-medium mt-7 p-5 xs-sm:p-10 rounded-md flex flex-col gap-4">
         <h1 className="text-2xl md:text-3xl font-bold ">{viewData.title}</h1>
         <div>
            <h2 className=" text-lg pb-1">Task Summary</h2>
            <div className="px-4 py-2 mt-1 border-y-2 border-slate-200 flex flex-col gap-1">
                <p>Task Name:&nbsp;<span className="text-blue-500 font-normal">{viewData.title}</span></p>
                <p>Due Date:&nbsp;<span className="whitespace-nowrap text-center font-normal">{viewData.date}</span></p>
                <p>Task Priority:&nbsp;   
                {
                <span className="text-center">
                  <button style={{
                  backgroundColor:viewData.priorityVal==="3"?"#DC2626":
                  viewData.priorityVal==="2"?"#F97316":viewData.priorityVal==="1"?"#FCD34D":""
                  }} className=" text-white text-sm py-1 px-4 rounded-full">
                  {viewData.priority}
                  </button>
                </span> 
                 }
                </p>  
            </div>           
         </div>
         <div>
             <h2 className=" text-lg pb-1">Full Description</h2>
              <div className="px-4 py-2 mt-1 border-y-2 border-slate-200 flex flex-col gap-1 break-words font-normal">
                {viewData.desc}
              </div> 
        </div>
     </div>
    </div>
    {/*here the card ends*/}
    </div>
  );
}
export default ViewPage;
