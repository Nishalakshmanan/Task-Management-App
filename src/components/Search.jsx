import { IoSearchSharp } from "react-icons/io5";
import { useContext, useEffect } from "react";
import { filterContext } from "../pages/Home";
function Search(){
  const {searchInput,setSearchInput,dueDate,setDueDate,priority,setPriority}=useContext(filterContext)
  useEffect(()=>{
    console.log(dueDate,priority)
  },[dueDate,priority])
  return(
    <div className="flex flex-col gap-5 bg-slate-100 text-gray-500 mx-auto py-4 sm:py-8 px-4 sm:px-6 md:px-16 lg:px-28 xl:px-52">
      <div className="flex flex-wrap gap-1 xs:gap-2 items-center">
        <label
          htmlFor="search"
          className="whitespace-nowrap text-lg font-semibold"
        >
          Search Tasks:
        </label>
        <div className="rounded-lg bg-white border-2 border-gray-300 flex items-center flex-grow pr-1.5">
          <input
            value={searchInput}
            onChange={(evt)=>setSearchInput(evt.target.value)}
            type="text"
            id="search"
            placeholder="Search by task name..."
            className="flex-grow p-1.5 rounded-lg focus:outline-none"
          ></input>
          <IoSearchSharp className="size-5" />
        </div>
        </div>
        <div className="flex gap-1 flex-wrap items-center">
          <p className="text-lg font-semibold">Sort By:</p>
          <div className="text-blue-600 flex gap-3">
             <select value={dueDate} onChange={(evt)=>setDueDate(evt.target.value)} name="duedate" id="duedate" className=" p-1 outline-none rounded-md border-2 border-blue-600">
              <option value="" disable="true" hidden>
              Status
              </option>
              <option value="">Default</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overDue">Overdue</option>
              <option value="dueSoonFirst">Due Soon First</option>
              <option value="dueLateFirst">Due Late First</option>
          </select>
          <select value={priority} onChange={(evt)=>setPriority(evt.target.value)}  name="priority" id="priority" className="p-1 outline-none rounded-md border-2 border-blue-600">
             <option value="" disable="true" hidden>
              Priority
              </option>
             <option value="">Default</option>
             <option value="high">High to Low</option>  
             <option value="low">Low to High</option>           
          </select> 
         </div>                        
        </div>
      </div>
  )
}
export default Search