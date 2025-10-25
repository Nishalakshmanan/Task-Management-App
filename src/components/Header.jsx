import { useNavigate} from "react-router-dom";
import { useContext } from "react";
function Header({create}) {
  const navigate=useNavigate()
  function goToCreateForm(){
    navigate('/form?mode=create',{replace: true})
  }
  return (
    <div className="sticky top-0">
      <div className=" bg-blue-300 flex flex-row justify-between items-center py-3 px-3 sm-md:px-6 ">
        <h1 className="text-xl sm:text-2xl text-white font-semibold">
          Task Management App
          {/*Navigation button in flex row with header for screen greater than medium size*/}
        </h1>
        {create?
         (<div className="text-white text-sm hidden xs-sm:block">
          <button className="btn bg-blue-400 font-medium py-2.5 px-4 rounded-full outline-none" onClick={goToCreateForm}>
            + Create New Task
          </button >
        </div>):""
        }
      </div>
      {/*Navigation button for medium size screen */}
      {create?
      (<div className="bg-white py-2 px-3  text-white text-sm  block xs-sm:hidden border-b-2 border-gray-300">
        <button className="btn bg-blue-400 font-medium py-2.5 px-4 rounded-full outline-none" onClick={goToCreateForm}>
          + Create New Task
        </button>
      </div>):""
      }
    </div>
  );
}
export default Header;
